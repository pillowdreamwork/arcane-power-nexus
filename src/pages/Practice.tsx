
import React, { useState } from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Triangle, Star, Circle, Zap, Shield, Wand2 as Wand, Sparkles, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import SpiritualQuote from "@/components/SpiritualQuote";

interface PracticeSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  category: string;
  steps: PracticeStep[];
  benefits: string[];
  icon: React.ElementType;
  color: string;
}

interface PracticeStep {
  id: number;
  title: string;
  instruction: string;
  duration: number;
}

const practiceSessions: PracticeSession[] = [
  {
    id: "meditation-1",
    title: "Void Meditation",
    description: "Connect with the primordial emptiness",
    duration: 15,
    level: "Beginner",
    category: "Meditation",
    icon: Triangle,
    color: "#8B5CF6",
    steps: [
      { id: 1, title: "Preparation", instruction: "Sit in a comfortable position with your back straight. Close your eyes and take three deep breaths.", duration: 2 },
      { id: 2, title: "Body Awareness", instruction: "Bring attention to your body, starting from your feet and moving up to your head. Notice any sensations without judgment.", duration: 3 },
      { id: 3, title: "Breath Focus", instruction: "Focus on your natural breathing. Don't try to control it, simply observe the inhale and exhale.", duration: 5 },
      { id: 4, title: "Void Awareness", instruction: "Allow your awareness to expand to the space around you. Notice the void between thoughts. Rest in this awareness.", duration: 4 },
      { id: 5, title: "Return", instruction: "Gradually bring your awareness back to your body and surroundings. Take a deep breath and open your eyes when ready.", duration: 1 },
    ],
    benefits: ["Reduced anxiety", "Increased focus", "Access to void consciousness"]
  },
  {
    id: "energy-circulation",
    title: "Energy Circulation",
    description: "Guide vital force through energy channels",
    duration: 10,
    level: "Intermediate",
    category: "Energy Work",
    icon: Circle,
    color: "#10B981",
    steps: [
      { id: 1, title: "Center", instruction: "Sit with spine erect. Place hands on your knees, palms up. Take deep breaths to center yourself.", duration: 2 },
      { id: 2, title: "Activate Base", instruction: "Bring awareness to the base of your spine. Visualize bright red energy gathering there.", duration: 1 },
      { id: 3, title: "Ascend", instruction: "Guide this energy upward through your spine, through each energy center, transforming from red to violet as it rises.", duration: 3 },
      { id: 4, title: "Crown Opening", instruction: "Allow the energy to reach the crown of your head and open like a lotus flower, connecting to higher consciousness.", duration: 2 },
      { id: 5, title: "Descend", instruction: "Guide the energy back down through the front of your body, completing the circuit.", duration: 2 },
    ],
    benefits: ["Energy balancing", "Chakra alignment", "Increased vitality"]
  },
  {
    id: "protection-ritual",
    title: "Psychic Shield",
    description: "Establish a protective energy barrier",
    duration: 8,
    level: "Beginner",
    category: "Protection",
    icon: Shield,
    color: "#3B82F6",
    steps: [
      { id: 1, title: "Grounding", instruction: "Stand with feet shoulder-width apart. Visualize roots extending from your feet deep into the earth.", duration: 2 },
      { id: 2, title: "Energy Gathering", instruction: "Draw energy up from the earth through your feet, filling your entire body with protective light.", duration: 2 },
      { id: 3, title: "Shield Creation", instruction: "Extend this energy outward in all directions, forming a sphere of protective light around you.", duration: 2 },
      { id: 4, title: "Reinforcement", instruction: "Strengthen the shield by affirming: 'I am protected in all dimensions. Only beneficial energies may enter my field.'", duration: 1 },
      { id: 5, title: "Seal", instruction: "Visualize the shield becoming permanent, yet permeable to positive energies. Express gratitude for your protection.", duration: 1 },
    ],
    benefits: ["Psychic protection", "Energy conservation", "Enhanced boundaries"]
  },
  {
    id: "astral-projection",
    title: "Astral Projection",
    description: "Conscious out-of-body experience",
    duration: 20,
    level: "Advanced",
    category: "Projection",
    icon: Star,
    color: "#F59E0B",
    steps: [
      { id: 1, title: "Deep Relaxation", instruction: "Lie down comfortably. Systematically relax each part of your body from toes to head until you feel heavy and peaceful.", duration: 5 },
      { id: 2, title: "Vibration State", instruction: "Focus on increasing the frequency of your energy. You may feel vibrations, buzzing, or pulsing sensations.", duration: 5 },
      { id: 3, title: "Separation", instruction: "Visualize yourself floating upward. Imagine reaching for something above you, or rolling out of your physical body.", duration: 5 },
      { id: 4, title: "Exploration", instruction: "Once separated, move away from your physical body. Look around and notice details of your surroundings.", duration: 4 },
      { id: 5, title: "Return", instruction: "To return, simply think of your physical body. Allow yourself to be drawn back in. Take deep breaths to reintegrate.", duration: 1 },
    ],
    benefits: ["Expanded consciousness", "Non-physical exploration", "Greater spiritual understanding"]
  },
  {
    id: "energy-charging",
    title: "Energy Harvesting",
    description: "Collect and store cosmic energy",
    duration: 12,
    level: "Intermediate",
    category: "Energy Work",
    icon: Zap,
    color: "#EC4899",
    steps: [
      { id: 1, title: "Opening", instruction: "Stand with feet shoulder-width apart, arms relaxed at your sides. Take deep breaths to center yourself.", duration: 2 },
      { id: 2, title: "Connection", instruction: "Raise your arms slowly to form a Y shape. Visualize yourself as a cosmic antenna, connecting to universal energy.", duration: 2 },
      { id: 3, title: "Inhalation", instruction: "As you inhale, visualize drawing down brilliant light energy through your hands and crown, filling your entire being.", duration: 3 },
      { id: 4, title: "Circulation", instruction: "Hold your breath briefly while visualizing this energy circulating and intensifying throughout your energy system.", duration: 2 },
      { id: 5, title: "Storage", instruction: "As you exhale, visualize this energy condensing and storing in your solar plexus as a brilliant sphere. Repeat several times.", duration: 3 },
    ],
    benefits: ["Increased vital energy", "Enhanced spiritual abilities", "Preparation for energy work"]
  },
  {
    id: "mind-influence",
    title: "Mind Influence",
    description: "Project thoughts for manifestation",
    duration: 15,
    level: "Advanced",
    category: "Psychic",
    icon: Wand,
    color: "#6366F1",
    steps: [
      { id: 1, title: "Mental Clarity", instruction: "Sit in meditation posture. Clear your mind of all distractions through slow, deliberate breathing.", duration: 3 },
      { id: 2, title: "Intention Formation", instruction: "Formulate a clear, precise intention. Visualize it in complete detail as if it already exists.", duration: 3 },
      { id: 3, title: "Energy Infusion", instruction: "Gather energy at your third eye. Infuse your visualized intention with this concentrated energy.", duration: 3 },
      { id: 4, title: "Projection", instruction: "Project this energized thought-form outward through your third eye into the collective consciousness.", duration: 3 },
      { id: 5, title: "Release", instruction: "Release all attachment to the outcome. Know that your intention has been set in motion and will manifest in its perfect time.", duration: 3 },
    ],
    benefits: ["Enhanced manifestation", "Thought projection", "Reality manipulation"]
  }
];

