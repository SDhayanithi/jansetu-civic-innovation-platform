import { Link } from "@tanstack/react-router";
import { Landmark, Mail, Phone, ShieldCheck } from "lucide-react";
import { useApp } from "@/app/AppContext";
import { translations } from "@/utils/translations";

export function Footer() {
  const { state } = useApp();
  const t = translations[state.language];
  const hi = state.language === "hi";

  return (
    <footer className="mt-16 border-t border-primary/20 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-[1140px] gap-8 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand identity column */}
        <div className="lg:col-span-1">
          <Link to="/" className="inline-block">
            <img
              src="/jansetu-logo.png"
              alt="JanSetu — Connecting Problems. Creating Solutions. Measuring Impact."
              className="h-12 w-auto object-contain rounded-lg bg-white/95 p-1.5 shadow-sm"
            />
          </Link>
          <p className="mt-3 text-xs leading-relaxed text-primary-foreground/75">
            {hi
              ? "सामुदायिक समस्याओं से मापने योग्य सार्वजनिक प्रभाव तक भरोसेमंद सेतु। झारखंड का आधिकारिक नागरिक नवाचार मंच।"
              : "A trusted civic-tech bridge from community problems to measurable public impact across Jharkhand."}
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-2.5 py-1 text-[11px] text-accent">
            <ShieldCheck size={13} />
            <span>GovTech Standard 2026</span>
          </div>
        </div>

        {/* Quick Links */}
        <FooterCol
          title={hi ? "त्वरित लिंक" : "Quick Links"}
          links={[
            ["/", t.home || "Home"],
            ["/how-it-works", t.userGuide || "User Guide"],
            ["/solutions", t.solutions || "Solutions"],
            ["/impact", t.impact || "Impact"],
            ["/about", t.about || "About"],
          ]}
        />

        {/* Stakeholders */}
        <FooterCol
          title={hi ? "हितधारक" : "Stakeholders"}
          links={[
            ["/citizen", hi ? "नागरिक" : "Citizens"],
            ["/government", hi ? "सरकार" : "Government"],
            ["/university", hi ? "विश्वविद्यालय" : "Universities"],
            ["/industry", hi ? "उद्योग" : "Industry"],
          ]}
        />

        {/* Resources */}
        <FooterCol
          title={hi ? "संसाधन" : "Resources"}
          links={[
            ["/report", t.reportProblem || "Report a Problem"],
            ["/university", hi ? "समाधान प्रारूप" : "Solution Template"],
            ["/about", hi ? "सहायता" : "Help"],
            ["/about", hi ? "गोपनीयता" : "Privacy"],
            ["/about", hi ? "शर्तें" : "Terms"],
          ]}
        />

        {/* Contact info */}
        <div>
          <h3 className="text-sm font-bold tracking-wider uppercase text-primary-foreground">
            {hi ? "संपर्क" : "Contact"}
          </h3>
          <div className="mt-3 space-y-2.5 text-xs text-primary-foreground/80">
            <a
              href="tel:18008904115"
              className="flex items-center gap-2 font-bold text-accent hover:underline"
            >
              <Phone size={15} />
              <span>1800-890-4115</span>
            </a>
            <p className="text-[11px] text-primary-foreground/60">
              {hi ? "टोल-फ्री नागरिक हेल्पलाइन (24x7)" : "Toll-Free Citizen Helpline (24x7)"}
            </p>
            <div className="pt-2">
              <a
                href="mailto:support@jansetu.jharkhand.gov.in"
                className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-primary-foreground"
              >
                <Mail size={14} />
                <span>support@jansetu.gov.in</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 py-6 text-center text-xs text-primary-foreground/65">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-between gap-2 px-4 sm:flex-row">
          <span>
            © 2026 JanSetu ·{" "}
            {hi
              ? "झारखंड सरकार के लिए विकसित राष्ट्रीय नागरिक नवाचार मंच"
              : "National Civic Innovation Platform · State of Jharkhand"}
          </span>
          <span className="text-[11px] text-primary-foreground/50">
            Prototype Demo Version · Hackathon Edition
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly (readonly [string, string])[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold tracking-wider uppercase text-primary-foreground">
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-xs">
        {links.map(([to, label]) => (
          <li key={label}>
            <Link
              to={to as any}
              className="text-primary-foreground/75 transition-colors hover:text-accent"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
