import { Link, useLocation } from "@tanstack/react-router";
import { Home, Layers, Plus, BarChart3, User, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/decks", label: "Decks", icon: Layers },
  { to: "/stats", label: "Stats", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function MobileShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen w-full bg-background flex justify-center">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex sticky top-0 h-screen w-64 lg:w-72 shrink-0 flex-col gap-2 px-5 py-8 border-r border-border bg-card/40">
        <Link to="/" className="flex items-center gap-2 px-3 mb-6">
          <div className="size-9 rounded-xl bg-primary text-primary-foreground grid place-items-center shadow-soft">
            <Sparkles className="size-5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-2xl font-extrabold tracking-tight">Pika</span>
        </Link>

        <nav className="flex flex-col gap-1">
          {tabs.map((t) => {
            const active = pathname === t.to;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <t.icon className="size-5" strokeWidth={active ? 2.5 : 2} />
                {t.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/upload"
          className="mt-4 flex items-center justify-center gap-2 bg-brand text-brand-foreground font-display font-bold py-3 rounded-2xl shadow-pop hover:scale-[0.98] transition-transform"
        >
          <Plus className="size-5" strokeWidth={2.5} /> New upload
        </Link>

        <div className="mt-auto text-[11px] text-muted-foreground px-3">Pika v0.1</div>
      </aside>

      {/* Main column */}
      <div className="relative w-full max-w-md md:max-w-4xl min-h-screen pb-28 md:pb-12 md:px-8 lg:px-12 bg-background">
        {children}

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
          <div className="mx-3 mb-3 rounded-3xl bg-card/95 backdrop-blur-xl border border-border shadow-pop px-4 py-3 flex items-center justify-between">
            {tabs.slice(0, 2).map((t) => (
              <TabLink key={t.to} {...t} active={pathname === t.to} />
            ))}

            <Link
              to="/upload"
              className="-mt-8 size-14 rounded-full bg-primary text-primary-foreground shadow-pop border-4 border-card grid place-items-center hover:scale-105 active:scale-95 transition-transform"
              aria-label="Upload"
            >
              <Plus className="size-6" strokeWidth={2.5} />
            </Link>

            {tabs.slice(2).map((t) => (
              <TabLink key={t.to} {...t} active={pathname === t.to} />
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

function TabLink({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
        active ? "text-primary" : "text-muted-foreground"
      }`}
    >
      <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </Link>
  );
}
