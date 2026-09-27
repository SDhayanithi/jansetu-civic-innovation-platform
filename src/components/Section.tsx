import type { ReactNode } from "react";
import { useApp } from "@/app/AppContext";
import { translate } from "@/utils/i18n";

export function Section({
  title,
  subtitle,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  const { state } = useApp();
  return (
    <section
      className={`rounded-lg border border-border bg-card p-5 shadow-card sm:p-6 ${className}`}
    >
      {title && (
        <h2 className="text-xl font-bold text-foreground">{translate(title, state.language)}</h2>
      )}
      {subtitle && (
        <p className="mt-1 text-sm text-muted-foreground">{translate(subtitle, state.language)}</p>
      )}
      <div className={title || subtitle ? "mt-5" : ""}>{children}</div>
    </section>
  );
}

export function Badge({
  children,
  tone = "navy",
}: {
  children: ReactNode;
  tone?: "navy" | "green" | "amber" | "red";
}) {
  const { state } = useApp();
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold badge-${tone}`}>
      {typeof children === "string" ? translate(children, state.language) : children}
    </span>
  );
}
