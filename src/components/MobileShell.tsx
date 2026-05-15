import { Link, useLocation } from "@tanstack/react-router";
import { Home, Layers, Plus, BarChart3, User } from "lucide-react";
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
      <div className="relative w-full max-w-md min-h-screen pb-28 bg-background">
        {children}

        {/* Bottom nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
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
