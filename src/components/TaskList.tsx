
import React from 'react';
import { Clock, Calendar, MoreHorizontal, CheckCircle } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  onTasksReorder: (tasks: Task[]) => void;
  onTaskComplete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTasksReorder, onTaskComplete }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onTasksReorder(items);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <PriorityFilter label="All" count={tasks.length} active />
          <PriorityFilter label="High Priority" count={tasks.filter(t => t.priority === 'high').length} color="bg-destructive/10 text-destructive" />
          <PriorityFilter label="Medium Priority" count={tasks.filter(t => t.priority === 'medium').length} color="bg-medium/10 text-medium" />
          <PriorityFilter label="Low Priority" count={tasks.filter(t => t.priority === 'low').length} color="bg-low/10 text-low" />
        </div>
        <div className="relative neomorph-inset p-1 pl-8 pr-2 rounded-full">
          <input
            type="text"
            placeholder="Search tasks..."
            className="bg-transparent border-none focus:outline-none text-sm w-40"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </span>
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
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="task-container"
                    >
                      <TaskCard 
                        task={task} 
                        index={index}
                        onComplete={() => onTaskComplete(task.id)}
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
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onComplete }) => {
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
            <CheckCircle size={18} />
          </button>
          <button className="p-1.5 rounded-full neomorph-btn">
            <MoreHorizontal size={18} />
          </button>
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
