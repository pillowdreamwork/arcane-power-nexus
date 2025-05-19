import React, { useState } from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Circle } from "lucide-react";
import RitualLibrary from "@/components/home/RitualLibrary";
import RitualCard from "@/components/home/RitualCard";
import { ritualCards } from "@/components/home/ritualData";

const Rituals = () => {
  const [activeSpace, setActiveSpace] = useState("circle");
  const [selectedType, setSelectedType] = useState<string | null>(null);

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

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-grimoire-primary mb-2">Virtual Ritual Spaces</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(ritualSpaces).map((space) => (
            <Button 
              key={space}
              variant={activeSpace === space ? "default" : "outline"}
              className="text-sm px-3 py-2"
              onClick={() => setActiveSpace(space)}
            >
              {(ritualSpaces as any)[space].name.split(" ")[0]}
            </Button>
          ))}
        </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-grimoire-foreground">{ritualSpaces[activeSpace as keyof typeof ritualSpaces].name}</CardTitle>
            <CardDescription>{ritualSpaces[activeSpace as keyof typeof ritualSpaces].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-2">
              {ritualSpaces[activeSpace as keyof typeof ritualSpaces].elements.map((element, index) => (
                <span key={index} className="px-2 py-1 bg-grimoire-muted border rounded text-xs">{element}</span>
              ))}
            </div>
            <div className="text-sm text-grimoire-foreground/80">Effect: {ritualSpaces[activeSpace as keyof typeof ritualSpaces].activeEffect}</div>
          </CardContent>
        </Card>
        <h2 className="text-xl font-semibold text-grimoire-primary mb-2">Ritual Library</h2>
        <div className="mb-8">
          <RitualLibrary />
        </div>
      </div>
    </GrimoireLayout>
  );
};

export default Rituals;
