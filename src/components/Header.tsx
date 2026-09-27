import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Briefcase,
  Landmark,
  Languages,
  LogOut,
  Megaphone,
  Menu,
  Shield,
  User,
  X,
} from "lucide-react";
import { useApp } from "@/app/AppContext";
import { translations } from "@/utils/translations";
import { assetUrl } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const { state, setLanguage, logout } = useApp();
  const t = translations[state.language];
  const nav = useNavigate();

  const links = [
    ["/", t.home],
    ["/how-it-works", t.userGuide],
    ["/solutions", t.solutions],
    ["/impact", t.impact],
    ["/about", t.about],
  ] as const;

  const roleRoute = state.user ? `/${state.user.role}` : "/login";

  const roleLabel = {
    citizen: state.language === "hi" ? "नागरिक" : "Citizen",
    government: state.language === "hi" ? "सरकार" : "Government",
    university: state.language === "hi" ? "विश्वविद्यालय" : "University",
    industry: state.language === "hi" ? "उद्योग" : "Industry",
  }[state.user?.role || "citizen"];

  return (
    <header className="sticky top-0 z-[900] border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-[1140px] items-center justify-between gap-4 px-4">
        {/* Brand / Logo */}
        <Link
          to={state.user ? (roleRoute as any) : "/"}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <img
            src={assetUrl("/jansetu-logo.png")}
            alt="JanSetu — Connecting Problems. Creating Solutions. Measuring Impact."
            className="h-10 sm:h-11 w-auto max-w-[180px] sm:max-w-[220px] object-contain shrink-0"
          />
        </Link>

        {/* Desktop Navigation Links (Public only) */}
        {!state.user ? (
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary font-bold bg-muted/60" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        ) : (
          <div className="hidden items-center gap-2 rounded-full border border-border/80 bg-muted/50 px-4 py-1.5 lg:flex">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-primary">
              {state.language === "hi" ? `${roleLabel} कार्यक्षेत्र` : `${roleLabel} Workspace`}
            </span>
          </div>
        )}

        {/* Desktop Authentication & Action Controls */}
        <div className="hidden items-center gap-2.5 lg:flex">
          {/* Language Toggle */}
          <button
            type="button"
            aria-label="Change language"
            className="flex min-h-10 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            onClick={() => setLanguage(state.language === "en" ? "hi" : "en")}
          >
            <Languages size={15} className="text-accent" />
            <span>{state.language === "en" ? "हिन्दी" : "English"}</span>
          </button>

          {state.user ? (
            /* Logged In View */
            <div className="flex items-center gap-2">
              {/* My Workspace Link - routes ONLY to user's role */}
              <Link
                to={roleRoute as any}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-secondary px-3.5 py-2 text-xs font-bold text-secondary-foreground shadow-sm transition hover:bg-secondary/80"
              >
                <Briefcase size={15} />
                <span>{state.language === "hi" ? "मेरा कार्यक्षेत्र" : "My Workspace"}</span>
                <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] uppercase font-bold text-accent">
                  {roleLabel}
                </span>
              </Link>

              {/* Report a Problem CTA */}
              <Link
                to="/report"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                <Megaphone size={14} />
                <span>{state.language === "hi" ? "समस्या दर्ज करें" : "Report a Problem"}</span>
              </Link>

              {/* Logout Button */}
              <button
                type="button"
                aria-label={state.language === "hi" ? "लॉगआउट" : "Logout"}
                title={state.language === "hi" ? "लॉगआउट" : "Logout"}
                onClick={() => {
                  logout();
                  void nav({ to: "/" });
                }}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-bold text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut size={15} />
                <span>{state.language === "hi" ? "लॉगआउट" : "Logout"}</span>
              </button>
            </div>
          ) : (
            /* Not Logged In View */
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-lg px-3.5 py-2 text-xs font-bold text-primary transition hover:bg-muted"
              >
                {state.language === "hi" ? "लॉगिन" : "Login"}
              </Link>

              <Link
                to="/register"
                className="rounded-lg border border-primary/20 bg-muted/60 px-3.5 py-2 text-xs font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                {state.language === "hi" ? "पंजीकरण" : "Register"}
              </Link>

              <Link
                to="/report"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                <Megaphone size={14} />
                <span>{state.language === "hi" ? "समस्या दर्ज करें" : "Report a Problem"}</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="grid size-10 place-items-center rounded-lg border border-border text-primary lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="border-t border-border bg-background p-4 shadow-lg lg:hidden">
          <nav className="mx-auto flex max-w-[1140px] flex-col gap-1.5">
            {!state.user ? (
              /* Public Links on Mobile */
              <>
                {links.map(([to, label]) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {label}
                  </Link>
                ))}

                <div className="my-2 border-t border-border" />

                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-bold text-primary hover:bg-muted"
                >
                  {state.language === "hi" ? "लॉगिन" : "Login"}
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-secondary px-4 py-2.5 text-center text-sm font-bold text-secondary-foreground"
                >
                  {state.language === "hi" ? "पंजीकरण" : "Register"}
                </Link>

                <Link
                  to="/report"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-primary-foreground"
                >
                  {state.language === "hi" ? "समस्या दर्ज करें" : "Report a Problem"}
                </Link>
              </>
            ) : (
              /* Authenticated Links on Mobile (No public Home, About, etc.) */
              <>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-2.5 text-xs">
                  <span className="font-semibold text-foreground">
                    {state.user.name || "User"}
                  </span>
                  <span className="rounded bg-accent/20 px-2 py-0.5 font-bold uppercase text-accent">
                    {roleLabel}
                  </span>
                </div>

                <Link
                  to={roleRoute as any}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground"
                >
                  <Briefcase size={16} />
                  <span>{state.language === "hi" ? "मेरा कार्यक्षेत्र" : "My Workspace"}</span>
                </Link>

                <Link
                  to="/report"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
                >
                  <Megaphone size={16} />
                  <span>{state.language === "hi" ? "समस्या दर्ज करें" : "Report a Problem"}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    logout();
                    void nav({ to: "/" });
                  }}
                  className="flex items-center justify-center gap-2 rounded-lg border border-destructive/30 px-4 py-2 text-sm font-bold text-destructive hover:bg-destructive/10"
                >
                  <LogOut size={16} />
                  <span>{state.language === "hi" ? "लॉगआउट" : "Logout"}</span>
                </button>
              </>
            )}

            <button
              type="button"
              className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-bold text-muted-foreground"
              onClick={() => setLanguage(state.language === "en" ? "hi" : "en")}
            >
              <Languages size={14} className="text-accent" />
              <span>{state.language === "en" ? "हिन्दी" : "English"}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
