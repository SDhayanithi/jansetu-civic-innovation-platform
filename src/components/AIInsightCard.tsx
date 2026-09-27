import { BadgeCheck, Sparkles } from "lucide-react";
import { useT } from "@/utils/i18n";

export interface AICardProps {
  id: string;
  title: string;
  description: string;
  sampleMetric: string;
  sampleLabel: string;
  techStack: string;
  icon: any;
}

export function AIInsightCard({ item }: { item: AICardProps }) {
  const t = useT();
  const Icon = item.icon;

  return (
    <div className="hover-card-lift ai-card-glow group relative flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-card transition-all">
      <div>
        <div className="flex items-center justify-between">
          <span className="grid size-11 place-items-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
            <Icon size={22} />
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
            <Sparkles size={12} />
            <span>AI Ready</span>
          </span>
        </div>

        <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary">
          {t(item.title)}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {t(item.description)}
        </p>

        {/* Live sample simulation output */}
        <div className="mt-4 rounded-lg border border-border/80 bg-muted/60 p-3">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {t(item.sampleLabel)}
          </span>
          <p className="mt-1 font-mono text-xs font-semibold text-primary">
            {item.sampleMetric}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
        <span>Engine: {item.techStack}</span>
        <span className="flex items-center gap-1 text-accent font-medium">
          <BadgeCheck size={14} />
          Demo Ready
        </span>
      </div>
    </div>
  );
}
