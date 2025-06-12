
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause, RotateCcw, Zap, Timer, Volume2 } from "lucide-react";

interface RitualControllerProps {
  ritualType: string;
  energyLevel: number;
  onEnergyChange: (value: number) => void;
}

const RitualController: React.FC<RitualControllerProps> = ({
  ritualType,
  energyLevel,
  onEnergyChange,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(0);
  const [intensity, setIntensity] = useState([50]);
  const [ambientSound, setAmbientSound] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
        
        // Gradually increase energy based on intensity
        const energyIncrease = (intensity[0] / 100) * 2;
        onEnergyChange(Math.min(energyLevel + energyIncrease, 100));
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, intensity, energyLevel, onEnergyChange]);

  const toggleRitual = () => {
    setIsActive(!isActive);
    
    if (!isActive) {
      toast({
        title: "Ritual Started",
        description: `${ritualType} ritual is now active`,
      });
    } else {
      toast({
        title: "Ritual Paused",
        description: "Energy work suspended",
      });
    }
  };

  const resetRitual = () => {
    setIsActive(false);
    setDuration(0);
    onEnergyChange(20);
    
    toast({
      title: "Ritual Reset",
      description: "All parameters returned to baseline",
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getRitualPhase = () => {
    if (energyLevel < 30) return "Preparation";
    if (energyLevel < 60) return "Building";
    if (energyLevel < 90) return "Peak";
    return "Transcendence";
  };

  return (
    <Card className="bg-grimoire-muted border border-grimoire-border">
      <CardHeader>
        <CardTitle className="text-grimoire-foreground font-semibold font-inter flex items-center">
          <Zap className="h-5 w-5 mr-2 text-grimoire-primary" />
          Ritual Controller
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-grimoire-primary font-inter">{formatTime(duration)}</div>
            <div className="text-sm text-grimoire-foreground/70 font-inter">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-grimoire-primary font-inter">{getRitualPhase()}</div>
            <div className="text-sm text-grimoire-foreground/70 font-inter">Phase</div>
          </div>
        </div>

        {/* Energy Level */}
        <div>
          <div className="flex justify-between text-sm mb-2 font-inter">
            <span className="text-grimoire-foreground/70">Energy Level</span>
            <span className="text-grimoire-foreground">{Math.round(energyLevel)}%</span>
          </div>
          <Progress value={energyLevel} className="h-3 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-primary" />
        </div>

        {/* Intensity Control */}
        <div>
          <div className="flex justify-between text-sm mb-2 font-inter">
            <span className="text-grimoire-foreground/70">Intensity</span>
            <span className="text-grimoire-foreground">{intensity[0]}%</span>
          </div>
          <Slider
            value={intensity}
            onValueChange={setIntensity}
            max={100}
            min={10}
            step={5}
            className="w-full [&>.track]:bg-grimoire-border [&>.thumb]:bg-grimoire-primary [&>.thumb]:focus-visible:ring-grimoire-primary"
            disabled={isActive}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={toggleRitual}
            className={`flex-1 font-medium ${isActive ? 'bg-grimoire-accent hover:bg-grimoire-accent/90 text-white' : 'bg-grimoire-primary hover:bg-grimoire-primary/90 text-primary-foreground'}`}
          >
            {isActive ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start
              </>
            )}
          </Button>
          
          <Button
            onClick={resetRitual}
            variant="outline"
            className="flex-1 border-grimoire-border text-grimoire-foreground/80 hover:bg-grimoire-muted/70 hover:text-grimoire-foreground font-medium"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Settings */}
        <div className="flex items-center justify-between pt-4 border-t border-grimoire-border">
          <div className="flex items-center">
            <Volume2 className="h-4 w-4 mr-2 text-grimoire-foreground/70" />
            <span className="text-sm text-grimoire-foreground/70 font-inter">Ambient Sound</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAmbientSound(!ambientSound)}
            className={`border-grimoire-border text-grimoire-foreground/70 ${ambientSound ? 'bg-grimoire-primary/20 border-grimoire-primary/50' : ''}`}
          >
            {ambientSound ? 'On' : 'Off'}
          </Button>
        </div>

        {/* Ritual-specific guidance */}
        <div className="text-xs text-grimoire-foreground/70 bg-grimoire-background p-3 rounded border border-grimoire-border font-inter">
          <strong>Current Focus:</strong> {ritualType === 'circle' && 'Maintain protective boundaries while channeling energy'}
          {ritualType === 'triangle' && 'Focus intent through the three-point manifestation'}
          {ritualType === 'mirror' && 'Gaze into the reflective surface while building energy'}
          {ritualType === 'yajna' && 'Offer intentions to the sacred fire while energy builds'}
        </div>
      </CardContent>
    </Card>
  );
};

export default RitualController;
