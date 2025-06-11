
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Sample search suggestions based on user input
const generateSuggestions = (query: string): string[] => {
  if (!query || query.length < 2) return [];
  
  query = query.toLowerCase();
  const allSuggestions = [
    "astral projection techniques",
    "protection rituals for beginners",
    "energy harvesting methods",
    "entity communication safety",
    "psychic prison breaking",
    "scrying mirror creation",
    "void meditation practice",
    "sigil activation rituals",
    "thought-form construction",
    "kundalini awakening risks",
    "reality manipulation ethics",
    "banishing rituals for home",
    "third eye activation",
    "psychic self-defense",
    "entity identification methods",
    "dreamwalking techniques"
  ];
  
  return allSuggestions
    .filter(suggestion => suggestion.includes(query))
    .slice(0, 5);
};

// Recent searches mockup
const recentSearches = [
  "protection circle casting",
  "entity banishing",
  "third eye activation"
];

const SearchBar: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Update suggestions based on query
  useEffect(() => {
    if (searchQuery) {
      setSuggestions(generateSuggestions(searchQuery));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        suggestionRef.current && 
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/codex?search=${encodeURIComponent(searchQuery)}`);
      setIsFocused(false);
    }
  };
  
  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate(`/codex?search=${encodeURIComponent(suggestion)}`);
    setIsFocused(false);
  };
  
  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className={`w-full relative ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input 
            ref={inputRef}
            placeholder="Search the grimoire..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            onFocus={() => setIsFocused(true)}
            className="bg-grimoire-background pr-8 border border-grimoire-border focus:ring-grimoire-primary placeholder:text-grimoire-foreground/50 text-grimoire-foreground"
          />
          {searchQuery && (
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-grimoire-foreground/60 hover:text-grimoire-foreground"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          onClick={handleSearch}
          className="border-grimoire-primary/50 text-grimoire-primary hover:bg-grimoire-primary/10 hover:border-grimoire-primary hover:text-grimoire-primary"
        >
          <Search className="h-4 w-4 text-grimoire-primary" />
        </Button>
      </div>
      
      <AnimatePresence>
        {isFocused && (searchQuery.length > 1 || !searchQuery) && (
          <motion.div 
            ref={suggestionRef}
            className="absolute w-full mt-1 bg-grimoire-background border border-grimoire-border rounded-md shadow-lg z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {!searchQuery && recentSearches.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-grimoire-foreground/70 px-2 py-1 font-medium">Recent Searches</div>
                {recentSearches.map((recent, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 text-sm text-grimoire-foreground hover:bg-grimoire-muted cursor-pointer rounded flex items-center"
                    onClick={() => handleSelectSuggestion(recent)}
                  >
                    <Search className="h-3 w-3 mr-2 text-grimoire-foreground/60" />
                    {recent}
                  </div>
                ))}
              </div>
            )}
            
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-grimoire-foreground/70 px-2 py-1 font-medium">Suggestions</div>
                {suggestions.map((suggestion, idx) => (
                  <motion.div
                    key={idx}
                    className="px-3 py-2 text-sm text-grimoire-foreground hover:bg-grimoire-muted cursor-pointer rounded flex items-center justify-between group"
                    onClick={() => handleSelectSuggestion(suggestion)}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex items-center">
                      <Search className="h-3 w-3 mr-2 text-grimoire-foreground/60" />
                      <span>
                        {suggestion.split(searchQuery.toLowerCase()).map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {i > 0 && (
                              <span className="font-medium text-grimoire-primary">
                                {searchQuery.toLowerCase()}
                              </span>
                            )}
                            {part}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            )}
            
            {searchQuery && suggestions.length === 0 && (
              <div className="p-4 text-center text-sm text-grimoire-foreground/60">
                No suggestions found for "{searchQuery}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
