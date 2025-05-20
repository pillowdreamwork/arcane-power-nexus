
import React, { useState, useEffect } from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Circle, Info } from "lucide-react";
import RitualLibrary from "@/components/home/RitualLibrary";
import RitualCard from "@/components/home/RitualCard";
import { ritualCards } from "@/components/home/ritualData";
import RitualEnvironment from "@/components/rituals/RitualEnvironment";
import RitualController from "@/components/rituals/RitualController";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

const Rituals = () => {
  const [activeSpace, setActiveSpace] = useState("circle");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [energyLevel, setEnergyLevel] = useState(20);
  const [isRitualActive, setIsRitualActive] = useState(false);
  const [selectedRitual, setSelectedRitual] = useState<string | null>(null);
  const { toast } = useToast();

  // Effect to simulate ambient energy accumulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (energyLevel < 100 && !isRitualActive) {
        setEnergyLevel(prev => Math.min(prev + 1, 100));
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [energyLevel, isRitualActive]);

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

  // Filter rituals by type if selectedType is set (for demo, filter by difficulty)
  const filteredRituals = selectedType
    ? ritualCards.filter(r => r.difficulty.toLowerCase().includes(selectedType.toLowerCase()))
    : ritualCards;

  const handleActivateRitual = () => {
    setIsRitualActive(true);
    toast({
      title: "Ritual Space Activated",
      description: `The ${ritualSpaces[activeSpace as keyof typeof ritualSpaces].name} is now energetically active.`,
    });
  };

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-grimoire-primary mb-2">Virtual Ritual Spaces</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(ritualSpaces).map((space) => (
              <Button 
                key={space}
                variant={activeSpace === space ? "default" : "outline"}
                className={`text-sm px-3 py-2 ${activeSpace === space ? 'bg-grimoire-primary animate-pulse-subtle' : ''}`}
                onClick={() => {
                  setActiveSpace(space);
                  setIsRitualActive(false);
                }}
              >
                {(ritualSpaces as any)[space].name.split(" ")[0]}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <RitualEnvironment 
              active={isRitualActive} 
              energyLevel={energyLevel} 
              ritualType={activeSpace}
              onEnergyChange={setEnergyLevel}
              className="mb-4"
            />
            
            <div className="flex flex-wrap gap-2 justify-between items-center">
              <div className="text-sm text-grimoire-foreground/70">
                Energy Level: {energyLevel}/100
              </div>
              {!isRitualActive ? (
                <Button 
                  onClick={handleActivateRitual}
                  className="bg-grimoire-primary hover:bg-grimoire-primary/90"
                >
                  <Circle className="h-4 w-4 mr-2" />
                  Activate {ritualSpaces[activeSpace as keyof typeof ritualSpaces].name}
                </Button>
              ) : (
                <Button 
                  onClick={() => setIsRitualActive(false)}
                  variant="outline"
                >
                  Deactivate
                </Button>
              )}
            </div>
          </div>

          {/* Fix: Removed 'as' prop from motion.div since it's not supported */}
          <motion.div 
            className="bg-grimoire-muted border-grimoire-border rounded-lg p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardHeader>
              <CardTitle className="text-grimoire-foreground">{ritualSpaces[activeSpace as keyof typeof ritualSpaces].name}</CardTitle>
              <CardDescription>{ritualSpaces[activeSpace as keyof typeof ritualSpaces].description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-2">
                {ritualSpaces[activeSpace as keyof typeof ritualSpaces].elements.map((element, index) => (
                  <span key={index} className="px-2 py-1 bg-grimoire-background border rounded text-xs">{element}</span>
                ))}
              </div>
              <div className="text-sm text-grimoire-foreground/80 mt-4">Effect: {ritualSpaces[activeSpace as keyof typeof ritualSpaces].activeEffect}</div>
              
              <Separator className="my-4" />
              
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    <Info className="h-4 w-4 mr-2" />
                    Historical Context
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="bg-grimoire-background text-grimoire-foreground p-4">
                  <DrawerHeader>
                    <DrawerTitle>About {ritualSpaces[activeSpace as keyof typeof ritualSpaces].name}</DrawerTitle>
                    <DrawerDescription>Historical and practical context</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 space-y-4 text-sm">
                    {activeSpace === "circle" && (
                      <>
                        <p>The magic circle has been used in ritual practices across numerous traditions for millennia. It represents completeness, infinity, and protection - a boundary between the practitioner and external forces.</p>
                        <p>In Western esoteric traditions, the circle is typically cast with a ritual blade or wand, and may contain various symbols of power, including pentagrams, divine names, and planetary sigils.</p>
                        <p>When working with entities or energies, the circle serves as both container and barrier, allowing controlled interaction while maintaining separation between realms.</p>
                      </>
                    )}
                    
                    {activeSpace === "triangle" && (
                      <>
                        <p>The triangle of manifestation is particularly prominent in Solomonic traditions of ceremonial magic. It represents the threefold nature of creation and serves as a focusing lens for manifestation work.</p>
                        <p>Traditionally placed outside the circle, the triangle creates a confined space where entities can be summoned and communicated with safely. The three points often represent the trinity of force relevant to the practitioner's tradition.</p>
                        <p>In modern practice, the triangle is used for focused intent work, sigil activation, and as a geometric amplifier for directed will.</p>
                      </>
                    )}
                    
                    {activeSpace === "mirror" && (
                      <>
                        <p>Scrying mirrors, often called "black mirrors," have been used for divination since ancient times. The dark reflective surface creates a liminal space - a threshold between worlds.</p>
                        <p>In traditional practice, these mirrors were made of obsidian, polished stone, or dark glass backed with black material. The reflective yet absorptive quality creates an ideal surface for the mind to project images upon.</p>
                        <p>Mirror work is particularly effective for communication with inner aspects of consciousness, ancestral connection, and glimpsing potential futures.</p>
                      </>
                    )}
                    
                    {activeSpace === "yajna" && (
                      <>
                        <p>The fire ritual, or Yajna, has been central to Vedic practice for over 3,000 years. The sacred fire (agni) acts as messenger between the human and divine realms.</p>
                        <p>Traditional offerings include clarified butter (ghee), grains, and other substances, each with specific symbolic and energetic properties. The transformation of matter through fire represents spiritual transformation.</p>
                        <p>Modern adaptations focus on the transmutational aspects of the practice - using fire as a symbol of purification and spiritual alchemy.</p>
                      </>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            </CardContent>
          </motion.div>
        </div>
        
        {isRitualActive && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RitualController 
              ritualType={activeSpace} 
              energyLevel={energyLevel}
              onEnergyChange={setEnergyLevel}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-grimoire-primary mb-2">Ritual Library</h2>
          <p className="text-grimoire-foreground/80 mb-4">Select a ritual to perform in your activated space</p>
          <div className="mb-8">
            <RitualLibrary />
          </div>
        </motion.div>
      </div>
    </GrimoireLayout>
  );
};

export default Rituals;
