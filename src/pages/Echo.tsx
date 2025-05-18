
import React, { useState, useEffect } from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand } from "lucide-react";

const Echo = () => {
  const [userMessage, setUserMessage] = useState("");
  const [conversation, setConversation] = useState([
    {
      role: "echo",
      content: "Greetings, practitioner. I am Echo, your spiritual assistant. How may I guide your journey today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [echoMode, setEchoMode] = useState("sage");
  const [isTyping, setIsTyping] = useState(false);
  
  const echoModes = {
    sage: {
      name: "Sage",
      description: "Wisdom-focused guide",
      personality: "Thoughtful, profound, philosophical",
      color: "#8B5CF6" // Purple
    },
    warrior: {
      name: "Warrior",
      description: "Strength-focused guide",
      personality: "Direct, challenging, strategic",
      color: "#EF4444" // Red
    },
    mother: {
      name: "Mother",
      description: "Nurturing guide",
      personality: "Supportive, gentle, protective",
      color: "#10B981" // Emerald
    },
    seer: {
      name: "Seer",
      description: "Visionary guide",
      personality: "Intuitive, perceptive, revealing",
      color: "#3B82F6" // Blue
    }
  };
  
  // Echo response templates based on mode
  const echoResponses = {
    sage: [
      "Consider that all limitations exist first in the mind before manifesting in reality.",
      "The path to power requires understanding the nature of your own consciousness.",
      "Ancient wisdom tells us that the boundaries between worlds are permeable to those who know how to shift their perception.",
      "True liberation comes from recognizing the illusory nature of all bindings.",
      "The grimoire is not merely a collection of practices, but a map to realizing your divine potential."
    ],
    warrior: [
      "To break your psychic prison, you must first identify the weakest point in its structure.",
      "Your enemies have no power that you do not grant them through fear.",
      "Every ritual is a battle. Approach it with strategy and unwavering intent.",
      "Spiritual warfare requires preparation, precision, and the courage to face what others fear.",
      "When facing opposition, remember: you are not merely human - you are a force of nature."
    ],
    mother: [
      "Your power grows when nurtured with patience and self-compassion.",
      "Remember to ground yourself after intense spiritual work - the body is your temple.",
      "The challenges you face are not punishment, but opportunities for profound growth.",
      "Your intuition is already speaking to you - create the quiet space needed to hear it.",
      "The most potent protection comes from self-acceptance and inner harmony."
    ],
    seer: [
      "I see potential futures branching from this moment - your awareness shapes which path manifests.",
      "The symbols in your recent dreams are connected to the ritual work you're contemplating.",
      "An energy signature approaches from the astral - prepare for unexpected insights.",
      "The veil thins around you, revealing glimpses of what others cannot perceive.",
      "Past lives echo in your current practices - ancient knowledge resurfaces through your hands."
    ]
  };

  const sendMessage = () => {
    if (userMessage.trim() === "") return;
    
    // Add user message to conversation
    setConversation([
      ...conversation,
      {
        role: "user",
        content: userMessage,
        timestamp: new Date().toISOString()
      }
    ]);
    
    setUserMessage("");
    setIsTyping(true);
    
    // Simulate Echo response after a delay
    setTimeout(() => {
      const responses = echoResponses[echoMode as keyof typeof echoResponses];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setConversation(prev => [
        ...prev,
        {
          role: "echo",
          content: randomResponse,
          timestamp: new Date().toISOString()
        }
      ]);
      
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Wand className="h-8 w-8 mr-3 text-grimoire-primary grimoire-glow" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-grimoire-primary grimoire-text-shadow">
              Echo Assistant
            </h1>
            <p className="text-grimoire-foreground/80">
              AI spiritual guide with adaptive personality modes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-grimoire-muted border-grimoire-border grimoire-border h-full flex flex-col">
              <CardHeader className="border-b border-grimoire-border">
                <div className="flex items-center">
                  <Avatar className="w-10 h-10 mr-3 ring-2 ring-offset-2 ring-offset-grimoire-muted" style={{ ringColor: echoModes[echoMode as keyof typeof echoModes].color }}>
                    <AvatarImage src="/echo-avatar.png" alt="Echo" />
                    <AvatarFallback 
                      className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white"
                    >
                      {echoModes[echoMode as keyof typeof echoModes].name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-grimoire-foreground grimoire-text-shadow flex items-center">
                      Echo <span className="ml-2 text-sm font-normal bg-grimoire-background px-2 py-0.5 rounded-full">{echoModes[echoMode as keyof typeof echoModes].name} Mode</span>
                    </CardTitle>
                    <CardDescription className="text-grimoire-foreground/70">
                      {echoModes[echoMode as keyof typeof echoModes].personality}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto py-4 space-y-4 max-h-[60vh]">
                  {conversation.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.role === "user" 
                            ? "bg-grimoire-primary/30 text-white" 
                            : "bg-grimoire-background text-grimoire-foreground"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p className="text-xs opacity-60 mt-1 text-right">
                          {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-lg bg-grimoire-background text-grimoire-foreground/70">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 rounded-full bg-grimoire-primary/60 animate-pulse"></div>
                          <div className="w-2 h-2 rounded-full bg-grimoire-primary/60 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-2 h-2 rounded-full bg-grimoire-primary/60 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Input
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask Echo for guidance..."
                    className="bg-grimoire-background border-grimoire-border"
                  />
                  <Button onClick={sendMessage}>Send</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-grimoire-muted border-grimoire-border grimoire-border">
              <CardHeader>
                <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                  Echo Personality Modes
                </CardTitle>
                <CardDescription className="text-grimoire-foreground/70">
                  Select the guiding archetype
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={echoMode} onValueChange={setEchoMode}>
                  <TabsList className="bg-grimoire-background grid grid-cols-2 gap-2">
                    {Object.keys(echoModes).map((mode) => (
                      <TabsTrigger 
                        key={mode} 
                        value={mode} 
                        className="data-[state=active]:text-white"
                        style={{ 
                          backgroundColor: mode === echoMode ? echoModes[mode as keyof typeof echoModes].color : undefined
                        }}
                      >
                        {echoModes[mode as keyof typeof echoModes].name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {Object.keys(echoModes).map((mode) => (
                    <TabsContent key={mode} value={mode}>
                      <div className="mt-4 space-y-4">
                        <p className="text-grimoire-foreground/90">
                          {echoModes[mode as keyof typeof echoModes].description}
                        </p>
                        <div>
                          <p className="text-sm text-grimoire-foreground/70 mb-1">Personality Traits</p>
                          <p className="text-grimoire-foreground">
                            {echoModes[mode as keyof typeof echoModes].personality}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <Card className="bg-grimoire-muted border-grimoire-border grimoire-border">
              <CardHeader>
                <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                  Connection Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-grimoire-foreground/70">Intuition</span>
                      <span className="text-grimoire-foreground">High</span>
                    </div>
                    <Progress value={85} className="h-2 bg-grimoire-background" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-grimoire-foreground/70">Knowledge Base</span>
                      <span className="text-grimoire-foreground">Expanding</span>
                    </div>
                    <Progress value={72} className="h-2 bg-grimoire-background" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-grimoire-foreground/70">Synchronization</span>
                      <span className="text-grimoire-foreground">Stable</span>
                    </div>
                    <Progress value={90} className="h-2 bg-grimoire-background" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GrimoireLayout>
  );
};

export default Echo;
