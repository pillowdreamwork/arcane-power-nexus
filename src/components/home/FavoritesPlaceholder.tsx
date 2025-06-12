
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, BookmarkPlus } from "lucide-react"; // Added BookmarkPlus
import { useNavigate } from "react-router-dom";
import SacredGeometry from "@/components/ui/SacredGeometry"; // Import SacredGeometry

const FavoritesPlaceholder: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-grimoire-muted border border-grimoire-border rounded-lg p-8 text-center flex flex-col items-center">
      {/* Using SacredGeometry as primary icon */}
      <SacredGeometry
        name="Hexagram"
        size={96}
        className="text-grimoire-primary/30 mx-auto mb-6 animate-pulse-subtle"
        strokeWidth={1}
      />
      {/* Or, if preferring a Lucide icon:
      <BookmarkPlus className="h-20 w-20 text-grimoire-primary/30 mx-auto mb-6" />
      */}
      <p className="text-grimoire-foreground/80 mb-2 text-lg font-semibold font-inter">
        Your Sanctum of Secrets is Awaiting.
      </p>
      <p className="text-sm text-grimoire-foreground/60 font-inter">
        Mark favored rituals and texts; they shall be enshrined here.
      </p>
      <Button 
        variant="outline" 
        className="mt-4 border-grimoire-primary/60 text-grimoire-primary hover:bg-grimoire-primary/10 font-medium font-inter"
        onClick={() => navigate('/codex')}
      >
        <BookOpen className="h-4 w-4 mr-2 text-grimoire-primary" />
        Browse Codex
      </Button>
    </div>
  );
};

export default FavoritesPlaceholder;
