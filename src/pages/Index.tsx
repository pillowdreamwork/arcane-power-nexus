import React from "react";
import GrimoireLayout from "@/components/GrimoireLayout";
import ChaosLayout from "@/components/ChaosLayout";
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
import { Star, Hexagon, Triangle, Circle, Shield, Wand2 as Wand, Zap, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const iconBaseClass = "h-6 w-6 text-grimoire-primary group-hover:scale-110 group-hover:animate-pulse-subtle transition-transform";

const quickLinks = [
  { title: "Codex", url: "/codex", icon: <Hexagon className={iconBaseClass} /> },
  { title: "Liberation", url: "/liberation", icon: <Triangle className={iconBaseClass} /> },
  { title: "Rituals", url: "/rituals", icon: <Circle className={iconBaseClass} /> },
  { title: "Armory", url: "/armory", icon: <Shield className={iconBaseClass} /> },
  { title: "Echo", url: "/echo", icon: <Wand className={iconBaseClass} /> },
  { title: "Warfare", url: "/warfare", icon: <Zap className={iconBaseClass} /> },
  { title: "Practice", url: "/practice", icon: <Sparkles className={iconBaseClass} /> },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <ChaosLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Simple Dashboard Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-grimoire-primary mb-2">Arcane Nexus</h1>
          <p className="text-grimoire-foreground/80 mb-4 font-inter">A spiritual dashboard for exploration and rituals.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {quickLinks.map(link => (
              <button
                key={link.title}
                onClick={() => navigate(link.url)}
                className="group flex items-center gap-2 px-3 py-2 rounded bg-grimoire-muted border border-grimoire-border hover:bg-grimoire-primary/10 text-sm hover:border-grimoire-primary/70 transform hover:scale-105 transition-all duration-200 ease-in-out"
              >
                {link.icon}
                <span>{link.title}</span>
              </button>
            ))}
          </div>
        </div>
        <SearchBar className="mb-6" />
        <Tabs defaultValue="rituals" className="w-full">
          <TabsList className="mb-4 bg-grimoire-muted/50 border-b border-grimoire-border rounded-t-lg">
            <TabsTrigger value="rituals" className="text-grimoire-foreground/70 hover:text-grimoire-foreground data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted data-[state=active]:border-b-2 data-[state=active]:border-grimoire-primary font-medium rounded-t-md">Rituals</TabsTrigger>
            <TabsTrigger value="recent" className="text-grimoire-foreground/70 hover:text-grimoire-foreground data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted data-[state=active]:border-b-2 data-[state=active]:border-grimoire-primary font-medium rounded-t-md">Recent</TabsTrigger>
            <TabsTrigger value="favorites" className="text-grimoire-foreground/70 hover:text-grimoire-foreground data-[state=active]:text-grimoire-primary data-[state=active]:bg-grimoire-muted data-[state=active]:border-b-2 data-[state=active]:border-grimoire-primary font-medium rounded-t-md">Favorites</TabsTrigger>
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
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <CurrentStatus />
          <DailyWisdom />
        </div>
        <div className="mt-4">
          <SpiritualProgress />
        </div>
        <div className="mt-4">
          <EchoAssistant />
        </div>
      </div>
    </ChaosLayout>
  );
};

export default Index;
