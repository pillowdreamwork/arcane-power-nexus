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
  };

  return (
    <Card className="bg-grimoire-muted hover:border-grimoire-primary/50 transition-all border border-grimoire-border">
      <CardHeader className="space-y-2">
        <div className="flex justify-between items-center">
          <Icon className="h-5 w-5" style={{ color }} />
          <span className="text-xs px-2 py-0.5 rounded-full bg-grimoire-border text-grimoire-foreground/70 font-medium">
            {difficulty}
          </span>
        </div>
        <CardTitle className="text-base font-semibold text-grimoire-foreground font-inter">{title}</CardTitle>
        <CardDescription className="text-sm text-grimoire-foreground/80 font-inter">{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full text-sm border-grimoire-primary/50 text-grimoire-primary hover:bg-grimoire-primary/10 hover:border-grimoire-primary hover:text-grimoire-primary font-medium group"
          onClick={() => startRitual(id)}
        >
          <Sparkles className="h-4 w-4 mr-2 text-grimoire-primary/90 group-hover:text-grimoire-primary transition-colors" />
          Begin
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RitualCard;
