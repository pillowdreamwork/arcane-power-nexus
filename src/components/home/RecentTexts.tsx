
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface SpiritualText {
  id: string;
  title: string;
  category: string;
  source: string;
  content: string;
}

const RecentTexts: React.FC = () => {
  const [recentTexts, setRecentTexts] = useState<SpiritualText[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Fetch recent spiritual texts
  useEffect(() => {
    const fetchRecentTexts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('spiritual_texts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
          
        if (error) throw error;
        setRecentTexts(data || []);
      } catch (error) {
        console.error("Error fetching recent texts:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentTexts();
  }, []);

  if (loading) {
    return (
      <div className="bg-grimoire-muted border border-grimoire-border rounded-lg p-8 text-center">
        <p className="text-grimoire-foreground/70 mb-2">Loading spiritual texts...</p>
        <div className="w-8 h-8 border-2 border-grimoire-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  if (recentTexts.length === 0) {
    return (
      <div className="bg-grimoire-muted border border-grimoire-border rounded-lg p-8 text-center">
        <p className="text-grimoire-foreground/70 mb-2">No spiritual texts found</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/codex')}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Browse Codex
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {recentTexts.map((text) => (
        <Card key={text.id} className="bg-grimoire-muted border-grimoire-border grimoire-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="grimoire-text-shadow text-lg">{text.title}</CardTitle>
              <span className="text-xs px-2 py-1 rounded-full bg-grimoire-background/50 text-grimoire-foreground/70">
                {text.category}
              </span>
            </div>
            <CardDescription className="text-grimoire-foreground/70">
              {text.source}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-grimoire-foreground/90 line-clamp-3">
              {text.content}
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full hover:border-grimoire-primary/70 hover:text-grimoire-primary transition-colors"
              onClick={() => navigate(`/codex/${text.id}`)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Read Full Text
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default RecentTexts;
