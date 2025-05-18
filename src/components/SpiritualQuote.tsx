
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const quotes = [
  {
    text: "The universe is not outside of you. Look inside yourself; everything that you want, you already are.",
    author: "Dattatreya"
  },
  {
    text: "The one who follows the path of liberation knows that the Self is the only God.",
    author: "Dattatreya Tantra"
  },
  {
    text: "All that is visible must grow beyond itself, extend into the realm of the invisible.",
    author: "Kashmir Shaivism"
  },
  {
    text: "He who knows himself, knows the universe.",
    author: "Ancient Wisdom"
  },
  {
    text: "The path of spirituality is not finding new things, but seeing with new eyes.",
    author: "Esoteric Teaching"
  },
  {
    text: "When you make the two into one, and when you make the inner like the outer and the outer like the inner... then you will enter the kingdom.",
    author: "Gnostic Text"
  },
  {
    text: "Consciousness is infinite, omnipresent, and the true form of reality itself.",
    author: "Tripura Doctrine"
  },
  {
    text: "Nature is the greatest teacher for those with eyes to see and ears to hear.",
    author: "Twenty-Four Gurus"
  }
];

interface SpiritualQuoteProps {
  className?: string;
}

const SpiritualQuote: React.FC<SpiritualQuoteProps> = ({ className = "" }) => {
  const [quote, setQuote] = useState(quotes[0]);
  const [fadeState, setFadeState] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(newQuote);
        setFadeState(true);
      }, 500);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={`bg-grimoire-muted/80 border-grimoire-border grimoire-border backdrop-blur-sm ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Sparkles className="h-4 w-4 text-grimoire-primary mr-2 grimoire-glow" />
          <span className="text-sm text-grimoire-foreground/80 font-medium">Spiritual Wisdom</span>
        </div>
        
        <div className={`transition-opacity duration-500 ${fadeState ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-grimoire-foreground/90 italic">
            "{quote.text}"
          </p>
          <p className="text-right text-sm mt-2 text-grimoire-foreground/70">
            — {quote.author}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpiritualQuote;
