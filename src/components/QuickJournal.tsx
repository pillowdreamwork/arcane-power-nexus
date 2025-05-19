import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";

export default function QuickJournal() {
  const [open, setOpen] = useState(false);
  const [entry, setEntry] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setOpen(false);
    setEntry("");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        className="rounded-full shadow-lg bg-grimoire-primary text-white grimoire-glow hover:scale-105 transition-transform"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Open Journal"
      >
        <Pencil className="h-6 w-6" />
      </Button>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Card className="w-full max-w-md animate-fade-in">
            <CardContent className="p-6">
              <textarea
                className="w-full h-32 p-2 rounded border border-grimoire-border bg-grimoire-background text-grimoire-foreground mb-4"
                placeholder="Record your spiritual experience..."
                value={entry}
                onChange={e => setEntry(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={!entry.trim()}>Save</Button>
              </div>
              {saved && <div className="text-green-500 mt-2">Entry saved!</div>}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
