import { Eye, Shield, Network, AlertTriangle, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

type LandingPageProps = {
  onNavigate: (page: 'landing' | 'login' | 'dashboard' | 'analysis' | 'network' | 'settings') => void;
};

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        
        {/* Navbar */}
        <nav className="relative border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-8 h-8 text-cyan-400" />
              <span className="text-xl tracking-tight">SatyaNetra</span>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('login')}
              className="text-slate-300 hover:text-cyan-400"
            >
              Sign In
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative mx-auto max-w-7xl px-6 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400">Advanced Threat Detection Platform</span>
            </div>
            
            <h1 className="mb-6 text-slate-100">
              <span className="block mb-2">SatyaNetra</span>
              <span className="block text-cyan-400">The Eye of Truth</span>
            </h1>
            
            <p className="mb-12 text-slate-400 max-w-2xl mx-auto">
              Detect coordinated propaganda, harmful memes, bot networks, and misinformation spreading patterns with advanced AI-powered analysis and real-time monitoring.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button 
                onClick={() => onNavigate('login')}
                className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-8"
              >
                Launch Dashboard
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Learn How It Works
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="border-t border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-slate-100">Our Mission</h2>
            <p className="text-slate-400 max-w-3xl mx-auto">
              To safeguard digital discourse by identifying and exposing coordinated manipulation campaigns, 
              protecting communities from harmful misinformation, and promoting truth in the information ecosystem.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="mb-2 text-slate-100">Propaganda Detection</h3>
              <p className="text-slate-400">
                Identify coordinated propaganda campaigns and manipulation tactics in real-time.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-orange-400/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-orange-400/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="mb-2 text-slate-100">Harmful Content Analysis</h3>
              <p className="text-slate-400">
                Analyze memes and text for harmful narratives, hate speech, and misinformation.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-cyan-400/10 flex items-center justify-center mb-4">
                <Network className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="mb-2 text-slate-100">Bot Network Mapping</h3>
              <p className="text-slate-400">
                Visualize and track bot networks and their coordinated behavior patterns.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 hover:border-orange-400/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-orange-400/10 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="mb-2 text-slate-100">Pattern Recognition</h3>
              <p className="text-slate-400">
                Detect emerging misinformation trends before they spread widely.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-cyan-400" />
              <span className="text-slate-400">SatyaNetra © 2025</span>
            </div>
            <p className="text-slate-500">Protecting truth in the digital age</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
