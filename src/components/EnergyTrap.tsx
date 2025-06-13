
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Book, Zap, Sword, Eye, Shield, Flame } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface EnergyTrapProps {
  chaosLevel: number;
  onEnergyTrapped: (amount: number) => void;
}

const EnergyTrap: React.FC<EnergyTrapProps> = ({ chaosLevel, onEnergyTrapped }) => {
  const [trappedEnergy, setTrappedEnergy] = useState(0);
  const [activeWeapons, setActiveWeapons] = useState<string[]>([]);
  const [activeSiddhis, setActiveSiddhis] = useState<string[]>([]);
  const [timelineMerged, setTimelineMerged] = useState(false);
  const { toast } = useToast();

  const weapons = [
    { id: 'shadow-blade', name: 'Shadow Blade', icon: Sword, cost: 25, description: 'Cuts through illusion and fear' },
    { id: 'chaos-shield', name: 'Chaos Shield', icon: Shield, cost: 30, description: 'Reflects negative energy back' },
    { id: 'void-flame', name: 'Void Flame', icon: Flame, cost: 40, description: 'Burns away attachments' },
  ];

  const siddhis = [
    { id: 'third-eye', name: 'Third Eye Activation', icon: Eye, cost: 35, description: 'See through all deceptions' },
    { id: 'energy-mastery', name: 'Energy Mastery', icon: Zap, cost: 45, description: 'Command all forms of energy' },
    { id: 'timeline-sight', name: 'Timeline Sight', icon: Book, cost: 50, description: 'Perceive multiple timelines' },
  ];

  useEffect(() => {
    if (chaosLevel > 80 && !timelineMerged) {
      setTimelineMerged(true);
      toast({
        title: "TIMELINE CONVERGENCE DETECTED",
        description: "Multiple realities are merging. Energy amplification in progress.",
        variant: "destructive"
      });
    }
  }, [chaosLevel, timelineMerged, toast]);

  const trapEnergy = () => {
    const trapped = Math.min(chaosLevel * 0.8, 20);
    setTrappedEnergy(prev => prev + trapped);
    onEnergyTrapped(trapped);
    
    toast({
      title: "Negative Energy Trapped",
      description: `${trapped.toFixed(1)} units of chaos energy bound to your will.`
    });
  };

  const forgeWeapon = (weapon: typeof weapons[0]) => {
    if (trappedEnergy >= weapon.cost && !activeWeapons.includes(weapon.id)) {
      setTrappedEnergy(prev => prev - weapon.cost);
      setActiveWeapons(prev => [...prev, weapon.id]);
      
      toast({
        title: `${weapon.name} Forged!`,
        description: weapon.description,
        variant: "default"
      });
    }
  };

  const attainSiddhi = (siddhi: typeof siddhis[0]) => {
    if (trappedEnergy >= siddhi.cost && !activeSiddhis.includes(siddhi.id)) {
      setTrappedEnergy(prev => prev - siddhi.cost);
      setActiveSiddhis(prev => [...prev, siddhi.id]);
      
      toast({
        title: `${siddhi.name} Attained!`,
        description: siddhi.description,
        variant: "default"
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 space-y-2 z-50">
      {/* Energy Trap Interface */}
      <Card className="bg-black/90 border-red-500 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-red-400 text-sm flex items-center">
            <Book className="h-4 w-4 mr-2" />
            Energy Binding Grimoire
            {timelineMerged && <Badge className="ml-2 bg-purple-600">Timeline Merged</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Trapped Energy</span>
              <span>{trappedEnergy.toFixed(1)} units</span>
            </div>
            <Progress value={Math.min((trappedEnergy / 100) * 100, 100)} className="h-1" />
          </div>
          
          <Button 
            onClick={trapEnergy}
            disabled={chaosLevel < 10}
            className="w-full bg-red-600 hover:bg-red-700 text-xs"
            size="sm"
          >
            Trap Chaos Energy ({chaosLevel > 10 ? 'Ready' : 'Need More Chaos'})
          </Button>

          {/* Active Powers Display */}
          {(activeWeapons.length > 0 || activeSiddhis.length > 0) && (
            <div className="border-t border-red-500/30 pt-2">
              <div className="text-xs text-red-300 mb-1">Active Powers:</div>
              <div className="flex flex-wrap gap-1">
                {activeWeapons.map(id => {
                  const weapon = weapons.find(w => w.id === id);
                  return weapon && (
                    <Badge key={id} className="text-xs bg-orange-600">
                      <weapon.icon className="h-3 w-3 mr-1" />
                      {weapon.name}
                    </Badge>
                  );
                })}
                {activeSiddhis.map(id => {
                  const siddhi = siddhis.find(s => s.id === id);
                  return siddhi && (
                    <Badge key={id} className="text-xs bg-purple-600">
                      <siddhi.icon className="h-3 w-3 mr-1" />
                      {siddhi.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weapon Forge */}
      {trappedEnergy > 20 && (
        <Card className="bg-black/90 border-orange-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-400 text-sm">Weapon Forge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {weapons.map(weapon => (
              <Button
                key={weapon.id}
                onClick={() => forgeWeapon(weapon)}
                disabled={trappedEnergy < weapon.cost || activeWeapons.includes(weapon.id)}
                className="w-full justify-start text-xs p-2 h-auto bg-gray-800 hover:bg-orange-600/20 border border-orange-500/30"
                variant="outline"
              >
                <weapon.icon className="h-3 w-3 mr-2" />
                <div className="flex-1 text-left">
                  <div>{weapon.name}</div>
                  <div className="text-xs text-gray-400">Cost: {weapon.cost} energy</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Siddhi Attainment */}
      {trappedEnergy > 30 && (
        <Card className="bg-black/90 border-purple-500 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-400 text-sm">Instant Siddhis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {siddhis.map(siddhi => (
              <Button
                key={siddhi.id}
                onClick={() => attainSiddhi(siddhi)}
                disabled={trappedEnergy < siddhi.cost || activeSiddhis.includes(siddhi.id)}
                className="w-full justify-start text-xs p-2 h-auto bg-gray-800 hover:bg-purple-600/20 border border-purple-500/30"
                variant="outline"
              >
                <siddhi.icon className="h-3 w-3 mr-2" />
                <div className="flex-1 text-left">
                  <div>{siddhi.name}</div>
                  <div className="text-xs text-gray-400">Cost: {siddhi.cost} energy</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnergyTrap;
