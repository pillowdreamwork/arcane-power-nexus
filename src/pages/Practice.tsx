
import React, { useState } from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw } from "lucide-react";

const Practice = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const exercises = [
    {
      id: "meditation-1",
      name: "Basic Mindfulness",
      duration: 10,
      type: "meditation",
      difficulty: "Beginner"
    },
    {
      id: "breathing-1", 
      name: "Pranayama Practice",
      duration: 15,
      type: "breathing",
      difficulty: "Intermediate"
    },
    {
      id: "visualization-1",
      name: "Energy Visualization",
      duration: 20,
      type: "visualization", 
      difficulty: "Advanced"
    }
  ];

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-grimoire-primary font-inter mb-4">Practice</h1>
        <div className="mb-6">
          <p className="text-grimoire-foreground/80 font-inter">Spiritual exercises and training.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise) => (
            <Card key={exercise.id} className="bg-grimoire-muted border border-grimoire-border">
              <CardHeader>
                <CardTitle className="text-grimoire-primary font-inter">{exercise.name}</CardTitle>
                <CardDescription className="text-grimoire-foreground/70 font-inter">
                  {exercise.duration} minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    {exercise.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {exercise.difficulty}
                  </Badge>
                </div>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Start Practice
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </GrimoireLayout>
  );
};

export default Practice;
