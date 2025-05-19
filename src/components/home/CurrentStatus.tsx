
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const CurrentStatus: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const getMoonPhase = () => {
    // Simple moon phase calculation (this is simplified)
    const phase = Math.floor((currentTime.getDate() / 29.5) * 8) % 8;
    const phases = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", 
                    "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
    return phases[phase];
  };

  return (
    <Card className="w-full md:w-auto bg-grimoire-muted border-grimoire-border grimoire-border animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-grimoire-foreground/70">Current Phase</p>
            <p className="text-grimoire-foreground">{getMoonPhase()}</p>
          </div>
          <div className="ml-8">
            <p className="text-sm text-grimoire-foreground/70">Time</p>
            <p className="text-grimoire-foreground">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentStatus;
