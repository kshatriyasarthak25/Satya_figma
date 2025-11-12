import { useState } from 'react';
import { Navigation } from './Navigation';
import { Bell, TrendingUp, AlertTriangle, Users, Activity } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type DashboardProps = {
  onNavigate: (page: 'dashboard' | 'analysis' | 'network' | 'settings') => void;
  onLogout: () => void;
};

const threatData = [
  { time: '00:00', threats: 12, bot_activity: 8 },
  { time: '04:00', threats: 19, bot_activity: 15 },
  { time: '08:00', threats: 32, bot_activity: 28 },
  { time: '12:00', threats: 45, bot_activity: 38 },
  { time: '16:00', threats: 38, bot_activity: 32 },
  { time: '20:00', threats: 28, bot_activity: 22 },
  { time: '23:59', threats: 15, bot_activity: 12 },
];

const analyzedPosts = [
  {
    id: 1,
    author: '@suspicious_news_247',
    text: 'BREAKING: Unverified claims about political figure spreading rapidly...',
    riskScore: 87,
    category: 'Propaganda',
    timestamp: '2 min ago',
    language: 'English',
  },
  {
    id: 2,
    author: '@viral_meme_bot',
    text: 'Inflammatory meme targeting specific community detected in coordinated campaign...',
    riskScore: 92,
    category: 'Harmful Content',
    timestamp: '5 min ago',
    language: 'English',
  },
  {
    id: 3,
    author: '@fake_health_tips',
    text: 'False medical information being shared by network of automated accounts...',
    riskScore: 78,
    category: 'Misinformation',
    timestamp: '12 min ago',
    language: 'English',
  },
  {
    id: 4,
    author: '@bot_network_451',
    text: 'Coordinated amplification of divisive content detected across 45 accounts...',
    riskScore: 95,
    category: 'Bot Network',
    timestamp: '18 min ago',
    language: 'English',
  },
  {
    id: 5,
    author: '@misleading_stats',
    text: 'Manipulated statistics shared without source verification...',
    riskScore: 65,
    category: 'Misinformation',
    timestamp: '25 min ago',
    language: 'English',
  },
];

const alerts = [
  { id: 1, title: 'Bot network surge detected', severity: 'high', time: '5 min ago' },
  { id: 2, title: 'New propaganda campaign identified', severity: 'critical', time: '12 min ago' },
  { id: 3, title: 'Coordinated hashtag manipulation', severity: 'medium', time: '34 min ago' },
  { id: 4, title: 'Harmful meme trend emerging', severity: 'high', time: '1 hour ago' },
];

export function Dashboard({ onNavigate, onLogout }: DashboardProps) {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (score >= 60) return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Navigation currentPage="dashboard" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="p-6 flex items-center justify-between">
            <div>
              <h1 className="text-slate-100 mb-1">Threat Intelligence Dashboard</h1>
              <p className="text-slate-400">Real-time monitoring and analysis</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-400/10 border border-green-400/20">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-green-400">System Active</span>
              </div>
              <button className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-slate-400">Active Threats</span>
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-100">247</div>
                <p className="text-red-400">↑ 12% from yesterday</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-slate-400">Bot Accounts</span>
                  <Users className="w-5 h-5 text-orange-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-100">1,834</div>
                <p className="text-orange-400">↑ 8% from yesterday</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-slate-400">Analyzed Posts</span>
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-100">45.2K</div>
                <p className="text-cyan-400">↑ 24% from yesterday</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-slate-400">Networks Found</span>
                  <Activity className="w-5 h-5 text-green-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-slate-100">32</div>
                <p className="text-green-400">↑ 5% from yesterday</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Real-time Feed */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-100">Threat Activity (24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={threatData}>
                      <defs>
                        <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="botGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="time" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          border: '1px solid #1e293b',
                          borderRadius: '8px',
                          color: '#e2e8f0'
                        }} 
                      />
                      <Area type="monotone" dataKey="threats" stroke="#06b6d4" fill="url(#threatGradient)" />
                      <Area type="monotone" dataKey="bot_activity" stroke="#fb923c" fill="url(#botGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-100">Analyzed Posts Feed</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {analyzedPosts.map((post) => (
                        <div
                          key={post.id}
                          className="p-4 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-400/30 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                {post.author[1]}
                              </div>
                              <span className="text-slate-300">{post.author}</span>
                            </div>
                            <span className="text-slate-500">{post.timestamp}</span>
                          </div>
                          <p className="text-slate-400 mb-3">{post.text}</p>
                          <div className="flex items-center gap-3">
                            <div className={`px-3 py-1 rounded-full border ${getRiskColor(post.riskScore)}`}>
                              Risk: {post.riskScore}%
                            </div>
                            <Badge variant="outline" className="border-slate-700 text-slate-400">
                              {post.category}
                            </Badge>
                            <Badge variant="outline" className="border-slate-700 text-slate-400">
                              {post.language}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Alerts Panel */}
            <div className="space-y-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-100">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Active Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-orange-400/30 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${getSeverityColor(alert.severity)}`} />
                          <div className="flex-1">
                            <p className="text-slate-300 mb-1">{alert.title}</p>
                            <p className="text-slate-500">{alert.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-100">Network Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400">Detected Networks</span>
                        <span className="text-cyan-400">32</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: '75%' }} />
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400">Suspicious Nodes</span>
                        <span className="text-orange-400">1,834</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: '60%' }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
