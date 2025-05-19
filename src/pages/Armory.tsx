import React, { useState } from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";

const Armory = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const mantras = [
    {
      id: "mantra1",
      name: "Om Namah Shivaya",
      description: "Universal mantra for transformation and protection",
      origin: "Shaivite",
      power: "Dissolution of obstacles",
      repetitions: 108,
      audio: "om-namah-shivaya.mp3"
    },
    {
      id: "mantra2",
      name: "Krim Krim Krim Hum Hum Hreem Hreem",
      description: "Kali mantra for victory over enemies",
      origin: "Shakta",
      power: "Destruction of negative forces",
      repetitions: 108,
      audio: "krim-hum-hreem.mp3"
    },
    {
      id: "mantra3",
      name: "Gate Gate Paragate Parasamgate Bodhi Svaha",
      description: "Heart Sutra mantra for transcending limitations",
      origin: "Buddhist",
      power: "Transcendence of duality",
      repetitions: 108,
      audio: "gate-gate.mp3"
    }
  ];

  const yantras = [
    {
      id: "yantra1",
      name: "Sri Yantra",
      description: "Supreme yantra representing cosmic creation",
      elements: "Nine interlocking triangles",
      power: "Manifestation and abundance",
      image: "sri-yantra.svg"
    },
    {
      id: "yantra2",
      name: "Kali Yantra",
      description: "Powerful yantra for removal of obstacles",
      elements: "Central triangle with outward petals",
      power: "Protection and destruction of enemies",
      image: "kali-yantra.svg"
    },
    {
      id: "yantra3",
      name: "Bagalamukhi Yantra",
      description: "Yantra for victory in conflicts and immobilizing enemies",
      elements: "Eight-petalled lotus with central triangle",
      power: "Paralysis of opposition forces",
      image: "bagalamukhi-yantra.svg"
    }
  ];

  const jantras = [
    {
      id: "jantra1",
      name: "Merkaba Field",
      description: "Three-dimensional energetic vehicle",
      construction: "Counter-rotating tetrahedrons",
      power: "Interdimensional travel and protection",
      complexity: "Advanced"
    },
    {
      id: "jantra2",
      name: "Quantum Seal",
      description: "Reality anchoring construct",
      construction: "Nested cubes with vibrational signatures",
      power: "Stabilization of manifested intent",
      complexity: "Master"
    },
    {
      id: "jantra3",
      name: "Void Sphere",
      description: "Energy collection and amplification device",
      construction: "Concentric spheres with directional flow patterns",
      power: "Accumulation and redirection of ambient energy",
      complexity: "Intermediate"
    }
  ];

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-grimoire-primary mb-4">War Armory</h1>
        <div className="mb-6">
          <p className="text-grimoire-foreground/80">Tools and components for your spiritual practice.</p>
        </div>

        <Tabs defaultValue="mantras" className="w-full">
          <TabsList className="bg-grimoire-muted border border-grimoire-border mb-6">
            <TabsTrigger value="mantras" className="data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
              Mantras
            </TabsTrigger>
            <TabsTrigger value="yantras" className="data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
              Yantras
            </TabsTrigger>
            <TabsTrigger value="jantras" className="data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
              Jantras
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="mantras">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mantras.map((mantra) => (
                <Card 
                  key={mantra.id} 
                  className="bg-grimoire-muted border-grimoire-border grimoire-border group"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                        {mantra.name}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`w-8 h-8 ${favorites.includes(mantra.id) ? "text-grimoire-primary" : "text-grimoire-foreground/50"}`}
                        onClick={() => toggleFavorite(mantra.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-grimoire-foreground/70">
                      {mantra.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-grimoire-foreground/70">Origin</p>
                        <p className="text-grimoire-foreground">{mantra.origin}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70">Power</p>
                        <p className="text-grimoire-foreground">{mantra.power}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70">Repetitions</p>
                        <p className="text-grimoire-foreground">{mantra.repetitions}</p>
                      </div>
                    </div>
                    
                    <div className="h-10 bg-grimoire-background rounded-md border border-grimoire-border flex items-center px-3">
                      <div className="w-full flex items-center">
                        <div className="h-1 bg-grimoire-primary/50 w-full rounded-full"></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Listen
                    </Button>
                    <Button size="sm">Use in Ritual</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="yantras">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {yantras.map((yantra) => (
                <Card 
                  key={yantra.id} 
                  className="bg-grimoire-muted border-grimoire-border grimoire-border group"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                        {yantra.name}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`w-8 h-8 ${favorites.includes(yantra.id) ? "text-grimoire-primary" : "text-grimoire-foreground/50"}`}
                        onClick={() => toggleFavorite(yantra.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-grimoire-foreground/70">
                      {yantra.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-square bg-grimoire-background rounded-md border border-grimoire-border flex items-center justify-center relative overflow-hidden">
                      <div className="w-3/4 h-3/4 opacity-80 animate-rotate-slow">
                        {/* This would be replaced with the actual yantra image */}
                        <div className="w-full h-full relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full border-2 border-grimoire-primary/50 rotate-45"></div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4/5 h-4/5 border border-grimoire-primary/70"></div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1/2 h-1/2 bg-grimoire-primary/10 rounded-full"></div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1/3 h-1/3 bg-grimoire-primary/20 rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-grimoire-foreground/70">Elements</p>
                        <p className="text-grimoire-foreground">{yantra.elements}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70">Power</p>
                        <p className="text-grimoire-foreground">{yantra.power}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                    <Button size="sm">Use in Ritual</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="jantras">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jantras.map((jantra) => (
                <Card 
                  key={jantra.id} 
                  className="bg-grimoire-muted border-grimoire-border grimoire-border group"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                        {jantra.name}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`w-8 h-8 ${favorites.includes(jantra.id) ? "text-grimoire-primary" : "text-grimoire-foreground/50"}`}
                        onClick={() => toggleFavorite(jantra.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-grimoire-foreground/70">
                      {jantra.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-square bg-grimoire-background rounded-md border border-grimoire-border flex items-center justify-center relative overflow-hidden">
                      {/* This would be a 3D representation of the jantra */}
                      <div className="relative w-1/2 h-1/2 transform-gpu animate-float">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-full border border-grimoire-primary/50 rotate-45 transform-gpu animate-rotate-slow"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4/5 h-4/5 border border-grimoire-primary/40 rotate-[30deg] transform-gpu animate-rotate-slow" style={{ animationDirection: "reverse", animationDuration: "15s" }}></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3/5 h-3/5 border border-grimoire-primary/30 rotate-[60deg] transform-gpu animate-rotate-slow" style={{ animationDuration: "20s" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-grimoire-foreground/70">Construction</p>
                        <p className="text-grimoire-foreground">{jantra.construction}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70">Power</p>
                        <p className="text-grimoire-foreground">{jantra.power}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70">Complexity</p>
                        <p className="text-grimoire-foreground">{jantra.complexity}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Blueprint
                    </Button>
                    <Button size="sm">Use in Ritual</Button>
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

const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default Armory;
