import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { PikaHeader } from "@/components/PikaHeader";
import { profile } from "@/lib/mock-data";
import { Bell, Moon, Gift, LogOut, Crown, Copy, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <MobileShell>
      <PikaHeader title="Profile" />

      <main className="px-5 -mt-6 space-y-5">
        {/* User card */}
        <section className="bg-card rounded-3xl p-5 shadow-soft border border-border flex items-center gap-4">
          <div className="size-16 rounded-2xl bg-brand grid place-items-center text-2xl font-display font-extrabold text-brand-foreground">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-extrabold text-lg truncate">{profile.name}</h2>
            <p className="text-sm text-muted-foreground truncate">{profile.email}</p>
            <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {profile.plan} plan
            </span>
          </div>
        </section>

        {/* Upgrade */}
        <button className="w-full bg-primary text-primary-foreground rounded-3xl p-5 shadow-pop flex items-center gap-4 text-left hover:scale-[0.99] transition-transform">
          <Crown className="size-6 shrink-0" />
          <div className="flex-1">
            <h3 className="font-display font-extrabold">Go Pro</h3>
            <p className="text-sm opacity-80">Unlimited AI generations</p>
          </div>
          <ChevronRight className="size-5" />
        </button>

        {/* Referral */}
        <section className="bg-brand-soft rounded-3xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="size-5 text-foreground" />
            <h3 className="font-display font-extrabold">Invite friends</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Get 1 month Pro free for every friend who subscribes.
          </p>
          <div className="mt-4 flex items-center gap-2 bg-card border border-border rounded-2xl p-2 pl-4">
            <span className="font-mono text-sm font-bold flex-1 truncate">{profile.referralCode}</span>
            <button className="bg-primary text-primary-foreground rounded-xl px-3 py-2 text-xs font-bold flex items-center gap-1.5">
              <Copy className="size-3.5" /> Copy
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            {profile.referrals} friends invited
          </p>
        </section>

        {/* Settings */}
        <section className="bg-card rounded-3xl border border-border shadow-soft overflow-hidden">
          <Row icon={<Bell className="size-4" />} label="Notifications" />
          <Row icon={<Moon className="size-4" />} label="Dark mode" />
          <Row icon={<LogOut className="size-4" />} label="Log out" danger />
        </section>

        <p className="text-center text-[11px] text-muted-foreground">Pika v0.1 · UI preview</p>
      </main>
    </MobileShell>
  );
}

function Row({
  icon,
  label,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors ${
        danger ? "text-danger" : ""
      }`}
    >
      <span className={`${danger ? "text-danger" : "text-muted-foreground"}`}>{icon}</span>
      <span className="flex-1 text-left text-sm font-semibold">{label}</span>
      <ChevronRight className="size-4 text-muted-foreground" />
    </button>
  );
}
