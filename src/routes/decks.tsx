import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { PikaHeader } from "@/components/PikaHeader";
import { decks } from "@/lib/mock-data";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/decks")({
  component: DecksPage,
});

function DecksPage() {
  return (
    <MobileShell>
      <PikaHeader title="My Decks" subtitle={`${decks.length} active decks`} />

      <main className="px-5 md:px-10 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

          {decks.map((d) => (
            <Link
              key={d.id}
              to="/deck/$deckId"
              params={{ deckId: d.id }}
              className="bg-card p-4 rounded-3xl flex items-center gap-4 shadow-soft border border-border"
            >
              <div className={`size-14 ${d.tint} rounded-2xl grid place-items-center text-2xl shrink-0`}>
                {d.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold truncate">{d.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {d.total} cards · {d.lastReviewed}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${d.mastered}%` }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-bold">{d.mastered}%</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                {d.due > 0 ? (
                  <span className="block text-xs font-bold text-primary">{d.due} DUE</span>
                ) : (
                  <span className="block text-xs font-bold text-success">DONE</span>
                )}
                <ChevronRight className="size-4 text-muted-foreground inline-block mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </MobileShell>
  );
}
