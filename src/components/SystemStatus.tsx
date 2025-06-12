
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';
import errorMonitor from '@/utils/error-monitor';
import aiAgents from '@/utils/ai-agents';

const SystemStatus = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [errorStats, setErrorStats] = useState(errorMonitor.getErrorStats());
  const [agentStatus, setAgentStatus] = useState(aiAgents.getSystemStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorStats(errorMonitor.getErrorStats());
      setAgentStatus(aiAgents.getSystemStatus());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm"
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        System Status
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 bg-background/95 backdrop-blur-sm border shadow-lg z-50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">System Status</CardTitle>
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-xs">
        {/* Error Monitor Status */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Error Monitor</span>
          <div className="flex items-center gap-2">
            {errorStats.total === 0 ? (
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Clean
              </Badge>
            ) : (
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {errorStats.total} issues
              </Badge>
            )}
          </div>
        </div>

        {/* AI Agents Status */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">AI Agents</span>
          <div className="flex items-center gap-2">
            {agentStatus.active ? (
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            ) : (
              <Badge variant="outline" className="text-gray-600 border-gray-600">
                <Clock className="h-3 w-3 mr-1" />
                Idle
              </Badge>
            )}
          </div>
        </div>

        {/* Performance Status */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Performance</span>
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Optimal
          </Badge>
        </div>

        {/* Quick Actions */}
        {errorStats.total > 0 && (
          <div className="pt-2 border-t">
            <Button
              onClick={() => errorMonitor.clearErrors()}
              variant="outline"
              size="sm"
              className="w-full text-xs h-7"
            >
              Clear Error Log
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
