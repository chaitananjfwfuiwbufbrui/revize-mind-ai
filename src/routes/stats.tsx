import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { PikaHeader } from "@/components/PikaHeader";
import { stats } from "@/lib/mock-data";
import { Flame, Trophy, BookOpen, CalendarCheck } from "lucide-react";

export const Route = createFileRoute("/stats")({
  component: StatsPage,
});

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function StatsPage() {
  const max = Math.max(...stats.weekly);

  return (
    <MobileShell>
      <PikaHeader title="Your Stats" subtitle="Keep the streak alive" />

      <main className="px-5 -mt-6 space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <Metric icon={<Flame className="size-4" />} label="Current streak" value={`${stats.streak} days`} accent />
          <Metric icon={<Trophy className="size-4" />} label="Longest streak" value={`${stats.longestStreak} days`} />
          <Metric icon={<BookOpen className="size-4" />} label="Cards reviewed" value={stats.cardsReviewedTotal.toLocaleString()} />
          <Metric icon={<CalendarCheck className="size-4" />} label="Study days" value={stats.studyDays} />
        </div>

        {/* Weekly chart */}
        <section className="bg-card rounded-3xl p-5 shadow-soft border border-border">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-display font-extrabold">This week</h2>
            <span className="text-xs font-bold text-muted-foreground">
              {stats.weekly.reduce((a, b) => a + b, 0)} cards
            </span>
          </div>
          <div className="flex items-end justify-between gap-2 h-40">
            {stats.weekly.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className="w-full rounded-t-xl bg-primary/80"
                    style={{ height: `${(v / max) * 100}%`, minHeight: 4 }}
                    title={`${v} cards`}
                  />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground">{DAYS[i]}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-brand-soft rounded-3xl p-5 border border-border">
          <h3 className="font-display font-extrabold text-lg">🔥 You're on fire!</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {stats.cardsReviewedToday} cards reviewed today. Keep it going to extend your streak.
          </p>
        </section>
      </main>
    </MobileShell>
  );
}

function Metric({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="bg-card rounded-2xl p-4 shadow-soft border border-border">
      <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${accent ? "text-primary" : "text-muted-foreground"}`}>
        {icon} {label}
      </div>
      <div className="font-display font-extrabold text-2xl mt-1.5">{value}</div>
    </div>
  );
}
