import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Layers,
  MapPin,
  MapPinned,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useApp } from "@/app/AppContext";
import { useT } from "@/utils/i18n";
import { MapView } from "./MapView";

const aiFeatures = [
  {
    title: "AI Problem Classification",
    desc: "Automatically categorize challenges",
    icon: BrainCircuit,
    color: "text-emerald-700 bg-emerald-50 border-emerald-300",
  },
  {
    title: "Semantic Duplicate Detection",
    desc: "Identify and merge similar problems",
    icon: Search,
    color: "text-blue-700 bg-blue-50 border-blue-300",
  },
  {
    title: "Priority Scoring",
    desc: "Rank based on urgency, impact and feasibility",
    icon: TrendingUp,
    color: "text-rose-700 bg-rose-50 border-rose-300",
  },
  {
    title: "Geographical Hotspot Detection",
    desc: "Find high-need areas across districts",
    icon: MapPinned,
    color: "text-teal-700 bg-teal-50 border-teal-300",
  },
  {
    title: "University Recommendation",
    desc: "Match with relevant institutions",
    icon: GraduationCap,
    color: "text-indigo-700 bg-indigo-50 border-indigo-300",
  },
  {
    title: "Impact Analytics",
    desc: "Track outcomes and measure real impact",
    icon: CheckCircle2,
    color: "text-amber-700 bg-amber-50 border-amber-300",
  },
];

export function AIAndMapSection() {
  const { state } = useApp();
  const t = useT();

  const previewProblem = state.problems[0] || {
    id: "JS1023",
    title: "Broken drinking water pipeline",
    district: "Ranchi",
    status: "Under Review",
    priority: "High",
  };

  return (
    <section className="border-t border-border bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-4">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: AI-Powered Intelligence (5 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="eyebrow text-xs font-bold uppercase tracking-wider text-accent">
                {t("AI-POWERED INTELLIGENCE")}
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-primary sm:text-3xl">
                {t("Smart Technology for Greater Impact")}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {t(
                  "Transparent machine intelligence accelerates verification, identifies high-density clusters, and matches community problems to academic researchers.",
                )}
              </p>
            </div>

            {/* 6 AI Cards in 2-Column Grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {aiFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="hover-card-lift ai-card-glow rounded-xl border border-border/80 bg-card p-4 shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className={`grid size-9 shrink-0 place-items-center rounded-lg border ${feat.color}`}>
                        <Icon size={18} />
                      </span>
                      <div>
                        <strong className="block text-xs font-bold text-primary">
                          {t(feat.title)}
                        </strong>
                        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                          {t(feat.desc)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Real-Time Community Insights / Map (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <span className="eyebrow text-xs font-bold uppercase tracking-wider text-accent">
                  {t("REAL-TIME COMMUNITY INSIGHTS")}
                </span>
                <h2 className="mt-1 text-2xl font-extrabold text-primary sm:text-3xl">
                  {t("See Problems Where They Happen")}
                </h2>
              </div>

              {/* Map Legend matching mockup */}
              <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full bg-[#c83b37]" />
                  <span>{t("Critical")}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full bg-[#e65100]" />
                  <span>{t("High")}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full bg-[#f57f17]" />
                  <span>{t("Medium")}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full bg-[#16805b]" />
                  <span>{t("Low")}</span>
                </span>
              </div>
            </div>

            {/* Elevated Map Container with Preview Popup */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border-2 border-border/80 bg-card shadow-elevated">
              <MapView problems={state.problems} height="h-[360px] sm:h-[400px]" />

              {/* Floating Problem Callout Card matching mockup */}
              <div className="absolute left-4 top-4 z-[400] max-w-xs rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t("Spotlight Report")}
                  </span>
                  <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700">
                    {t("Priority: High")}
                  </span>
                </div>
                <strong className="mt-1 block text-xs font-bold text-primary">
                  {previewProblem.title}
                </strong>
                <p className="text-[11px] text-muted-foreground">
                  {previewProblem.district}, Jharkhand · {t("Status")}: {t(previewProblem.status)}
                </p>
              </div>

              {/* Bottom Explore Full Map Button Bar matching mockup */}
              <div className="absolute bottom-3 right-3 z-[400]">
                <Link
                  to="/challenges"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-md transition hover:bg-primary/90"
                >
                  <span>{t("Explore Full Map")}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
