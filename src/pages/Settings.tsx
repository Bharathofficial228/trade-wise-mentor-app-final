
import { useState } from "react";
import { 
  User, 
  Bell, 
  Lock, 
  Palette, 
  Database, 
  AlignLeft, 
  Save,
  Check,
  Shield
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [name, setName] = useState("John Trader");
  const [email, setEmail] = useState("john@example.com");
  
  // Mock save function
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </header>
      
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Data</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Settings */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="america_new_york">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america_new_york">America/New York</SelectItem>
                    <SelectItem value="america_chicago">America/Chicago</SelectItem>
                    <SelectItem value="america_denver">America/Denver</SelectItem>
                    <SelectItem value="america_los_angeles">America/Los Angeles</SelectItem>
                    <SelectItem value="europe_london">Europe/London</SelectItem>
                    <SelectItem value="asia_tokyo">Asia/Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trading Preferences</CardTitle>
              <CardDescription>
                Set your default trading parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default_risk">Default Risk per Trade (%)</Label>
                <Input 
                  id="default_risk" 
                  type="number" 
                  defaultValue="1" 
                  min="0.1"
                  max="10"
                  step="0.1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default_strategy">Default Strategy</Label>
                <Select defaultValue="momentum">
                  <SelectTrigger>
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="momentum">Momentum Breakout</SelectItem>
                    <SelectItem value="support">Support Bounce</SelectItem>
                    <SelectItem value="gap">Gap & Go</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="default_time_frame">Default Time Frame</Label>
                <Select defaultValue="5min">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time frame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1min">1 minute</SelectItem>
                    <SelectItem value="5min">5 minutes</SelectItem>
                    <SelectItem value="15min">15 minutes</SelectItem>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Trade Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="trade_reminders">Trade Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminders to log your trades
                    </p>
                  </div>
                  <Switch id="trade_reminders" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="achievement_alerts">Achievement Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for unlocked achievements
                    </p>
                  </div>
                  <Switch id="achievement_alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="streak_alerts">Streak Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about maintaining or breaking streaks
                    </p>
                  </div>
                  <Switch id="streak_alerts" defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">AI Feedback Settings</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ai_feedback">AI Feedback</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive AI-powered feedback on your trades
                    </p>
                  </div>
                  <Switch id="ai_feedback" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feedback_frequency">Feedback Frequency</Label>
                  <Select defaultValue="after_trade">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="after_trade">After each trade</SelectItem>
                      <SelectItem value="daily">Daily summary</SelectItem>
                      <SelectItem value="weekly">Weekly review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="performance_insights">Performance Insights</Label>
                    <p className="text-sm text-muted-foreground">
                      Get insights about your trading patterns
                    </p>
                  </div>
                  <Switch id="performance_insights" defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Notification Delivery</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email_notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch id="email_notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="browser_notifications">Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Show notifications in your browser
                    </p>
                  </div>
                  <Switch id="browser_notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how Hey Trader looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-3 cursor-pointer relative hover:border-primary active:border-primary">
                    <div className="h-20 bg-white mb-2 rounded border"></div>
                    <p className="text-sm text-center">Light</p>
                    <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                  </div>
                  <div className="border rounded-md p-3 cursor-pointer relative hover:border-primary">
                    <div className="h-20 bg-black mb-2 rounded border"></div>
                    <p className="text-sm text-center">Dark</p>
                  </div>
                  <div className="border rounded-md p-3 cursor-pointer relative hover:border-primary">
                    <div className="h-20 bg-gradient-to-b from-white to-black mb-2 rounded border"></div>
                    <p className="text-sm text-center">System</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Dashboard Layout</Label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="expanded">Expanded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sidebar_collapsed">Sidebar Collapsed by Default</Label>
                  <p className="text-sm text-muted-foreground">
                    Start with the sidebar collapsed for more screen space
                  </p>
                </div>
                <Switch id="sidebar_collapsed" />
              </div>
              
              <div className="space-y-2">
                <Label>Chart Color Scheme</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue placeholder="Select color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default (Green/Red)</SelectItem>
                    <SelectItem value="blue_red">Blue/Red</SelectItem>
                    <SelectItem value="monochrome">Monochrome</SelectItem>
                    <SelectItem value="high_contrast">High Contrast</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                <Save className="mr-2 h-4 w-4" />
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Data Settings */}
        <TabsContent value="data" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage your trading data and export options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Export Options</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-6 flex flex-col">
                    <AlignLeft className="h-8 w-8 mb-2" />
                    <span className="font-medium">Export All Trades</span>
                    <span className="text-xs text-muted-foreground mt-1">CSV format</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-6 flex flex-col">
                    <AlignLeft className="h-8 w-8 mb-2" />
                    <span className="font-medium">Export Playbooks</span>
                    <span className="text-xs text-muted-foreground mt-1">JSON format</span>
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Data Storage</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto_backup">Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically backup your data weekly
                    </p>
                  </div>
                  <Switch id="auto_backup" defaultChecked />
                </div>
                
                <div className="p-4 border rounded-md bg-muted/20">
                  <h4 className="font-medium">Storage Usage</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Trades Data:</span>
                      <span>128 KB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Playbooks:</span>
                      <span>64 KB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Screenshots:</span>
                      <span>2.4 MB</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium pt-2 border-t">
                      <span>Total Used:</span>
                      <span>2.6 MB of 1 GB</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Data Operations</h3>
                
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" className="justify-start text-muted-foreground hover:text-foreground">
                    Import trades from CSV
                  </Button>
                  <Button variant="outline" className="justify-start text-muted-foreground hover:text-foreground">
                    Import playbooks from JSON
                  </Button>
                  <Button variant="outline" className="justify-start text-destructive hover:text-destructive">
                    Delete all trade data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Password</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="current_password">Current Password</Label>
                  <Input id="current_password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input id="new_password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm New Password</Label>
                  <Input id="confirm_password" type="password" />
                </div>
                
                <Button>Update Password</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enable_2fa">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch id="enable_2fa" />
                </div>
                
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Setup 2FA
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Session Management</h3>
                
                <div className="p-4 border rounded-md bg-muted/20">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Current Session</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Chrome on Windows • Started 2 hours ago
                      </p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">Active</Badge>
                  </div>
                </div>
                
                <Button variant="outline" className="text-destructive hover:text-destructive">
                  Sign out from all devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
