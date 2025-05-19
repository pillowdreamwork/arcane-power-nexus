import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wand2 } from "lucide-react";

const EchoAssistant: React.FC = () => {
  return (
    <Card className="bg-grimoire-muted">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-grimoire-primary" />
          <CardTitle className="text-sm font-medium">Echo Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="mb-3">
          <p className="text-sm text-grimoire-foreground/70">
            How can I assist with your spiritual practice today?
          </p>
        </div>
        <div className="flex gap-2">
          <Input 
            placeholder="Ask a question..." 
            className="text-sm"
          />
          <Button size="sm" variant="outline">Ask</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EchoAssistant;
