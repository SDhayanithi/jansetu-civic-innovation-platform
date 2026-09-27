import {
  BrainCircuit,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Layers,
  MapPinned,
  Search,
  TrendingUp,
} from "lucide-react";
import { useT } from "@/utils/i18n";
import { SectionHeading } from "./SectionHeading";
import { AIInsightCard, type AICardProps } from "./AIInsightCard";

const aiCapabilities: AICardProps[] = [
  {
    id: "classification",
    title: "AI Problem Classification",
    description:
      "Natural language understanding parses civic descriptions and automatically categorizes problems into standard municipal sectors.",
    sampleLabel: "Model Output Demo",
    sampleMetric: "Sector: Clean Water & Sanitation · Confidence: 96.4%",
    techStack: "NLP / BERT Multi-Class",
    icon: BrainCircuit,
  },
  {
    id: "duplicates",
    title: "Semantic Duplicate Detection",
    description:
      "High-dimensional vector embeddings evaluate incoming submissions against nearby existing tickets to prevent municipal clutter.",
    sampleLabel: "Similarity Search",
    sampleMetric: "Overlap: 87.2% match with JS-1023 within 350m radius",
    techStack: "Vector Cosine Distance",
    icon: Search,
  },
  {
    id: "priority",
    title: "Priority Scoring",
    description:
      "Multi-variable algorithmic scoring factors population density, safety urgency, historical lag, and weather hazards.",
    sampleLabel: "Calculated Score",
    sampleMetric: "Score: 89 / 100 · Critical Action Tier #1",
    techStack: "MCDM Urgency Weights",
    icon: TrendingUp,
  },
  {
    id: "hotspots",
    title: "Geographical Hotspot Detection",
    description:
      "Spatial clustering identifies concentrated infrastructure breakdowns and alerts ward administrators to systemic failures.",
    sampleLabel: "Spatial Telemetry",
    sampleMetric: "Cluster: Ranchi Ward 12 · 8 verified reports in 48h",
    techStack: "DBSCAN GIS Clustering",
    icon: MapPinned,
  },
  {
    id: "university",
    title: "University Recommendation",
    description:
      "Domain affinity algorithms analyze technical challenge parameters to recommend matching university labs and student teams.",
    sampleLabel: "Academic Match",
    sampleMetric: "Fit: BIT Mesra Civil & Hydrology Lab · 94% fit",
    techStack: "Knowledge Graph Matching",
    icon: GraduationCap,
  },
  {
    id: "impact",
    title: "Impact Analytics",
    description:
      "Predictive socioeconomic models calculate anticipated citizen beneficiaries, public health outcomes, and return on capital.",
    sampleLabel: "Projected Outcome",
    sampleMetric: "Reach: 2,400 residents · SDG 6, 9 & 11 verified",
    techStack: "SDG Progress Heuristics",
    icon: CheckCircle2,
  },
];

export function AIIntelligenceSection() {
  const t = useT();

  return (
    <section className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-[1140px] px-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={t("Computational Public Good")}
            title={t("Intelligence That Powers JanSetu")}
            subtitle={t(
              "Transparent, explainable machine intelligence designed to augment public officials, empower researchers, and prioritize real community emergencies.",
            )}
          />

          <div className="rounded-xl border border-accent/25 bg-accent/5 p-4 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-accent">
              <Cpu size={14} />
              <span>Prototype Intelligence Notice</span>
            </span>
            <p className="mt-1 text-muted-foreground">
              Demo capability pipeline structured for direct API integration with LLM providers &
              state GIS databases.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aiCapabilities.map((item) => (
            <AIInsightCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
