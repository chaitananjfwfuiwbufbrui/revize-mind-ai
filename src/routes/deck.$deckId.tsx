import { createFileRoute, Link, useParams, notFound } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { decks, flashcards } from "@/lib/mock-data";
import { ArrowLeft, Pencil, Trash2, Play } from "lucide-react";

export const Route = createFileRoute("/deck/$deckId")({
  component: DeckDetailPage,
});

function DeckDetailPage() {
  const { deckId } = useParams({ from: "/deck/$deckId" });
  const deck = decks.find((d) => d.id === deckId);
  if (!deck) throw notFound();

  const cards = flashcards.filter((c) => c.deckId === deckId);

  return (
    <MobileShell>
      <header className="bg-brand text-brand-foreground pt-12 pb-10 px-6 rounded-b-[40px] shadow-soft">
        <Link to="/decks" className="inline-flex items-center gap-1 text-sm font-semibold mb-3 opacity-80">
          <ArrowLeft className="size-4" /> Back
        </Link>
        <div className="flex items-center gap-4">
          <div className={`size-16 ${deck.tint} rounded-2xl grid place-items-center text-3xl`}>
            {deck.emoji}
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-extrabold">{deck.title}</h1>
            <p className="text-sm opacity-70 mt-0.5">
              {deck.total} cards · last reviewed {deck.lastReviewed}
            </p>
          </div>
        </div>
      </header>

      <main className="px-5 -mt-6 space-y-5">
        <section className="bg-card rounded-3xl p-5 shadow-soft border border-border grid grid-cols-3 gap-3 text-center">
          <Stat label="Due" value={deck.due} accent />
          <Stat label="Mastered" value={`${deck.mastered}%`} />
          <Stat label="Total" value={deck.total} />
        </section>

        <Link
          to="/review/$deckId"
          params={{ deckId: deck.id }}
          className="w-full bg-primary text-primary-foreground font-display font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-pop hover:scale-[0.98] transition-transform"
        >
          <Play className="size-5 fill-current" /> Start Review
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <button className="bg-card border border-border rounded-2xl py-3 font-semibold text-sm flex items-center justify-center gap-2">
            <Pencil className="size-4" /> Edit deck
          </button>
          <button className="bg-card border border-border rounded-2xl py-3 font-semibold text-sm text-danger flex items-center justify-center gap-2">
            <Trash2 className="size-4" /> Delete
          </button>
        </div>

        <section>
          <h2 className="font-display text-lg font-extrabold mb-3">Cards</h2>
          <div className="space-y-2">
            {cards.length === 0 && (
              <p className="text-sm text-muted-foreground bg-card p-4 rounded-2xl border border-border">
                No cards yet — generate or add some.
              </p>
            )}
            {cards.map((c, i) => (
              <div key={c.id} className="bg-card p-4 rounded-2xl border border-border">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Card {i + 1}
                </div>
                <p className="font-display font-semibold text-sm">{c.question}</p>
                <p className="text-xs text-muted-foreground mt-1.5">{c.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </MobileShell>
  );
}

function Stat({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div>
      <div className={`font-display font-extrabold text-2xl ${accent ? "text-primary" : ""}`}>{value}</div>
      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}
