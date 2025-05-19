
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

const Index = () => {
  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-grimoire-primary grimoire-text-shadow animate-fade-in">
              Arcane Nexus
            </h1>
            <p className="text-grimoire-foreground/80 animate-fade-in">
              The convergence of spiritual technologies and psychic warfare
            </p>
          </div>
          
          <CurrentStatus />
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

        {/* Daily Wisdom Card */}
        <DailyWisdom className="mt-8" />
      </div>
    </GrimoireLayout>
  );
};

export default Index;
