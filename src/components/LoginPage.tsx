import { useState } from 'react';
import { Eye, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

type LoginPageProps = {
  onLogin: () => void;
  onNavigate: (page: 'landing' | 'login' | 'dashboard' | 'analysis' | 'network' | 'settings') => void;
};

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => onNavigate('landing')}
        className="absolute top-6 left-6 text-slate-400 hover:text-cyan-400"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Eye className="w-10 h-10 text-cyan-400" />
            <span className="text-2xl tracking-tight">SatyaNetra</span>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-950">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="analyst@satyanetra.com"
                    className="bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="bg-slate-950 border-slate-700 text-slate-100"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950"
                  disabled={isLoading}
                >
                  {isLoading ? 'Authenticating...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button className="text-cyan-400 hover:underline">
                  Forgot password?
                </button>
              </div>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    className="bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="analyst@satyanetra.com"
                    className="bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    className="bg-slate-950 border-slate-700 text-slate-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    className="bg-slate-950 border-slate-700 text-slate-100"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-slate-500">
            Secure access to threat intelligence platform
          </p>
        </div>
      </div>
    </div>
  );
}
