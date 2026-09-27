import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Layers, MapPin, Sparkles } from "lucide-react";
import { useApp } from "@/app/AppContext";
import { useT } from "@/utils/i18n";
import { MapView } from "./MapView";
import { SectionHeading } from "./SectionHeading";

const districts = ["All", "Ranchi", "Dhanbad", "East Singhbhum", "Bokaro", "Hazaribagh", "Deoghar"];

export function MapSection() {
  const { state } = useApp();
  const t = useT();
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const filteredProblems = useMemo(() => {
    if (selectedDistrict === "All") return state.problems;
    return state.problems.filter((p) => p.district === selectedDistrict);
  }, [state.problems, selectedDistrict]);

  return (
    <section className="border-t border-border bg-muted/40 py-20">
      <div className="mx-auto max-w-[1140px] px-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={t("Geospatial Telemetry")}
            title={t("See Problems Where They Happen")}
            subtitle={t(
              "Explore community challenges across districts and discover where innovation is needed most.",
            )}
          />

          {/* Map legend */}
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold shadow-sm">
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-[#c83b37]" />
              {t("Critical")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-[#d89222]" />
              {t("Complex")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-[#16805b]" />
              {t("Routine")}
            </span>
          </div>
        </div>

        {/* District filter pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
            <MapPin size={13} className="text-accent" />
            {t("District")}:
          </span>
          {districts.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDistrict(d)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedDistrict === d
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {t(d)}
            </button>
          ))}
        </div>

        {/* Map Container with elevated frame */}
        <div className="mt-6 overflow-hidden rounded-xl border-2 border-border bg-card shadow-elevated">
          <MapView problems={filteredProblems} height="h-[380px] sm:h-[460px] lg:h-[520px]" />
        </div>

        {/* Bottom bar */}
        <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            <span>
              Showing <strong className="text-primary">{filteredProblems.length}</strong> active civic
              markers in {selectedDistrict === "All" ? "all 24 districts" : selectedDistrict}
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">GPS Accuracy: ± 5m</span>
          </div>

          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <span>{t("Open Full Screen GIS Registry")}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
