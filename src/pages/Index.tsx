
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import Dashboard from '@/components/Dashboard';
import { Task } from '@/types';
import { toast } from '@/hooks/use-toast';
import TaskModal from '@/components/TaskModal';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Website Redesign Project',
    description: 'Complete the homepage mockup and prepare presentation for the client',
    priority: 'high',
    date: 'Due Today',
    time: 'Today, 2:00 PM',
    category: 'Work',
    progress: 70,
    estimationType: 'Days',
    estimationValue: '3'
  },
  {
    id: '2',
    title: 'Team Meeting Preparation',
    description: 'Prepare agenda and gather progress updates from team members',
    priority: 'medium',
    date: 'Due Tomorrow',
    time: 'Tomorrow, 10:00 AM',
    category: 'Work',
    progress: 30,
    estimationType: 'Hours',
    estimationValue: '2'
  },
  {
    id: '3',
    title: 'Content Review',
    description: 'Review and approve blog posts for next week\'s publication',
    priority: 'medium',
    date: 'Due Wed',
    time: 'Wed, 11:00 AM',
    category: 'Work',
    progress: 0,
    estimationType: 'Minutes',
    estimationValue: '45'
  },
  {
    id: '4',
    title: 'Email Newsletter',
    description: 'Draft monthly newsletter content and send for review',
    priority: 'low',
    date: 'Due Thu',
    time: 'Thu, 3:00 PM',
    category: 'Marketing',
    progress: 15,
    estimationType: 'Hours',
    estimationValue: '1'
  }
];

// Load user preferences
const loadUserPreferences = () => {
  try {
    const storedPrefs = localStorage.getItem('userPreferences');
    return storedPrefs ? JSON.parse(storedPrefs) : {
      darkMode: false,
      animationSpeed: 50,
      interfaceDensity: 30,
      showProgressBars: true
    };
  } catch (error) {
    console.error('Error loading preferences:', error);
    return {
      darkMode: false,
      animationSpeed: 50,
      interfaceDensity: 30,
      showProgressBars: true
    };
  }
};

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  
  // User preferences
  const [userPreferences, setUserPreferences] = useState(loadUserPreferences());
  
  // Simulate animated page load to reduce jumpiness
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Apply dark mode on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', userPreferences.darkMode);
  }, [userPreferences.darkMode]);

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
    
    // Generate random estimation
    const estimationTypes = ['Minutes', 'Hours', 'Days'];
    const randomEstimationType = estimationTypes[Math.floor(Math.random() * estimationTypes.length)];
    let randomEstimationValue = '1';
    
    if (randomEstimationType === 'Minutes') {
      randomEstimationValue = String(Math.floor(Math.random() * 55) + 5);
    } else if (randomEstimationType === 'Hours') {
      randomEstimationValue = String(Math.floor(Math.random() * 8) + 1);
    } else {
      randomEstimationValue = String(Math.floor(Math.random() * 5) + 1);
    }
    
    // Create new task
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskText.split(' ').slice(0, 5).join(' ') + (taskText.split(' ').length > 5 ? '...' : ''),
      description: taskText,
      priority: randomPriority,
      date: dateStr,
      time: `${randomDays === 0 ? 'Today' : randomDays === 1 ? 'Tomorrow' : daysOfWeek[dueDate.getDay()]}, ${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      category: Math.random() > 0.5 ? 'Work' : 'Personal',
      progress: 0,
      estimationType: randomEstimationType,
      estimationValue: randomEstimationValue
    };
    
    setTasks([newTask, ...tasks]);
    toast({
      title: "Task added",
      description: "Your new task has been added successfully.",
    });
  };

  const handleTasksReorder = (reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
    toast({
      title: "Tasks reordered",
      description: "Your task list has been updated.",
    });
  };

  const handleTaskComplete = (id: string) => {
    const completedTask = tasks.find(task => task.id === id);
    
    if (completedTask) {
      const updatedCompletedTask = { ...completedTask, progress: 100, completed: true };
      setCompletedTasks([updatedCompletedTask, ...completedTasks]);
      
      // Remove from active tasks
      setTasks(tasks.filter(task => task.id !== id));
      
      toast({
        title: "Task completed",
        description: "Great job! Your task has been marked as complete.",
      });
    }
  };

  const handleTaskDelete = (id: string) => {
    // Check if in active tasks
    if (tasks.some(task => task.id === id)) {
      setTasks(tasks.filter(task => task.id !== id));
    }
    
    // Check if in completed tasks
    if (completedTasks.some(task => task.id === id)) {
      setCompletedTasks(completedTasks.filter(task => task.id !== id));
    }
    
    toast({
      title: "Task deleted",
      description: "The task has been removed.",
    });
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    // Check if it's an active task
    if (tasks.some(task => task.id === updatedTask.id)) {
      setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    }
    
    // Check if it's a completed task
    if (completedTasks.some(task => task.id === updatedTask.id)) {
      setCompletedTasks(completedTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    }
    
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const handleSaveNewTask = (task: Task) => {
    setTasks([task, ...tasks]);
    toast({
      title: "Task created",
      description: "Your new task has been created successfully.",
    });
  };

  const handlePriorityFilter = (priority: string | null) => {
    setPriorityFilter(priority);
  };

  // Filter tasks based on search and priority filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = searchTerm 
      ? task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesPriority = priorityFilter 
      ? task.priority === priorityFilter 
      : true;
    
    return matchesSearch && matchesPriority;
  });

  return (
    <div className={`min-h-screen bg-background py-8 px-4 md:px-8 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <TaskInput onAddTask={handleAddTask} />
        
        <Dashboard />
        
        <div className="neomorph p-6 animate-slide-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold">Today's Tasks</h2>
            
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
                <span className="ml-1">Add Task</span>
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={`${priorityFilter === null ? 'neomorph-inset' : 'neomorph-btn'}`}
                onClick={() => handlePriorityFilter(null)}
              >
                All ({tasks.length})
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`${priorityFilter === 'high' ? 'neomorph-inset' : 'neomorph-btn'} text-destructive`}
                onClick={() => handlePriorityFilter('high')}
              >
                High Priority ({tasks.filter(t => t.priority === 'high').length})
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`${priorityFilter === 'medium' ? 'neomorph-inset' : 'neomorph-btn'} text-medium`}
                onClick={() => handlePriorityFilter('medium')}
              >
                Medium Priority ({tasks.filter(t => t.priority === 'medium').length})
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`${priorityFilter === 'low' ? 'neomorph-inset' : 'neomorph-btn'} text-low`}
                onClick={() => handlePriorityFilter('low')}
              >
                Low Priority ({tasks.filter(t => t.priority === 'low').length})
              </Button>
            </div>
          </div>
          
          <TaskList 
            tasks={filteredTasks}
            completedTasks={completedTasks}
            onTasksReorder={handleTasksReorder}
            onTaskComplete={handleTaskComplete}
            onTaskDelete={handleTaskDelete}
            onTaskUpdate={handleTaskUpdate}
            searchTerm={searchTerm}
            activeFilter={priorityFilter}
            showProgressBars={userPreferences.showProgressBars}
          />
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

export default Index;
