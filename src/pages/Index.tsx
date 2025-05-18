import React, { useState, useEffect } from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Star, Shield, Triangle, Circle, Hexagon, Zap, Wand2 as Wand } from "lucide-react";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [energyLevel, setEnergyLevel] = useState(85);
  const [activeRitual, setActiveRitual] = useState<string | null>(null);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const ritualCards = [
    {
      id: "psychic-prison",
      title: "Psychic Prison Break",
      description: "Sever energetic chains and reclaim lost power",
      icon: Triangle,
      color: "#EF4444", // Red
      difficulty: "Advanced"
    },
    {
      id: "entity-summoning",
      title: "Entity Invocation",
      description: "Conjure and communicate with ethereal beings",
      icon: Hexagon,
      color: "#8B5CF6", // Purple
      difficulty: "Master"
    },
    {
      id: "protection",
      title: "Protective Barrier",
      description: "Create an impenetrable energy shield",
      icon: Shield,
      color: "#3B82F6", // Blue
      difficulty: "Intermediate"
    },
    {
      id: "energy-harvest",
      title: "Energy Harvesting",
      description: "Collect and store ambient spiritual energy",
      icon: Zap,
      color: "#F59E0B", // Amber
      difficulty: "Intermediate"
    },
    {
      id: "astral-projection",
      title: "Astral Projection",
      description: "Travel beyond physical limitations",
      icon: Star,
      color: "#10B981", // Emerald
      difficulty: "Advanced"
    },
    {
      id: "reality-manipulation",
      title: "Reality Warping",
      description: "Bend the fabric of existence to your will",
      icon: Circle,
      color: "#6366F1", // Indigo
      difficulty: "Master"
    }
  ];
  
  const startRitual = (ritualId: string) => {
    setActiveRitual(ritualId);
    // In a real implementation, this would navigate to the ritual page
  };
  
  const getMoonPhase = () => {
    // Simple moon phase calculation (this is simplified)
    const phase = Math.floor((currentTime.getDate() / 29.5) * 8) % 8;
    const phases = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", 
                    "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
    return phases[phase];
  };

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-grimoire-primary grimoire-text-shadow">
              Arcane Nexus
            </h1>
            <p className="text-grimoire-foreground/80">
              The convergence of spiritual technologies and psychic warfare
            </p>
          </div>
          
          <Card className="w-full md:w-auto mt-4 md:mt-0 bg-grimoire-muted border-grimoire-border grimoire-border">
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
        </div>

        <Tabs defaultValue="rituals" className="w-full">
          <TabsList className="bg-grimoire-muted border border-grimoire-border mb-6">
            <TabsTrigger value="rituals" className="data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
              Ritual Library
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
              Recent Workings
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
              Favorites
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="rituals">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ritualCards.map((ritual) => (
                <Card 
                  key={ritual.id} 
                  className="bg-grimoire-muted border-grimoire-border hover:border-grimoire-primary/70 transition-all duration-300 group grimoire-border overflow-hidden relative"
                >
                  <div className="absolute inset-0 pentagram opacity-30"></div>
                  <div 
                    className="absolute top-0 right-0 w-16 h-16"
                    style={{
                      background: `radial-gradient(circle at top right, ${ritual.color}40 0%, transparent 70%)`
                    }}
                  ></div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <ritual.icon 
                        className="h-6 w-6 grimoire-glow" 
                        style={{ color: ritual.color }}
                      />
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-grimoire-background/50 text-grimoire-foreground/70">
                        {ritual.difficulty}
                      </span>
                    </div>
                    <CardTitle className="grimoire-text-shadow text-lg">
                      {ritual.title}
                    </CardTitle>
                    <CardDescription className="text-grimoire-foreground/70">
                      {ritual.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:border-grimoire-primary/70 group-hover:text-grimoire-primary transition-colors"
                      onClick={() => startRitual(ritual.id)}
                    >
                      Begin Ritual
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent">
            <div className="bg-grimoire-muted border border-grimoire-border rounded-lg p-8 text-center">
              <p className="text-grimoire-foreground/70 mb-2">Your ritual history will appear here</p>
              <p className="text-sm text-grimoire-foreground/50">
                Complete your first ritual to begin tracking your mystical journey
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="bg-grimoire-muted border border-grimoire-border rounded-lg p-8 text-center">
              <p className="text-grimoire-foreground/70 mb-2">Your favorite rituals will appear here</p>
              <p className="text-sm text-grimoire-foreground/50">
                Mark rituals as favorites for quick access
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <Card className="mt-8 bg-grimoire-muted border-grimoire-border grimoire-border">
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
                <Button variant="ghost" className="text-grimoire-primary hover:text-grimoire-primary/80">
                  Ask Echo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </GrimoireLayout>
  );
};

export default Index;
