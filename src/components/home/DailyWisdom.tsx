
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const DailyWisdom = () => {
  const [currentWisdom, setCurrentWisdom] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const wisdomQuotes = [
    {
      text: "The cave you fear to enter holds the treasure you seek.",
      source: "Joseph Campbell",
      reflection: "Often our greatest growth comes from facing what we avoid most."
    },
    {
      text: "Be yourself; everyone else is already taken.",
      source: "Oscar Wilde",
      reflection: "Authenticity is the foundation of all meaningful spiritual practice."
    },
    {
      text: "The only way out is through.",
      source: "Robert Frost",
      reflection: "Transformation requires us to move through difficulty, not around it."
    },
    {
      text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      source: "Ralph Waldo Emerson",
      reflection: "Our inner strength is the source of all external change."
    },
    {
      text: "The wound is the place where the Light enters you.",
      source: "Rumi",
      reflection: "Our struggles often become our greatest sources of wisdom and compassion."
    },
    {
      text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
      source: "Rumi",
      reflection: "True transformation begins within and radiates outward."
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentWisdom((prev) => (prev + 1) % wisdomQuotes.length);
      setIsRefreshing(false);
    }, 500);
  };

  const currentQuote = wisdomQuotes[currentWisdom];

  return (
    <Card className="bg-gradient-to-br from-grimoire-primary/5 to-grimoire-primary/10 border-grimoire-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-grimoire-primary" />
            <CardTitle className="text-lg text-grimoire-foreground">Daily Wisdom</CardTitle>
          </div>
          <Button
            onClick={handleRefresh}
            variant="ghost"
            size="sm"
            disabled={isRefreshing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          key={currentWisdom}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <blockquote className="text-lg italic text-grimoire-foreground leading-relaxed">
            "{currentQuote.text}"
          </blockquote>
          
          <div className="text-sm text-grimoire-primary font-medium">
            — {currentQuote.source}
          </div>
          
          <CardDescription className="text-grimoire-foreground/70 leading-relaxed">
            <strong>Reflection:</strong> {currentQuote.reflection}
          </CardDescription>
        </motion.div>

        <div className="flex justify-center pt-2">
          <div className="flex gap-1">
            {wisdomQuotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentWisdom(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentWisdom 
                    ? 'bg-grimoire-primary' 
                    : 'bg-grimoire-primary/30 hover:bg-grimoire-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyWisdom;
