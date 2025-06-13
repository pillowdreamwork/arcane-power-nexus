import React from 'react';
import { GrimoireEntry } from '@/data/grimoireContent.ts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, Clock, Moon, Link2, Atom, BookOpen } from 'lucide-react'; // Added Atom, BookOpen as placeholder icons

interface GrimoireEntryDisplayProps {
  entry: GrimoireEntry;
}

const GrimoireEntryDisplay: React.FC<GrimoireEntryDisplayProps> = ({ entry }) => {
  return (
    <Card className="bg-grimoire-muted border border-grimoire-border rounded-lg shadow-xl mb-6">
      <CardHeader className="p-6">
        <CardTitle className="font-inter font-bold text-3xl text-grimoire-primary mb-2">{entry.title}</CardTitle>
        {entry.source && (
          <p className="text-sm text-grimoire-foreground/70 mb-1 italic">
            From: {entry.source}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {entry.category && (
            <Badge className="bg-grimoire-border text-grimoire-foreground/80 text-xs mr-2 font-inter">
              {entry.category}
            </Badge>
          )}
          {entry.difficulty && (
            <Badge className="bg-grimoire-border text-grimoire-foreground/80 text-xs mr-2 font-inter">
              Difficulty: {entry.difficulty}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        {entry.description && (
          <p className="text-grimoire-foreground/90 mb-4 text-lg font-inter">{entry.description}</p>
        )}

        <Accordion type="single" collapsible className="w-full" defaultValue="fullText">
          {entry.fullText && (
            <AccordionItem value="fullText">
              <AccordionTrigger className="font-semibold text-grimoire-foreground hover:text-grimoire-primary">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-grimoire-primary" /> Full Text
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-grimoire-foreground/80 whitespace-pre-wrap text-sm leading-relaxed font-inter p-2">
                {entry.fullText}
              </AccordionContent>
            </AccordionItem>
          )}

          {entry.materials && entry.materials.length > 0 && (
            <AccordionItem value="materials">
              <AccordionTrigger className="font-semibold text-grimoire-foreground hover:text-grimoire-primary">
                <div className="flex items-center">
                  <Atom className="h-4 w-4 mr-2 text-grimoire-primary" /> Materials
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-grimoire-foreground/80 font-inter p-2">
                <ul className="list-disc list-inside text-sm">
                  {entry.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {entry.warnings && entry.warnings.length > 0 && (
            <AccordionItem value="warnings">
              <AccordionTrigger className="font-semibold text-grimoire-foreground hover:text-grimoire-primary">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-400" /> Warnings
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-grimoire-foreground/80 font-inter p-2">
                <ul className="list-disc list-inside text-sm">
                  {entry.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start">
                       <AlertTriangle className="h-4 w-4 mr-2 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-red-400">{warning}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )}

          {entry.historicalContext && (
            <AccordionItem value="historicalContext">
              <AccordionTrigger className="font-semibold text-grimoire-foreground hover:text-grimoire-primary">
                <div className="flex items-center">
                   <BookOpen className="h-4 w-4 mr-2 text-grimoire-primary" /> Historical Context
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-grimoire-foreground/80 text-sm italic font-inter p-2">
                {entry.historicalContext}
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>

      {(entry.sigils || entry.planetaryHours || entry.moonPhases || entry.crossReferences) && (
        <CardFooter className="p-6 pt-2 flex-col items-start">
          {entry.sigils && entry.sigils.length > 0 && (
            <div className="mb-3 w-full">
              <h4 className="font-medium text-grimoire-foreground/90 mb-1 mt-4 font-inter text-sm">Sigils & Glyphs</h4>
              <div className="flex flex-wrap gap-4">
                {entry.sigils.map((sigil, index) => (
                  <span key={index} className="grimoire-text text-2xl text-grimoire-primary p-2 bg-grimoire-border rounded-md animate-pulse-subtle">
                    {sigil}
                  </span>
                ))}
              </div>
            </div>
          )}

          {entry.planetaryHours && entry.planetaryHours.length > 0 && (
            <div className="mb-3 w-full">
              <h4 className="font-medium text-grimoire-foreground/90 mb-1 mt-2 font-inter text-sm">Planetary Hours</h4>
              <div className="flex flex-wrap gap-1">
                {entry.planetaryHours.map((hour, index) => (
                  <Badge key={index} variant="outline" className="text-xs text-grimoire-foreground/70 border-grimoire-border font-inter">{hour}</Badge>
                ))}
              </div>
            </div>
          )}

          {entry.moonPhases && entry.moonPhases.length > 0 && (
            <div className="mb-3 w-full">
              <h4 className="font-medium text-grimoire-foreground/90 mb-1 mt-2 font-inter text-sm">Moon Phases</h4>
               <div className="flex flex-wrap gap-1">
                {entry.moonPhases.map((phase, index) => (
                  <Badge key={index} variant="outline" className="text-xs text-grimoire-foreground/70 border-grimoire-border font-inter">{phase}</Badge>
                ))}
              </div>
            </div>
          )}

          {entry.crossReferences && entry.crossReferences.length > 0 && (
            <div className="w-full">
              <h4 className="font-medium text-grimoire-foreground/90 mb-1 mt-2 font-inter text-sm">Cross References</h4>
              <div className="flex flex-wrap gap-1">
                {entry.crossReferences.map((ref, index) => (
                  <Badge key={index} variant="outline" className="text-xs text-grimoire-foreground/70 border-grimoire-border hover:border-grimoire-primary hover:text-grimoire-primary cursor-pointer font-inter">
                    {ref}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default GrimoireEntryDisplay;
