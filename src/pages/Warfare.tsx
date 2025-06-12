
import React, { useState } from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Zap } from "lucide-react";

const Warfare = () => {
  const [energyAllocation, setEnergyAllocation] = useState({
    offense: 30,
    defense: 40,
    recovery: 30
  });
  
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);

  const handleAllocationChange = (field: keyof typeof energyAllocation, value: number[]) => {
    // Ensure the total allocation remains 100
    const newValue = value[0];
    const delta = newValue - energyAllocation[field];
    
    if (delta === 0) return;
    
    const remainingFields = Object.keys(energyAllocation).filter(k => k !== field) as Array<keyof typeof energyAllocation>;
    
    // Distribute the delta proportionally among the remaining fields
    const totalRemaining = remainingFields.reduce((acc, k) => acc + energyAllocation[k], 0);
    
    const newAllocation = { ...energyAllocation, [field]: newValue };
    
    remainingFields.forEach(k => {
      const proportion = energyAllocation[k] / totalRemaining;
      newAllocation[k] = Math.max(0, Math.round(energyAllocation[k] - (delta * proportion)));
    });
    
    // Adjust for rounding errors to ensure total is exactly 100
    const total = Object.values(newAllocation).reduce((sum, val) => sum + val, 0);
    if (total !== 100) {
      const diff = 100 - total;
      const lastField = remainingFields[remainingFields.length - 1];
      newAllocation[lastField] += diff;
    }
    
    setEnergyAllocation(newAllocation);
  };
  
  const defenseTechniques = [
    {
      id: "mirror-shield",
      name: "Mirror Shield",
      description: "Reflects negative energy back to its source",
      energyCost: "Medium",
      duration: "24 hours",
      effectiveness: 80
    },
    {
      id: "void-barrier",
      name: "Void Barrier",
      description: "Creates a field that absorbs and nullifies incoming attacks",
      energyCost: "High",
      duration: "12 hours",
      effectiveness: 95
    },
    {
      id: "guardian-circle",
      name: "Guardian Circle",
      description: "Summons protective entities to form a perimeter",
      energyCost: "Medium",
      duration: "72 hours",
      effectiveness: 75
    }
  ];
  
  const offenseTechniques = [
    {
      id: "psychic-lance",
      name: "Psychic Lance",
      description: "Focused energy projectile that penetrates defenses",
      energyCost: "Medium",
      range: "Direct line of sight",
      effectiveness: 85
    },
    {
      id: "dissolution-field",
      name: "Dissolution Field",
      description: "Creates an area where enemy constructs break down",
      energyCost: "High",
      range: "50 meter radius",
      effectiveness: 70
    },
    {
      id: "thought-virus",
      name: "Thought Virus",
      description: "Implants a self-replicating energy pattern that disrupts concentration",
      energyCost: "Low",
      range: "Must be deployed in target's energy field",
      effectiveness: 90
    }
  ];
  
  const entityAllies = [
    {
      id: "wraith-sentinel",
      name: "Wraith Sentinel",
      description: "Ethereal guardian that patrols your energy perimeter",
      summoning: "Medium complexity",
      loyalty: "High",
      power: 85
    },
    {
      id: "thought-elemental",
      name: "Thought Elemental",
      description: "Being composed of mental energy that can infiltrate hostile minds",
      summoning: "High complexity",
      loyalty: "Variable",
      power: 95
    },
    {
      id: "guardian-familiar",
      name: "Guardian Familiar",
      description: "Long-term companion entity bound to your energy signature",
      summoning: "Low complexity",
      loyalty: "Absolute",
      power: 65
    }
  ];

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8 font-inter">
        <div className="flex items-center mb-8">
          <Zap className="h-8 w-8 mr-3 text-grimoire-accent grimoire-glow" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-grimoire-primary grimoire-text-shadow font-inter">
              Psychic Warfare
            </h1>
            <p className="text-grimoire-foreground/80 font-inter">
              Combat systems and entity control
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-grimoire-muted border-grimoire-border">
            <CardHeader>
              <CardTitle className="text-grimoire-foreground grimoire-text-shadow font-inter">
                Energy Allocation
              </CardTitle>
              <CardDescription className="text-grimoire-foreground/70 font-inter">
                Balance your spiritual resources for maximum effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <div className="flex justify-between mb-2 font-inter">
                  <label className="text-grimoire-foreground">Offensive Power</label>
                  <span className="text-grimoire-foreground">{energyAllocation.offense}%</span>
                </div>
                <Slider 
                  value={[energyAllocation.offense]} 
                  min={0} 
                  max={100} 
                  step={5}
                  onValueChange={(value) => handleAllocationChange("offense", value)}
                  className="mb-6 [&>.track]:bg-grimoire-border [&>.thumb]:bg-grimoire-primary [&>.thumb]:focus-visible:ring-grimoire-primary"
                />
                <Progress value={energyAllocation.offense} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-primary" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2 font-inter">
                  <label className="text-grimoire-foreground">Defensive Barriers</label>
                  <span className="text-grimoire-foreground">{energyAllocation.defense}%</span>
                </div>
                <Slider 
                  value={[energyAllocation.defense]} 
                  min={0} 
                  max={100} 
                  step={5}
                  onValueChange={(value) => handleAllocationChange("defense", value)}
                  className="mb-6 [&>.track]:bg-grimoire-border [&>.thumb]:bg-grimoire-primary [&>.thumb]:focus-visible:ring-grimoire-primary"
                />
                <Progress value={energyAllocation.defense} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-secondary" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2 font-inter">
                  <label className="text-grimoire-foreground">Energy Recovery</label>
                  <span className="text-grimoire-foreground">{energyAllocation.recovery}%</span>
                </div>
                <Slider 
                  value={[energyAllocation.recovery]} 
                  min={0} 
                  max={100} 
                  step={5}
                  onValueChange={(value) => handleAllocationChange("recovery", value)}
                  className="mb-6 [&>.track]:bg-grimoire-border [&>.thumb]:bg-grimoire-primary [&>.thumb]:focus-visible:ring-grimoire-primary"
                />
                <Progress value={energyAllocation.recovery} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-accent" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-grimoire-border pt-6">
              <div className="w-full">
                <h3 className="text-grimoire-foreground mb-2 font-medium font-inter">Current Balance Assessment:</h3>
                <p className="text-grimoire-foreground/90 font-inter">
                  {energyAllocation.offense > 50 
                    ? "Highly aggressive stance. Effective for offensive operations but vulnerable to counterattack." 
                    : energyAllocation.defense > 50 
                      ? "Defensive configuration. Resilient against attacks but limited offensive capability." 
                      : energyAllocation.recovery > 50 
                        ? "Recovery-focused. Sustainable over long engagements but tactically limited." 
                        : "Balanced configuration. Adaptable to varying combat scenarios."}
                </p>
              </div>
            </CardFooter>
          </Card>

          <Card className="bg-grimoire-muted border-grimoire-border">
            <CardHeader>
              <CardTitle className="text-grimoire-foreground grimoire-text-shadow font-inter">
                Combat Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1 font-inter">
                  <span className="text-grimoire-foreground/70">Energy Reserves</span>
                  <span className="text-grimoire-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-primary" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1 font-inter">
                  <span className="text-grimoire-foreground/70">Defensive Integrity</span>
                  <span className="text-grimoire-foreground">93%</span>
                </div>
                <Progress value={93} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-secondary" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1 font-inter">
                  <span className="text-grimoire-foreground/70">Offensive Readiness</span>
                  <span className="text-grimoire-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-accent" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1 font-inter">
                  <span className="text-grimoire-foreground/70">Entity Alignment</span>
                  <span className="text-grimoire-foreground">97%</span>
                </div>
                <Progress value={97} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-primary" />
              </div>
              
              <div className="pt-2">
                <h3 className="text-sm font-medium text-grimoire-foreground font-inter mb-2">Current Threats:</h3>
                <div className="flex items-center text-grimoire-foreground/70 text-sm font-inter">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                  <span>No immediate threats detected</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="defense" className="w-full">
          <TabsList className="bg-grimoire-muted/50 border-b border-grimoire-border rounded-t-lg mb-6">
            <TabsTrigger value="defense" className="text-grimoire-foreground/70 data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted font-medium">
              Defensive Techniques
            </TabsTrigger>
            <TabsTrigger value="offense" className="text-grimoire-foreground/70 data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted font-medium">
              Offensive Techniques
            </TabsTrigger>
            <TabsTrigger value="entities" className="text-grimoire-foreground/70 data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted font-medium">
              Entity Allies
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="defense">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {defenseTechniques.map((technique) => (
                <Card 
                  key={technique.id} 
                  className={`bg-grimoire-muted border-grimoire-border transition-all duration-300 ${
                    selectedTechnique === technique.id 
                      ? "border-grimoire-primary grimoire-glow" 
                      : "hover:border-grimoire-primary/60"
                  }`}
                  onClick={() => setSelectedTechnique(technique.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-grimoire-foreground grimoire-text-shadow font-inter">
                      {technique.name}
                    </CardTitle>
                    <CardDescription className="text-grimoire-foreground/70 font-inter">
                      {technique.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm font-inter">
                      <div>
                        <p className="text-grimoire-foreground/70">Energy Cost</p>
                        <p className="text-grimoire-foreground">{technique.energyCost}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70">Duration</p>
                        <p className="text-grimoire-foreground">{technique.duration}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1 font-inter">
                        <span className="text-grimoire-foreground/70">Effectiveness</span>
                        <span className="text-grimoire-foreground">{technique.effectiveness}%</span>
                      </div>
                      <Progress value={technique.effectiveness} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-primary" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full font-medium ${selectedTechnique === technique.id ? 'bg-grimoire-primary text-primary-foreground' : 'border-grimoire-primary/60 text-grimoire-primary hover:bg-grimoire-primary/10'}`}
                      variant={selectedTechnique === technique.id ? "default" : "outline"}
                    >
                      {selectedTechnique === technique.id ? "Selected" : "Select Technique"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="offense">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offenseTechniques.map((technique) => (
                <Card 
                  key={technique.id} 
                  className={`bg-grimoire-muted border-grimoire-border transition-all duration-300 ${
                    selectedTechnique === technique.id 
                      ? "border-grimoire-primary grimoire-glow" 
                      : "hover:border-grimoire-primary/60"
                  }`}
                  onClick={() => setSelectedTechnique(technique.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-grimoire-foreground grimoire-text-shadow font-inter">
                      {technique.name}
                    </CardTitle>
                    <CardDescription className="text-grimoire-foreground/70 font-inter">
                      {technique.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm font-inter">
                      <div>
                        <p className="text-grimoire-foreground/70">Energy Cost</p>
                        <p className="text-grimoire-foreground">{technique.energyCost}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70">Range</p>
                        <p className="text-grimoire-foreground">{technique.range}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1 font-inter">
                        <span className="text-grimoire-foreground/70">Effectiveness</span>
                        <span className="text-grimoire-foreground">{technique.effectiveness}%</span>
                      </div>
                      <Progress value={technique.effectiveness} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-primary" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full font-medium ${selectedTechnique === technique.id ? 'bg-grimoire-primary text-primary-foreground' : 'border-grimoire-primary/60 text-grimoire-primary hover:bg-grimoire-primary/10'}`}
                      variant={selectedTechnique === technique.id ? "default" : "outline"}
                    >
                      {selectedTechnique === technique.id ? "Selected" : "Select Technique"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="entities">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {entityAllies.map((entity) => (
                <Card 
                  key={entity.id} 
                  className={`bg-grimoire-muted border-grimoire-border transition-all duration-300 ${
                    selectedTechnique === entity.id 
                      ? "border-grimoire-primary grimoire-glow" 
                      : "hover:border-grimoire-primary/60"
                  }`}
                  onClick={() => setSelectedTechnique(entity.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-grimoire-foreground grimoire-text-shadow font-inter">
                      {entity.name}
                    </CardTitle>
                    <CardDescription className="text-grimoire-foreground/70 font-inter">
                      {entity.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm font-inter">
                      <div>
                        <p className="text-grimoire-foreground/70">Summoning</p>
                        <p className="text-grimoire-foreground">{entity.summoning}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70">Loyalty</p>
                        <p className="text-grimoire-foreground">{entity.loyalty}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1 font-inter">
                        <span className="text-grimoire-foreground/70">Power Rating</span>
                        <span className="text-grimoire-foreground">{entity.power}/100</span>
                      </div>
                      <Progress value={entity.power} className="h-2 bg-grimoire-border [&>[data-slot=indicator]]:bg-grimoire-primary" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full font-medium ${selectedTechnique === entity.id ? 'bg-grimoire-primary text-primary-foreground' : 'border-grimoire-primary/60 text-grimoire-primary hover:bg-grimoire-primary/10'}`}
                      variant={selectedTechnique === entity.id ? "default" : "outline"}
                    >
                      {selectedTechnique === entity.id ? "Active" : "Summon Entity"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </GrimoireLayout>
  );
};

export default Warfare;
