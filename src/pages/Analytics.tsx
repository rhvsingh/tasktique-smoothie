
import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Calendar, Calendar as CalendarIcon, BarChart3, PieChart as PieChartIcon, TrendingUp, Check, Clock, Award } from 'lucide-react';

// Sample data for charts
const weeklyData = [
  { day: 'Mon', tasks: 12, completed: 8 },
  { day: 'Tue', tasks: 19, completed: 14 },
  { day: 'Wed', tasks: 16, completed: 10 },
  { day: 'Thu', tasks: 22, completed: 18 },
  { day: 'Fri', tasks: 18, completed: 12 },
  { day: 'Sat', tasks: 10, completed: 8 },
  { day: 'Sun', tasks: 7, completed: 5 },
];

const monthlyData = [
  { month: 'Jan', tasks: 85, completed: 62 },
  { month: 'Feb', tasks: 92, completed: 74 },
  { month: 'Mar', tasks: 78, completed: 59 },
  { month: 'Apr', tasks: 102, completed: 88 },
  { month: 'May', tasks: 94, completed: 81 },
  { month: 'Jun', tasks: 88, completed: 70 },
];

const categoryData = [
  { name: 'Work', value: 45, color: '#674cd7' },
  { name: 'Personal', value: 25, color: '#0ea5e9' },
  { name: 'Study', value: 15, color: '#f97316' },
  { name: 'Health', value: 10, color: '#10b981' },
  { name: 'Other', value: 5, color: '#8b5cf6' },
];

const priorityData = [
  { name: 'High', value: 30, color: '#ef4444' },
  { name: 'Medium', value: 45, color: '#f59e0b' },
  { name: 'Low', value: 25, color: '#10b981' },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = React.useState('weekly');
  
  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div className="neomorph p-6 mb-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-bold">Analytics Dashboard</h2>
            <div className="flex items-center">
              <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
                <ToggleGroupItem value="weekly" className="neomorph-btn">
                  <Calendar size={16} className="mr-2" />
                  Weekly
                </ToggleGroupItem>
                <ToggleGroupItem value="monthly" className="neomorph-btn">
                  <Calendar size={16} className="mr-2" />
                  Monthly
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Completed Tasks"
              value="42"
              change="+12%"
              positive={true}
              icon={<Check className="text-low" />}
            />
            <StatCard
              title="Average Time"
              value="1h 45m"
              change="-20m"
              positive={true}
              icon={<Clock className="text-medium" />}
            />
            <StatCard
              title="Productivity Score"
              value="92"
              change="+5"
              positive={true}
              icon={<Award className="text-primary" />}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="neomorph">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Task Completion</CardTitle>
                <CardDescription>Track your tasks vs. completions over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={timeRange === 'weekly' ? weeklyData : monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis 
                        dataKey={timeRange === 'weekly' ? 'day' : 'month'} 
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
                      <Legend verticalAlign="top" height={36} />
                      <Bar name="Total Tasks" dataKey="tasks" fill="#674cd7" radius={[4, 4, 0, 0]} />
                      <Bar name="Completed" dataKey="completed" fill="#a3bffa" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="neomorph">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Productivity Trend</CardTitle>
                <CardDescription>Your productivity score over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timeRange === 'weekly' ? weeklyData : monthlyData}
                    >
                      <XAxis 
                        dataKey={timeRange === 'weekly' ? 'day' : 'month'} 
                        axisLine={false} 
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '4px 4px 10px #e6e7f0, -4px -4px 10px #ffffff',
                          padding: '8px 12px'
                        }}
                        formatter={(value) => [`${value}%`, 'Productivity']}
                      />
                      <Line 
                        name="Productivity" 
                        type="monotone" 
                        dataKey={(data) => Math.round((data.completed / data.tasks) * 100)}
                        stroke="#674cd7" 
                        strokeWidth={3}
                        dot={{ fill: '#674cd7', r: 4 }}
                        activeDot={{ fill: '#674cd7', r: 6, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="neomorph">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Tasks by Category</CardTitle>
                <CardDescription>Distribution of tasks across categories</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '4px 4px 10px #e6e7f0, -4px -4px 10px #ffffff',
                          padding: '8px 12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="neomorph">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Tasks by Priority</CardTitle>
                <CardDescription>Distribution of tasks by priority level</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priorityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none',
                          borderRadius: '12px',
                          boxShadow: '4px 4px 10px #e6e7f0, -4px -4px 10px #ffffff',
                          padding: '8px 12px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, positive, icon }: StatCardProps) => {
  return (
    <Card className="neomorph">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center neomorph mr-4">
            {icon}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <div className="flex items-baseline">
              <span className="text-2xl font-semibold">{value}</span>
              <span className={`ml-2 text-xs ${positive ? 'text-low' : 'text-destructive'}`}>
                {change}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Analytics;
