
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { User, Moon, Bell, Palette, Zap, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SettingsState {
  notifications: {
    taskReminders: boolean;
    weeklySummary: boolean;
    productivityTips: boolean;
    taskCompletions: boolean;
  };
  appearance: {
    darkMode: boolean;
    animationSpeed: number;
    interfaceDensity: number;
    showProgressBars: boolean;
  };
  ai: {
    taskAnalysis: boolean;
    smartScheduling: boolean;
    productivityInsights: boolean;
    assistanceLevel: number;
  };
  account: {
    twoFactorAuth: boolean;
    emailNotifications: boolean;
  };
}

// Load settings from localStorage
const loadSettings = (): SettingsState => {
  try {
    const savedPreferences = localStorage.getItem('userPreferences');
    const savedSettings = localStorage.getItem('userSettings');
    
    const preferences = savedPreferences ? JSON.parse(savedPreferences) : {
      darkMode: false,
      animationSpeed: 50,
      interfaceDensity: 30,
      showProgressBars: true
    };
    
    const settings = savedSettings ? JSON.parse(savedSettings) : {
      notifications: {
        taskReminders: true,
        weeklySummary: true,
        productivityTips: false,
        taskCompletions: true,
      },
      ai: {
        taskAnalysis: true,
        smartScheduling: true,
        productivityInsights: true,
        assistanceLevel: 60,
      },
      account: {
        twoFactorAuth: false,
        emailNotifications: true,
      }
    };
    
    return {
      notifications: settings.notifications,
      appearance: preferences,
      ai: settings.ai,
      account: settings.account
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      notifications: {
        taskReminders: true,
        weeklySummary: true,
        productivityTips: false,
        taskCompletions: true,
      },
      appearance: {
        darkMode: false,
        animationSpeed: 50,
        interfaceDensity: 30,
        showProgressBars: true,
      },
      ai: {
        taskAnalysis: true,
        smartScheduling: true,
        productivityInsights: true,
        assistanceLevel: 60,
      },
      account: {
        twoFactorAuth: false,
        emailNotifications: true,
      },
    };
  }
};

const Settings = () => {
  const [settings, setSettings] = useState<SettingsState>(loadSettings());

  // Apply dark mode on component mount and when changed
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.appearance.darkMode);
  }, [settings.appearance.darkMode]);

  // Animation speed label mapping
  const getAnimationSpeedLabel = (value: number) => {
    if (value <= 25) return 'Slow';
    if (value <= 50) return 'Normal';
    if (value <= 75) return 'Fast';
    return 'Very Fast';
  };

  // Interface density label mapping
  const getInterfaceDensityLabel = (value: number) => {
    if (value <= 25) return 'Compact';
    if (value <= 50) return 'Comfortable';
    if (value <= 75) return 'Spacious';
    return 'Very Spacious';
  };

  // AI assistance level label mapping
  const getAIAssistanceLevelLabel = (value: number) => {
    if (value <= 25) return 'Minimal';
    if (value <= 50) return 'Moderate';
    if (value <= 75) return 'Balanced';
    return 'Proactive';
  };

  const handleSwitchChange = (category: keyof SettingsState, setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSliderChange = (category: keyof SettingsState, setting: string, value: number[]) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value[0]
      }
    }));
  };

  const handleSave = () => {
    // Save preferences (used by other components)
    localStorage.setItem('userPreferences', JSON.stringify(settings.appearance));
    
    // Save other settings
    localStorage.setItem('userSettings', JSON.stringify({
      notifications: settings.notifications,
      ai: settings.ai,
      account: settings.account
    }));
    
    // Apply dark mode immediately
    document.documentElement.classList.toggle('dark', settings.appearance.darkMode);
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  // Add smooth loading animation
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen bg-background py-8 px-4 md:px-8 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
                  control={
                    <Switch 
                      checked={settings.notifications.taskReminders}
                      onCheckedChange={(value) => handleSwitchChange('notifications', 'taskReminders', value)}
                    />
                  }
                />
                <SettingItem
                  title="Weekly Summary"
                  description="Get a weekly email with your productivity stats"
                  control={
                    <Switch 
                      checked={settings.notifications.weeklySummary}
                      onCheckedChange={(value) => handleSwitchChange('notifications', 'weeklySummary', value)}
                    />
                  }
                />
                <SettingItem
                  title="Productivity Tips"
                  description="Receive AI-powered productivity tips"
                  control={
                    <Switch 
                      checked={settings.notifications.productivityTips}
                      onCheckedChange={(value) => handleSwitchChange('notifications', 'productivityTips', value)}
                    />
                  }
                />
                <SettingItem
                  title="Task Completions"
                  description="Notify when a team member completes a task"
                  control={
                    <Switch 
                      checked={settings.notifications.taskCompletions}
                      onCheckedChange={(value) => handleSwitchChange('notifications', 'taskCompletions', value)}
                    />
                  }
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
                  control={
                    <Switch 
                      checked={settings.appearance.darkMode}
                      onCheckedChange={(value) => handleSwitchChange('appearance', 'darkMode', value)}
                    />
                  }
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Animation Speed</h4>
                      <p className="text-xs text-muted-foreground">Control the speed of UI animations</p>
                    </div>
                    <span className="text-xs font-medium">{getAnimationSpeedLabel(settings.appearance.animationSpeed)}</span>
                  </div>
                  <Slider 
                    min={0}
                    max={100} 
                    step={10} 
                    value={[settings.appearance.animationSpeed]}
                    onValueChange={(value) => handleSliderChange('appearance', 'animationSpeed', value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Interface Density</h4>
                      <p className="text-xs text-muted-foreground">Adjust the compactness of the interface</p>
                    </div>
                    <span className="text-xs font-medium">{getInterfaceDensityLabel(settings.appearance.interfaceDensity)}</span>
                  </div>
                  <Slider 
                    min={0}
                    max={100} 
                    step={10} 
                    value={[settings.appearance.interfaceDensity]}
                    onValueChange={(value) => handleSliderChange('appearance', 'interfaceDensity', value)}
                  />
                </div>
                <SettingItem
                  title="Show Task Progress Bars"
                  description="Display progress indicators for each task"
                  control={
                    <Switch 
                      checked={settings.appearance.showProgressBars}
                      onCheckedChange={(value) => handleSwitchChange('appearance', 'showProgressBars', value)}
                    />
                  }
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
                  control={
                    <Switch 
                      checked={settings.ai.taskAnalysis}
                      onCheckedChange={(value) => handleSwitchChange('ai', 'taskAnalysis', value)}
                    />
                  }
                />
                <SettingItem
                  title="Smart Scheduling"
                  description="Let AI optimize your daily schedule"
                  control={
                    <Switch 
                      checked={settings.ai.smartScheduling}
                      onCheckedChange={(value) => handleSwitchChange('ai', 'smartScheduling', value)}
                    />
                  }
                />
                <SettingItem
                  title="Productivity Insights"
                  description="Generate personalized productivity insights"
                  control={
                    <Switch 
                      checked={settings.ai.productivityInsights}
                      onCheckedChange={(value) => handleSwitchChange('ai', 'productivityInsights', value)}
                    />
                  }
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">AI Assistance Level</h4>
                      <p className="text-xs text-muted-foreground">How proactive should the AI be?</p>
                    </div>
                    <span className="text-xs font-medium">{getAIAssistanceLevelLabel(settings.ai.assistanceLevel)}</span>
                  </div>
                  <Slider 
                    min={0}
                    max={100} 
                    step={10} 
                    value={[settings.ai.assistanceLevel]}
                    onValueChange={(value) => handleSliderChange('ai', 'assistanceLevel', value)}
                  />
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
                  control={
                    <Switch 
                      checked={settings.account.twoFactorAuth}
                      onCheckedChange={(value) => handleSwitchChange('account', 'twoFactorAuth', value)}
                    />
                  }
                />
                <SettingItem
                  title="Email Notifications"
                  description="Receive updates and notifications via email"
                  control={
                    <Switch 
                      checked={settings.account.emailNotifications}
                      onCheckedChange={(value) => handleSwitchChange('account', 'emailNotifications', value)}
                    />
                  }
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
