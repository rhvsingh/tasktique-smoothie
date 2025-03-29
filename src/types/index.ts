
export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
  time: string;
  category?: string;
  progress?: number;
  completed?: boolean;
  estimationType?: 'Minutes' | 'Hours' | 'Days';
  estimationValue?: string;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
}

export interface Session {
  user: User;
  expires: string;
}
