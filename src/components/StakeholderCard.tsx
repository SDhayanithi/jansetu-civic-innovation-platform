import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useT } from "@/utils/i18n";

export interface StakeholderProps {
  id: string;
  role: string;
  title: string;
  tagline: string;
  description: string;
  actionText: string;
  route: string;
  icon: any;
  tone: "green" | "navy" | "teal" | "amber";
  capabilities: string[];
  image?: string;
}

export function StakeholderCard({ item }: { item: StakeholderProps }) {
  const t = useT();
  const Icon = item.icon;

  const toneClasses = {
    green: "border-accent/40 text-accent bg-accent/15",
    navy: "border-rose-600/40 text-rose-700 bg-rose-50",
    teal: "border-blue-600/40 text-blue-700 bg-blue-50",
    amber: "border-amber-500/40 text-amber-700 bg-amber-50",
  }[item.tone];

  const badgeTone = {
    green: "bg-accent/15 text-accent border border-accent/25",
    navy: "bg-rose-100 text-rose-800 border border-rose-200",
    teal: "bg-blue-100 text-blue-800 border border-blue-200",
    amber: "bg-amber-100 text-amber-800 border border-amber-200",
  }[item.tone];

  return (
    <div className="hover-card-lift group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-card transition-all duration-300 hover:shadow-elevated">
      <div>
        {/* Top Header with Icon and Role Tag */}
        <div className="flex items-center justify-between">
          <span className={`grid size-11 place-items-center rounded-xl border ${toneClasses}`}>
            <Icon size={22} />
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wider ${badgeTone}`}>
            {t(item.role)}
          </span>
        </div>

        {/* Title and Tagline */}
        <h3 className="mt-3.5 text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
          {t(item.title)}
        </h3>
        <p className="mt-0.5 text-xs font-semibold text-accent">{t(item.tagline)}</p>

        {/* Visual Thumbnail */}
        {item.image && (
          <div className="mt-3.5 h-36 w-full overflow-hidden rounded-xl border border-border/60 bg-muted/30">
            <img
              src={item.image}
              alt={item.title}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                // Graceful fallback if offline
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
        )}

        {/* Description */}
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t(item.description)}</p>

        {/* Capabilities List */}
        <ul className="mt-3.5 space-y-1.5 border-t border-border/60 pt-3 text-xs font-medium text-foreground/80">
          {item.capabilities.map((cap) => (
            <li key={cap} className="flex items-center gap-2">
              <CheckCircle2 size={13} className="shrink-0 text-accent" />
              <span>{t(cap)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="mt-5 border-t border-border/50 pt-3.5">
        <Link
          to={item.route as any}
          className="inline-flex w-full items-center justify-between rounded-xl border border-border/80 bg-muted/40 px-4 py-2.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <span>{t(item.actionText)}</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
