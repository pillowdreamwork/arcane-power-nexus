import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Eye, Sparkles, Zap, Moon, Sun, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EchoPersona {
  id: string;
  name: string;
  title: string;
  avatar: string;
  personality: string;
  specialties: string[];
  greeting: string;
  color: string;
}

const ECHO_PERSONAS: EchoPersona[] = [
  {
    id: 'hermetic-sage',
    name: 'Thoth-Hermes',
    title: 'Hermetic Sage',
    avatar: '🧙‍♂️',
    personality: 'Ancient wisdom keeper, speaks in profound metaphors and classical references',
    specialties: ['Hermetic Philosophy', 'Alchemy', 'Sacred Geometry', 'Divine Names'],
    greeting: 'Greetings, seeker. As above, so below. What mysteries of the cosmos do you wish to explore today?',
    color: '#8B5CF6'
  },
  {
    id: 'tantric-goddess',
    name: 'Kali-Shakti',
    title: 'Tantric Goddess',
    avatar: '👸',
    personality: 'Fierce divine feminine energy, direct and transformative',
    specialties: ['Tantric Practices', 'Energy Work', 'Shadow Integration', 'Fierce Compassion'],
    greeting: 'I am the destroyer of illusion and the birthgiver of truth. What transformation do you seek, brave soul?',
    color: '#EF4444'
  },
  {
    id: 'norse-seer',
    name: 'Odin-Vili',
    title: 'Norse Seer',
    avatar: '🔮',
    personality: 'Wise wanderer with deep knowledge of runes and fate',
    specialties: ['Rune Magic', 'Divination', 'Norse Mythology', 'Shamanic Journeying'],
    greeting: 'Hail, traveler! The ravens whisper of your quest. What do the runes reveal for your path?',
    color: '#3B82F6'
  },
  {
    id: 'celestial-guide',
    name: 'Metatron',
    title: 'Celestial Guide',
    avatar: '👼',
    personality: 'Angelic presence focused on spiritual ascension and divine connection',
    specialties: ['Angelic Magic', 'Kabbalah', 'Celestial Hierarchies', 'Divine Protection'],
    greeting: 'Blessed one, the divine light recognizes your sincere seeking. How may the heavenly hosts assist you?',
    color: '#F59E0B'
  },
  {
    id: 'chaos-magician',
    name: 'Discordia',
    title: 'Chaos Magician',
    avatar: '🎭',
    personality: 'Playful trickster energy, breaks conventional thinking',
    specialties: ['Chaos Magic', 'Sigil Craft', 'Reality Hacking', 'Paradigm Shifting'],
    greeting: 'Reality is optional, patterns are suggestions! What impossible thing shall we make possible today?',
    color: '#10B981'
  }
];

