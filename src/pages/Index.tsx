import React from "react";
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
        {/* Simple Dashboard Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-grimoire-primary mb-2">Arcane Nexus</h1>
          <p className="text-grimoire-foreground/80 mb-4">A spiritual dashboard for exploration and rituals.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {quickLinks.map(link => (
              <button
                key={link.title}
                onClick={() => navigate(link.url)}
                className="flex items-center gap-2 px-3 py-2 rounded bg-grimoire-muted border border-grimoire-border hover:bg-grimoire-primary/10 text-sm"
              >
                {link.icon}
                <span>{link.title}</span>
              </button>
            ))}
          </div>
        </div>
        <SearchBar className="mb-6" />
        <Tabs defaultValue="rituals" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="rituals">Rituals</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
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
    </GrimoireLayout>
  );
};

export default Index;
