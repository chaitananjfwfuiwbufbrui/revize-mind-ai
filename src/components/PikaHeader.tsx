import { Flame } from "lucide-react";

export function PikaHeader({
  title,
  subtitle,
  streak,
}: {
  title: string;
  subtitle?: string;
  streak?: number;
}) {
  return (
    <header className="bg-brand text-brand-foreground pt-12 pb-10 px-6 rounded-b-[40px] shadow-soft">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">{title}</h1>
          {subtitle && <p className="text-brand-foreground/70 font-medium mt-0.5">{subtitle}</p>}
        </div>
        {streak !== undefined && (
          <div className="bg-card/90 backdrop-blur px-4 py-2 rounded-2xl flex items-center gap-2 shadow-soft">
            <Flame className="size-5 text-orange-500 fill-orange-400" />
            <span className="font-display font-extrabold text-xl text-foreground">{streak}</span>
          </div>
        )}
      </div>
    </header>
  );
}
