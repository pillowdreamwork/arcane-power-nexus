
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/codex?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Card className={`bg-grimoire-muted/80 border-grimoire-border grimoire-border backdrop-blur-sm animate-fade-in ${className}`}>
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <p className="text-grimoire-foreground/90 italic">
            "The one who follows the path of liberation knows that the Self is the only God."
            <span className="block text-sm mt-1 text-grimoire-foreground/70">— Dattatreya Tantra</span>
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <Input 
            placeholder="Search spiritual knowledge..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="bg-grimoire-background border-grimoire-border"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchBar;
