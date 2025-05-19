
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RitualCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  difficulty: string;
}

const RitualCard: React.FC<RitualCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  color,
  difficulty,
}) => {
  const { toast } = useToast();

  const startRitual = (ritualId: string) => {
    toast({
      title: "Ritual Initiated",
      description: "The spiritual energies are now being channeled.",
    });
    // In a real implementation, this would navigate to the ritual page
  };

  return (
    <Card className="bg-grimoire-muted border-grimoire-border hover:border-grimoire-primary/70 transition-all duration-300 group grimoire-border overflow-hidden relative">
      <div className="absolute inset-0 pentagram opacity-30"></div>
      <div
        className="absolute top-0 right-0 w-16 h-16"
        style={{
          background: `radial-gradient(circle at top right, ${color}40 0%, transparent 70%)`,
        }}
      ></div>

      <CardHeader>
        <div className="flex justify-between items-center">
          <Icon className="h-6 w-6 grimoire-glow" style={{ color: color }} />
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-grimoire-background/50 text-grimoire-foreground/70">
            {difficulty}
          </span>
        </div>
        <CardTitle className="grimoire-text-shadow text-lg">{title}</CardTitle>
        <CardDescription className="text-grimoire-foreground/70">
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button
          variant="outline"
          className="w-full group-hover:border-grimoire-primary/70 group-hover:text-grimoire-primary transition-colors"
          onClick={() => startRitual(id)}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Begin Ritual
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RitualCard;