const Practice = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSession, setActiveSession] = useState<PracticeSession | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { toast } = useToast();

  const filteredSessions = activeCategory === "all" 
    ? practiceSessions 
    : practiceSessions.filter(session => session.category === activeCategory);

  const handleStartSession = (session: PracticeSession) => {
    setActiveSession(session);
    setCurrentStepIndex(0);
    setTimeRemaining(session.steps[0].duration);
    setIsSessionActive(true);
    
    toast({
      title: `${session.title} Started`,
      description: "Follow the instructions for each step",
    });
  };

  const handleNextStep = () => {
    if (!activeSession) return;
    
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < activeSession.steps.length) {
      setCurrentStepIndex(nextIndex);
      setTimeRemaining(activeSession.steps[nextIndex].duration);
    } else {
      // Session completed
      setIsSessionActive(false);
      toast({
        title: "Practice Complete",
        description: `You've completed ${activeSession.title}`,
      });
    }
  };

  const handleEndSession = () => {
    setIsSessionActive(false);
    setActiveSession(null);
    
    toast({
      title: "Session Ended",
      description: "Your practice session has been ended",
    });
  };

  const currentStep = activeSession?.steps[currentStepIndex];
  const sessionProgress = activeSession 
    ? Math.round(((currentStepIndex) / activeSession.steps.length) * 100)
    : 0;

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-grimoire-primary grimoire-text-shadow animate-fade-in">
            Ritual Practices
          </h1>
          <p className="text-grimoire-foreground/80 animate-fade-in">
            Guided spiritual techniques for transformation and liberation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="bg-grimoire-muted border-grimoire-border sticky top-20">
              <CardHeader>
                <CardTitle className="text-grimoire-foreground grimoire-text-shadow flex items-center text-lg">
                  <Sparkles className="h-5 w-5 mr-2 text-grimoire-primary grimoire-glow" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant={activeCategory === "all" ? "default" : "outline"}
                    className={`w-full justify-start ${activeCategory === "all" ? "bg-grimoire-primary" : "hover:bg-grimoire-muted/60"}`}
                    onClick={() => setActiveCategory("all")}
                  >
                    All Practices
                  </Button>
                  
                  {Array.from(new Set(practiceSessions.map(s => s.category))).map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? "default" : "outline"}
                      className={`w-full justify-start ${activeCategory === category ? "bg-grimoire-primary" : "hover:bg-grimoire-muted/60"}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <SpiritualQuote className="mt-6" />
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-fade-in">
              {filteredSessions.map((session) => (
                <Card 
                  key={session.id} 
                  className="bg-grimoire-muted border-grimoire-border hover:border-grimoire-primary/70 transition-all duration-300 group grimoire-border overflow-hidden relative"
                >
                  <div className="absolute inset-0 pentagram opacity-30"></div>
                  <div 
                    className="absolute top-0 right-0 w-16 h-16"
                    style={{
                      background: `radial-gradient(circle at top right, ${session.color}40 0%, transparent 70%)`
                    }}
                  ></div>
                  
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <session.icon 
                        className="h-6 w-6 grimoire-glow" 
                        style={{ color: session.color }}
                      />
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-grimoire-background/50 text-grimoire-foreground/70">
                        {session.level} • {session.duration} min
                      </span>
                    </div>
                    <CardTitle className="grimoire-text-shadow text-lg">
                      {session.title}
                    </CardTitle>
                    <CardDescription className="text-grimoire-foreground/70">
                      {session.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex justify-between text-sm text-grimoire-foreground/60 mb-3">
                      <span>Benefits:</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {session.benefits.map((benefit, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-grimoire-background/50 text-grimoire-foreground/70 rounded-full px-2 py-1"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost">View Steps</Button>
                      </HoverCardTrigger>
                      <HoverCardContent 
                        className="w-80 bg-grimoire-muted border-grimoire-border" 
                        side="bottom"
                      >
                        <div className="space-y-2">
                          <h4 className="font-medium text-grimoire-foreground mb-2">Practice Flow:</h4>
                          {session.steps.map((step) => (
                            <div key={step.id} className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-grimoire-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs text-grimoire-primary font-medium">{step.id}</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-grimoire-foreground">{step.title}</p>
                                <p className="text-xs text-grimoire-foreground/70">{step.duration} min</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    
                    <Button 
                      variant="outline" 
                      className="group-hover:border-grimoire-primary/70 group-hover:text-grimoire-primary transition-colors"
                      onClick={() => handleStartSession(session)}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Begin Practice
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Active Practice Drawer */}
      <Drawer open={isSessionActive} onOpenChange={setIsSessionActive}>
        <DrawerContent className="bg-grimoire-background border-t border-grimoire-border">
          <DrawerHeader>
            <DrawerTitle className="text-grimoire-primary grimoire-text-shadow flex items-center">
              {activeSession?.icon && React.createElement(activeSession.icon, { 
                className: "h-5 w-5 mr-2 grimoire-glow", 
                style: { color: activeSession?.color } 
              })}
              {activeSession?.title} - {currentStep?.title}
            </DrawerTitle>
            <DrawerDescription>
              Step {currentStepIndex + 1} of {activeSession?.steps.length}
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 pb-8">
            <Progress value={sessionProgress} className="mb-6 h-2 bg-grimoire-muted" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 bg-grimoire-muted border-grimoire-border">
                <CardHeader>
                  <CardTitle className="text-lg text-grimoire-foreground grimoire-text-shadow">
                    Current Instruction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-grimoire-foreground/90 text-lg">
                    {currentStep?.instruction}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-grimoire-primary/20 flex items-center justify-center text-grimoire-primary text-2xl font-medium">
                      {timeRemaining}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleEndSession}>
                    End Session
                  </Button>
                  <Button onClick={handleNextStep} className="bg-grimoire-primary hover:bg-grimoire-primary/90">
                    {currentStepIndex < (activeSession?.steps.length || 0) - 1 ? (
                      <>Next Step</>
                    ) : (
                      <>Complete <Check className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-grimoire-muted border-grimoire-border">
                <CardHeader>
                  <CardTitle className="text-lg text-grimoire-foreground grimoire-text-shadow">
                    Session Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeSession?.steps.map((step, index) => (
                      <div 
                        key={step.id}
                        className={`flex items-center gap-3 p-2 rounded-md ${
                          index === currentStepIndex 
                            ? "bg-grimoire-primary/20 border border-grimoire-primary/40" 
                            : index < currentStepIndex 
                              ? "text-grimoire-foreground/50" 
                              : "text-grimoire-foreground/70"
                        }`}
                      >
                        <div 
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            index === currentStepIndex 
                              ? "bg-grimoire-primary text-white" 
                              : index < currentStepIndex 
                                ? "bg-grimoire-muted/80 text-grimoire-foreground/50" 
                                : "bg-grimoire-muted/30 text-grimoire-foreground/50"
                          }`}
                        >
                          {index < currentStepIndex ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <span className="text-xs">{index + 1}</span>
                          )}
                        </div>
                        <div className="text-sm truncate">{step.title}</div>
                        <div className="ml-auto text-xs">{step.duration}m</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </GrimoireLayout>
  );
};

export default Practice;
