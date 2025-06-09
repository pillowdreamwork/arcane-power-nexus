
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Cpu, 
  Eye, 
  RefreshCw, 
  Settings,
  TrendingUp,
  Zap
} from "lucide-react";
import errorMonitor, { getErrorStats } from "@/utils/error-monitor";
import aiAgents, { type ContentSuggestion, type QualityCheck } from "@/utils/ai-agents";

const SystemStatus: React.FC = () => {
  const [errorStats, setErrorStats] = useState(getErrorStats());
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [qualityChecks, setQualityChecks] = useState<QualityCheck[]>([]);
  const [systemStatus, setSystemStatus] = useState(aiAgents.getSystemStatus());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateStats = () => {
      setErrorStats(getErrorStats());
      setSuggestions(aiAgents.getSuggestions());
      setQualityChecks(aiAgents.getQualityChecks());
      setSystemStatus(aiAgents.getSystemStatus());
    };

    // Update every 10 seconds
    const interval = setInterval(updateStats, 10000);
    updateStats(); // Initial update

    return () => clearInterval(interval);
  }, []);

  const getHealthScore = () => {
    const totalIssues = errorStats.unresolved + qualityChecks.filter(q => q.severity === 'error').length;
    const maxScore = 100;
    const penalty = Math.min(totalIssues * 10, 80);
    return Math.max(maxScore - penalty, 20);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': 
      case 'error': return 'destructive';
      case 'medium':
      case 'warning': return 'default';
      case 'low':
      case 'info': return 'secondary';
      default: return 'outline';
    }
  };

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12"
        size="icon"
      >
        <Activity className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[80vh]">
      <Card className="bg-grimoire-background border-grimoire-border shadow-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-grimoire-foreground flex items-center text-lg">
              <Activity className="h-5 w-5 mr-2 text-grimoire-primary" />
              System Status
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge 
                variant={getHealthScore() > 80 ? 'default' : getHealthScore() > 60 ? 'secondary' : 'destructive'}
                className="text-xs"
              >
                {getHealthScore()}% Health
              </Badge>
              <Button
                onClick={() => setIsVisible(false)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
          </div>
          <CardDescription>Real-time application monitoring</CardDescription>
        </CardHeader>

        <CardContent className="p-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="errors" className="text-xs">Errors</TabsTrigger>
              <TabsTrigger value="suggestions" className="text-xs">AI</TabsTrigger>
              <TabsTrigger value="performance" className="text-xs">Perf</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-grimoire-primary">{errorStats.total}</div>
                  <div className="text-xs text-grimoire-foreground/70">Total Errors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{suggestions.length}</div>
                  <div className="text-xs text-grimoire-foreground/70">AI Suggestions</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>System Health</span>
                  <span>{getHealthScore()}%</span>
                </div>
                <Progress value={getHealthScore()} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    AI Agents
                  </span>
                  <Badge variant={systemStatus.active ? 'default' : 'secondary'}>
                    {systemStatus.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    Error Monitor
                  </span>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="errors">
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {errorStats.recentErrors.length === 0 ? (
                    <div className="text-center py-8 text-grimoire-foreground/50">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                      <p>No recent errors</p>
                    </div>
                  ) : (
                    errorStats.recentErrors.map((error) => (
                      <Card key={error.id} className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-grimoire-foreground truncate">
                              {error.message}
                            </div>
                            <div className="text-xs text-grimoire-foreground/60 flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(error.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                          <Badge variant={getSeverityColor(error.severity)} className="text-xs">
                            {error.severity}
                          </Badge>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
              
              {errorStats.total > 0 && (
                <Button
                  onClick={() => {
                    errorMonitor.clearErrors();
                    setErrorStats(getErrorStats());
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Errors
                </Button>
              )}
            </TabsContent>

            <TabsContent value="suggestions">
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {suggestions.length === 0 ? (
                    <div className="text-center py-8 text-grimoire-foreground/50">
                      <Settings className="h-8 w-8 mx-auto mb-2" />
                      <p>No suggestions yet</p>
                    </div>
                  ) : (
                    suggestions.slice(0, 10).map((suggestion) => (
                      <Card key={suggestion.id} className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Badge variant="outline" className="text-xs mb-2">
                              {suggestion.type}
                            </Badge>
                            <div className="text-sm text-grimoire-foreground">
                              {suggestion.content}
                            </div>
                          </div>
                          <Button
                            onClick={() => {
                              aiAgents.dismissSuggestion(suggestion.id);
                              setSuggestions(aiAgents.getSuggestions());
                            }}
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="performance">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-grimoire-primary">
                      {qualityChecks.length}
                    </div>
                    <div className="text-xs text-grimoire-foreground/70">Quality Issues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-500">
                      {Math.round(performance.now())}ms
                    </div>
                    <div className="text-xs text-grimoire-foreground/70">Uptime</div>
                  </div>
                </div>

                <ScrollArea className="h-40">
                  <div className="space-y-2">
                    {qualityChecks.slice(0, 5).map((check) => (
                      <Card key={check.id} className="p-2">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-xs font-medium">{check.area}</div>
                            <div className="text-xs text-grimoire-foreground/70">{check.issue}</div>
                          </div>
                          <Badge variant={getSeverityColor(check.severity)} className="text-xs">
                            {check.severity}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>

                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Refresh Performance
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemStatus;
