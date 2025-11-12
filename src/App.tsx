import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { AnalysisPage } from './components/AnalysisPage';
import { NetworkPage } from './components/NetworkPage';
import { SettingsPage } from './components/SettingsPage';

type Page = 'landing' | 'login' | 'dashboard' | 'analysis' | 'network' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'dashboard':
        return <Dashboard onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'analysis':
        return <AnalysisPage onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'network':
        return <NetworkPage onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'settings':
        return <SettingsPage onNavigate={navigateTo} onLogout={handleLogout} />;
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {renderPage()}
    </div>
  );
}
