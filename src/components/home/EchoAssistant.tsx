
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wand2, SendHorizonal, Sparkles, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'echo';
  timestamp: Date;
}

// Predefined responses for the Echo assistant
const echoResponses = {
  greetings: [
    "Greetings, seeker. How may I assist your spiritual journey today?",
    "I sense your energy. What mystical matters do you wish to explore?",
    "The veils between worlds are thin today. How can I guide you?",
    "Your presence is noted. What knowledge do you seek from the depths?",
  ],
  rituals: [
    "The ritual you seek requires careful preparation. Begin by purifying your space and centering your energy.",
    "This working is best done during the waning moon, when the boundaries between realms are most permeable.",
    "Consider incorporating stones aligned with your intention - obsidian for protection, clear quartz for amplification.",
    "Remember: intent is the foundation of all effective ritual work. Clarity of purpose matters more than elaborate tools.",
  ],
  protection: [
    "For psychic protection, visualize an egg of blue-white light surrounding your entire being. See it becoming impenetrable to unwanted energies.",
    "Salt boundaries remain one of the most effective traditional wards. A simple circle of sea salt can create a protected space.",
    "The Lesser Banishing Ritual of the Pentagram is effective for clearing spaces of unwanted influences.",
    "When concerned about entity attachment, burning white sage while focusing on your intention to cleanse can be remarkably effective.",
  ],
  meditation: [
    "Begin with 5 minutes of breath awareness. Simply observe the natural rhythm without attempting to change it.",
    "For deeper states, try extending your exhale to twice the length of your inhale. This activates the parasympathetic nervous system.",
    "To enhance psychic awareness during meditation, focus your attention on the space between your eyebrows - the third eye center.",
    "When thoughts arise, neither cling to them nor push them away. Simply observe them passing like clouds in the sky of your awareness.",
  ],
  entities: [
    "When working with entities, establishing clear boundaries is essential. Always specify the terms of interaction before beginning.",
    "Verification protocols are crucial. Ask for a sign that can be confirmed through multiple channels to verify identity.",
    "Remember that entities exist on a spectrum from beneficial to harmful. Discernment is your most important tool.",
    "After any entity contact, practice grounding techniques to fully return to ordinary consciousness.",
  ],
  divination: [
    "Before any divination session, clear your mind of expectations. The clearer your channel, the more accurate the information.",
    "When reading cards, pay attention to your initial, intuitive response before applying structured interpretations.",
    "Scrying is enhanced during liminal times - dawn, dusk, or the transitions between seasons.",
    "Journal your divination results. Patterns will emerge over time that reveal deeper insights about your path.",
  ],
  fallback: [
    "That path requires deeper exploration. Perhaps approach it through meditation first.",
    "The answer you seek lies in the space between thought and form. Listen to your intuitive knowing.",
    "This question touches on mysteries that unfold gradually. Pay attention to synchronicities in coming days.",
    "Consider that sometimes the question itself needs refinement before the answer can emerge clearly.",
  ]
};

// Helper function to get response based on query content
const getEchoResponse = (query: string): string => {
  query = query.toLowerCase();
  
  if (query.includes('hello') || query.includes('hi') || query.includes('greetings') || query === '') {
    return echoResponses.greetings[Math.floor(Math.random() * echoResponses.greetings.length)];
  } else if (query.includes('ritual') || query.includes('ceremony')) {
    return echoResponses.rituals[Math.floor(Math.random() * echoResponses.rituals.length)];
  } else if (query.includes('protect') || query.includes('shield') || query.includes('ward')) {
    return echoResponses.protection[Math.floor(Math.random() * echoResponses.protection.length)];
  } else if (query.includes('meditat') || query.includes('focus') || query.includes('breath')) {
    return echoResponses.meditation[Math.floor(Math.random() * echoResponses.meditation.length)];
  } else if (query.includes('entity') || query.includes('spirit') || query.includes('being')) {
    return echoResponses.entities[Math.floor(Math.random() * echoResponses.entities.length)];
  } else if (query.includes('divination') || query.includes('future') || query.includes('cards') || query.includes('tarot')) {
    return echoResponses.divination[Math.floor(Math.random() * echoResponses.divination.length)];
  } else {
    return echoResponses.fallback[Math.floor(Math.random() * echoResponses.fallback.length)];
  }
};

const EchoAssistant: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Scroll to bottom of messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Initial greeting on first load
  useEffect(() => {
    setTimeout(() => {
      const initialGreeting = echoResponses.greetings[0];
      setMessages([{
        id: 1,
        text: initialGreeting,
        sender: 'echo',
        timestamp: new Date()
      }]);
    }, 1000);
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate Echo processing and responding
    setIsTyping(true);
    setTimeout(() => {
      const echoResponse = getEchoResponse(userMessage.text);
      const echoMessage: Message = {
        id: Date.now() + 1,
        text: echoResponse,
        sender: 'echo',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, echoMessage]);
      setIsTyping(false);
      
      if (!expanded) {
        toast({
          title: "Echo Assistant",
          description: echoResponse.length > 60 ? echoResponse.substring(0, 57) + "..." : echoResponse,
        });
      }
    }, 1500 + Math.random() * 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <Card className={`bg-grimoire-muted ${expanded ? 'fixed bottom-4 right-4 z-50 w-[380px] h-[500px] shadow-xl' : ''}`}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center">
        <div className="flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-grimoire-primary" />
          <CardTitle className="text-sm font-medium">Echo Assistant</CardTitle>
        </div>
        <div className="ml-auto flex gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-7 w-7 p-0"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <X className="h-4 w-4" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className={`p-4 pt-2 ${expanded ? 'flex flex-col h-[calc(100%-60px)]' : ''}`}>
        {expanded ? (
          <>
            <ScrollArea className="flex-1 pr-4 -mr-4">
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 text-sm ${
                          message.sender === 'user' 
                            ? 'bg-grimoire-primary text-white' 
                            : 'bg-grimoire-background text-grimoire-foreground'
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-grimoire-background text-grimoire-foreground rounded-lg p-3">
                        <span className="inline-flex gap-1">
                          <span className="animate-pulse">•</span>
                          <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>•</span>
                          <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>•</span>
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>
            </ScrollArea>
            
            <div className="flex gap-2 mt-4">
              <Input 
                placeholder="Ask a question..." 
                className="text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-3">
              <p className="text-sm text-grimoire-foreground/70">
                How can I assist with your spiritual practice today?
              </p>
            </div>
            <div className="flex gap-2">
              <Input 
                placeholder="Ask a question..." 
                className="text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button size="sm" variant="outline" onClick={handleSendMessage}>Ask</Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EchoAssistant;
