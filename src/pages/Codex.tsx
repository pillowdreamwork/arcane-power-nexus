
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
        {selectedText ? (
          <div className="animate-fade-in">
            <div className="flex items-center mb-4">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedText(null)}
                className="mr-2"
              >
                <X className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h2 className="text-2xl font-bold text-grimoire-primary grimoire-text-shadow">
                {selectedText.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-grimoire-muted border-grimoire-border grimoire-border h-full">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                          {selectedText.title}
                        </CardTitle>
                        <CardDescription className="text-grimoire-foreground/70 flex items-center mt-1">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {selectedText.source}
                        </CardDescription>
                      </div>
                      <span className="px-3 py-1 h-fit rounded-full bg-grimoire-background text-sm text-grimoire-foreground/80">
                        {selectedText.category}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert max-w-none">
                      {selectedText.content.split('\n').map((paragraph, i) => (
                        <p key={i} className="text-grimoire-foreground/90 mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    {selectedText.tags && selectedText.tags.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-grimoire-foreground font-medium mb-3">Related Concepts:</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedText.tags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 bg-grimoire-background border border-grimoire-border rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <SpiritualQuote />
                
                <Card className="bg-grimoire-muted border-grimoire-border grimoire-border">
                  <CardHeader>
                    <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                      Practice Guidance
                    </CardTitle>
                    <CardDescription className="text-grimoire-foreground/70">
                      Implementation methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-2 w-2 mt-2 mr-2 bg-grimoire-primary rounded-full"></div>
                        <span className="text-grimoire-foreground/90">Study the text during auspicious times</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 mt-2 mr-2 bg-grimoire-primary rounded-full"></div>
                        <span className="text-grimoire-foreground/90">Meditate on key principles in isolation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 mt-2 mr-2 bg-grimoire-primary rounded-full"></div>
                        <span className="text-grimoire-foreground/90">Journal insights received during practice</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 mt-2 mr-2 bg-grimoire-primary rounded-full"></div>
                        <span className="text-grimoire-foreground/90">Ritualize the knowledge through symbolic action</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-grimoire-muted border-grimoire-border grimoire-border">
                  <CardHeader>
                    <CardTitle className="text-grimoire-foreground grimoire-text-shadow">
                      Related Texts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredTexts
                        .filter(text => text.id !== selectedText.id && text.source === selectedText.source)
                        .slice(0, 3)
                        .map(text => (
                          <div 
                            key={text.id} 
                            className="p-3 bg-grimoire-background border border-grimoire-border rounded-md cursor-pointer hover:border-grimoire-primary/70 transition-colors"
                            onClick={() => viewTextDetail(text)}
                          >
                            <p className="font-medium text-grimoire-foreground">{text.title}</p>
                            <p className="text-sm text-grimoire-foreground/70">{text.category}</p>
                          </div>
                        ))}
                      
                      {filteredTexts.filter(text => text.id !== selectedText.id && text.source === selectedText.source).length === 0 && (
                        <p className="text-grimoire-foreground/70 text-center py-2">No related texts found</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center mb-8">
              <Hexagon className="h-8 w-8 mr-3 text-grimoire-primary grimoire-glow" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-grimoire-primary grimoire-text-shadow animate-fade-in">
                  The Convergence Codex
                </h1>
                <p className="text-grimoire-foreground/80 animate-fade-in">
                  Taxonomical organization of spiritual practices
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleSearch}>
                  <div className="flex gap-2">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-grimoire-foreground/50" />
                      <Input 
                        placeholder="Search spiritual texts..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-grimoire-muted border-grimoire-border"
                      />
                    </div>
                    <Button type="submit">
                      Search
                    </Button>
                    
                    {(searchQuery || activeCategory || activeSource || selectedTags.length > 0) && (
                      <Button 
                        variant="ghost" 
                        onClick={clearFilters}
                        title="Clear all filters"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="bg-grimoire-muted border border-grimoire-border w-full">
                    <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
                      All Texts
                    </TabsTrigger>
                    <TabsTrigger value="dattatreya" className="flex-1 data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
                      Dattatreya
                    </TabsTrigger>
                    <TabsTrigger value="shaivism" className="flex-1 data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
                      Kashmir Shaivism
                    </TabsTrigger>
                    <TabsTrigger value="buddhism" className="flex-1 data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
                      Tibetan Buddhism
                    </TabsTrigger>
                    <TabsTrigger value="satanic" className="flex-1 data-[state=active]:bg-grimoire-primary data-[state=active]:text-white">
                      Satanic
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div>
                <SpiritualQuote />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-grimoire-muted border-grimoire-border grimoire-border">
                  <CardHeader>
                    <CardTitle className="text-grimoire-foreground grimoire-text-shadow flex items-center">
                      <Filter className="h-5 w-5 mr-2" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-grimoire-foreground mb-3">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center">
                            <button
                              className={`text-sm py-1 px-2 rounded-md w-full text-left transition-colors ${
                                activeCategory === category 
                                  ? 'bg-grimoire-primary/20 text-grimoire-primary' 
                                  : 'text-grimoire-foreground/80 hover:bg-grimoire-background'
                              }`}
                              onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                            >
                              {category}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-grimoire-foreground mb-3">Sources</h3>
                      <div className="space-y-2">
                        {sources.map((source) => (
                          <div key={source} className="flex items-center">
                            <button
                              className={`text-sm py-1 px-2 rounded-md w-full text-left transition-colors ${
                                activeSource === source 
                                  ? 'bg-grimoire-primary/20 text-grimoire-primary' 
                                  : 'text-grimoire-foreground/80 hover:bg-grimoire-background'
                              }`}
                              onClick={() => setActiveSource(activeSource === source ? null : source)}
                            >
                              {source}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-grimoire-foreground mb-3 flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-1 text-xs rounded-full cursor-pointer transition-colors ${
                              selectedTags.includes(tag)
                                ? 'bg-grimoire-primary text-white'
                                : 'bg-grimoire-background text-grimoire-foreground/80 hover:bg-grimoire-background/80'
                            }`}
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-medium text-grimoire-foreground">
                    {loading ? "Loading texts..." : `${filteredTexts.length} texts found`}
                  </h2>
                </div>
                
                {loading ? (
                  <div className="flex justify-center items-center h-60">
                    <div className="w-10 h-10 border-4 border-grimoire-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : filteredTexts.length === 0 ? (
                  <div className="bg-grimoire-muted border border-grimoire-border rounded-lg p-8 text-center">
                    <p className="text-grimoire-foreground/70 mb-2">No spiritual texts found</p>
                    <p className="text-sm text-grimoire-foreground/50">
                      Try adjusting your search or filters
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-fade-in">
                    {filteredTexts.map((text) => (
                      <Card 
                        key={text.id} 
                        className="bg-grimoire-muted border-grimoire-border hover:border-grimoire-primary/70 transition-all duration-200 grimoire-border cursor-pointer"
                        onClick={() => viewTextDetail(text)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex justify-between">
                            <CardTitle className="text-grimoire-foreground grimoire-text-shadow text-lg">
                              {text.title}
                            </CardTitle>
                            <span className="text-xs px-2 py-1 h-fit rounded-full bg-grimoire-background/70 text-grimoire-foreground/80">
                              {text.category}
                            </span>
                          </div>
                          <CardDescription className="text-grimoire-foreground/70">
                            {text.source}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="text-grimoire-foreground/90 text-sm line-clamp-3">
                            {text.content}
                          </p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          {text.tags && text.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {text.tags.slice(0, 3).map((tag, index) => (
                                <span 
                                  key={index} 
                                  className="text-xs px-2 py-0.5 bg-grimoire-background border border-grimoire-border rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {text.tags.length > 3 && (
                                <span className="text-xs px-2 py-0.5 bg-grimoire-background border border-grimoire-border rounded-full">
                                  +{text.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </GrimoireLayout>
  );
};

export default Codex;
