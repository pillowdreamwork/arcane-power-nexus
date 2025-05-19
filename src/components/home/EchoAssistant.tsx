
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 as Wand } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EchoAssistant: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="bg-grimoire-muted border-grimoire-border grimoire-border animate-fade-in">
      <CardHeader>
        <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
          <div className="flex items-center">
            <Wand className="h-5 w-5 mr-2 text-grimoire-primary grimoire-glow" />
            Echo Assistant
          </div>
        </CardTitle>
        <CardDescription className="text-grimoire-foreground/70">
          Your spiritual guidance companion
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="bg-grimoire-background p-4 rounded-md border border-grimoire-border">
          <p className="text-grimoire-foreground/90 italic">
            "I sense your energy seeking deeper truths. The veil between worlds is thin tonight. 
            How shall we harness these currents for your ascension path?"
          </p>
          <div className="flex justify-end mt-2">
            <Button 
              variant="ghost" 
              className="text-grimoire-primary hover:text-grimoire-primary/80"
              onClick={() => navigate('/echo')}
            >
              Ask Echo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EchoAssistant;
