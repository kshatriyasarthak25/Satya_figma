import { useState } from 'react';
import { Navigation } from './Navigation';
import { Upload, FileText, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

type AnalysisPageProps = {
  onNavigate: (page: 'dashboard' | 'analysis' | 'network' | 'settings') => void;
  onLogout: () => void;
};

type AnalysisResult = {
  score: number;
  category: string;
  language: string;
  explanation: string;
  indicators: string[];
  sentiment: string;
  credibility: number;
};

export function AnalysisPage({ onNavigate, onLogout }: AnalysisPageProps) {
  const [textInput, setTextInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!textInput.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        score: 78,
        category: 'Potential Propaganda',
        language: 'English',
        explanation: 'This content exhibits several characteristics of coordinated propaganda: emotionally charged language, unverified claims, appeal to authority without sources, and divisive framing designed to polarize audiences.',
        indicators: [
          'Emotionally manipulative language detected',
          'Lack of credible source attribution',
          'Binary framing of complex issues',
          'Appeal to fear and outrage',
          'Pattern matches known propaganda templates'
        ],
        sentiment: 'Highly Negative',
        credibility: 23
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setAnalysisResult({
          score: 85,
          category: 'Harmful Meme',
          language: 'English',
          explanation: 'This image contains visual propaganda techniques including: stereotyping, scapegoating, and inflammatory imagery designed to spread harmful narratives. Text overlay uses deceptive framing and misleading statistics.',
          indicators: [
            'Dehumanizing imagery detected',
            'Misleading statistics overlaid',
            'Propaganda visual techniques identified',
            'Known harmful meme template',
            'Targets protected groups'
          ],
          sentiment: 'Hostile',
          credibility: 12
        });
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-green-400';
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Navigation currentPage="analysis" onNavigate={onNavigate} onLogout={onLogout} />
      
      <div className="flex-1 overflow-auto">
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="p-6">
            <h1 className="text-slate-100 mb-1">Content Analysis</h1>
            <p className="text-slate-400">Analyze text and images for propaganda, misinformation, and harmful content</p>
          </div>
        </div>

        <div className="p-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-100">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    Text Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste tweet, post, or text content here for analysis..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="min-h-[200px] bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500"
                  />
                  <Button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !textInput.trim()}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-100">
                    <Upload className="w-5 h-5 text-orange-400" />
                    Image/Meme Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-cyan-400/50 transition-colors">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                      <p className="text-slate-400 mb-2">Click to upload or drag and drop</p>
                      <p className="text-slate-500">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div>
              {isAnalyzing ? (
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="py-12">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-slate-400">Analyzing content...</p>
                      <p className="text-slate-500">Running multi-layer detection algorithms</p>
                    </div>
                  </CardContent>
                </Card>
              ) : analysisResult ? (
                <div className="space-y-6">
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-slate-100">Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Threat Score */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-400">Threat Score</span>
                          <span className={`${getScoreColor(analysisResult.score)}`}>
                            {analysisResult.score}/100
                          </span>
                        </div>
                        <Progress value={analysisResult.score} className="h-3" />
                      </div>

                      {/* Category */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Category</span>
                        <Badge className="bg-red-400/10 text-red-400 border-red-400/20">
                          {analysisResult.category}
                        </Badge>
                      </div>

                      {/* Language */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Language Detected</span>
                        <span className="text-cyan-400">{analysisResult.language}</span>
                      </div>

                      {/* Sentiment */}
                      <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Sentiment</span>
                        <span className="text-orange-400">{analysisResult.sentiment}</span>
                      </div>

                      {/* Credibility */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-400">Source Credibility</span>
                          <span className="text-red-400">{analysisResult.credibility}%</span>
                        </div>
                        <Progress value={analysisResult.credibility} className="h-3" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explanation */}
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-slate-100">
                        <AlertCircle className="w-5 h-5 text-orange-400" />
                        Detailed Explanation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-400 leading-relaxed">{analysisResult.explanation}</p>
                    </CardContent>
                  </Card>

                  {/* Indicators */}
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-slate-100">
                        <TrendingUp className="w-5 h-5 text-cyan-400" />
                        Risk Indicators
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {analysisResult.indicators.map((indicator, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                            <span className="text-slate-400">{indicator}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="py-12">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
                        <FileText className="w-8 h-8 text-slate-500" />
                      </div>
                      <p className="text-slate-400">No analysis yet</p>
                      <p className="text-slate-500">Enter text or upload an image to begin analysis</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
