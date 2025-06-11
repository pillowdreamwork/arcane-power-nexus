
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
  const [energyLevel, setEnergyLevel] = useState(0);
  const [isGlowing, setIsGlowing] = useState(false);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    // Initial random wisdom
    const todayIndex = new Date().getDate() % wisdomQuotes.length;
    setCurrentWisdom(wisdomQuotes[todayIndex]);
    
    // Animation timing
    const timer = setTimeout(() => {
      setIsRevealing(false);
      
      // Start energy buildup
      const energyTimer = setInterval(() => {
        setEnergyLevel(prev => {
          if (prev >= 100) {
            clearInterval(energyTimer);
            setIsGlowing(true);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      
      return () => {
        clearInterval(energyTimer);
      };
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Automatic glow pulsation
  useEffect(() => {
    if (isGlowing) {
      const pulseInterval = setInterval(() => {
        setIsGlowing(prev => !prev);
      }, 3000);
      
      return () => clearInterval(pulseInterval);
    }
  }, [isGlowing]);

  const getNewWisdom = () => {
    setIsRefreshing(true);
    setIsRevealing(true);
    setIsGlowing(false);
    setEnergyLevel(0);
    
    // Simulating energetic connection
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * wisdomQuotes.length);
      setCurrentWisdom(wisdomQuotes[randomIndex]);
      setIsRefreshing(false);
      
      setTimeout(() => {
        setIsRevealing(false);
        
        // Restart energy buildup
        const energyTimer = setInterval(() => {
          setEnergyLevel(prev => {
            if (prev >= 100) {
              clearInterval(energyTimer);
              setIsGlowing(true);
              return 100;
            }
            return prev + 1;
          });
        }, 50);
      }, 1000);
    }, 1200);
  };

  // Particle effect for wisdom activation
  const WisdomParticles = () => {
    return isGlowing ? (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-grimoire-primary/80"
            initial={{ 
              x: quoteRef.current ? quoteRef.current.offsetWidth / 2 : 100, 
              y: quoteRef.current ? quoteRef.current.offsetHeight / 2 : 50,
              scale: 0,
              opacity: 1 
            }}
            animate={{ 
              x: [null, (Math.random() - 0.5) * 300], 
              y: [null, (Math.random() - 0.5) * 150],
              scale: [0, 2 + Math.random() * 2],
              opacity: [1, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 3,
              ease: "easeOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    ) : null;
  };

  return (
    <Card className={`bg-grimoire-muted relative overflow-hidden border border-grimoire-border ${className}`}>
      {/* Animated background pattern */}
      <motion.div 
        className="absolute inset-0 sacred-pattern opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 120,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
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
      
      {/* Wisdom energy progress */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-grimoire-primary via-purple-400 to-grimoire-primary"
        style={{ width: `${energyLevel}%`, opacity: energyLevel > 0 ? 0.6 : 0 }}
      />
      
      {/* Wisdom activation halo */}
      <AnimatePresence>
        {isGlowing && (
          <motion.div 
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0.8, 1.2, 1.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0) 70%)"
            }}
          />
        )}
      </AnimatePresence>
      
      <WisdomParticles />
      
      <CardContent className="p-4 relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            animate={{
              rotate: isRefreshing ? 360 : 0,
              scale: isRefreshing ? [1, 1.2, 1] : isGlowing ? [1, 1.2, 1] : 1,
            }}
            transition={{ 
              duration: isRefreshing ? 1.2 : 2, 
              repeat: isGlowing && !isRefreshing ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            {isGlowing ? (
              <Sparkles className="h-4 w-4 text-yellow-400 grimoire-glow" />
            ) : (
              <Star className="h-4 w-4 text-grimoire-primary grimoire-glow" />
            )}
          </motion.div>
          <h3 className="text-sm font-semibold text-grimoire-foreground font-inter">Today's Wisdom</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto h-8 w-8 p-0" 
            onClick={getNewWisdom}
            disabled={isRefreshing}
          >
            <RefreshCw 
              className={`h-4 w-4 text-grimoire-foreground/70 ${isRefreshing ? 'animate-spin' : ''} hover:text-grimoire-primary transition-colors`}
            />
          </Button>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWisdom.quote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isRevealing ? [0, 1] : 1,
              y: isRevealing ? [10, 0] : 0,
            }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              ref={quoteRef}
              className={`text-sm italic mb-3 ${isGlowing ? 'text-grimoire-primary font-medium grimoire-glow' : 'text-grimoire-foreground/80'}`}
              animate={isGlowing ? {
                textShadow: ["0 0 4px rgba(139,92,246,0)", "0 0 10px rgba(139,92,246,0.5)", "0 0 4px rgba(139,92,246,0)"]
              } : {}}
              transition={{ duration: 2, repeat: isGlowing ? Infinity : 0 }}
            >
              "{currentWisdom.quote}"
            </motion.p>
            <p className="text-xs text-grimoire-foreground/60">
              {currentWisdom.guidance}
            </p>
          </motion.div>
        </AnimatePresence>
        
        {/* Subtle shimmer effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-grimoire-foreground/10 to-transparent opacity-0"
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
