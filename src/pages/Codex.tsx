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
          <Button onClick={() => setSelectedText(null)} className="mb-6 bg-grimoire-primary hover:bg-grimoire-primary/90 text-grimoire-bg-primary">
            <X className="mr-2 h-4 w-4" /> Back to Codex
          </Button>
          <Card className="bg-grimoire-bg-secondary border-grimoire-border shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-grimoire-primary mb-2">{selectedText.title}</CardTitle>
              <CardDescription className="text-sm text-grimoire-label">
                Source: <span className="font-semibold text-grimoire-secondary">{selectedText.source}</span> | 
                Category: <span className="font-semibold text-grimoire-secondary">{selectedText.category}</span> | 
                Difficulty: <span className="font-semibold text-grimoire-secondary">{selectedText.difficulty}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-grimoire-foreground">
              <p className="mb-6 text-lg italic">{selectedText.description}</p>
              
              <h3 className="font-semibold text-xl text-grimoire-secondary mt-6 mb-3 border-b border-grimoire-border pb-2">Full Text & Ritual Details:</h3>
              <div className="prose prose-sm lg:prose-base dark:prose-invert max-w-none text-grimoire-foreground/90 whitespace-pre-wrap mb-6 p-4 bg-grimoire-bg rounded-md border border-grimoire-border-subtle">
                {selectedText.fullText}
              </div>

              <h3 className="font-semibold text-xl text-grimoire-secondary mt-6 mb-3 border-b border-grimoire-border pb-2">Required Materials:</h3>
              {selectedText.materials && selectedText.materials.length > 0 ? (
                <ul className="list-disc list-inside mb-6 space-y-1 pl-4">
                  {selectedText.materials.map((material, index) => <li key={index}>{material}</li>)}
                </ul>
              ) : <p className="text-grimoire-label italic">No specific materials listed.</p>}

              <h3 className="font-semibold text-xl text-grimoire-secondary mt-6 mb-3 border-b border-grimoire-border pb-2">Warnings & Considerations:</h3>
              {selectedText.warnings && selectedText.warnings.length > 0 ? (
                <ul className="list-disc list-inside mb-6 space-y-1 pl-4 text-red-400">
                  {selectedText.warnings.map((warning, index) => <li key={index} className="font-medium">{warning}</li>)}
                </ul>
              ) : <p className="text-grimoire-label italic">No specific warnings provided.</p>}

              <h3 className="font-semibold text-xl text-grimoire-secondary mt-6 mb-3 border-b border-grimoire-border pb-2">Historical Context:</h3>
              <p className="mb-6 text-grimoire-foreground/90 leading-relaxed">{selectedText.historicalContext}</p>
              
              {selectedText.sigils && selectedText.sigils.length > 0 && (
                <>
                  <h3 className="font-semibold text-xl text-grimoire-secondary mt-6 mb-3 border-b border-grimoire-border pb-2">Associated Sigils:</h3>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {selectedText.sigils.map((sigil, index) => (
                      <Badge key={index} variant="secondary" className="text-lg px-3 py-1 badge-grimoire-outline">{sigil}</Badge>
                    ))}
                  </div>
                </>
              )}

              {selectedText.planetaryHours && selectedText.planetaryHours.length > 0 && (
                <>
                  <h3 className="font-semibold text-xl text-grimoire-secondary mt-6 mb-3 border-b border-grimoire-border pb-2">Optimal Planetary Hours:</h3>
                  <p className="mb-6 text-grimoire-foreground/90">{selectedText.planetaryHours.join("; ")}</p>
                </>
              )}

              {selectedText.moonPhases && selectedText.moonPhases.length > 0 && (
                <>
                  <h3 className="font-semibold text-xl text-grimoire-secondary mt-6 mb-3 border-b border-grimoire-border pb-2">Recommended Moon Phases:</h3>
                  <p className="mb-6 text-grimoire-foreground/90">{selectedText.moonPhases.join("; ")}</p>
                </>
              )}

              <h3 className="font-semibold text-xl text-grimoire-secondary mt-6 mb-3 border-b border-grimoire-border pb-2">Cross References:</h3>
              {selectedText.crossReferences && selectedText.crossReferences.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {selectedText.crossReferences.map((ref, index) => (
                      <Badge key={index} variant="outline" className="badge-grimoire-outline cursor-pointer hover:bg-grimoire-accent/20"
                             onClick={() => { setSearchQuery(ref); setSelectedText(null); /* Navigate back to list & search */ }}>{ref}</Badge>
                  ))}
                </div>
              ) : <p className="text-grimoire-label italic">No cross-references listed.</p>}
            </CardContent>
          </Card>
        </div>
      </GrimoireLayout>
    );
  }

  // Main Codex View (List of Entries)
  return (
    <GrimoireLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-grimoire-primary tracking-tight mb-3">The Convergence Codex</h1>
          <p className="text-xl text-grimoire-foreground/80 max-w-3xl mx-auto">
            Delve into a curated collection of ancient texts, arcane rituals, and esoteric symbols drawn from revered grimoires throughout history.
          </p>
          <SpiritualQuote className="mt-6" />
        </header>

        {/* Search and Filter Section */}
        <div className="mb-8 p-6 border border-grimoire-border rounded-xl bg-grimoire-bg-secondary shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center mb-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search titles, descriptions, sources..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-3 w-full input-grimoire text-base"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-grimoire-icon" />
            </div>
            <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="button-grimoire-outline md:w-auto whitespace-nowrap py-3 px-5 text-base">
              <Filter className="mr-2 h-5 w-5" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {showFilters ? <ChevronUp className="ml-2 h-5 w-5" /> : <ChevronDown className="ml-2 h-5 w-5" />}
            </Button>
            <Button onClick={clearFilters} variant="ghost" className="button-grimoire-ghost md:w-auto whitespace-nowrap py-3 px-5 text-base">
              <X className="mr-2 h-5 w-5" /> Clear All
            </Button>
          </div>

          {showFilters && (
            <div className="pt-4 border-t border-grimoire-border-subtle">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mb-4">
                <div>
                  <label htmlFor="category-select" className="block text-sm font-medium text-grimoire-label mb-1">Category</label>
                  <Select value={activeCategory || ""} onValueChange={(value) => setActiveCategory(value === "all" || value === "" ? null : value)}>
                    <SelectTrigger id="category-select" className="select-grimoire w-full">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="difficulty-select" className="block text-sm font-medium text-grimoire-label mb-1">Difficulty</label>
                  <Select value={activeDifficulty || ""} onValueChange={(value) => setActiveDifficulty(value === "all" || value === "" ? null : value)}>
                    <SelectTrigger id="difficulty-select" className="select-grimoire w-full">
                      <SelectValue placeholder="All Difficulties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulties</SelectItem>
                      {DIFFICULTY_LEVELS.map(level => <SelectItem key={level} value={level}>{level}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="source-select" className="block text-sm font-medium text-grimoire-label mb-1">Source Grimoire</label>
                  <Select value={activeSourceFilter || ""} onValueChange={(value) => setActiveSourceFilter(value === "all" || value === "" ? null : value)}>
                    <SelectTrigger id="source-select" className="select-grimoire w-full">
                      <SelectValue placeholder="All Sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      {sources.map(src => <SelectItem key={src} value={src}>{src}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {allSigils.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-grimoire-label mb-2">Filter by Sigils:</h4>
                  <div className="flex flex-wrap gap-2">
                    {allSigils.map(sigil => (
                      <Badge
                        key={sigil}
                        variant={selectedSigils.includes(sigil) ? "default" : "secondary"}
                        onClick={() => toggleSigil(sigil)}
                        className="cursor-pointer badge-grimoire px-2.5 py-1 text-sm"
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
                <p className="text-lg text-grimoire-secondary">Summoning ancient wisdom...</p>
            </div>
        ) : filteredTexts.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="mx-auto h-16 w-16 text-grimoire-icon mb-6" />
            <p className="text-2xl font-semibold text-grimoire-secondary mb-2">No Tomes Uncovered</p>
            <p className="text-grimoire-foreground/70">Your current incantations (filters) yield no matching texts. <br/>Try altering your mystical search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTexts.map((entry) => (
              <Card key={entry.id} className="card-grimoire hover-lift transition-all duration-300 ease-out flex flex-col bg-grimoire-bg-secondary border-grimoire-border shadow-md hover:shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold text-grimoire-primary flex items-start">
                    <Hexagon className="h-5 w-5 mr-2.5 mt-1 text-grimoire-accent flex-shrink-0" /> 
                    <span className="leading-tight">{entry.title}</span>
                  </CardTitle>
                  <CardDescription className="text-xs text-grimoire-label pt-1">
                    {entry.source} <span className="mx-1">|</span> {entry.category} <span className="mx-1">|</span> {entry.difficulty}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-grimoire-foreground/80 line-clamp-4 mb-3 leading-relaxed">{entry.description}</p>
                  {entry.sigils && entry.sigils.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="text-xs text-grimoire-label mr-1">Sigils:</span>
                      {entry.sigils.slice(0, 3).map(sgl => (
                        <Badge key={sgl} variant="outline" className="badge-grimoire-outline text-xs px-1.5 py-0.5">{sgl}</Badge>
                      ))}
                      {entry.sigils.length > 3 && <Badge variant="outline" className="badge-grimoire-outline text-xs px-1.5 py-0.5">+{entry.sigils.length - 3}</Badge>}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t border-grimoire-border-subtle pt-3">
                  <Button onClick={() => viewTextDetail(entry)} variant="link" className="button-grimoire-link p-0 text-sm font-medium">
                    Unveil Secrets <BookOpen className="ml-1.5 h-4 w-4" />
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
