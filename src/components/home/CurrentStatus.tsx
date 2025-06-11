import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const CurrentStatus: React.FC = () => {
  return (
    <Card className="bg-grimoire-muted border border-grimoire-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-4 w-4 text-grimoire-primary" />
          <h3 className="text-sm font-semibold text-grimoire-primary font-inter">Current Status</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-grimoire-foreground/70">Energy</span>
            <span className="text-xs font-medium text-grimoire-primary">High</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-grimoire-foreground/70">Protection</span>
            <span className="text-xs font-medium text-grimoire-primary">Active</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-grimoire-foreground/70">Next Ritual</span>
            <span className="text-xs font-medium text-grimoire-foreground">2h 30m</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentStatus;
