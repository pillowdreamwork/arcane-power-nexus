import React, { useState } from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrentStatus from "@/components/home/CurrentStatus";
import SearchBar from "@/components/home/SearchBar";
import RitualLibrary from "@/components/home/RitualLibrary";
import RecentTexts from "@/components/home/RecentTexts";
import FavoritesPlaceholder from "@/components/home/FavoritesPlaceholder";
import EchoAssistant from "@/components/home/EchoAssistant";
import DailyWisdom from "@/components/home/DailyWisdom";
import SpiritualQuote from "@/components/SpiritualQuote";
import SpiritualProgress from "@/components/SpiritualProgress";
import GrimoireSidebar from "@/components/GrimoireSidebar";
import { Star, Hexagon, Triangle, Circle, Shield, Wand2 as Wand, Zap, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickLinks = [
  { title: "Codex", url: "/codex", icon: <Hexagon className="h-6 w-6 text-grimoire-primary" /> },
  { title: "Liberation", url: "/liberation", icon: <Triangle className="h-6 w-6 text-grimoire-primary" /> },
  { title: "Rituals", url: "/rituals", icon: <Circle className="h-6 w-6 text-grimoire-primary" /> },
  { title: "Armory", url: "/armory", icon: <Shield className="h-6 w-6 text-grimoire-primary" /> },
  { title: "Echo", url: "/echo", icon: <Wand className="h-6 w-6 text-grimoire-primary" /> },
  { title: "Warfare", url: "/warfare", icon: <Zap className="h-6 w-6 text-grimoire-primary" /> },
  { title: "Practice", url: "/practice", icon: <Sparkles className="h-6 w-6 text-grimoire-primary" /> },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-grimoire-primary grimoire-text-shadow">Welcome to Arcane Nexus</h1>
            <p className="text-grimoire-foreground/80">Your spiritual dashboard for exploration, rituals, and progress.</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {quickLinks.map(link => (
                <button
                  key={link.title}
                  onClick={() => navigate(link.url)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-grimoire-muted to-grimoire-background border border-grimoire-border shadow hover:bg-grimoire-primary/10 hover:scale-105 transition-all duration-200"
                >
                  {link.icon}
                  <span className="font-medium text-grimoire-foreground">{link.title}</span>
                </button>
              ))}
            </div>
            <SpiritualProgress className="mt-4" />
            {/* Featured Ritual Card */}
            <div className="rounded-lg bg-gradient-to-br from-grimoire-primary/10 to-grimoire-muted border border-grimoire-border p-4 mt-4 shadow animate-fade-in">
              <h2 className="text-xl font-semibold text-grimoire-primary mb-1">Featured Ritual: Mindful Breathing</h2>
              <p className="text-grimoire-foreground/90 mb-2">A simple yet powerful practice found in many traditions. Sit comfortably, close your eyes, and focus on your breath. Inhale deeply for 4 seconds, hold for 4, exhale for 4, and pause for 4. Repeat for 5 minutes to center your mind and spirit.</p>
              <span className="text-xs text-grimoire-foreground/60">Inspired by yogic pranayama and modern mindfulness research.</span>
            </div>
            {/* Today's Practice Tip */}
            <div className="rounded-lg bg-grimoire-muted border border-grimoire-border p-4 mt-2 animate-fade-in">
              <h3 className="text-lg font-medium text-grimoire-primary mb-1">Today's Practice</h3>
              <p className="text-grimoire-foreground/80">Take a mindful walk in nature. Notice the sensations of your feet, the sounds, and the air. This simple act can reduce stress and increase your sense of connection.</p>
            </div>
            {/* Did You Know Fact */}
            <div className="rounded-lg bg-grimoire-muted border border-dashed border-grimoire-primary p-3 mt-2 animate-fade-in">
              <span className="text-sm text-grimoire-primary font-semibold">Did You Know?</span>
              <p className="text-grimoire-foreground/80 mt-1">The word "ritual" comes from the Sanskrit "ṛtú", meaning the proper time for action. Rituals help align our actions with natural cycles and inner intentions.</p>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <CurrentStatus />
            <DailyWisdom />
            <div className="rounded-lg bg-grimoire-muted border border-grimoire-border p-4 mt-2 animate-fade-in">
              <SpiritualQuote />
            </div>
          </div>
        </div>

        {/* Search Bar with Spiritual Quote */}
        <SearchBar className="mb-8" />

        <Tabs defaultValue="rituals" className="w-full animate-fade-in">
          <TabsList className="bg-grimoire-muted border border-grimoire-border mb-6">
            <TabsTrigger value="rituals" className="data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
              Ritual Library
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
              Recent Texts
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
              Favorites
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="rituals">
            <RitualLibrary />
          </TabsContent>
          
          <TabsContent value="recent">
            <RecentTexts />
          </TabsContent>
          
          <TabsContent value="favorites">
            <FavoritesPlaceholder />
          </TabsContent>
        </Tabs>
        
        <EchoAssistant />
      </div>
    </GrimoireLayout>
  );
};

export default Index;
