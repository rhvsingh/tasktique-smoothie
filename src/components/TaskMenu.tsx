
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, Trash, CheckCircle, Info } from 'lucide-react';

interface TaskMenuProps {
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
  onViewDetails: () => void;
  isCompleted?: boolean;
}

const TaskMenu: React.FC<TaskMenuProps> = ({
  onEdit,
  onDelete,
  onComplete,
  onViewDetails,
  isCompleted = false,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1.5 rounded-full neomorph-btn transition-all hover:text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="neomorph border-none animate-scale-in">
        <DropdownMenuItem onClick={onEdit} className="cursor-pointer flex items-center gap-2">
          <Edit size={16} />
          <span>Edit Task</span>
        </DropdownMenuItem>
        {!isCompleted && (
          <DropdownMenuItem onClick={onComplete} className="cursor-pointer flex items-center gap-2">
            <CheckCircle size={16} />
            <span>Mark as Complete</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onViewDetails} className="cursor-pointer flex items-center gap-2">
          <Info size={16} />
          <span>View Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} className="cursor-pointer flex items-center gap-2 text-destructive">
          <Trash size={16} />
          <span>Delete Task</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskMenu;
