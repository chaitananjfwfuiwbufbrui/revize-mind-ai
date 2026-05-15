import { createFileRoute, Link, useParams, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { decks, flashcards } from "@/lib/mock-data";
import { X } from "lucide-react";

export const Route = createFileRoute("/review/$deckId")({
  component: ReviewPage,
});

const RATINGS = [
  { label: "Again", interval: "1m", color: "text-danger", border: "hover:border-danger/40" },
  { label: "Hard", interval: "2d", color: "text-warning", border: "hover:border-warning/40" },
  { label: "Good", interval: "4d", color: "text-success", border: "hover:border-success/40" },
  { label: "Easy", interval: "7d", color: "text-primary", border: "hover:border-primary/40" },
] as const;

function ReviewPage() {
  const { deckId } = useParams({ from: "/review/$deckId" });
  const deck = decks.find((d) => d.id === deckId);
  if (!deck) throw notFound();

  const cards = flashcards.filter((c) => c.deckId === deckId);
  // Fallback demo cards if deck has none
  const queue =
    cards.length > 0
      ? cards
      : [
          {
            id: "demo-1",
            deckId,
            question: "Tap a difficulty after revealing the answer.",
            answer: "This is a demo card — generate real ones from the Upload screen.",
          },
        ];

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const card = queue[index];
  const total = queue.length;

  function rate(_label: string) {
    if (index + 1 >= total) {
      setDone(true);
    } else {
      setIndex(index + 1);
      setRevealed(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center space-y-5">
          <div className="text-6xl">🎉</div>
          <h1 className="font-display text-3xl font-extrabold">Session complete</h1>
          <p className="text-muted-foreground">
            You reviewed {total} card{total === 1 ? "" : "s"} from {deck.title}.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary text-primary-foreground font-display font-semibold px-6 py-3 rounded-2xl"
          >
            Back home
          </Link>
        </div>
      </div>
    );
  }

  const progress = ((index + (revealed ? 0.5 : 0)) / total) * 100;

  return (
    <div className="min-h-screen w-full bg-background flex justify-center">
      <div className="relative w-full max-w-md min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="px-5 pt-12 pb-3 flex items-center gap-3">
          <Link
            to="/deck/$deckId"
            params={{ deckId }}
            className="size-9 rounded-full bg-card border border-border grid place-items-center"
            aria-label="Close"
          >
            <X className="size-4" />
          </Link>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-bold text-muted-foreground tabular-nums">
            {index + 1}/{total}
          </span>
        </div>

        {/* Card */}
        <div className="flex-1 px-5 py-6 flex">
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            className="flex-1 rounded-[32px] bg-card border border-border shadow-pop p-7 flex flex-col text-left active:scale-[0.99] transition-transform"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                Card {index + 1} of {total}
              </span>
              <span className="text-lg">💡</span>
            </div>

            <div className="flex-1 flex flex-col justify-center text-center py-8 gap-5">
              <p className="font-display text-2xl font-semibold leading-snug text-balance">
                {card.question}
              </p>
              {revealed && (
                <>
                  <div className="h-px w-12 bg-border mx-auto" />
                  <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                    {card.answer}
                  </p>
                </>
              )}
            </div>

            {!revealed && (
              <div className="text-center text-sm font-medium text-muted-foreground underline underline-offset-8 decoration-border">
                Tap to flip
              </div>
            )}
          </button>
        </div>

        {/* Difficulty buttons */}
        <div className="px-5 pb-8">
          {revealed ? (
            <div className="grid grid-cols-2 gap-3">
              {RATINGS.map((r) => (
                <button
                  key={r.label}
                  onClick={() => rate(r.label)}
                  className={`p-4 rounded-2xl bg-card border-2 border-border ${r.border} transition-colors flex flex-col items-center gap-1`}
                >
                  <span className={`text-sm font-bold ${r.color}`}>{r.label}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">{r.interval}</span>
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => setRevealed(true)}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-display font-semibold"
            >
              Show answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
