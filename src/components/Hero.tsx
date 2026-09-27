import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Factory,
  GraduationCap,
  Landmark,
  MapPin,
  Megaphone,
  Network,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { useApp } from "@/app/AppContext";
import { useT } from "@/utils/i18n";

export function Hero() {
  const { state } = useApp();
  const t = useT();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-border/80">
      {/* Background Image with High-Definition Landscape and Elegant Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/jharkhand-hero.jpg"
          alt="Jharkhand Landscape"
          className="size-full object-cover object-center filter brightness-[1.02] contrast-[1.03]"
        />
        {/* Soft, readable gradient overlay: high contrast on left for typography, open on right for landscape */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/25 lg:from-background lg:via-background/85 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1180px] px-4 pt-12 pb-8 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Hero Text and CTAs */}
          <div className="max-w-2xl">
            {/* Initiative Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card/90 px-3.5 py-1.5 text-xs font-bold text-accent shadow-sm backdrop-blur-md">
              <span className="size-2 rounded-full bg-accent animate-pulse" />
              <span>{t("A Government of Jharkhand Initiative")}</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-[3.5rem] lg:leading-[1.12]">
              {state.language === "hi" ? (
                <span>
                  सामुदायिक समस्याओं को{" "}
                  <br className="hidden sm:inline" />
                  <span className="text-accent underline decoration-accent/30 underline-offset-8">
                    वास्तविक समाधान में बदलें
                  </span>
                </span>
              ) : (
                <span>
                  Turn Community{" "}
                  <br className="hidden sm:inline" />
                  Problems Into{" "}
                  <br className="hidden sm:inline" />
                  <span className="text-accent underline decoration-accent/30 underline-offset-8">
                    Real-World Solutions
                  </span>
                </span>
              )}
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-8">
              {state.language === "hi"
                ? "जनसेतु नागरिकों, सरकार, विश्वविद्यालयों और उद्योगों को जोड़कर सामाजिक चुनौतियों की पहचान करने, नवाचारपूर्ण समाधान विकसित करने और समस्या से कार्यान्वयन तक उनकी यात्रा को ट्रैक करने में मदद करता है।"
                : "JanSetu connects citizens, government, universities and industry to identify societal challenges, develop innovative solutions and track their journey from problem to implementation."}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/report"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3 text-base font-bold text-accent-foreground shadow-card transition-all hover:bg-accent/90 hover:shadow-elevated active:scale-[0.98]"
              >
                <span>{state.language === "hi" ? "समस्या दर्ज करें" : "Report a Problem"}</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/solutions"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border-2 border-border/80 bg-card/95 px-7 py-3 text-base font-bold text-primary shadow-sm backdrop-blur-md transition-all hover:border-primary hover:bg-card"
              >
                <span>{state.language === "hi" ? "समाधान खोजें" : "Explore Solutions"}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Premium Visual Treatment (Purely Visual Composition) */}
          <div className="relative flex items-center justify-center py-4 lg:py-0">
            {/* Visual Glass Frame Container */}
            <div className="relative w-full max-w-[490px] overflow-hidden rounded-3xl border border-white/60 bg-card/35 p-3 shadow-2xl backdrop-blur-md">
              {/* Layered Community / Civic Imagery */}
              <div className="relative h-[330px] sm:h-[370px] w-full overflow-hidden rounded-2xl bg-muted/40">
                <img
                  src="/stakeholder-citizens.jpg"
                  alt="Jharkhand Community and Innovation"
                  className="size-full object-cover object-center filter brightness-[0.96] contrast-[1.04] transition-transform duration-700 hover:scale-105"
                />

                {/* Soft natural bottom gradient overlay for panel text readability */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Soft Glass Floating Ambient Label (Purely visual aesthetic badge) */}
                <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/25 bg-card/60 p-3 shadow-lg backdrop-blur-md">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <span className="grid size-7 place-items-center rounded-lg bg-accent/25 text-accent-foreground">
                        <Sparkles size={15} />
                      </span>
                      <div>
                        <span className="block text-xs font-bold tracking-wide">
                          {t("Live Civic Intelligence Network")}
                        </span>
                        <span className="text-[10px] text-white/80">
                          {t("Real-Time GIS Mapping & State Collaboration")}
                        </span>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white">
                      {t("24 Districts Covered")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Overlapping / Connecting Hero to Content */}
        <div className="mt-10 rounded-2xl border border-border/80 bg-card/95 p-4 shadow-elevated backdrop-blur-md">
          {/* Top row: 4 Statistics Counters */}
          <div className="grid grid-cols-2 gap-4 divide-y divide-border/40 sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:divide-border/60 pb-4">
            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent font-bold">
                <CheckCircle2 size={20} />
              </span>
              <div>
                <strong className="block text-xl font-extrabold text-primary sm:text-2xl">60,400+</strong>
                <span className="text-xs font-semibold text-muted-foreground">{t("Problems Reported")}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent font-bold">
                <Sparkles size={20} />
              </span>
              <div>
                <strong className="block text-xl font-extrabold text-primary sm:text-2xl">47,310+</strong>
                <span className="text-xs font-semibold text-muted-foreground">{t("Solutions Provided")}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent font-bold">
                <TrendingUp size={20} />
              </span>
              <div>
                <strong className="block text-xl font-extrabold text-primary sm:text-2xl">78%</strong>
                <span className="text-xs font-semibold text-muted-foreground">{t("Solution Success Rate")}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent font-bold">
                <MapPin size={20} />
              </span>
              <div>
                <strong className="block text-xl font-extrabold text-primary sm:text-2xl">24</strong>
                <span className="text-xs font-semibold text-muted-foreground">{t("Districts Covered")}</span>
              </div>
            </div>
          </div>

          {/* Bottom row: 5 Lifecycle Stakeholder Nodes */}
          <div className="border-t border-border/60 pt-3 flex flex-wrap items-center justify-between gap-2">
            {[
              { role: "Citizens", action: "Report Problems", icon: Users, color: "text-blue-600 bg-blue-50 border-blue-200" },
              { role: "AI Analysis", action: "Smart Matching", icon: BrainCircuit, color: "text-accent bg-accent/10 border-accent/30" },
              { role: "Universities", action: "Develop Solutions", icon: GraduationCap, color: "text-teal-600 bg-teal-50 border-teal-200" },
              { role: "Industry", action: "Fund & Implement", icon: Factory, color: "text-amber-600 bg-amber-50 border-amber-200" },
              { role: "Government", action: "Enable & Monitor", icon: Landmark, color: "text-rose-600 bg-rose-50 border-rose-200" },
            ].map((node) => {
              const Icon = node.icon;
              return (
                <div key={node.role} className="flex items-center gap-2 py-1 px-2.5 rounded-lg">
                  <span className={`grid size-7 place-items-center rounded-full border ${node.color}`}>
                    <Icon size={14} />
                  </span>
                  <div className="text-left">
                    <strong className="block text-xs font-bold text-primary">{t(node.role)}</strong>
                    <span className="text-[10px] text-muted-foreground">{t(node.action)}</span>
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
