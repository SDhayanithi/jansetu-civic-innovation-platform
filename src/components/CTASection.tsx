import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Megaphone, ShieldCheck, Sparkles } from "lucide-react";
import { useApp } from "@/app/AppContext";
import { useT } from "@/utils/i18n";

export function CTASection() {
  const { state } = useApp();
  const t = useT();

  return (
    <section className="relative overflow-hidden py-24 text-primary-foreground">
      {/* High-Definition Panoramic Landscape Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/jharkhand-cta.jpg"
          alt="Jharkhand Development Landscape"
          className="size-full object-cover object-center filter brightness-[0.7] contrast-[1.05]"
        />
        {/* Soft dark teal-navy gradient overlay to ensure perfect contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091b2c] via-[#091b2c]/80 to-[#091b2c]/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1140px] px-4 text-center">
        {/* Eyebrow badge matching mockup */}
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/20 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-accent backdrop-blur-md">
          <Sparkles size={14} />
          <span>{t("BE A PART OF THE SOLUTION")}</span>
        </span>

        {/* Heading matching mockup */}
        <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {t("Turn Your Community Problem Into a Real-World Solution Today")}
        </h2>

        {/* Subtitle matching mockup */}
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base sm:leading-7">
          {t(
            "Join thousands of citizens, institutions and industry partners in building a stronger, more innovative Jharkhand.",
          )}
        </p>

        {/* Dual CTA Buttons matching mockup */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/report"
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-3 text-base font-bold text-accent-foreground shadow-lg transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{t("Report a Problem")}</span>
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/solutions"
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border-2 border-white/80 bg-white/10 px-8 py-3 text-base font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-[0.98]"
          >
            <span>{t("Explore Solutions")}</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/15 pt-8 text-xs text-primary-foreground/75">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-accent" />
            <span>{t("Verified State GovTech Network")}</span>
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-accent" />
            <span>{t("Geotagged & GIS Mapped")}</span>
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={16} className="text-accent" />
            <span>{t("Accountable Resolution Auditing")}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
