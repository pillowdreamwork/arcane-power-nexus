
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FavoritesPlaceholder: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-grimoire-muted border border-grimoire-border rounded-lg p-8 text-center">
      <p className="text-grimoire-foreground/70 mb-2">Your favorite rituals will appear here</p>
      <p className="text-sm text-grimoire-foreground/50">
        Mark texts and rituals as favorites for quick access
      </p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={() => navigate('/codex')}
      >
        <BookOpen className="h-4 w-4 mr-2" />
        Browse Codex
      </Button>
    </div>
  );
};

export default FavoritesPlaceholder;
