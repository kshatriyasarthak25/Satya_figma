import { Eye, LayoutDashboard, ScanSearch, Network, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';

type NavigationProps = {
  currentPage: 'dashboard' | 'analysis' | 'network' | 'settings';
  onNavigate: (page: 'dashboard' | 'analysis' | 'network' | 'settings') => void;
  onLogout: () => void;
};

export function Navigation({ currentPage, onNavigate, onLogout }: NavigationProps) {
  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analysis' as const, label: 'Analysis', icon: ScanSearch },
    { id: 'network' as const, label: 'Network Map', icon: Network },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Eye className="w-8 h-8 text-cyan-400" />
          <span className="text-xl tracking-tight text-slate-100">SatyaNetra</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-400/10"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}
