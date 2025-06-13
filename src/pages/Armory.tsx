import React, { useState } from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Star, VolumeX } from "lucide-react";
import SacredGeometry from "@/components/ui/SacredGeometry";

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
        <h1 className="text-3xl font-bold text-grimoire-primary font-inter mb-4">War Armory</h1>
        <div className="mb-6">
          <p className="text-grimoire-foreground/80 font-inter">Tools and components for your spiritual practice.</p>
        </div>

        <Tabs defaultValue="mantras" className="w-full">
          <TabsList className="bg-grimoire-muted/50 border-b border-grimoire-border rounded-t-lg mb-6">
            <TabsTrigger value="mantras" className="text-grimoire-foreground/70 data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted data-[state=active]:border-b-2 data-[state=active]:border-grimoire-primary font-medium">
              Mantras
            </TabsTrigger>
            <TabsTrigger value="yantras" className="text-grimoire-foreground/70 data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted data-[state=active]:border-b-2 data-[state=active]:border-grimoire-primary font-medium">
              Yantras
            </TabsTrigger>
            <TabsTrigger value="jantras" className="text-grimoire-foreground/70 data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted data-[state=active]:border-b-2 data-[state=active]:border-grimoire-primary font-medium">
              Jantras
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="mantras">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mantras.map((mantra) => (
                <Card 
                  key={mantra.id} 
                  className="bg-grimoire-muted border border-grimoire-border hover:border-grimoire-primary/50 transition-colors group"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-grimoire-primary font-semibold font-inter text-xl">
                        {mantra.name}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`w-8 h-8 ${favorites.includes(mantra.id) ? "text-grimoire-primary fill-grimoire-primary" : "text-grimoire-foreground/50 hover:text-grimoire-primary/70"}`}
                        onClick={() => toggleFavorite(mantra.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-grimoire-foreground/70 font-inter text-sm">
                      {mantra.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-grimoire-foreground/70 font-inter text-xs uppercase tracking-wider">Origin</p>
                        <p className="text-grimoire-foreground font-inter text-sm">{mantra.origin}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70 font-inter text-xs uppercase tracking-wider">Power</p>
                        <p className="text-grimoire-foreground font-inter text-sm">{mantra.power}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70 font-inter text-xs uppercase tracking-wider">Repetitions</p>
                        <p className="text-grimoire-foreground font-inter text-sm">{mantra.repetitions}</p>
                      </div>
                    </div>
                    
                    <div className="h-10 bg-grimoire-background rounded-md border border-grimoire-border flex items-center justify-center text-grimoire-foreground/50 text-xs italic px-3">
                      <VolumeX className="h-4 w-4 mr-2" />
                      <span>Audio unavailable</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="border-grimoire-primary/60 text-grimoire-primary hover:bg-grimoire-primary/10 font-medium text-sm">
                      Listen
                    </Button>
                    <Button size="sm" className="bg-grimoire-primary text-primary-foreground hover:bg-grimoire-primary/90 font-medium text-sm">Use in Ritual</Button>
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
                  className="bg-grimoire-muted border border-grimoire-border hover:border-grimoire-primary/50 transition-colors group"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-grimoire-primary font-semibold font-inter text-xl">
                        {yantra.name}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`w-8 h-8 ${favorites.includes(yantra.id) ? "text-grimoire-primary fill-grimoire-primary" : "text-grimoire-foreground/50 hover:text-grimoire-primary/70"}`}
                        onClick={() => toggleFavorite(yantra.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-grimoire-foreground/70 font-inter text-sm">
                      {yantra.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-square bg-grimoire-background rounded-md border border-grimoire-border flex items-center justify-center relative overflow-hidden p-4 group">
                      <SacredGeometry
                        name={
                          yantra.id === "yantra1" ? "SriYantraPlaceholder" :
                          yantra.id === "yantra2" ? "Hexagram" :
                          "FlowerOfLifeSegment"
                        }
                        className="w-full h-full text-grimoire-primary/70 group-hover:text-grimoire-primary transition-colors duration-300 animate-rotate-slow"
                        size={100}
                        strokeWidth={1}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-grimoire-foreground/70 font-inter text-xs uppercase tracking-wider">Elements</p>
                        <p className="text-grimoire-foreground font-inter text-sm">{yantra.elements}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70 font-inter text-xs uppercase tracking-wider">Power</p>
                        <p className="text-grimoire-foreground font-inter text-sm">{yantra.power}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="border-grimoire-primary/60 text-grimoire-primary hover:bg-grimoire-primary/10 font-medium text-sm">
                      Download
                    </Button>
                    <Button size="sm" className="bg-grimoire-primary text-primary-foreground hover:bg-grimoire-primary/90 font-medium text-sm">Use in Ritual</Button>
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
                  className="bg-grimoire-muted border border-grimoire-border hover:border-grimoire-primary/50 transition-colors group"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-grimoire-primary font-semibold font-inter text-xl">
                        {jantra.name}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`w-8 h-8 ${favorites.includes(jantra.id) ? "text-grimoire-primary fill-grimoire-primary" : "text-grimoire-foreground/50 hover:text-grimoire-primary/70"}`}
                        onClick={() => toggleFavorite(jantra.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="text-grimoire-foreground/70 font-inter text-sm">
                      {jantra.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-square bg-grimoire-background rounded-md border border-grimoire-border flex items-center justify-center relative overflow-hidden p-6 group">
                       <SacredGeometry
                        name={
                          jantra.id === "jantra1" ? "Pentagram" :
                          jantra.id === "jantra2" ? "FlowerOfLifeSegment" :
                          "DefaultSymbol"
                        }
                        className="w-full h-full text-grimoire-primary/60 group-hover:text-grimoire-primary transition-colors duration-300 transform-gpu animate-float"
                        size={80}
                        strokeWidth={1.5}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-grimoire-foreground/70 font-inter text-xs uppercase tracking-wider">Construction</p>
                        <p className="text-grimoire-foreground font-inter text-sm">{jantra.construction}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70 font-inter text-xs uppercase tracking-wider">Power</p>
                        <p className="text-grimoire-foreground font-inter text-sm">{jantra.power}</p>
                      </div>
                      <div>
                        <p className="text-grimoire-foreground/70 font-inter text-xs uppercase tracking-wider">Complexity</p>
                        <p className="text-grimoire-foreground font-inter text-sm">{jantra.complexity}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="border-grimoire-primary/60 text-grimoire-primary hover:bg-grimoire-primary/10 font-medium text-sm">
                      Blueprint
                    </Button>
                    <Button size="sm" className="bg-grimoire-primary text-primary-foreground hover:bg-grimoire-primary/90 font-medium text-sm">Use in Ritual</Button>
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

export default Armory;
