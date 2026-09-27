import { Factory, GraduationCap, Landmark, Network, Sparkles, Users } from "lucide-react";
import { useT } from "@/utils/i18n";
import { SectionHeading } from "./SectionHeading";
import { StakeholderCard, type StakeholderProps } from "./StakeholderCard";

const stakeholders: StakeholderProps[] = [
  {
    id: "citizens",
    role: "CITIZENS & COMMUNITIES",
    title: "Citizens & Communities",
    tagline: "Report real-world problems",
    description:
      "Grassroots citizens identify everyday infrastructure, water, sanitation, and education deficits with geotagged photo evidence.",
    actionText: "Access Citizen Portal",
    route: "/citizen",
    icon: Users,
    tone: "green",
    image: "/stakeholder-citizens.jpg",
    capabilities: [
      "Easy problem submission",
      "Photos, videos & location",
      "Track status and get updates",
    ],
  },
  {
    id: "government",
    role: "GOVERNMENT DEPARTMENTS",
    title: "Government Departments",
    tagline: "Validate, prioritize and monitor",
    description:
      "Administrative authorities verify civic authenticity, assign SDG alignments, and commission vetted university solutions into official pilots.",
    actionText: "Access Government Portal",
    route: "/government",
    icon: Landmark,
    tone: "navy",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80",
    capabilities: [
      "Review and verify submissions",
      "Track implementation",
      "Measure community impact",
    ],
  },
  {
    id: "universities",
    role: "UNIVERSITIES & INSTITUTIONS",
    title: "Universities & Institutions",
    tagline: "Research and develop solutions",
    description:
      "Engineering colleges and research faculties build tailored hardware, software, and civic innovations to resolve verified local issues.",
    actionText: "Access University Portal",
    route: "/university",
    icon: GraduationCap,
    tone: "teal",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
    capabilities: [
      "Access relevant challenges",
      "Form multidisciplinary teams",
      "Submit innovative solutions",
    ],
  },
  {
    id: "industry",
    role: "INDUSTRY & INNOVATION PARTNERS",
    title: "Industry & Innovation Partners",
    tagline: "Mentor, fund and deploy",
    description:
      "Corporate leaders, CSR foundations, and technology providers mentor student prototypes and fund pilot rollouts into full-scale operations.",
    actionText: "Access Industry Portal",
    route: "/industry",
    icon: Factory,
    tone: "amber",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    capabilities: [
      "Provide technical expertise",
      "Offer funding and mentorship",
      "Support pilot implementation",
    ],
  },
];

export function PlatformEcosystem() {
  const t = useT();

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20">
      {/* Background radial accent */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25">
        <div className="size-[650px] rounded-full bg-secondary/60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1180px] px-4">
        <SectionHeading
          center
          eyebrow={t("FOUR STAKEHOLDERS — ONE MISSION")}
          title={t("The JanSetu Collaborative Ecosystem")}
          subtitle={t(
            "Breaking departmental silos by uniting grassroots citizens, academic researchers, corporate partners, and state administration on one transparent ledger.",
          )}
        />

        {/* 4 Stakeholder Cards Grid Matching Mockup */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stakeholders.map((item) => (
            <StakeholderCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
