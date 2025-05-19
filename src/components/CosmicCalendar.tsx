import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const events = [
  { date: "2025-05-20", title: "Full Moon in Sagittarius", description: "Ideal for manifestation and spiritual expansion." },
  { date: "2025-05-22", title: "Mercury Direct", description: "Clarity returns to communication and ritual work." },
  { date: "2025-05-25", title: "Solar Festival", description: "Celebrate solar energy and personal power." },
];

export default function CosmicCalendar({ className = "" }) {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <Card className={`bg-grimoire-muted border-grimoire-border grimoire-border mb-6 animate-fade-in ${className}`}>
      <CardHeader>
        <CardTitle className="text-grimoire-foreground grimoire-text-shadow flex items-center gap-2">
          <Calendar className="h-5 w-5 text-grimoire-primary grimoire-glow" />
          Cosmic Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {events.map(ev => (
            <li key={ev.date} className={`p-2 rounded ${ev.date === today ? 'bg-grimoire-primary/10 border-l-4 border-grimoire-primary' : ''}`}>
              <div className="font-semibold text-grimoire-primary">{ev.title}</div>
              <div className="text-xs text-grimoire-foreground/70">{ev.date}</div>
              <div className="text-grimoire-foreground/90">{ev.description}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
