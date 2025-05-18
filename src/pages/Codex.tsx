
import React from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hexagon } from "lucide-react";

const Codex = () => {
  const taxonomyLevels = [
    {
      name: "Domain",
      description: "Spiritual Technology",
      examples: ["Mantra", "Yantra", "Jantra", "Tantra", "Invocation", "Evocation", "Convergence"]
    },
    {
      name: "Kingdom",
      description: "Focus Type",
      examples: ["Protection", "Liberation", "Empowerment", "Destruction", "War Preparation"]
    },
    {
      name: "Phylum",
      description: "Energy Source",
      examples: ["Fire", "Blood", "Astral", "Shadow", "Light"]
    },
    {
      name: "Class",
      description: "Practice Level",
      examples: ["Initiate", "Adept", "Master", "Ascendant"]
    },
    {
      name: "Order",
      description: "Purpose",
      examples: ["Psychic Liberation", "Entity Summoning", "Power Amplification", "Reality Manipulation"]
    },
    {
      name: "Genus",
      description: "Ritual Form",
      examples: ["Yajna", "Circle", "Triangle", "Mirror", "Symbolic Maze"]
    },
    {
      name: "Species",
      description: "Specific Practice",
      examples: ["Psychic Prison Break", "Entity Manifestation", "Energy Siege Rituals"]
    }
  ];

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Hexagon className="h-8 w-8 mr-3 text-grimoire-primary grimoire-glow" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-grimoire-primary grimoire-text-shadow">
              The Convergence Codex
            </h1>
            <p className="text-grimoire-foreground/80">
              Taxonomical organization of spiritual practices
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-grimoire-muted border-grimoire-border grimoire-border">
            <CardHeader>
              <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                Codex Overview
              </CardTitle>
              <CardDescription className="text-grimoire-foreground/70">
                The foundation of spiritual classification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-grimoire-foreground/90 mb-4">
                The Convergence Codex organizes all spiritual practices into a hierarchical system,
                allowing practitioners to understand relationships between different mystical traditions
                and techniques. This taxonomical approach reveals hidden connections and allows for
                more effective ritual design.
              </p>
              <p className="text-grimoire-foreground/90">
                By classifying practices according to their energetic signatures, purposes, and origins,
                the Codex serves as both a reference tool and a map for spiritual exploration.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-grimoire-muted border-grimoire-border grimoire-border">
            <CardHeader>
              <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                Using the Codex
              </CardTitle>
              <CardDescription className="text-grimoire-foreground/70">
                Navigation and application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-grimoire-foreground/90">
                <li className="flex items-start">
                  <div className="h-2 w-2 mt-2 mr-2 bg-grimoire-primary rounded-full"></div>
                  <span>Browse categories to discover related practices</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 mt-2 mr-2 bg-grimoire-primary rounded-full"></div>
                  <span>Combine elements from different classifications for ritual synergy</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 mt-2 mr-2 bg-grimoire-primary rounded-full"></div>
                  <span>Track your progress through different practice levels</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 mt-2 mr-2 bg-grimoire-primary rounded-full"></div>
                  <span>Identify complementary and opposing energies for balance</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {taxonomyLevels.map((level, index) => (
            <Card 
              key={level.name}
              className="bg-grimoire-muted border-grimoire-border grimoire-border overflow-hidden"
            >
              <div 
                className="h-2" 
                style={{
                  background: `linear-gradient(90deg, rgba(139, 92, 246, 0.8) ${index * 14}%, rgba(79, 70, 229, 0.8) 100%)`
                }}
              ></div>
              <CardHeader>
                <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                  {level.name}
                </CardTitle>
                <CardDescription className="text-grimoire-foreground/70">
                  {level.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {level.examples.map((example) => (
                    <span 
                      key={example} 
                      className="px-3 py-1 bg-grimoire-background border border-grimoire-border rounded-full text-sm"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </GrimoireLayout>
  );
};

export default Codex;
