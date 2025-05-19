import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const DailyWisdom: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <Card className={`bg-grimoire-muted ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-4 w-4 text-grimoire-primary" />
          <h3 className="text-sm font-medium">Today's Wisdom</h3>
        </div>
        <p className="text-sm text-grimoire-foreground/80 italic">
          "In stillness, find your power. In silence, hear your truth."
        </p>
        <p className="text-xs text-grimoire-foreground/60 mt-2">
          Focus on inner clarity and purpose today.
        </p>
      </CardContent>
    </Card>
  );
};

export default DailyWisdom;
