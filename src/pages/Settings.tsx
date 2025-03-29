
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { BellRing, User, Moon, Bell, Globe, Shield, Zap, Palette } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div className="neomorph p-6 mb-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-xl font-bold">Settings</h2>
              <p className="text-muted-foreground">Manage your preferences and account settings</p>
            </div>
            <Button 
              className="neomorph-primary mt-4 md:mt-0" 
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="neomorph">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Bell className="text-primary" size={18} />
                  <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
                </div>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <SettingItem
                  title="Task Reminders"
                  description="Receive notifications for upcoming tasks"
                  control={<Switch defaultChecked />}
                />
                <SettingItem
                  title="Weekly Summary"
                  description="Get a weekly email with your productivity stats"
                  control={<Switch defaultChecked />}
                />
                <SettingItem
                  title="Productivity Tips"
                  description="Receive AI-powered productivity tips"
                  control={<Switch />}
                />
                <SettingItem
                  title="Task Completions"
                  description="Notify when a team member completes a task"
                  control={<Switch defaultChecked />}
                />
              </CardContent>
            </Card>
            
            <Card className="neomorph">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Palette className="text-primary" size={18} />
                  <CardTitle className="text-lg font-semibold">Appearance</CardTitle>
                </div>
                <CardDescription>Customize the look and feel of your interface</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <SettingItem
                  title="Dark Mode"
                  description="Enable dark mode for low-light environments"
                  control={<Switch />}
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Animation Speed</h4>
                      <p className="text-xs text-muted-foreground">Control the speed of UI animations</p>
                    </div>
                    <span className="text-xs font-medium">Normal</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={10} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Interface Density</h4>
                      <p className="text-xs text-muted-foreground">Adjust the compactness of the interface</p>
                    </div>
                    <span className="text-xs font-medium">Comfortable</span>
                  </div>
                  <Slider defaultValue={[30]} max={100} step={10} />
                </div>
                <SettingItem
                  title="Show Task Progress Bars"
                  description="Display progress indicators for each task"
                  control={<Switch defaultChecked />}
                />
              </CardContent>
            </Card>
            
            <Card className="neomorph">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Zap className="text-primary" size={18} />
                  <CardTitle className="text-lg font-semibold">AI Features</CardTitle>
                </div>
                <CardDescription>Configure AI-powered assistant settings</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <SettingItem
                  title="Task Analysis"
                  description="Allow AI to analyze and suggest task priorities"
                  control={<Switch defaultChecked />}
                />
                <SettingItem
                  title="Smart Scheduling"
                  description="Let AI optimize your daily schedule"
                  control={<Switch defaultChecked />}
                />
                <SettingItem
                  title="Productivity Insights"
                  description="Generate personalized productivity insights"
                  control={<Switch defaultChecked />}
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">AI Assistance Level</h4>
                      <p className="text-xs text-muted-foreground">How proactive should the AI be?</p>
                    </div>
                    <span className="text-xs font-medium">Balanced</span>
                  </div>
                  <Slider defaultValue={[60]} max={100} step={10} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="neomorph">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <User className="text-primary" size={18} />
                  <CardTitle className="text-lg font-semibold">Account</CardTitle>
                </div>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex items-center gap-4 pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium">Alex Johnson</h4>
                    <p className="text-xs text-muted-foreground">alex.johnson@example.com</p>
                  </div>
                </div>
                <SettingItem
                  title="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                  control={<Switch />}
                />
                <SettingItem
                  title="Email Notifications"
                  description="Receive updates and notifications via email"
                  control={<Switch defaultChecked />}
                />
                <div className="pt-2 flex gap-2">
                  <Button variant="outline" className="neomorph-btn flex-1">
                    Change Password
                  </Button>
                  <Button variant="outline" className="neomorph-btn flex-1 text-destructive">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SettingItemProps {
  title: string;
  description: string;
  control: React.ReactNode;
}

const SettingItem = ({ title, description, control }: SettingItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      {control}
    </div>
  );
};

export default Settings;
