import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  badge,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  badge?: ReactNode;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {(eyebrow || badge) && (
        <div className={`mb-3 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {badge}
        </div>
      )}
      <h2 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
