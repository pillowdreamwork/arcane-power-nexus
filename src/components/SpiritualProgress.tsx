import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Star, Shield } from "lucide-react";

const achievementsList = [
  { icon: <Sparkles className="text-yellow-400" />, label: "First Ritual" },
  { icon: <Shield className="text-blue-400" />, label: "Protection Master" },
  { icon: <Star className="text-purple-400" />, label: "Ascendant" },
];

export default function SpiritualProgress({ className = "" }) {
  // Simulate user progression (replace with real data in production)
  const [level, setLevel] = useState(3);
  const [xp, setXp] = useState(120);
  const [xpToNext, setXpToNext] = useState(200);
  const [achievements, setAchievements] = useState([0, 2]);

  useEffect(() => {
    // Example: Animate XP gain
    const timer = setTimeout(() => {
      setXp((prev) => (prev < xpToNext ? prev + 2 : prev));
    }, 1200);
    return () => clearTimeout(timer);
  }, [xp, xpToNext]);

  return (
    <Card className={`bg-grimoire-muted border-grimoire-border grimoire-border mb-6 animate-fade-in ${className}`}>
      <CardHeader>
        <CardTitle className="text-grimoire-foreground grimoire-text-shadow flex items-center gap-2">
          <Star className="h-5 w-5 text-grimoire-primary grimoire-glow" />
          Spiritual Progression
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-grimoire-primary">Level {level}</span>
          <span className="text-xs text-grimoire-foreground/70">{xp} / {xpToNext} XP</span>
        </div>
        <Progress value={Math.min((xp / xpToNext) * 100, 100)} className="h-2 bg-grimoire-background mb-4" />
        <div className="flex gap-2">
          {achievements.map((idx) => (
            <span key={idx} className="flex items-center gap-1 px-2 py-1 rounded bg-grimoire-primary/10 text-grimoire-primary text-xs font-medium">
              {achievementsList[idx].icon} {achievementsList[idx].label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
