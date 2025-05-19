
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const DailyWisdom: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <Card className={`bg-grimoire-muted border-grimoire-border grimoire-border overflow-hidden animate-fade-in ${className}`}>
      <div className="h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"></div>
      <CardHeader>
        <CardTitle className="text-grimoire-foreground grimoire-text-shadow flex items-center">
          <Star className="h-5 w-5 mr-2 text-grimoire-primary grimoire-glow" />
          Daily Wisdom
        </CardTitle>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-4 border-grimoire-primary/50 pl-4 italic text-grimoire-foreground/90">
          "The universe is not outside of you. Look inside yourself; everything that you want, you already are."
          <footer className="text-right text-sm text-grimoire-foreground/70 mt-2">
            — Dattatreya
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  );
};

export default DailyWisdom;
