
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, CheckSquare } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', tasks: 12 },
  { day: 'Tue', tasks: 19 },
  { day: 'Wed', tasks: 16 },
  { day: 'Thu', tasks: 22 },
  { day: 'Fri', tasks: 18 },
  { day: 'Sat', tasks: 10 },
  { day: 'Sun', tasks: 7 },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="md:col-span-2 neomorph p-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-lg font-medium mb-4">Weekly Overview</h2>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '4px 4px 10px #e6e7f0, -4px -4px 10px #ffffff',
                  padding: '8px 12px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="tasks" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                activeDot={{ fill: 'hsl(var(--primary))', r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-6">
        <div className="neomorph p-6 animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-lg font-medium mb-4">AI Insights</h2>
          <div className="space-y-4">
            <InsightCard 
              icon={<TrendingUp className="text-primary" />}
              title="Productivity Score"
              value="85%"
              change="+5%"
              positive={true}
            />
            <InsightCard 
              icon={<Clock className="text-medium" />}
              title="Time Saved"
              value="4.5h"
              change="+1.2h"
              positive={true}
            />
            <InsightCard 
              icon={<CheckSquare className="text-low" />}
              title="Task Completion"
              value="92%"
              change="+8%"
              positive={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

const InsightCard = ({ icon, title, value, change, positive }: InsightCardProps) => {
  return (
    <div className="flex items-center p-3 rounded-lg hover:bg-secondary/50 transition-colors">
      <div className="w-10 h-10 rounded-full flex items-center justify-center neomorph mr-3">
        {icon}
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-baseline">
          <span className="text-lg font-semibold">{value}</span>
          <span className={`ml-2 text-xs ${positive ? 'text-low' : 'text-destructive'}`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
