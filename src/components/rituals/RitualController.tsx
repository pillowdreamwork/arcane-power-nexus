
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { 
  Circle, 
  Triangle, 
  Sparkles, 
  Moon, 
  Sun, 
  Star,
  Wand2,
  Flame
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface RitualStage {
  name: string;
  description: string;
  duration: number;
  energyRequired: number;
  icon: React.ReactNode;
  instructions: string[];
  mantra?: string;
}

interface RitualControllerProps {
  ritualType: string;
  onEnergyChange: (value: number) => void;
  energyLevel: number;
  className?: string;
}

const ritualStages: Record<string, RitualStage[]> = {
  circle: [
    {
      name: "Purification",
      description: "Cleanse the ritual space of unwanted energies",
      duration: 60,
      energyRequired: 20,
      icon: <Circle className="h-5 w-5" />,
      instructions: [
        "Focus on your breathing, inhale for 4 counts, hold for 4, exhale for 8",
        "Visualize a white light flowing through your body, cleansing impurities",
        "Imagine this light expanding to fill the ritual space"
      ]
    },
    {
      name: "Circle Casting",
      description: "Establish the sacred boundary",
      duration: 90,
      energyRequired: 40,
      icon: <Circle className="h-5 w-5" />,
      instructions: [
        "Visualize energy flowing from your center down through your arm",
        "Trace the circle in your mind's eye, seeing it glow with blue-white fire",
        "Affirm: 'I cast this circle as a boundary between worlds'"
      ],
      mantra: "Kye Ho! Guardian of the boundary, protect this sacred space"
    },
    {
      name: "Entity Invocation",
      description: "Call forth the desired spiritual presence",
      duration: 120,
      energyRequired: 60,
      icon: <Star className="h-5 w-5" />,
      instructions: [
        "Focus on the center of the circle, clear your mind of all distractions",
        "Visualize a doorway opening in the center of the circle",
        "Call forth the entity by its true name and sigil"
      ],
      mantra: "By names known and unknown, through gates of horn and ivory, I call thee forth"
    },
    {
      name: "Communion",
      description: "Exchange energy and information",
      duration: 180,
      energyRequired: 80,
      icon: <Sparkles className="h-5 w-5" />,
      instructions: [
        "Establish clear communication intent with the summoned entity",
        "Listen with your mind's eye and inner ear",
        "Exchange energetic signatures to verify identity",
        "Present your request or question with clarity and respect"
      ]
    },
    {
      name: "Dismissal",
      description: "Respectfully close the connection",
      duration: 60,
      energyRequired: 100,
      icon: <Moon className="h-5 w-5" />,
      instructions: [
        "Thank the entity for its presence and assistance",
        "Visualize the doorway closing, sealing the boundary between worlds",
        "Affirm: 'By my will, this ritual is complete'"
      ],
      mantra: "As above, so below. As within, so without. The circle is open but unbroken."
    }
  ],
  triangle: [
    {
      name: "Centering",
      description: "Ground and center your consciousness",
      duration: 60,
      energyRequired: 20,
      icon: <Triangle className="h-5 w-5" />,
      instructions: [
        "Sit in a comfortable position with spine erect",
        "Bring awareness to your breath, allowing it to slow naturally",
        "Feel your connection to the earth beneath you"
      ]
    },
    {
      name: "Triangle Formation",
      description: "Create the manifestation triangle",
      duration: 90,
      energyRequired: 40,
      icon: <Triangle className="h-5 w-5" />,
      instructions: [
        "Visualize three points of light forming a perfect equilateral triangle",
        "Each point represents an aspect: creation, preservation, dissolution",
        "See the triangle filling with prismatic light"
      ],
      mantra: "Triform perfection, vessel of manifestation, appear now before me"
    },
    {
      name: "Sigil Charging",
      description: "Activate the key symbol for manifestation",
      duration: 120,
      energyRequired: 60,
      icon: <Wand2 className="h-5 w-5" />,
      instructions: [
        "Place your sigil or symbol in the center of the triangle",
        "Direct your focused intent into the symbol",
        "Visualize energy from the three points converging on the sigil"
      ],
      mantra: "By will and word and perfect vision, this symbol is charged with purpose"
    },
    {
      name: "Manifestation",
      description: "Project the charged intent into reality",
      duration: 120,
      energyRequired: 80,
      icon: <Sun className="h-5 w-5" />,
      instructions: [
        "Release all emotional attachment to the outcome",
        "Visualize your intention as already manifested",
        "Project the charged sigil outward into universal consciousness"
      ]
    },
    {
      name: "Grounding",
      description: "Return to normal consciousness",
      duration: 60,
      energyRequired: 100,
      icon: <Star className="h-5 w-5" />,
      instructions: [
        "Feel the excess energy draining into the earth",
        "Take three deep breaths to return to ordinary awareness",
        "Affirm: 'It is done'"
      ],
      mantra: "As thought becomes form, and form becomes reality, so my will is done"
    }
  ],
  mirror: [
    {
      name: "Preparation",
      description: "Prepare the scrying surface and mind",
      duration: 60,
      energyRequired: 20,
      icon: <Moon className="h-5 w-5" />,
      instructions: [
        "Place the dark mirror or scrying surface at eye level",
        "Dim the lights and light a single candle behind you",
        "Take three deep breaths and clear your mind"
      ]
    },
    {
      name: "Gazing",
      description: "Enter the receptive state for visions",
      duration: 120,
      energyRequired: 40,
      icon: <Star className="h-5 w-5" />,
      instructions: [
        "Focus your gaze on the center of the mirror",
        "Allow your vision to soften and unfocus slightly",
        "Keep your breathing slow and rhythmic"
      ],
      mantra: "Veil between worlds, thin and part, reveal to me what is hidden"
    },
    {
      name: "Threshold Crossing",
      description: "Pierce the veil between worlds",
      duration: 180,
      energyRequired: 60,
      icon: <Wand2 className="h-5 w-5" />,
      instructions: [
        "Visualize the surface of the mirror becoming mist",
        "Project your consciousness through this mist",
        "Feel yourself crossing the threshold between realms"
      ],
      mantra: "I stand between all worlds, a traveler of the spaces between"
    },
    {
      name: "Vision Reception",
      description: "Receive and record insights",
      duration: 240,
      energyRequired: 80,
      icon: <Sparkles className="h-5 w-5" />,
      instructions: [
        "Remain receptive to images, sounds, or feelings that arise",
        "Do not analyze or judge, simply observe",
        "Allow information to flow without resistance"
      ]
    },
    {
      name: "Return",
      description: "Return to ordinary consciousness",
      duration: 60,
      energyRequired: 100,
      icon: <Circle className="h-5 w-5" />,
      instructions: [
        "Visualize yourself returning through the mirror",
        "Feel your consciousness fully reintegrating with your body",
        "Ground excess energy into the earth"
      ],
      mantra: "As the veil closes once more, I return whole and protected"
    }
  ],
  yajna: [
    {
      name: "Sanctification",
      description: "Prepare the sacred fire space",
      duration: 60,
      energyRequired: 20,
      icon: <Flame className="h-5 w-5" />,
      instructions: [
        "Purify the ritual space with sacred water",
        "Arrange the offering materials in prescribed order",
        "Light the initial flame with proper invocation"
      ],
      mantra: "Agni prakashaye namah (Salutations to the illuminating fire)"
    },
    {
      name: "Invocation",
      description: "Call the divine forces to witness",
      duration: 90,
      energyRequired: 40,
      icon: <Sun className="h-5 w-5" />,
      instructions: [
        "Face east and invite the cosmic witnesses",
        "Recite the specific mantras for each direction",
        "Visualize divine presences gathering around the fire"
      ],
      mantra: "Ye bhuta preta pishacha, sarve gacchantu bhagavan"
    },
    {
      name: "Offering",
      description: "Present sacred substances to the fire",
      duration: 120,
      energyRequired: 60,
      icon: <Sparkles className="h-5 w-5" />,
      instructions: [
        "Hold each offering to your heart center first",
        "Present it to the fire with the appropriate mantra",
        "Visualize the essence of the offering transforming into light"
      ],
      mantra: "Idam na mama (This is not mine)"
    },
    {
      name: "Transformation",
      description: "Internal and external transmutation",
      duration: 180,
      energyRequired: 80,
      icon: <Wand2 className="h-5 w-5" />,
      instructions: [
        "Visualize the quality you wish to transmute",
        "See it being consumed by the sacred fire",
        "Feel the corresponding transformation within yourself"
      ]
    },
    {
      name: "Completion",
      description: "Close the ceremony with gratitude",
      duration: 60,
      energyRequired: 100,
      icon: <Circle className="h-5 w-5" />,
      instructions: [
        "Express gratitude to the divine forces present",
        "Make final offerings of water and flowers",
        "Allow the fire to naturally complete its cycle"
      ],
      mantra: "Purnamadah purnamidam, purnat purnamudachyate"
    }
  ]
};

const RitualController: React.FC<RitualControllerProps> = ({
  ritualType,
  onEnergyChange,
  energyLevel,
  className = "",
}) => {
  const [activeStage, setActiveStage] = useState(0);
  const [isRitualActive, setIsRitualActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const { toast } = useToast();

  const currentStages = ritualStages[ritualType] || ritualStages.circle;
  const currentStage = currentStages[activeStage];
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRitualActive) {
      interval = setInterval(() => {
        setTimer(prev => {
          const newTime = prev + 1;
          
          // Cycle through breathing phases
          if (newTime % 4 === 0) {
            setBreathingPhase("hold");
          } else if (newTime % 8 === 0) {
            setBreathingPhase("exhale");
          } else if (newTime % 16 === 0) {
            setBreathingPhase("inhale");
          }
          
          // Gradually increase energy
          if (newTime % 10 === 0 && energyLevel < currentStage.energyRequired) {
            onEnergyChange(Math.min(energyLevel + 5, 100));
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRitualActive, energyLevel, currentStage, onEnergyChange]);
  
  const startRitual = () => {
    setIsRitualActive(true);
    setTimer(0);
    toast({
      title: `${currentStage.name} Initiated`,
      description: "Focus your intent and follow the instructions",
    });
  };
  
  const pauseRitual = () => {
    setIsRitualActive(false);
    toast({
      title: "Ritual Paused",
      description: "The energy flow has been temporarily suspended",
    });
  };
  
  const nextStage = () => {
    if (activeStage < currentStages.length - 1) {
      setActiveStage(prev => prev + 1);
      setTimer(0);
      setIsRitualActive(false);
      toast({
        title: "Stage Complete",
        description: `Moving to: ${currentStages[activeStage + 1].name}`,
      });
    } else {
      // Ritual complete
      setIsRitualActive(false);
      toast({
        title: "Ritual Complete",
        description: "All stages have been successfully performed",
        // Fixed: Removing the invalid "success" variant
      });
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={`bg-grimoire-muted border-grimoire-border ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center text-grimoire-primary">
          {React.cloneElement(currentStage.icon as React.ReactElement, { 
            className: "mr-2 h-5 w-5 text-grimoire-primary animate-pulse-subtle" 
          })}
          <span>{currentStage.name}</span>
          <span className="ml-auto text-sm text-grimoire-foreground/70">
            Stage {activeStage + 1} of {currentStages.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-grimoire-foreground/80">{currentStage.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-grimoire-foreground/70">Required Energy</span>
            <span className="text-sm">{energyLevel}/{currentStage.energyRequired}</span>
          </div>
          <Progress value={(energyLevel / currentStage.energyRequired) * 100} className="h-2" />
        </div>
        
        <div className="rounded-md bg-grimoire-background/50 p-4">
          <h4 className="text-sm font-medium mb-2 text-grimoire-foreground">Instructions:</h4>
          <ul className="space-y-2">
            {currentStage.instructions.map((instruction, idx) => (
              <motion.li 
                key={idx}
                className="text-sm text-grimoire-foreground/80 flex"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="text-grimoire-primary mr-2">•</span>
                {instruction}
              </motion.li>
            ))}
          </ul>
        </div>
        
        {currentStage.mantra && (
          <motion.div 
            className="bg-grimoire-primary/10 border border-grimoire-primary/20 rounded-md p-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm font-medium mb-1 text-grimoire-primary">Mantra:</h4>
            <p className="text-sm italic text-grimoire-foreground">"{currentStage.mantra}"</p>
          </motion.div>
        )}
        
        {isRitualActive && (
          <div className="flex flex-col items-center space-y-3 mt-4">
            <div className="text-2xl font-medium text-grimoire-primary">{formatTime(timer)}</div>
            <motion.div 
              className="w-16 h-16 rounded-full bg-grimoire-primary/20 flex items-center justify-center text-grimoire-primary"
              animate={{
                scale: breathingPhase === "inhale" ? [1, 1.2] : 
                       breathingPhase === "hold" ? 1.2 : [1.2, 1],
              }}
              transition={{ duration: breathingPhase === "hold" ? 2 : 4, ease: "easeInOut" }}
            >
              {breathingPhase === "inhale" ? "Inhale" : 
               breathingPhase === "hold" ? "Hold" : "Exhale"}
            </motion.div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isRitualActive ? (
          <Button 
            onClick={startRitual} 
            className="bg-grimoire-primary hover:bg-grimoire-primary/90"
            disabled={energyLevel < currentStage.energyRequired}
          >
            {energyLevel < currentStage.energyRequired ? 
              "Gather More Energy" : "Begin Stage"}
          </Button>
        ) : (
          <Button onClick={pauseRitual} variant="outline">
            Pause
          </Button>
        )}
        
        <Button 
          onClick={nextStage} 
          disabled={energyLevel < currentStage.energyRequired || 
                   (isRitualActive && timer < currentStage.duration)}
          variant="outline"
          className="border-grimoire-primary/50 text-grimoire-primary"
        >
          {activeStage < currentStages.length - 1 ? "Complete & Next Stage" : "Complete Ritual"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RitualController;
