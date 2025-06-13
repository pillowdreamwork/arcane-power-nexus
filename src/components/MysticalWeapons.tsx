
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sword, Shield, Flame, Eye, Zap, Book } from 'lucide-react';

interface WeaponData {
  id: string;
  name: string;
  type: 'weapon' | 'siddhi';
  icon: React.ElementType;
  description: string;
  power: number;
  origin: string;
}

const MysticalWeapons: React.FC = () => {
  const weapons: WeaponData[] = [
    {
      id: 'shadow-blade',
      name: 'Shadow Blade',
      type: 'weapon',
      icon: Sword,
      description: 'Forged from trapped negative energy, this blade cuts through illusion and fear itself.',
      power: 85,
      origin: 'Chaos Energy Transmutation'
    },
    {
      id: 'chaos-shield',
      name: 'Chaos Shield',
      type: 'weapon',
      icon: Shield,
      description: 'A protective barrier that reflects negative energy back to its source.',
      power: 90,
      origin: 'Timeline Convergence Event'
    },
    {
      id: 'void-flame',
      name: 'Void Flame',
      type: 'weapon',
      icon: Flame,
      description: 'Purple fire that burns away attachments and false beliefs.',
      power: 95,
      origin: 'Destruction Transmutation'
    },
    {
      id: 'third-eye',
      name: 'Third Eye Activation',
      type: 'siddhi',
      icon: Eye,
      description: 'Instant awakening of psychic sight. See through all deceptions and illusions.',
      power: 100,
      origin: 'Negative Energy Binding'
    },
    {
      id: 'energy-mastery',
      name: 'Energy Mastery',
      type: 'siddhi',
      icon: Zap,
      description: 'Complete command over all forms of energy, both positive and negative.',
      power: 98,
      origin: 'Chaos Containment Ritual'
    },
    {
      id: 'timeline-sight',
      name: 'Timeline Sight',
      type: 'siddhi',
      icon: Book,
      description: 'Ability to perceive and navigate multiple timelines simultaneously.',
      power: 99,
      origin: 'Reality Breach Stabilization'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-grimoire-primary mb-2">Chaos-Forged Arsenal</h2>
        <p className="text-grimoire-foreground/80">Weapons and powers born from transmuted negative energy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weapons.map((item) => (
          <Card key={item.id} className="bg-grimoire-muted border-grimoire-border hover:border-grimoire-primary/50 transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <item.icon className={`h-8 w-8 ${item.type === 'weapon' ? 'text-orange-500' : 'text-purple-500'}`} />
                <Badge variant={item.type === 'weapon' ? 'destructive' : 'secondary'}>
                  {item.type === 'weapon' ? 'Weapon' : 'Siddhi'}
                </Badge>
              </div>
              <CardTitle className="text-grimoire-foreground">{item.name}</CardTitle>
              <CardDescription className="text-grimoire-foreground/70">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-grimoire-foreground/70">Power Level</span>
                  <span className="text-grimoire-foreground">{item.power}/100</span>
                </div>
                <div className="w-full bg-grimoire-border rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item.type === 'weapon' 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                    }`}
                    style={{ width: `${item.power}%` }}
                  />
                </div>
              </div>
              
              <div className="border-t border-grimoire-border pt-3">
                <div className="text-xs text-grimoire-foreground/60">Origin</div>
                <div className="text-sm text-grimoire-foreground font-medium">{item.origin}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-grimoire-muted border-grimoire-border">
        <CardHeader>
          <CardTitle className="text-grimoire-primary">Transmutation Process</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-grimoire-foreground/80">
            When surrounded by negative energy, the ancient practice teaches us to transform rather than resist. 
            These weapons and siddhis are forged through the alchemical process of binding chaotic forces into 
            instruments of liberation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-grimoire-background p-3 rounded border border-grimoire-border">
              <div className="font-semibold text-grimoire-primary mb-1">Step 1: Containment</div>
              <div className="text-grimoire-foreground/70">Trap the negative energy using focused intention</div>
            </div>
            <div className="bg-grimoire-background p-3 rounded border border-grimoire-border">
              <div className="font-semibold text-grimoire-primary mb-1">Step 2: Transmutation</div>
              <div className="text-grimoire-foreground/70">Convert chaos into structured spiritual power</div>
            </div>
            <div className="bg-grimoire-background p-3 rounded border border-grimoire-border">
              <div className="font-semibold text-grimoire-primary mb-1">Step 3: Integration</div>
              <div className="text-grimoire-foreground/70">Forge the energy into usable weapons or siddhis</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MysticalWeapons;
