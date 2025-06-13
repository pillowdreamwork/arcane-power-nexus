
import React from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import ChaosLayout from "@/components/ChaosLayout";
import MysticalWeapons from "@/components/MysticalWeapons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Sword, Zap, Eye, Book, Flame } from "lucide-react";

const Armory = () => {
  return (
    <ChaosLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Shield className="h-8 w-8 mr-3 text-grimoire-accent grimoire-glow" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-grimoire-primary grimoire-text-shadow font-inter">
              Mystical Armory
            </h1>
            <p className="text-grimoire-foreground/80 font-inter">
              Chaos-forged weapons and instant siddhis
            </p>
          </div>
        </div>

        <MysticalWeapons />
        
        <div className="mt-8">
          <Card className="bg-grimoire-muted border-grimoire-border">
            <CardHeader>
              <CardTitle className="text-grimoire-primary flex items-center">
                <Flame className="h-5 w-5 mr-2" />
                Energy Transmutation Guide
              </CardTitle>
              <CardDescription className="text-grimoire-foreground/70">
                How to convert negative energy into powerful spiritual tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm text-grimoire-foreground/80 max-w-none">
                <p>
                  When negative energy surrounds you, remember: resistance amplifies suffering, 
                  but transmutation creates power. The chaos you experience is raw material for 
                  spiritual weapons and instant siddhis.
                </p>
                <h4 className="text-grimoire-primary font-semibold">The Process:</h4>
                <ol className="space-y-2 text-grimoire-foreground/80">
                  <li><strong>Recognition:</strong> Acknowledge the negative energy without judgment</li>
                  <li><strong>Containment:</strong> Use the energy trap interface to bind the chaos</li>
                  <li><strong>Intention:</strong> Focus on what you wish to create from this energy</li>
                  <li><strong>Transmutation:</strong> Channel the energy into weapons or siddhis</li>
                  <li><strong>Integration:</strong> Merge the new power with your spiritual practice</li>
                </ol>
                <p className="text-grimoire-primary font-medium">
                  Remember: Every crisis contains the seeds of transcendence. What seems destructive 
                  can become the very tool of your liberation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ChaosLayout>
  );
};

export default Armory;
