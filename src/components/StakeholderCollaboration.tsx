import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useT } from "@/utils/i18n";
import { SectionHeading } from "./SectionHeading";

const caseStudies = [
  {
    title: "Urban Drainage & Smart Water Sensors",
    district: "Ranchi, Ward 12",
    flow: [
      { actor: "Citizen", action: "Reported recurrent monsoon flooding with photos" },
      { actor: "Gov Dept", action: "Municipal Corporation verified emergency status" },
      { actor: "University", action: "BIT Mesra engineered solar-powered ultrasonic drain monitors" },
      { actor: "Industry", action: "Tata Steel Foundation sponsored 25 prototype sensors" },
    ],
    status: "Active Pilot in 4 Wards",
    sdg: "SDG 6 & 11",
  },
  {
    title: "Solar Cold Storage for Tribal Produce",
    district: "Gumla & Khunti",
    flow: [
      { actor: "Citizen", action: "Tribal farming cooperative reported post-harvest rot" },
      { actor: "Gov Dept", action: "Agri Dept fast-tracked priority to Grade-A" },
      { actor: "University", action: "Birsa Agricultural University built zero-emission chiller" },
      { actor: "Industry", action: "Agri-Tech CSR consortium supplied initial grant" },
    ],
    status: "Deployed · 450+ Farmers Assisted",
    sdg: "SDG 2, 7 & 12",
  },
];

export function StakeholderCollaboration() {
  const t = useT();

  return (
    <section className="border-t border-border bg-background py-20">
      <div className="mx-auto max-w-[1140px] px-4">
        <SectionHeading
          center
          eyebrow={t("Proven Public Co-Creation")}
          title={t("Stakeholder Collaboration in Action")}
          subtitle={t(
            "See how civic complaints convert into institutional pilots through coordinated multi-stakeholder ownership.",
          )}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="hover-card-lift flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent">
                    {study.sdg}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {study.district}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-primary">{study.title}</h3>

                {/* Collaboration Flow steps */}
                <div className="mt-5 space-y-3">
                  {study.flow.map((f, idx) => (
                    <div key={f.actor} className="flex items-start gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {idx + 1}
                      </span>
                      <div>
                        <strong className="text-xs font-bold text-foreground">
                          {f.actor}:{" "}
                        </strong>
                        <span className="text-xs text-muted-foreground">{f.action}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent">
                  <CheckCircle2 size={14} />
                  <span>{study.status}</span>
                </span>

                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>{t("Explore Case Study")}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
