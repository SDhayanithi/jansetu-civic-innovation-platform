import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileText, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { useT } from "@/utils/i18n";

interface StatItem {
  id: string;
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subtext: string;
  icon: any;
}

const statsData: StatItem[] = [
  {
    id: "problems",
    target: 60400,
    suffix: "+",
    label: "Problems Reported",
    subtext: "Civic reports with GPS verification",
    icon: FileText,
  },
  {
    id: "solutions",
    target: 47310,
    suffix: "+",
    label: "Solutions Provided",
    subtext: "From student & faculty innovators",
    icon: Sparkles,
  },
  {
    id: "rate",
    target: 78,
    suffix: "%",
    label: "Solution Success Rate",
    subtext: "Approved through technical review",
    icon: TrendingUp,
  },
  {
    id: "districts",
    target: 24,
    suffix: " Districts",
    label: "Districts Covered",
    subtext: "Full coverage across Jharkhand",
    icon: MapPin,
  },
];

function StatCounter({ item, inView }: { item: StatItem; inView: boolean }) {
  const [current, setCurrent] = useState(0);
  const t = useT();

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(Math.floor(ease * item.target));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrent(item.target);
      }
    };

    window.requestAnimationFrame(step);
  }, [inView, item.target]);

  const Icon = item.icon;

  return (
    <div className="relative overflow-hidden rounded-xl border border-primary-foreground/15 bg-primary/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-primary/80">
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-lg bg-accent/20 text-accent">
          <Icon size={22} />
        </span>
        <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent">
          Verified GIS
        </span>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
          {item.prefix || ""}
          {current.toLocaleString()}
          {item.suffix || ""}
        </div>
        <h3 className="mt-1 text-base font-bold text-primary-foreground/90">{t(item.label)}</h3>
        <p className="mt-1 text-xs text-primary-foreground/60">{t(item.subtext)}</p>
      </div>
    </div>
  );
}

export function AnimatedStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const t = useT();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-y border-border bg-gradient-to-br from-primary via-[#0e2c47] to-primary py-16 text-primary-foreground"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(18,136,93,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1140px] px-4">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
              <CheckCircle2 size={14} />
              {t("Jharkhand Civic Intelligence Network")}
            </span>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              {t("Measurable Statewide Impact")}
            </h2>
          </div>
          <div className="rounded-md border border-primary-foreground/15 bg-primary/40 px-3 py-1.5 text-xs text-primary-foreground/70">
            {t("Prototype Data · Live telemetry simulated for 24 districts")}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((item) => (
            <StatCounter key={item.id} item={item} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
