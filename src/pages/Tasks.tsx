
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import TaskModal from '@/components/TaskModal';
import { Task } from '@/types';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Search, Filter, ArrowUpDown, Plus } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

// Sample tasks for demonstration
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Website Redesign Project',
    description: 'Complete the homepage mockup and prepare presentation for the client',
    priority: 'high',
    date: 'Due Today',
    time: 'Today, 2:00 PM',
    category: 'Work',
    progress: 70
  },
  {
    id: '2',
    title: 'Team Meeting Preparation',
    description: 'Prepare agenda and gather progress updates from team members',
    priority: 'medium',
    date: 'Due Tomorrow',
    time: 'Tomorrow, 10:00 AM',
    category: 'Work',
    progress: 30
  },
  {
    id: '3',
    title: 'Content Review',
    description: 'Review and approve blog posts for next week\'s publication',
    priority: 'medium',
    date: 'Due Wed',
    time: 'Wed, 11:00 AM',
    category: 'Work',
    progress: 0
  },
  {
    id: '4',
    title: 'Email Newsletter',
    description: 'Draft monthly newsletter content and send for review',
    priority: 'low',
    date: 'Due Thu',
    time: 'Thu, 3:00 PM',
    category: 'Marketing',
    progress: 15
  },
  {
    id: '5',
    title: 'Client Proposal',
    description: 'Create a detailed proposal for the new client project',
    priority: 'high',
    date: 'Due Fri',
    time: 'Fri, 9:00 AM',
    category: 'Sales',
    progress: 45
  },
  {
    id: '6',
    title: 'Weekly Report',
    description: 'Compile weekly metrics and prepare report for management',
    priority: 'medium',
    date: 'Due Sat',
    time: 'Sat, 12:00 PM',
    category: 'Analytics',
    progress: 10
  }
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [progressFilter, setProgressFilter] = useState([0, 100]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  
  // Add smooth loading animation
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle task reordering
  const handleTasksReorder = (reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
    setFilteredTasks(applyFilters(reorderedTasks));
    toast({
      title: "Tasks reordered",
      description: "Your task list has been updated.",
    });
  };

  // Handle task completion
  const handleTaskComplete = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id 
        ? { ...task, progress: 100, completed: true } 
        : task
    );
    
    setTasks(updatedTasks);
    
    // Remove completed task after a delay
    setTimeout(() => {
      const filteredTaskList = updatedTasks.filter(task => task.id !== id);
      setTasks(filteredTaskList);
      setFilteredTasks(applyFilters(filteredTaskList));
      toast({
        title: "Task completed",
        description: "Great job! Your task has been marked as complete.",
      });
    }, 1000);
  };

  // Handle task deletion
  const handleTaskDelete = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(applyFilters(updatedTasks));
    toast({
      title: "Task deleted",
      description: "The task has been removed.",
    });
  };

  // Handle task update
  const handleTaskUpdate = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(applyFilters(updatedTasks));
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  // Handle creating a new task
  const handleSaveNewTask = (task: Task) => {
    const updatedTasks = [task, ...tasks];
    setTasks(updatedTasks);
    setFilteredTasks(applyFilters(updatedTasks));
    toast({
      title: "Task created",
      description: "Your new task has been created successfully.",
    });
  };

  // Apply search, priority, progress filters and sorting
  const applyFilters = (taskList: Task[]) => {
    let result = [...taskList];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply priority filter
    if (priorityFilter) {
      result = result.filter(task => task.priority === priorityFilter);
    }
    
    // Apply progress filter
    result = result.filter(task => 
      (task.progress ?? 0) >= progressFilter[0] && 
      (task.progress ?? 0) <= progressFilter[1]
    );
    
    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case 'priority':
          const priorityOrder: Record<string, number> = { high: 1, medium: 2, low: 3 };
          result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
          break;
        case 'progress':
          result.sort((a, b) => (a.progress ?? 0) - (b.progress ?? 0));
          break;
        case 'date':
          // Simple sort for demo purposes - in real app would use proper date parsing
          result.sort((a, b) => a.date.localeCompare(b.date));
          break;
      }
    }
    
    return result;
  };

  // Update filtered tasks when filters or tasks change
  useEffect(() => {
    setFilteredTasks(applyFilters(tasks));
  }, [searchTerm, priorityFilter, sortOption, progressFilter]);

  return (
    <div className={`min-h-screen bg-background py-8 px-4 md:px-8 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div className="neomorph p-6 mb-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold">Task Management</h2>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="pl-9 pr-4 py-2 neomorph-inset rounded-lg w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
              </div>
              <Button 
                variant="outline" 
                className="neomorph-btn p-2 h-auto"
                onClick={() => setIsAddTaskModalOpen(true)}
              >
                <Plus size={20} />
                <span className="hidden md:inline ml-1">Add Task</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <Filter size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">Filter by Priority</span>
              </div>
              <ToggleGroup type="single" value={priorityFilter || ""} onValueChange={setPriorityFilter}>
                <ToggleGroupItem value="high" className="flex-1 neomorph-btn">
                  <span className="h-2 w-2 rounded-full bg-destructive mr-1"></span>
                  High
                </ToggleGroupItem>
                <ToggleGroupItem value="medium" className="flex-1 neomorph-btn">
                  <span className="h-2 w-2 rounded-full bg-medium mr-1"></span>
                  Medium
                </ToggleGroupItem>
                <ToggleGroupItem value="low" className="flex-1 neomorph-btn">
                  <span className="h-2 w-2 rounded-full bg-low mr-1"></span>
                  Low
                </ToggleGroupItem>
                {priorityFilter && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2" 
                    onClick={() => setPriorityFilter(null)}
                  >
                    Clear
                  </Button>
                )}
              </ToggleGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <ArrowUpDown size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium">Sort by</span>
              </div>
              <ToggleGroup type="single" value={sortOption || ""} onValueChange={setSortOption}>
                <ToggleGroupItem value="priority" className="flex-1 neomorph-btn">Priority</ToggleGroupItem>
                <ToggleGroupItem value="progress" className="flex-1 neomorph-btn">Progress</ToggleGroupItem>
                <ToggleGroupItem value="date" className="flex-1 neomorph-btn">Due Date</ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Progress Filter</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {progressFilter[0]}% - {progressFilter[1]}%
                </span>
              </div>
              <Slider 
                className="py-4" 
                min={0}
                max={100} 
                step={5}
                value={progressFilter}
                onValueChange={setProgressFilter}
              />
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">All Tasks ({filteredTasks.length})</h3>
            {filteredTasks.length > 0 ? (
              <TaskList 
                tasks={filteredTasks} 
                onTasksReorder={handleTasksReorder}
                onTaskComplete={handleTaskComplete}
                onTaskDelete={handleTaskDelete}
                onTaskUpdate={handleTaskUpdate}
              />
            ) : (
              <div className="neomorph-inset p-8 text-center rounded-xl">
                <p className="text-muted-foreground">No tasks match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <TaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onSave={handleSaveNewTask}
        title="Add New Task"
      />
    </div>
  );
};

export default Tasks;
