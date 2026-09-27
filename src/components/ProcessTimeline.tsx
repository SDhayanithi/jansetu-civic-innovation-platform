import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Factory,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Landmark,
  Lightbulb,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import { useT } from "@/utils/i18n";
import { SectionHeading } from "./SectionHeading";

interface StepItem {
  num: string;
  title: string;
  sub: string;
  icon: any;
  color: string;
  border: string;
  bg: string;
}

const steps: StepItem[] = [
  {
    num: "01",
    title: "REPORT",
    sub: "Citizen submits problem with evidence and location",
    icon: Users,
    color: "text-emerald-700",
    border: "border-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    num: "02",
    title: "VERIFY",
    sub: "Government validation and evidence check",
    icon: Landmark,
    color: "text-rose-700",
    border: "border-rose-500",
    bg: "bg-rose-50",
  },
  {
    num: "03",
    title: "ANALYZE",
    sub: "AI categorization, duplicate check & priority",
    icon: BrainCircuit,
    color: "text-teal-700",
    border: "border-teal-500",
    bg: "bg-teal-50",
  },
  {
    num: "04",
    title: "MATCH",
    sub: "University & partner recommendation",
    icon: MapPin,
    color: "text-blue-700",
    border: "border-blue-500",
    bg: "bg-blue-50",
  },
  {
    num: "05",
    title: "SOLVE",
    sub: "Develop innovative prototype solutions",
    icon: Lightbulb,
    color: "text-emerald-600",
    border: "border-emerald-400",
    bg: "bg-emerald-50/80",
  },
  {
    num: "06",
    title: "PARTNER",
    sub: "Industry funding, CSR & technical mentorship",
    icon: HandCoins,
    color: "text-purple-700",
    border: "border-purple-500",
    bg: "bg-purple-50",
  },
  {
    num: "07",
    title: "IMPLEMENT",
    sub: "Pilot, testing & field implementation tracking",
    icon: TrendingUp,
    color: "text-amber-700",
    border: "border-amber-500",
    bg: "bg-amber-50",
  },
  {
    num: "08",
    title: "IMPACT",
    sub: "Measure verified community outcomes & SDGs",
    icon: HeartHandshake,
    color: "text-rose-600",
    border: "border-rose-400",
    bg: "bg-rose-50",
  },
];

export function ProcessTimeline() {
  const t = useT();

  return (
    <section className="border-y border-border/80 bg-muted/20 py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-4">
        <SectionHeading
          center
          eyebrow={t("FROM PROBLEM TO IMPACT")}
          title={t("How JanSetu Turns Problems Into Real-World Solutions")}
          subtitle={t(
            "An accountable eight-stage transparent pipeline transforming an everyday complaint into a verified public infrastructure or policy milestone.",
          )}
        />

        {/* Horizontal Continuous Pipeline Timeline matching Mockup */}
        <div className="mt-14 overflow-x-auto pb-4 pt-2">
          <div className="flex min-w-[960px] items-start justify-between gap-1">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="relative flex flex-1 flex-col items-center text-center group">
                  {/* Step Number Top Badge */}
                  <span className="text-[11px] font-black uppercase tracking-wider text-muted-foreground/80 mb-2">
                    {step.num}
                  </span>

                  {/* Circular Node with Icon */}
                  <div className="relative">
                    <div
                      className={`grid size-14 place-items-center rounded-full border-2 ${step.border} ${step.bg} ${step.color} shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md`}
                    >
                      <Icon size={24} />
                    </div>

                    {/* Connecting Dashed Arrow to next node */}
                    {idx < steps.length - 1 && (
                      <div className="pointer-events-none absolute left-[100%] top-1/2 -translate-y-1/2 flex items-center justify-center w-[calc(100%-8px)] z-0">
                        <div className="w-full border-t-2 border-dashed border-border/90" />
                        <ChevronRight size={14} className="text-muted-foreground/60 shrink-0 -ml-1" />
                      </div>
                    )}
                  </div>

                  {/* Step Title & Description */}
                  <div className="mt-4 px-1 max-w-[130px]">
                    <strong className="block text-xs font-black tracking-wide text-primary">
                      {t(step.title)}
                    </strong>
                    <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                      {t(step.sub)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
