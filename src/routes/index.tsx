import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { PikaHeader } from "@/components/PikaHeader";
import { decks, stats, profile } from "@/lib/mock-data";
import { FileText, Youtube, NotebookPen, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const dueTotal = decks.reduce((s, d) => s + d.due, 0);

  return (
    <MobileShell>
      <PikaHeader title="Pika" subtitle={`Hey ${profile.name}, ready to smash it?`} streak={stats.streak} />

      <main className="px-5 -mt-6 space-y-7">
        {/* Due card */}
        <section className="bg-card rounded-3xl p-5 shadow-soft border border-border flex items-center justify-between">
          <div>
            <div className="text-muted-foreground text-sm font-medium mb-1">Due for review</div>
            <div className="text-4xl font-display font-extrabold text-primary">{dueTotal}</div>
          </div>
          <Link
            to="/review/$deckId"
            params={{ deckId: decks[0].id }}
            className="bg-primary text-primary-foreground font-display font-semibold px-5 py-3 rounded-2xl hover:scale-95 active:scale-90 transition-transform"
          >
            Start Review
          </Link>
        </section>

        {/* Quick upload */}
        <section>
          <h2 className="font-display text-xl font-extrabold mb-3">Magic Upload</h2>
          <div className="grid grid-cols-3 gap-3">
            <UploadTile to="/upload" icon={<FileText className="size-5" />} label="PDF" />
            <UploadTile to="/upload" icon={<Youtube className="size-5" />} label="YouTube" />
            <UploadTile to="/upload" icon={<NotebookPen className="size-5" />} label="Notes" />
          </div>
        </section>

        {/* Decks */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h2 className="font-display text-xl font-extrabold">My Decks</h2>
            <Link to="/decks" className="text-primary text-sm font-semibold">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {decks.slice(0, 3).map((d) => (
              <Link
                key={d.id}
                to="/deck/$deckId"
                params={{ deckId: d.id }}
                className="bg-card p-4 rounded-3xl flex items-center gap-4 shadow-soft border border-border hover:border-primary/30 transition-colors"
              >
                <div className={`size-14 ${d.tint} rounded-2xl grid place-items-center text-2xl shrink-0`}>
                  {d.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold truncate">{d.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${d.mastered}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-bold">
                      {d.mastered}%
                    </span>
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
        </section>
      </main>
    </MobileShell>
  );
}

function UploadTile({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="bg-card p-4 rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center aspect-square gap-2 hover:border-primary group transition-colors"
    >
      <div className="size-10 bg-muted rounded-full grid place-items-center group-hover:bg-primary/10 group-hover:text-primary text-muted-foreground transition-colors">
        {icon}
      </div>
      <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary">
        {label}
      </span>
    </Link>
  );
}
