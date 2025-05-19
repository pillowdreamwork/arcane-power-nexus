import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface Achievement {
  label: string;
  achieved: boolean;
}

export default function SpiritualProgress({ className = "" }) {
  const level = 3;
  const xp = 120;
  const xpToNext = 200;

  const achievements: Achievement[] = [
    { label: "First Ritual", achieved: true },
    { label: "Protection Master", achieved: false },
    { label: "Ascendant", achieved: true },
  ];

  return (
    <Card className={`bg-grimoire-muted border-grimoire-border ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-grimoire-primary" />
            <span className="text-sm font-medium">Level {level}</span>
          </div>
          <span className="text-xs text-grimoire-foreground/70">
            {xp} / {xpToNext} XP
          </span>
        </div>
        <Progress
          value={Math.min((xp / xpToNext) * 100, 100)}
          className="h-1.5 mb-3"
        />
        <div className="flex flex-wrap gap-2">
          {achievements.map((achievement, idx) => (
            <span
              key={idx}
              className={`text-xs px-2 py-1 rounded ${
                achievement.achieved
                  ? "bg-grimoire-primary/10 text-grimoire-primary"
                  : "bg-grimoire-background/50 text-grimoire-foreground/50"
              }`}
            >
              {achievement.label}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
