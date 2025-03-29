
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface TaskInputProps {
  onAddTask: (task: string) => void;
}

const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [task, setTask] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      onAddTask(task);
      setTask('');
      setIsProcessing(false);
      toast({
        title: "Task added successfully",
        description: "Your task has been processed by AI and added to your list.",
      });
    }, 1500);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
      <div className="neomorph p-6">
        <h2 className="text-2xl font-bold mb-2 text-center">Transform Your Tasks with AI</h2>
        <p className="text-muted-foreground text-center mb-4">Let AI organize and prioritize your tasks efficiently</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="neomorph-inset p-2">
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter your tasks or describe your project..."
              className="w-full bg-transparent border-none focus:outline-none p-2 h-24 resize-none"
            />
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isProcessing}
              className={`neomorph-primary py-3 px-6 font-medium flex items-center gap-2 ${isProcessing ? 'animate-pulse' : ''}`}
            >
              {isProcessing ? (
                <>Processing with AI...</>
              ) : (
                <>
                  <PlusCircle size={18} />
                  Process with AI
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskInput;