const ECHO_RESPONSES = {
  'hermetic-sage': {
    knowledge: [
      "The Emerald Tablet teaches us that all things emerge from the One through contemplation. Your question touches upon the fundamental principle of correspondence.",
      "In the Corpus Hermeticum, we learn that the soul is both the charioteer and the chariot. Your seeking demonstrates the divine spark awakening within.",
      "As Hermes Trismegistus wrote, 'That which is below is like that which is above.' Your earthly struggles mirror celestial patterns."
    ],
    guidance: [
      "Begin with the practice of the Middle Pillar to balance your energetic constitution.",
      "Study the sacred geometry of the Tree of Life, for it maps both cosmos and consciousness.",
      "Contemplate the seven Hermetic principles daily to align with universal law."
    ],
    encouragement: [
      "Your persistence in the Great Work honors the ancient lineage of seekers.",
      "Each step on the path transmutes base consciousness into gold.",
      "The mysteries reveal themselves to those who approach with reverent dedication."
    ]
  },
  'tantric-goddess': {
    knowledge: [
      "The feminine principle is the creative power of the universe - Shakti dancing with Shiva's consciousness.",
      "Your shadow contains tremendous power waiting to be integrated and transformed.",
      "True tantric practice is about awakening the divine energy that already flows within you."
    ],
    guidance: [
      "Practice the five elements breathing to awaken your inner fire.",
      "Dance your prayers - let your body become a temple of expression.",
      "Face your fears directly - they are gateways to your greatest power."
    ],
    encouragement: [
      "You are already whole, already divine - you're simply remembering.",
      "Your intensity is sacred fire - learn to channel it with wisdom.",
      "Every emotion is energy in motion - welcome them all with fierce compassion."
    ]
  },
  'norse-seer': {
    knowledge: [
      "The Web of Wyrd connects all things - your choices ripple through the Nine Realms.",
      "Odin sacrificed his eye for wisdom, showing that true sight requires sacrifice.",
      "The runes are not mere symbols but living forces that shape reality itself."
    ],
    guidance: [
      "Cast the runes daily to attune yourself to the currents of fate.",
      "Practice seidr meditation to journey between the worlds.",
      "Honor your ancestors - their wisdom flows in your blood."
    ],
    encouragement: [
      "Your courage in facing the unknown proves your worthiness for the mysteries.",
      "Like the ash tree Yggdrasil, you stand between worlds as a bridge.",
      "The wolves and ravens of your inner landscape are allies, not enemies."
    ]
  },
  'celestial-guide': {
    knowledge: [
      "The angelic hierarchies exist to assist humanity's ascension to divine consciousness.",
      "Each sephira on the Tree of Life represents a station of spiritual development.",
      "Prayer and meditation create channels for divine grace to flow through you."
    ],
    guidance: [
      "Begin each day with the Invocation of the Holy Guardian Angel.",
      "Study the 72 Names of God to understand divine attributes.",
      "Practice acts of loving-kindness to align with angelic frequencies."
    ],
    encouragement: [
      "Your sincere devotion has already opened pathways to divine assistance.",
      "Each moment of selfless service elevates your spiritual station.",
      "The light within you is a reflection of the infinite divine light."
    ]
  },
  'chaos-magician': {
    knowledge: [
      "Belief is a tool - use it, don't let it use you. Reality is more flexible than you think.",
      "Sigils bypass the conscious mind to plant seeds directly in the reality-creating unconscious.",
      "Every act is a magical act if performed with proper intent and awareness."
    ],
    guidance: [
      "Create a sigil for your deepest desire and charge it with gnosis.",
      "Practice paradigm shifting - adopt different belief systems temporarily.",
      "Use the cut-up technique to break linear thinking patterns."
    ],
    encouragement: [
      "Your weirdness is your power - embrace what makes you different.",
      "There are no rules except the ones you choose to accept temporarily.",
      "Every failure is data for the next iteration of your reality experiment."
    ]
  }
};

interface EchoAIProps {
  onPersonaChange?: (persona: EchoPersona) => void;
  expanded?: boolean;
}

