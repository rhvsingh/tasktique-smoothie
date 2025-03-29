
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
}
