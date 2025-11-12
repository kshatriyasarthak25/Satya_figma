import { Navigation } from './Navigation';
import { User, Bell, Shield, Database, Key, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';

type SettingsPageProps = {
  onNavigate: (page: 'dashboard' | 'analysis' | 'network' | 'settings') => void;
  onLogout: () => void;
};

export function SettingsPage({ onNavigate, onLogout }: SettingsPageProps) {
  return (
    <div className="flex h-screen bg-slate-950">
      <Navigation currentPage="settings" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 overflow-auto">
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="p-6">
            <h1 className="text-slate-100 mb-1">Settings</h1>
            <p className="text-slate-400">Manage your account and preferences</p>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* Profile Settings */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <User className="w-5 h-5 text-cyan-400" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Update your account profile and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 bg-slate-800 border-2 border-slate-700">
                  <AvatarFallback className="bg-cyan-500 text-slate-950">AN</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                    Change Avatar
                  </Button>
                  <p className="text-slate-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <Separator className="bg-slate-800" />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-slate-400">First Name</Label>
                  <Input
                    id="first-name"
                    defaultValue="Analyst"
                    className="bg-slate-950 border-slate-700 text-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-slate-400">Last Name</Label>
                  <Input
                    id="last-name"
                    defaultValue="User"
                    className="bg-slate-950 border-slate-700 text-slate-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-400">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="analyst@satyanetra.com"
                  className="bg-slate-950 border-slate-700 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization" className="text-slate-400">Organization</Label>
                <Input
                  id="organization"
                  defaultValue="SatyaNetra Research Team"
                  className="bg-slate-950 border-slate-700 text-slate-100"
                />
              </div>

              <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <Bell className="w-5 h-5 text-orange-400" />
                Notifications
              </CardTitle>
              <CardDescription className="text-slate-400">
                Configure how you receive alerts and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-300">Critical Threat Alerts</p>
                  <p className="text-slate-500">Receive immediate alerts for critical threats</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator className="bg-slate-800" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-300">Bot Network Detection</p>
                  <p className="text-slate-500">Notify when new bot networks are identified</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator className="bg-slate-800" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-300">Daily Summary Report</p>
                  <p className="text-slate-500">Receive daily analysis summaries via email</p>
                </div>
                <Switch />
              </div>

              <Separator className="bg-slate-800" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-300">Propaganda Campaign Alerts</p>
                  <p className="text-slate-500">Alert when coordinated propaganda is detected</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <Shield className="w-5 h-5 text-green-400" />
                Security
              </CardTitle>
              <CardDescription className="text-slate-400">
                Manage your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-slate-400">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  className="bg-slate-950 border-slate-700 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-slate-400">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  className="bg-slate-950 border-slate-700 text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-slate-400">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="bg-slate-950 border-slate-700 text-slate-100"
                />
              </div>

              <Separator className="bg-slate-800" />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-300">Two-Factor Authentication</p>
                  <p className="text-slate-500">Add an extra layer of security</p>
                </div>
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  Enable
                </Button>
              </div>

              <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950">
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* API Settings */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <Key className="w-5 h-5 text-cyan-400" />
                API Access
              </CardTitle>
              <CardDescription className="text-slate-400">
                Manage API keys for programmatic access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-300">Production API Key</span>
                  <Badge className="bg-green-400/10 text-green-400 border-green-400/20">Active</Badge>
                </div>
                <code className="text-slate-500 break-all">sk_live_••••••••••••••••••••••••••••</code>
              </div>

              <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                Generate New API Key
              </Button>
            </CardContent>
          </Card>

          {/* Data & Privacy */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-100">
                <Database className="w-5 h-5 text-purple-400" />
                Data & Privacy
              </CardTitle>
              <CardDescription className="text-slate-400">
                Control your data and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                Export Your Data
              </Button>
              
              <Button variant="outline" className="w-full border-red-400/50 text-red-400 hover:bg-red-400/10">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
