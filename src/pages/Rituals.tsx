
import React, { useState } from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Circle } from "lucide-react";

const Rituals = () => {
  const [activeSpace, setActiveSpace] = useState("circle");
  
  const ritualSpaces = {
    circle: {
      name: "Circle Chamber",
      description: "Traditional protective boundary for entity work",
      elements: ["Candles", "Salt boundary", "Cardinal directions", "Elemental representations"],
      activeEffect: "Containment and protection"
    },
    triangle: {
      name: "Triangle Nexus",
      description: "Focused manifestation and summoning space",
      elements: ["Sigil-inscribed points", "Obsidian mirrors", "Incense", "Entity sigils"],
      activeEffect: "Concentrated manifestation"
    },
    mirror: {
      name: "Mirror Sanctum",
      description: "Gateway to other realms and reflections",
      elements: ["Black mirrors", "Silver candlesticks", "Moon water", "Scrying tools"],
      activeEffect: "Dimensional bridging"
    },
    yajna: {
      name: "Yajna Altar",
      description: "Sacred fire ritual space",
      elements: ["Fire pit", "Offering vessels", "Purified ghee", "Mantric scrolls"],
      activeEffect: "Energy transmutation"
    }
  };

  const ritualTypes = [
    "Banishing", "Invocation", "Evocation", "Charging",
    "Astral Travel", "Divination", "Communion", "Binding"
  ];

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Circle className="h-8 w-8 mr-3 text-grimoire-primary grimoire-glow" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-grimoire-primary grimoire-text-shadow">
              Virtual Ritual Spaces
            </h1>
            <p className="text-grimoire-foreground/80">
              Customizable chambers for mystical workings
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="bg-grimoire-muted border-grimoire-border grimoire-border h-full relative overflow-hidden">
              <div className="absolute inset-0 sacred-pattern opacity-30"></div>
              <CardHeader>
                <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                  {ritualSpaces[activeSpace as keyof typeof ritualSpaces].name}
                </CardTitle>
                <CardDescription className="text-grimoire-foreground/70">
                  {ritualSpaces[activeSpace as keyof typeof ritualSpaces].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-grimoire-background rounded-md border border-grimoire-border flex items-center justify-center relative overflow-hidden">
                  {/* Ritual space visualization would go here */}
                  <div className={`absolute inset-0 ${activeSpace === 'circle' ? 'flex items-center justify-center' : 'hidden'}`}>
                    <div className="relative">
                      <div className="w-64 h-64 rounded-full border-2 border-grimoire-primary animate-pulse-subtle"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-grimoire-primary/70"></div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>

                  <div className={`absolute inset-0 ${activeSpace === 'triangle' ? 'flex items-center justify-center' : 'hidden'}`}>
                    <div className="relative">
                      <div className="w-0 h-0 border-l-[120px] border-r-[120px] border-b-[208px] border-l-transparent border-r-transparent border-b-grimoire-primary/30"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-20 h-20">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-grimoire-primary/70">
                          <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
                          <path d="M50 30 L50 70 M30 50 L70 50" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className={`absolute inset-0 ${activeSpace === 'mirror' ? 'flex items-center justify-center' : 'hidden'}`}>
                    <div className="relative w-48 h-64 bg-black/80 border border-gray-700 rounded-md overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/40"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-purple-500/10 rounded-full animate-pulse-subtle"></div>
                      </div>
                      <div className="absolute bottom-4 w-full flex justify-center">
                        <div className="h-1 w-16 bg-grimoire-primary/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className={`absolute inset-0 ${activeSpace === 'yajna' ? 'flex items-center justify-center' : 'hidden'}`}>
                    <div className="relative">
                      <div className="w-32 h-32 bg-red-900/30 rounded-full flex items-center justify-center overflow-hidden">
                        <div className="absolute w-24 h-24">
                          <div className="w-full h-full flex flex-wrap">
                            <div className="w-1/2 h-1/2 bg-orange-400/30 animate-pulse"></div>
                            <div className="w-1/2 h-1/2 bg-yellow-400/30 animate-pulse delay-100"></div>
                            <div className="w-1/2 h-1/2 bg-orange-600/30 animate-pulse delay-300"></div>
                            <div className="w-1/2 h-1/2 bg-red-600/30 animate-pulse delay-200"></div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -bottom-8 w-48 h-2 bg-gradient-to-r from-transparent via-grimoire-primary/30 to-transparent"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-grimoire-foreground font-medium mb-3">Elements:</h3>
                  <div className="flex flex-wrap gap-2">
                    {ritualSpaces[activeSpace as keyof typeof ritualSpaces].elements.map((element, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-grimoire-background border border-grimoire-border rounded-full text-sm"
                      >
                        {element}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-grimoire-foreground font-medium mb-3">Active Effect:</h3>
                  <p className="text-grimoire-foreground/90">
                    {ritualSpaces[activeSpace as keyof typeof ritualSpaces].activeEffect}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Enter Space</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-grimoire-muted border-grimoire-border grimoire-border">
              <CardHeader>
                <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                  Select Ritual Space
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(ritualSpaces).map((space) => (
                    <Button 
                      key={space}
                      variant={activeSpace === space ? "default" : "outline"}
                      className={`h-auto py-4 ${activeSpace === space ? "bg-grimoire-primary" : ""}`}
                      onClick={() => setActiveSpace(space)}
                    >
                      {(ritualSpaces as any)[space].name.split(" ")[0]}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-grimoire-muted border-grimoire-border grimoire-border">
              <CardHeader>
                <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                  Ritual Types
                </CardTitle>
                <CardDescription className="text-grimoire-foreground/70">
                  Select your working
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {ritualTypes.map((type) => (
                    <span 
                      key={type} 
                      className="px-3 py-1 bg-grimoire-background border border-grimoire-border rounded-full text-sm cursor-pointer hover:border-grimoire-primary/70 transition-colors"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-grimoire-muted border-grimoire-border grimoire-border">
              <CardHeader>
                <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                  Ritual Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-grimoire-foreground">Full Moon Invocation</p>
                    <p className="text-sm text-grimoire-foreground/70">2 days from now</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Set Reminder
                  </Button>
                </div>
                <Separator className="bg-grimoire-border" />
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-grimoire-foreground">Spring Equinox</p>
                    <p className="text-sm text-grimoire-foreground/70">March 20</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Set Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GrimoireLayout>
  );
};

export default Rituals;
