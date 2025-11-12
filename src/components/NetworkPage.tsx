import { useState } from 'react';
import { Navigation } from './Navigation';
import { Network, AlertTriangle, Users, Activity, ZoomIn, ZoomOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

type NetworkPageProps = {
  onNavigate: (page: 'dashboard' | 'analysis' | 'network' | 'settings') => void;
  onLogout: () => void;
};

const networkClusters = [
  {
    id: 1,
    name: 'Bot Cluster Alpha',
    nodeCount: 247,
    riskLevel: 'Critical',
    activity: 'Very High',
    behavior: 'Coordinated amplification',
    color: '#ef4444'
  },
  {
    id: 2,
    name: 'Propaganda Network B',
    nodeCount: 156,
    riskLevel: 'High',
    activity: 'High',
    behavior: 'Narrative coordination',
    color: '#fb923c'
  },
  {
    id: 3,
    name: 'Suspicious Group C',
    nodeCount: 89,
    riskLevel: 'Medium',
    activity: 'Moderate',
    behavior: 'Content resharing',
    color: '#fbbf24'
  },
];

const suspiciousAccounts = [
  { id: 1, handle: '@bot_news_247', connections: 156, activity: 'Very High', created: '2 months ago' },
  { id: 2, handle: '@viral_truth_88', connections: 134, activity: 'Very High', created: '1 month ago' },
  { id: 3, handle: '@fact_spreader', connections: 98, activity: 'High', created: '3 weeks ago' },
  { id: 4, handle: '@news_alert_99', connections: 87, activity: 'High', created: '2 weeks ago' },
  { id: 5, handle: '@truth_network', connections: 76, activity: 'Moderate', created: '1 week ago' },
];

export function NetworkPage({ onNavigate, onLogout }: NetworkPageProps) {
  const [selectedCluster, setSelectedCluster] = useState<number | null>(1);

  return (
    <div className="flex h-screen bg-slate-950">
      <Navigation currentPage="network" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 overflow-auto">
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="p-6">
            <h1 className="text-slate-100 mb-1">Bot Network Visualization</h1>
            <p className="text-slate-400">Map and analyze coordinated behavior patterns</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 mb-1">Total Networks</p>
                    <p className="text-slate-100">32</p>
                  </div>
                  <Network className="w-8 h-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 mb-1">Suspicious Nodes</p>
                    <p className="text-slate-100">1,834</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 mb-1">Active Connections</p>
                    <p className="text-slate-100">5,247</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 mb-1">Critical Clusters</p>
                    <p className="text-slate-100">8</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Network Visualization */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100">Network Graph</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-slate-400">
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-400">
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative h-[600px] bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                    {/* SVG Network Visualization */}
                    <svg className="w-full h-full" viewBox="0 0 800 600">
                      {/* Background grid */}
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="800" height="600" fill="url(#grid)" />

                      {/* Connections (edges) */}
                      <g opacity="0.4">
                        <line x1="400" y1="300" x2="250" y2="150" stroke="#06b6d4" strokeWidth="1" />
                        <line x1="400" y1="300" x2="550" y2="150" stroke="#06b6d4" strokeWidth="1" />
                        <line x1="400" y1="300" x2="250" y2="450" stroke="#06b6d4" strokeWidth="1" />
                        <line x1="400" y1="300" x2="550" y2="450" stroke="#06b6d4" strokeWidth="1" />
                        <line x1="400" y1="300" x2="150" y2="300" stroke="#06b6d4" strokeWidth="2" />
                        <line x1="400" y1="300" x2="650" y2="300" stroke="#06b6d4" strokeWidth="2" />
                        
                        {/* Cluster connections */}
                        <line x1="250" y1="150" x2="200" y2="100" stroke="#ef4444" strokeWidth="1" />
                        <line x1="250" y1="150" x2="300" y2="100" stroke="#ef4444" strokeWidth="1" />
                        <line x1="250" y1="150" x2="200" y2="200" stroke="#ef4444" strokeWidth="1" />
                        <line x1="250" y1="150" x2="300" y2="200" stroke="#ef4444" strokeWidth="1" />
                        
                        <line x1="550" y1="150" x2="500" y2="100" stroke="#fb923c" strokeWidth="1" />
                        <line x1="550" y1="150" x2="600" y2="100" stroke="#fb923c" strokeWidth="1" />
                        <line x1="550" y1="150" x2="500" y2="200" stroke="#fb923c" strokeWidth="1" />
                        <line x1="550" y1="150" x2="600" y2="200" stroke="#fb923c" strokeWidth="1" />
                      </g>

                      {/* Nodes */}
                      {/* Central hub */}
                      <g>
                        <circle cx="400" cy="300" r="20" fill="#06b6d4" opacity="0.2" />
                        <circle cx="400" cy="300" r="12" fill="#06b6d4" />
                        <circle cx="400" cy="300" r="8" fill="#0e7490" />
                      </g>

                      {/* Critical cluster (red) */}
                      <g className="cursor-pointer" onClick={() => setSelectedCluster(1)}>
                        <circle cx="250" cy="150" r="16" fill="#ef4444" opacity="0.2" />
                        <circle cx="250" cy="150" r="10" fill="#ef4444" />
                        <circle cx="200" cy="100" r="6" fill="#ef4444" />
                        <circle cx="300" cy="100" r="6" fill="#ef4444" />
                        <circle cx="200" cy="200" r="6" fill="#ef4444" />
                        <circle cx="300" cy="200" r="6" fill="#ef4444" />
                        <circle cx="180" cy="120" r="4" fill="#ef4444" opacity="0.7" />
                        <circle cx="180" cy="180" r="4" fill="#ef4444" opacity="0.7" />
                        <circle cx="320" cy="120" r="4" fill="#ef4444" opacity="0.7" />
                      </g>

                      {/* High risk cluster (orange) */}
                      <g className="cursor-pointer" onClick={() => setSelectedCluster(2)}>
                        <circle cx="550" cy="150" r="14" fill="#fb923c" opacity="0.2" />
                        <circle cx="550" cy="150" r="9" fill="#fb923c" />
                        <circle cx="500" cy="100" r="6" fill="#fb923c" />
                        <circle cx="600" cy="100" r="6" fill="#fb923c" />
                        <circle cx="500" cy="200" r="6" fill="#fb923c" />
                        <circle cx="600" cy="200" r="6" fill="#fb923c" />
                        <circle cx="480" cy="120" r="4" fill="#fb923c" opacity="0.7" />
                      </g>

                      {/* Medium risk cluster (yellow) */}
                      <g className="cursor-pointer" onClick={() => setSelectedCluster(3)}>
                        <circle cx="250" cy="450" r="12" fill="#fbbf24" opacity="0.2" />
                        <circle cx="250" cy="450" r="8" fill="#fbbf24" />
                        <circle cx="200" cy="420" r="5" fill="#fbbf24" />
                        <circle cx="300" cy="420" r="5" fill="#fbbf24" />
                        <circle cx="220" cy="480" r="5" fill="#fbbf24" />
                      </g>

                      {/* Regular nodes */}
                      <circle cx="150" cy="300" r="8" fill="#64748b" />
                      <circle cx="650" cy="300" r="8" fill="#64748b" />
                      <circle cx="550" cy="450" r="8" fill="#64748b" />
                      <circle cx="100" cy="250" r="5" fill="#64748b" opacity="0.7" />
                      <circle cx="700" cy="250" r="5" fill="#64748b" opacity="0.7" />
                    </svg>

                    {/* Legend */}
                    <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <span className="text-slate-400">Critical</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-400" />
                        <span className="text-slate-400">High Risk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <span className="text-slate-400">Medium Risk</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-500" />
                        <span className="text-slate-400">Normal</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cluster Details */}
            <div className="space-y-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-100">Detected Clusters</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {networkClusters.map((cluster) => (
                        <div
                          key={cluster.id}
                          onClick={() => setSelectedCluster(cluster.id)}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedCluster === cluster.id
                              ? 'bg-slate-950 border-cyan-400/50'
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: cluster.color }}
                            />
                            <span className="text-slate-300">{cluster.name}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">Nodes:</span>
                              <span className="text-slate-400">{cluster.nodeCount}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-500">Risk:</span>
                              <Badge
                                className={
                                  cluster.riskLevel === 'Critical'
                                    ? 'bg-red-400/10 text-red-400 border-red-400/20'
                                    : cluster.riskLevel === 'High'
                                    ? 'bg-orange-400/10 text-orange-400 border-orange-400/20'
                                    : 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
                                }
                              >
                                {cluster.riskLevel}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-slate-100">Suspicious Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[250px]">
                    <div className="space-y-3">
                      {suspiciousAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-orange-400/30 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300">{account.handle}</span>
                            <Badge variant="outline" className="border-slate-700 text-slate-500">
                              {account.activity}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-slate-500">
                            <span>{account.connections} connections</span>
                            <span>{account.created}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
