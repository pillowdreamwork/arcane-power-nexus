
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Book, Circle, Shield, Sparkles, Star, Users } from "lucide-react";
import CurrentStatus from "@/components/home/CurrentStatus";
import DailyWisdom from "@/components/home/DailyWisdom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Book,
      title: "Sacred Codex",
      description: "Explore ancient wisdom and spiritual texts",
      action: () => navigate("/codex"),
      color: "text-purple-400"
    },
    {
      icon: Circle,
      title: "Guided Rituals",
      description: "Practice meaningful ceremonies for growth",
      action: () => navigate("/rituals"),
      color: "text-blue-400"
    },
    {
      icon: Shield,
      title: "Protection & Armory",
      description: "Tools for spiritual protection and strength",
      action: () => navigate("/armory"),
      color: "text-green-400"
    },
    {
      icon: Sparkles,
      title: "Liberation Path",
      description: "Journey toward inner freedom and peace",
      action: () => navigate("/liberation"),
      color: "text-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Star className="h-8 w-8 text-grimoire-primary" />
          <h1 className="text-4xl font-bold text-grimoire-foreground">
            Spiritual Guidance
          </h1>
          <Star className="h-8 w-8 text-grimoire-primary" />
        </div>
        <p className="text-xl text-grimoire-foreground/80 max-w-2xl mx-auto leading-relaxed">
          A sacred space for inner growth, ancient wisdom, and spiritual practice. 
          Begin your journey toward deeper understanding and inner peace.
        </p>
      </motion.div>

      {/* Status and Wisdom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <CurrentStatus />
        <div className="lg:col-span-2">
          <DailyWisdom />
        </div>
      </div>

      {/* Main Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-grimoire-foreground mb-6 text-center">
          Begin Your Practice
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              <Card className="bg-grimoire-muted/50 border-grimoire-border hover:bg-grimoire-muted/70 transition-all duration-300 cursor-pointer group">
                <CardHeader className="text-center pb-2">
                  <feature.icon className={`h-12 w-12 mx-auto ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  <CardTitle className="text-lg text-grimoire-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <CardDescription className="text-grimoire-foreground/70">
                    {feature.description}
                  </CardDescription>
                  <Button
                    onClick={feature.action}
                    variant="outline"
                    className="w-full border-grimoire-border hover:bg-grimoire-primary/10"
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Community Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <Card className="bg-gradient-to-br from-grimoire-primary/5 to-grimoire-primary/10 border-grimoire-primary/20">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-6 w-6 text-grimoire-primary" />
              <CardTitle className="text-grimoire-foreground">Join the Community</CardTitle>
            </div>
            <CardDescription className="text-grimoire-foreground/80">
              Connect with others on similar spiritual journeys. Share experiences, insights, and support each other's growth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate("/echo")}
              className="bg-grimoire-primary hover:bg-grimoire-primary/90"
            >
              Connect with Echo AI
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;