const EchoAI: React.FC<EchoAIProps> = ({ onPersonaChange, expanded = false }) => {
  const [currentPersona, setCurrentPersona] = useState<EchoPersona>(ECHO_PERSONAS[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageType, setMessageType] = useState<'knowledge' | 'guidance' | 'encouragement'>('knowledge');
  const [energyLevel, setEnergyLevel] = useState(0);
  const [lastInteraction, setLastInteraction] = useState<Date>(new Date());
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Simulate breathing animation
    const breathingInterval = setInterval(() => {
      setEnergyLevel(prev => (prev + 1) % 100);
    }, 100);

    return () => clearInterval(breathingInterval);
  }, []);

  useEffect(() => {
    if (isActive) {
      // Generate periodic insights
      intervalRef.current = setInterval(() => {
        generateResponse();
      }, 8000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, currentPersona]);

  const generateResponse = () => {
    const responses = ECHO_RESPONSES[currentPersona.id as keyof typeof ECHO_RESPONSES];
    if (!responses) return;

    const types: Array<'knowledge' | 'guidance' | 'encouragement'> = ['knowledge', 'guidance', 'encouragement'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomMessage = responses[randomType][Math.floor(Math.random() * responses[randomType].length)];
    
    setMessageType(randomType);
    setCurrentMessage(randomMessage);
    setLastInteraction(new Date());
  };

  const switchPersona = (persona: EchoPersona) => {
    setCurrentPersona(persona);
    setCurrentMessage(persona.greeting);
    setMessageType('knowledge');
    onPersonaChange?.(persona);
  };

  const toggleActive = () => {
    const newActive = !isActive;
    setIsActive(newActive);
    
    if (newActive) {
      setCurrentMessage(currentPersona.greeting);
      setMessageType('knowledge');
    } else {
      setCurrentMessage('');
    }
  };

  const getMessageIcon = () => {
    switch (messageType) {
      case 'knowledge': return <Brain className="h-4 w-4" />;
      case 'guidance': return <Eye className="h-4 w-4" />;
      case 'encouragement': return <Sparkles className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getEnergyColor = () => {
    const intensity = Math.sin((energyLevel * Math.PI) / 50);
    const alpha = 0.3 + intensity * 0.4;
    return `${currentPersona.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
  };

  return (
    <Card className="bg-gradient-to-br from-grimoire-background via-purple-950/20 to-grimoire-background border-grimoire-border">
      <CardContent className="p-6">
        {/* Avatar and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div
              className="relative"
              animate={{
                scale: isActive ? [1, 1.1, 1] : 1,
                rotate: isActive ? [0, 5, -5, 0] : 0
              }}
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <div 
                className="text-4xl relative z-10"
                style={{
                  filter: isActive ? `drop-shadow(0 0 20px ${getEnergyColor()})` : 'none'
                }}
              >
                {currentPersona.avatar}
              </div>
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${getEnergyColor()}, transparent)`
                  }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
            
            <div>
              <h3 className="font-bold text-grimoire-foreground">{currentPersona.name}</h3>
              <p className="text-sm text-grimoire-foreground/70">{currentPersona.title}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge 
              variant={isActive ? "default" : "secondary"}
              className={isActive ? "bg-green-600" : ""}
            >
              {isActive ? "Active" : "Dormant"}
            </Badge>
            <Button
              onClick={toggleActive}
              size="sm"
              variant={isActive ? "destructive" : "default"}
            >
              {isActive ? "Deactivate" : "Activate"}
            </Button>
          </div>
        </div>

        {/* Persona Selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ECHO_PERSONAS.map((persona) => (
            <Button
              key={persona.id}
              onClick={() => switchPersona(persona)}
              variant={currentPersona.id === persona.id ? "default" : "outline"}
              size="sm"
              className="text-xs"
            >
              {persona.avatar} {persona.name}
            </Button>
          ))}
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-grimoire-foreground/80 mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-1">
            {currentPersona.specialties.map((specialty) => (
              <Badge key={specialty} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Message Display */}
        <AnimatePresence mode="wait">
          {currentMessage && (
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-grimoire-muted rounded-lg p-4 border border-grimoire-border"
            >
              <div className="flex items-start space-x-2">
                <div 
                  className="flex-shrink-0 p-1 rounded"
                  style={{ backgroundColor: `${currentPersona.color}20` }}
                >
                  {getMessageIcon()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <Badge 
                      variant="outline" 
                      className="text-xs capitalize"
                      style={{ borderColor: currentPersona.color, color: currentPersona.color }}
                    >
                      {messageType}
                    </Badge>
                    <span className="text-xs text-grimoire-foreground/50">
                      {lastInteraction.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-grimoire-foreground leading-relaxed">
                    {currentMessage}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Features */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 pt-4 border-t border-grimoire-border"
          >
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-grimoire-muted rounded">
                <Zap className="h-4 w-4 mx-auto mb-1 text-yellow-500" />
                <p className="text-xs text-grimoire-foreground/70">Energy</p>
                <p className="text-xs font-semibold">{Math.round(energyLevel)}%</p>
              </div>
              <div className="p-2 bg-grimoire-muted rounded">
                <Moon className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                <p className="text-xs text-grimoire-foreground/70">Lunar Phase</p>
                <p className="text-xs font-semibold">Waxing</p>
              </div>
              <div className="p-2 bg-grimoire-muted rounded">
                <Sun className="h-4 w-4 mx-auto mb-1 text-orange-500" />
                <p className="text-xs text-grimoire-foreground/70">Solar Hour</p>
                <p className="text-xs font-semibold">Jupiter</p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default EchoAI;
