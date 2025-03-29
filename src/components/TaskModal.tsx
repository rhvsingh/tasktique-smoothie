
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Calendar, Clock, Flag, Briefcase } from 'lucide-react';
import { Task } from '@/types';
import { toast } from '@/hooks/use-toast';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task;
  title?: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  task, 
  title = 'Edit Task' 
}) => {
  const [taskData, setTaskData] = useState<Task>({
    id: '',
    title: '',
    description: '',
    priority: 'medium',
    date: 'Due Today',
    time: 'Today, 2:00 PM',
    category: 'Work',
    progress: 0
  });

  // Initialize form with task data when editing
  useEffect(() => {
    if (task) {
      setTaskData({ ...task });
    } else {
      // Reset to defaults for new task
      setTaskData({
        id: Date.now().toString(),
        title: '',
        description: '',
        priority: 'medium',
        date: 'Due Today',
        time: 'Today, 2:00 PM',
        category: 'Work',
        progress: 0
      });
    }
  }, [task, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  };

  const handleProgressChange = (value: number[]) => {
    setTaskData(prev => ({ ...prev, progress: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a task title",
        variant: "destructive"
      });
      return;
    }

    onSave(taskData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="neomorph border-none p-6 max-w-md w-full mx-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Task Title</label>
            <input
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              className="w-full p-3 neomorph-inset rounded-lg"
              placeholder="Enter task title"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              className="w-full p-3 neomorph-inset rounded-lg min-h-[80px]"
              placeholder="Enter task description"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Flag size={14} />
                Priority
              </label>
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className="w-full p-3 neomorph-inset rounded-lg"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Briefcase size={14} />
                Category
              </label>
              <select
                name="category"
                value={taskData.category}
                onChange={handleChange}
                className="w-full p-3 neomorph-inset rounded-lg"
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Marketing">Marketing</option>
                <option value="Analytics">Analytics</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Calendar size={14} />
                Due Date
              </label>
              <input
                type="text"
                name="date"
                value={taskData.date}
                onChange={handleChange}
                className="w-full p-3 neomorph-inset rounded-lg"
                placeholder="Due date"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Clock size={14} />
                Time
              </label>
              <input
                type="text"
                name="time"
                value={taskData.time}
                onChange={handleChange}
                className="w-full p-3 neomorph-inset rounded-lg"
                placeholder="Time"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Progress</label>
              <span className="text-sm font-medium">{taskData.progress}%</span>
            </div>
            <Slider
              defaultValue={[taskData.progress]}
              value={[taskData.progress]}
              onValueChange={handleProgressChange}
              max={100}
              step={5}
              className="my-4"
            />
          </div>
          
          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="neomorph-btn"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="neomorph-primary"
            >
              Save Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
