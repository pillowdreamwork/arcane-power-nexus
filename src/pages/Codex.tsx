import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GrimoireLayout from "@/components/GrimoireLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Hexagon, Search, BookOpen, Filter, X, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { 
  GRIMOIRE_CONTENT, 
  type GrimoireEntry, 
  GRIMOIRE_CATEGORIES, 
  DIFFICULTY_LEVELS,
} from "../data/grimoireContent"; 
import SpiritualQuote from "@/components/SpiritualQuote";
import GrimoireEntryDisplay from "@/components/codex/GrimoireEntryDisplay";

const Codex = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [filteredTexts, setFilteredTexts] = useState<GrimoireEntry[]>(GRIMOIRE_CONTENT);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); 
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);
  const [activeSourceFilter, setActiveSourceFilter] = useState<string | null>(null); 
  const [selectedSigils, setSelectedSigils] = useState<string[]>([]); // Renamed from selectedTags to selectedSigils for clarity
  
  const categories = useMemo(() => GRIMOIRE_CATEGORIES, []);
  const sources = useMemo(() => [...new Set(GRIMOIRE_CONTENT.map(entry => entry.source))], []);
  const allSigils = useMemo(() => { // Renamed from allTags to allSigils
    const sigilsSet = new Set<string>();
    GRIMOIRE_CONTENT.forEach(entry => {
      if (entry.sigils) { 
        entry.sigils.forEach(sigil => sigilsSet.add(sigil));
      }
    });
    return Array.from(sigilsSet);
  }, []);

  const [selectedText, setSelectedText] = useState<GrimoireEntry | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Effect to parse URL parameters on load and location change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSearchQuery = params.get("search");
    if (urlSearchQuery) setSearchQuery(urlSearchQuery);
    const urlCategory = params.get("category");
    if (urlCategory) setActiveCategory(urlCategory);
    const urlDifficulty = params.get("difficulty");
    if (urlDifficulty) setActiveDifficulty(urlDifficulty);
    const urlSource = params.get("source");
    if (urlSource) setActiveSourceFilter(urlSource);
    const urlSigils = params.getAll("sigil"); // Assuming sigils are stored as multiple 'sigil' params
    if (urlSigils.length > 0) setSelectedSigils(urlSigils);
  }, [location.search]);

  // Effect to filter entries when filter states change, and update URL
  useEffect(() => {
    setLoading(true);
    let result = [...GRIMOIRE_CONTENT];

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      result = result.filter(entry => 
        entry.title.toLowerCase().includes(lowercaseQuery) ||
        entry.description.toLowerCase().includes(lowercaseQuery) ||
        entry.fullText.toLowerCase().includes(lowercaseQuery) ||
        entry.source.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    if (activeCategory) {
      result = result.filter(entry => entry.category === activeCategory);
    }
    
    if (activeDifficulty) {
      result = result.filter(entry => entry.difficulty === activeDifficulty);
    }

    if (activeSourceFilter) {
      result = result.filter(entry => entry.source.toLowerCase().includes(activeSourceFilter.toLowerCase()));
    }
    
    if (selectedSigils.length > 0) {
      result = result.filter(entry => {
        if (!entry.sigils) return false;
        return selectedSigils.every(sigil => entry.sigils!.includes(sigil));
      });
    }
        
    setFilteredTexts(result);
    setLoading(false);

    // Update URL query parameters
    const queryParams = new URLSearchParams();
    if (searchQuery) queryParams.set("search", searchQuery);
    if (activeCategory) queryParams.set("category", activeCategory);
    if (activeDifficulty) queryParams.set("difficulty", activeDifficulty);
    if (activeSourceFilter) queryParams.set("source", activeSourceFilter);
    selectedSigils.forEach(sigil => queryParams.append("sigil", sigil)); 

    const newSearchString = queryParams.toString();
    // Only navigate if the search string has actually changed to prevent loops
    if (location.search.substring(1) !== newSearchString) { 
        navigate(`${location.pathname}?${newSearchString}`, { replace: true });
    }

  }, [searchQuery, activeCategory, activeDifficulty, activeSourceFilter, selectedSigils, navigate, location.pathname, location.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleSigil = (sigil: string) => { // Renamed from toggleTag to toggleSigil
    setSelectedSigils(prevSigils =>
      prevSigils.includes(sigil) ? prevSigils.filter(s => s !== sigil) : [...prevSigils, sigil]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory(null);
    setActiveDifficulty(null);
    setActiveSourceFilter(null);
    setSelectedSigils([]);
    // Navigation will be handled by the useEffect due to state changes
  };

  const viewTextDetail = (text: GrimoireEntry) => {
    setSelectedText(text);
  };

  // Detail View for a selected Grimoire Entry
  if (selectedText) {
    return (
      <GrimoireLayout>
        <div className="container mx-auto px-4 py-8">
          <Button
            onClick={() => setSelectedText(null)}
            className="mb-6 bg-grimoire-primary hover:bg-grimoire-primary/90 text-primary-foreground"
          >
            <X className="mr-2 h-4 w-4" /> Back to Codex
          </Button>
          <GrimoireEntryDisplay entry={selectedText} />
        </div>
      </GrimoireLayout>
    );
  }

  // Main Codex View (List of Entries)
  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="grimoire-text text-5xl text-grimoire-primary tracking-tight mb-3">The Convergence Codex</h1>
          <p className="text-xl text-grimoire-foreground/80 font-inter max-w-3xl mx-auto">
            Delve into a curated collection of ancient texts, arcane rituals, and esoteric symbols drawn from revered grimoires throughout history.
          </p>
          <SpiritualQuote className="mt-6" />
        </header>

        {/* Search and Filter Section */}
        <div className="mb-8 p-6 border border-grimoire-border rounded-xl bg-grimoire-muted/70 backdrop-blur-sm shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center mb-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search titles, descriptions, sources..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-3 w-full bg-grimoire-background border-grimoire-border focus:ring-grimoire-primary text-grimoire-foreground placeholder:text-grimoire-foreground/50 font-inter text-base"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-grimoire-primary" />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-grimoire-primary/60 text-grimoire-primary hover:bg-grimoire-primary/10 hover:border-grimoire-primary font-medium font-inter md:w-auto whitespace-nowrap py-3 px-5 text-base"
            >
              <Filter className="mr-2 h-5 w-5" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {showFilters ? <ChevronUp className="ml-2 h-5 w-5" /> : <ChevronDown className="ml-2 h-5 w-5" />}
            </Button>
            <Button
              onClick={clearFilters}
              variant="ghost"
              className="text-grimoire-foreground/70 hover:text-grimoire-primary hover:bg-grimoire-muted/70 font-medium font-inter md:w-auto whitespace-nowrap py-3 px-5 text-base"
            >
              <X className="mr-2 h-5 w-5" /> Clear All
            </Button>
          </div>

          {showFilters && (
            <div className="pt-4 border-t border-grimoire-border-subtle">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mb-4">
                <div>
                  <label htmlFor="category-select" className="block text-sm text-grimoire-foreground/80 font-inter mb-1">Category</label>
                  <Select value={activeCategory || ""} onValueChange={(value) => setActiveCategory(value === "all" || value === "" ? null : value)}>
                    <SelectTrigger id="category-select" className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary font-inter w-full">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-grimoire-background border-grimoire-border text-grimoire-foreground font-inter">
                      <SelectItem value="all" className="hover:bg-grimoire-muted focus:bg-grimoire-muted data-[highlighted]:bg-grimoire-muted data-[state=checked]:bg-grimoire-primary/20">All Categories</SelectItem>
                      {categories.map(cat => <SelectItem key={cat} value={cat} className="hover:bg-grimoire-muted focus:bg-grimoire-muted data-[highlighted]:bg-grimoire-muted data-[state=checked]:bg-grimoire-primary/20">{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="difficulty-select" className="block text-sm text-grimoire-foreground/80 font-inter mb-1">Difficulty</label>
                  <Select value={activeDifficulty || ""} onValueChange={(value) => setActiveDifficulty(value === "all" || value === "" ? null : value)}>
                    <SelectTrigger id="difficulty-select" className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary font-inter w-full">
                      <SelectValue placeholder="All Difficulties" />
                    </SelectTrigger>
                    <SelectContent className="bg-grimoire-background border-grimoire-border text-grimoire-foreground font-inter">
                      <SelectItem value="all" className="hover:bg-grimoire-muted focus:bg-grimoire-muted data-[highlighted]:bg-grimoire-muted data-[state=checked]:bg-grimoire-primary/20">All Difficulties</SelectItem>
                      {DIFFICULTY_LEVELS.map(level => <SelectItem key={level} value={level} className="hover:bg-grimoire-muted focus:bg-grimoire-muted data-[highlighted]:bg-grimoire-muted data-[state=checked]:bg-grimoire-primary/20">{level}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="source-select" className="block text-sm text-grimoire-foreground/80 font-inter mb-1">Source Grimoire</label>
                  <Select value={activeSourceFilter || ""} onValueChange={(value) => setActiveSourceFilter(value === "all" || value === "" ? null : value)}>
                    <SelectTrigger id="source-select" className="bg-grimoire-background border-grimoire-border text-grimoire-foreground focus:ring-grimoire-primary font-inter w-full">
                      <SelectValue placeholder="All Sources" />
                    </SelectTrigger>
                    <SelectContent className="bg-grimoire-background border-grimoire-border text-grimoire-foreground font-inter">
                      <SelectItem value="all" className="hover:bg-grimoire-muted focus:bg-grimoire-muted data-[highlighted]:bg-grimoire-muted data-[state=checked]:bg-grimoire-primary/20">All Sources</SelectItem>
                      {sources.map(src => <SelectItem key={src} value={src} className="hover:bg-grimoire-muted focus:bg-grimoire-muted data-[highlighted]:bg-grimoire-muted data-[state=checked]:bg-grimoire-primary/20">{src}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {allSigils.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm text-grimoire-foreground/80 font-inter mb-2">Filter by Sigils:</h4>
                  <div className="flex flex-wrap gap-2">
                    {allSigils.map(sigil => (
                      <Badge
                        key={sigil}
                        variant={selectedSigils.includes(sigil) ? "default" : "secondary"}
                        onClick={() => toggleSigil(sigil)}
                        className={`cursor-pointer px-2.5 py-1 text-sm font-inter ${selectedSigils.includes(sigil) ? 'bg-grimoire-primary text-primary-foreground hover:bg-grimoire-primary/90' : 'bg-grimoire-border text-grimoire-foreground/80 hover:bg-grimoire-muted'}`}
                      >
                        {sigil}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Display Grimoire Entries */}
        {loading ? (
            <div className="text-center py-12">
                <Sparkles className="animate-spin h-12 w-12 text-grimoire-primary mx-auto mb-4" /> 
                <p className="text-lg text-grimoire-primary font-semibold font-inter">Summoning ancient wisdom...</p>
            </div>
        ) : filteredTexts.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="mx-auto h-16 w-16 text-grimoire-foreground/60 mb-6" />
            <p className="text-2xl text-grimoire-primary font-semibold font-inter mb-2">No Tomes Uncovered</p>
            <p className="text-grimoire-foreground/70 font-inter">Your current incantations (filters) yield no matching texts. <br/>Try altering your mystical search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTexts.map((entry) => (
              <Card
                key={entry.id}
                className="bg-grimoire-muted border border-grimoire-border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold text-grimoire-primary font-inter flex items-start">
                    <Hexagon className="h-5 w-5 mr-2.5 mt-1 text-grimoire-accent flex-shrink-0" /> 
                    <span className="leading-tight">{entry.title}</span>
                  </CardTitle>
                  <CardDescription className="text-xs text-grimoire-foreground/70 font-inter pt-1">
                    {entry.source} <span className="mx-1">|</span> {entry.category} <span className="mx-1">|</span> {entry.difficulty}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-grimoire-foreground/80 font-inter line-clamp-4 mb-3 leading-relaxed">{entry.description}</p>
                  {entry.sigils && entry.sigils.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="text-xs text-grimoire-foreground/70 font-inter mr-1">Sigils:</span>
                      {entry.sigils.slice(0, 3).map(sgl => (
                        <Badge key={sgl} variant="outline" className="border-grimoire-border text-grimoire-foreground/70 text-xs px-1.5 py-0.5 font-inter">{sgl}</Badge>
                      ))}
                      {entry.sigils.length > 3 && <Badge variant="outline" className="border-grimoire-border text-grimoire-foreground/70 text-xs px-1.5 py-0.5 font-inter">+{entry.sigils.length - 3}</Badge>}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t border-grimoire-border-subtle pt-3">
                  <Button
                    onClick={() => viewTextDetail(entry)}
                    variant="link"
                    className="p-0 text-sm font-medium text-grimoire-primary hover:text-grimoire-primary/80 font-inter"
                  >
                    Unveil Secrets <BookOpen className="ml-1.5 h-4 w-4 text-grimoire-primary" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </GrimoireLayout>
  );
};

export default Codex;
