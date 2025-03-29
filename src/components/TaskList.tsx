
import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Task } from '@/types';
import TaskMenu from './TaskMenu';
import TaskModal from './TaskModal';
import { toast } from '@/hooks/use-toast';

interface TaskListProps {
  tasks: Task[];
  onTasksReorder: (tasks: Task[]) => void;
  onTaskComplete: (id: string) => void;
  onTaskDelete?: (id: string) => void;
  onTaskUpdate?: (updatedTask: Task) => void;
  searchTerm?: string;
  activeFilter?: string | null;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onTasksReorder, 
  onTaskComplete,
  onTaskDelete,
  onTaskUpdate,
  searchTerm = '',
  activeFilter = null
}) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onTasksReorder(items);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    if (onTaskDelete) {
      onTaskDelete(id);
    }
  };

  const handleViewDetails = (task: Task) => {
    setViewingTask(task);
    setViewDetailsOpen(true);
  };

  const handleSaveTask = (updatedTask: Task) => {
    if (onTaskUpdate) {
      onTaskUpdate(updatedTask);
    }
  };

  // Filter tasks based on search term and active filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchTerm 
      ? task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesPriority = activeFilter 
      ? task.priority === activeFilter 
      : true;
    
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <PriorityFilter label="All" count={tasks.length} active={activeFilter === null} />
          <PriorityFilter 
            label="High Priority" 
            count={tasks.filter(t => t.priority === 'high').length} 
            color="bg-destructive/10 text-destructive" 
            active={activeFilter === 'high'} 
          />
          <PriorityFilter 
            label="Medium Priority" 
            count={tasks.filter(t => t.priority === 'medium').length} 
            color="bg-medium/10 text-medium" 
            active={activeFilter === 'medium'} 
          />
          <PriorityFilter 
            label="Low Priority" 
            count={tasks.filter(t => t.priority === 'low').length} 
            color="bg-low/10 text-low" 
            active={activeFilter === 'low'} 
          />
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`task-container ${snapshot.isDragging ? 'z-10 shadow-[12px_12px_24px_#e6e7f0,-12px_-12px_24px_#ffffff] scale-[1.02]' : ''}`}
                    >
                      <TaskCard 
                        task={task} 
                        index={index}
                        onComplete={() => onTaskComplete(task.id)}
                        onEdit={() => handleEditTask(task)}
                        onDelete={() => handleDeleteTask(task.id)}
                        onViewDetails={() => handleViewDetails(task)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Edit Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask || undefined}
        title="Edit Task"
      />

      {/* View Task Details Modal */}
      <TaskModal
        isOpen={viewDetailsOpen}
        onClose={() => setViewDetailsOpen(false)}
        onSave={() => setViewDetailsOpen(false)}
        task={viewingTask || undefined}
        title="Task Details"
      />
    </div>
  );
};

interface PriorityFilterProps {
  label: string;
  count: number;
  active?: boolean;
  color?: string;
}

const PriorityFilter: React.FC<PriorityFilterProps> = ({ label, count, active, color }) => {
  return (
    <button 
      className={`px-3 py-1 text-sm rounded-lg transition-all duration-300 ${active ? 'neomorph-inset font-medium' : color || 'hover:neomorph-inset'}`}
    >
      {label} ({count})
    </button>
  );
};

interface TaskCardProps {
  task: Task;
  index: number;
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  index, 
  onComplete,
  onEdit,
  onDelete,
  onViewDetails
}) => {
  const getPriorityClass = () => {
    switch (task.priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div 
      className={`neomorph p-4 ${getPriorityClass()} animate-slide-in`} 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{task.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{task.description}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={onComplete}
            className="p-1.5 rounded-full neomorph-btn transition-all hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </button>
          <TaskMenu
            onEdit={onEdit}
            onDelete={onDelete}
            onComplete={onComplete}
            onViewDetails={onViewDetails}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center text-muted-foreground text-xs gap-1">
          <Clock size={14} />
          <span>{task.time}</span>
        </div>
        <div className="flex items-center text-muted-foreground text-xs gap-1">
          <Calendar size={14} />
          <span>{task.date}</span>
        </div>
      </div>
      
      {task.progress !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">{task.category}</span>
            <span className="font-medium">{task.progress}%</span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden neomorph-inset">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full" 
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
