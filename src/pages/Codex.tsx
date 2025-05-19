import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Hexagon, Search, BookOpen, Filter, Tag, X } from "lucide-react";
import { supabase, type SpiritualText } from "@/integrations/supabase/client";
import SpiritualQuote from "@/components/SpiritualQuote";

const Codex = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [texts, setTexts] = useState<SpiritualText[]>([]);
  const [filteredTexts, setFilteredTexts] = useState<SpiritualText[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSource, setActiveSource] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedText, setSelectedText] = useState<SpiritualText | null>(null);

  // Extract search query from URL if present
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  // Fetch spiritual texts
  useEffect(() => {
    const fetchTexts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("spiritual_texts")
          .select("*");

        if (error) throw error;
        
        setTexts(data || []);
        
        // Extract unique categories, sources and tags
        const uniqueCategories = [...new Set(data?.map(item => item.category))];
        const uniqueSources = [...new Set(data?.map(item => item.source))];
        const allTagsArray: string[] = [];
        
        data?.forEach(item => {
          if (item.tags && Array.isArray(item.tags)) {
            item.tags.forEach(tag => {
              if (!allTagsArray.includes(tag)) {
                allTagsArray.push(tag);
              }
            });
          }
        });
        
        setCategories(uniqueCategories);
        setSources(uniqueSources);
        setAllTags(allTagsArray);
      } catch (error) {
        console.error("Error fetching texts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTexts();
  }, []);

  // Filter texts based on search, category, source and tags
  useEffect(() => {
    let filtered = [...texts];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(text => 
        text.title.toLowerCase().includes(query) ||
        text.content.toLowerCase().includes(query) ||
        text.source.toLowerCase().includes(query) ||
        text.category.toLowerCase().includes(query) ||
        (text.tags && text.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Filter by category
    if (activeCategory) {
      filtered = filtered.filter(text => text.category === activeCategory);
    }
    
    // Filter by source
    if (activeSource) {
      filtered = filtered.filter(text => text.source === activeSource);
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(text => 
        text.tags && selectedTags.every(tag => text.tags.includes(tag))
      );
    }
    
    // Filter by tab
    if (activeTab === "dattatreya") {
      filtered = filtered.filter(text => text.source === "Dattatreya Tantra");
    } else if (activeTab === "shaivism") {
      filtered = filtered.filter(text => text.source === "Kashmir Shaivism");
    } else if (activeTab === "buddhism") {
      filtered = filtered.filter(text => text.source === "Tibetan Buddhism");
    } else if (activeTab === "satanic") {
      filtered = filtered.filter(text => text.source === "Satanic Bible");
    }
    
    setFilteredTexts(filtered);
  }, [texts, searchQuery, activeCategory, activeSource, selectedTags, activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    navigate(`/codex?search=${encodeURIComponent(searchQuery)}`);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setActiveCategory(null);
    setActiveSource(null);
    setSelectedTags([]);
    setSearchQuery("");
    navigate("/codex");
  };

  const viewTextDetail = (text: SpiritualText) => {
    setSelectedText(text);
  };

  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-grimoire-primary mb-4">Convergence Codex</h1>
        <div className="mb-6">
          <p className="text-grimoire-foreground/80">Browse and search the codex for spiritual knowledge.</p>
        </div>
        {/* Main codex content here, keep layout simple and focused */}
      </div>
    </GrimoireLayout>
  );
};

export default Codex;
