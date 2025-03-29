
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import Dashboard from '@/components/Dashboard';
import { Task } from '@/types';
import { toast } from '@/hooks/use-toast';

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
  }
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleAddTask = (taskText: string) => {
    // Generate random priority
    const priorities: Array<'high' | 'medium' | 'low'> = ['high', 'medium', 'low'];
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
    
    // Generate random date in the next 7 days
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const randomDays = Math.floor(Math.random() * 7);
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + randomDays);
    
    const dateStr = randomDays === 0 
      ? 'Due Today' 
      : randomDays === 1 
        ? 'Due Tomorrow' 
        : `Due ${daysOfWeek[dueDate.getDay()]}`;
    
    // Create subtasks by breaking the main task into parts
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskText.split(' ').slice(0, 5).join(' ') + (taskText.split(' ').length > 5 ? '...' : ''),
      description: taskText,
      priority: randomPriority,
      date: dateStr,
      time: `${randomDays === 0 ? 'Today' : randomDays === 1 ? 'Tomorrow' : daysOfWeek[dueDate.getDay()]}, ${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      category: Math.random() > 0.5 ? 'Work' : 'Personal',
      progress: 0
    };
    
    setTasks([newTask, ...tasks]);
  };

  const handleTasksReorder = (reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
    toast({
      title: "Tasks reordered",
      description: "Your task list has been updated.",
    });
  };

  const handleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, progress: 100, completed: true } 
        : task
    ));
    
    // Remove completed task after a delay
    setTimeout(() => {
      setTasks(tasks.filter(task => task.id !== id));
      toast({
        title: "Task completed",
        description: "Great job! Your task has been marked as complete.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <TaskInput onAddTask={handleAddTask} />
        
        <Dashboard />
        
        <div className="neomorph p-6 animate-slide-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-bold mb-6">Today's Tasks</h2>
          <TaskList 
            tasks={tasks} 
            onTasksReorder={handleTasksReorder}
            onTaskComplete={handleTaskComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
