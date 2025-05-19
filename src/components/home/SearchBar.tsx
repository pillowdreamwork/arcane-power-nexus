import React, { useState } from "react";
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
    <div className={`w-full ${className}`}>
      <div className="flex gap-2">
        <Input 
          placeholder="Search the grimoire..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="bg-grimoire-background"
        />
        <Button variant="outline" onClick={handleSearch}>
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
