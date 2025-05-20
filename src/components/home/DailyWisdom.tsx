
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const wisdomQuotes = [
  {
    quote: "In stillness, find your power. In silence, hear your truth.",
    guidance: "Focus on inner clarity and purpose today."
  },
  {
    quote: "The universe speaks in symbols and synchronicities. Learn to listen.",
    guidance: "Pay attention to recurring patterns in your experience."
  },
  {
    quote: "Your thoughts are echoes through the void. Choose them with precision.",
    guidance: "Practice disciplined thinking and deliberate intent."
  },
  {
    quote: "Between the worlds of form and formlessness, you are the bridge.",
    guidance: "Work on integrating your spiritual insights into material reality."
  },
  {
    quote: "The boundary between magic and reality exists only in perception.",
    guidance: "Challenge your assumptions about what's possible."
  },
  {
    quote: "To know, to will, to dare, and to keep silent - these are the keys.",
    guidance: "Balance action with discretion in your practice today."
  },
  {
    quote: "The shadows you resist contain your greatest power.",
    guidance: "Look honestly at what you've been avoiding."
  },
  {
    quote: "Reality is plastic to the will that understands its true nature.",
    guidance: "Examine the beliefs that shape your experience."
  },
  {
    quote: "The path is revealed one step at a time, not all at once.",
    guidance: "Trust the unfolding process rather than demanding complete clarity."
  },
  {
    quote: "Your attention is your most potent magical tool. Direct it wisely.",
    guidance: "Notice where your focus habitually goes and realign if necessary."
  }
];

const DailyWisdom: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [currentWisdom, setCurrentWisdom] = useState(wisdomQuotes[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRevealing, setIsRevealing] = useState(true);

  useEffect(() => {
    // Initial random wisdom
    const todayIndex = new Date().getDate() % wisdomQuotes.length;
    setCurrentWisdom(wisdomQuotes[todayIndex]);
    
    // Animation timing
    const timer = setTimeout(() => {
      setIsRevealing(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const getNewWisdom = () => {
    setIsRefreshing(true);
    setIsRevealing(true);
    
    // Simulating energetic connection
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * wisdomQuotes.length);
      setCurrentWisdom(wisdomQuotes[randomIndex]);
      setIsRefreshing(false);
      
      setTimeout(() => {
        setIsRevealing(false);
      }, 1000);
    }, 1200);
  };

  return (
    <Card className={`bg-grimoire-muted relative overflow-hidden ${className}`}>
      {/* Animating background pattern */}
      <div className="absolute inset-0 sacred-pattern opacity-10"></div>
      
      {/* Energetic pulse effect */}
      <motion.div
        className="absolute inset-0 bg-grimoire-primary/5 rounded-lg"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <CardContent className="p-4 relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            animate={{
              rotate: isRefreshing ? 360 : 0,
              scale: isRefreshing ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: isRefreshing ? 1.2 : 0.3 }}
          >
            <Star className="h-4 w-4 text-grimoire-primary grimoire-glow" />
          </motion.div>
          <h3 className="text-sm font-medium">Today's Wisdom</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto h-8 w-8 p-0" 
            onClick={getNewWisdom}
            disabled={isRefreshing}
          >
            <RefreshCw 
              className={`h-4 w-4 text-grimoire-foreground/70 ${isRefreshing ? 'animate-spin' : ''}`} 
            />
          </Button>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isRevealing ? [0, 1] : 1,
            y: isRevealing ? [10, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-grimoire-foreground/80 italic mb-3">
            "{currentWisdom.quote}"
          </p>
          <p className="text-xs text-grimoire-foreground/60">
            {currentWisdom.guidance}
          </p>
        </motion.div>
        
        {/* Subtle shimmer effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.05, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 7,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default DailyWisdom;
