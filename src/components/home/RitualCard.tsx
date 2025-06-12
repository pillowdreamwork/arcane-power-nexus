import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen } from "lucide-react"; // Import BookOpen
import { useToast } from "@/hooks/use-toast";

interface RitualCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  difficulty: string;
  grimoireLinkType?: 'category' | 'id' | 'search';
  grimoireLinkValue?: string;
}

const RitualCard: React.FC<RitualCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  color,
  difficulty,
  grimoireLinkType,
  grimoireLinkValue,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate(); // Initialize useNavigate

  const startRitual = () => { // Removed ritualId param as it's available in scope
    toast({
      title: "Ritual Initiated",
      description: `The spiritual energies for "${title}" are now being channeled.`,
    });
  };

  const handleButtonClick = () => {
    if (grimoireLinkType && grimoireLinkValue) {
      let path = "/codex";
      if (grimoireLinkType === 'category') {
        path = `/codex?category=${encodeURIComponent(grimoireLinkValue)}`;
      } else if (grimoireLinkType === 'search') {
        path = `/codex?search=${encodeURIComponent(grimoireLinkValue)}`;
      } else if (grimoireLinkType === 'id') {
        // Fallback for 'id': search by title or simply toast for now
        // For now, let's make 'id' also search by title as a placeholder
        path = `/codex?search=${encodeURIComponent(title)}`;
        // Or, if 'id' should not navigate for now:
        // toast({ title: "Information", description: "Detailed view for this ID is not yet available." });
        // return;
      }
      navigate(path);
    } else {
      startRitual();
    }
  };

  const hasLink = grimoireLinkType && grimoireLinkValue;
  const buttonText = hasLink ? "Learn More" : "Begin";
  const ButtonIcon = hasLink ? BookOpen : Sparkles;

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
          onClick={handleButtonClick}
        >
          <ButtonIcon className="h-4 w-4 mr-2 text-grimoire-primary/90 group-hover:text-grimoire-primary transition-colors" />
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RitualCard;
