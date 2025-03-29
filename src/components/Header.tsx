
import React from 'react';
import { LayoutDashboard, ListTodo, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center neomorph mb-6 animate-slide-in">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.25 11.5L4.75 14L12 18.25L19.25 14L14.75 11.5" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">TaskAI</h1>
      </div>
      <nav>
        <ul className="flex space-x-2 md:space-x-6">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            text="Dashboard" 
            to="/"
            active={currentPath === '/'}
          />
          <NavItem 
            icon={<ListTodo size={20} />} 
            text="Tasks" 
            to="/tasks"
            active={currentPath === '/tasks'} 
          />
          <NavItem 
            icon={<BarChart3 size={20} />} 
            text="Analytics" 
            to="/analytics"
            active={currentPath === '/analytics'} 
          />
          <NavItem 
            icon={<Settings size={20} />} 
            text="Settings" 
            to="/settings"
            active={currentPath === '/settings'} 
          />
        </ul>
      </nav>
    </header>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon, text, to, active }: NavItemProps) => {
  return (
    <li>
      <Link 
        to={to} 
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
          active 
            ? "neomorph-inset text-primary font-medium" 
            : "hover:neomorph-inset"
        )}
      >
        {icon}
        <span className="hidden md:inline">{text}</span>
      </Link>
    </li>
  );
};

export default Header;
