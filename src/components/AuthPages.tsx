import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Factory,
  GraduationCap,
  Landmark,
  LogOut,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Users,
} from "lucide-react";
import { useApp } from "@/app/AppContext";
import { useT } from "@/utils/i18n";
import type { Role } from "@/app/types";
import { AppButton } from "./AppButton";
import { Section } from "./Section";
import { assetUrl } from "@/lib/utils";

const roles: {
  role: Role;
  title: string;
  demoName: string;
  demoContact: string;
  icon: any;
  tone: string;
}[] = [
  {
    role: "citizen",
    title: "Citizen",
    demoName: "Ramesh Kumar (Citizen)",
    demoContact: "citizen@jansetu.demo",
    icon: Users,
    tone: "border-accent/40 bg-accent/10 text-accent",
  },
  {
    role: "government",
    title: "Government Department",
    demoName: "Dr. Ananya Verma (Urban Dev)",
    demoContact: "officer@jansetu.demo",
    icon: Landmark,
    tone: "border-primary/40 bg-primary/10 text-primary",
  },
  {
    role: "university",
    title: "University Innovator",
    demoName: "Prof. S. Soren (BIT Mesra)",
    demoContact: "university@jansetu.demo",
    icon: GraduationCap,
    tone: "border-teal-500/40 bg-teal-50 text-teal-700",
  },
  {
    role: "industry",
    title: "Industry Partner",
    demoName: "Aditi Singhania (Tata Steel CSR)",
    demoContact: "industry@jansetu.demo",
    icon: Factory,
    tone: "border-amber-500/40 bg-amber-50 text-amber-700",
  },
];

const roleFields: Record<Role, [string, string][]> = {
  citizen: [["name", "Full name"]],
  government: [
    ["name", "Department name"],
    ["officer", "Officer designation"],
  ],
  university: [
    ["name", "University name"],
    ["code", "Faculty or Student ID code"],
  ],
  industry: [
    ["name", "Organization / CSR name"],
    ["founder", "Representative name"],
  ],
};

function useRoleForm(defaultRole: Role = "citizen") {
  const [role, setRole] = useState<Role>(defaultRole);
  const [values, setValues] = useState<Record<string, string>>({
    name: roles.find((r) => r.role === defaultRole)?.demoName.split(" (")[0] ?? "User",
  });
  const fields = roleFields[role];

  function changeRole(next: Role) {
    setRole(next);
    const demo = roles.find((r) => r.role === next);
    setValues({
      name: demo ? (demo.demoName.split(" (")[0] ?? "") : "",
    });
  }

  const complete = fields.every(([k]) => (values[k] || "").trim().length >= 2);
  return { role, changeRole, fields, values, setValues, complete };
}

function RoleFields({
  fields,
  values,
  setValues,
}: {
  fields: [string, string][];
  values: Record<string, string>;
  setValues: (v: Record<string, string>) => void;
}) {
  const { state } = useApp();
  const t = useT();
  return (
    <>
      {fields.map(([key, label]) => (
        <label className="label text-slate-800 font-bold" key={key}>
          {t(label)}
          <input
            className="field mt-1.5 bg-white border-slate-300 text-slate-900 shadow-sm focus:border-emerald-600 focus:ring-emerald-600"
            value={values[key] || ""}
            onChange={(e) => setValues({ ...values, [key]: e.target.value })}
            required
            placeholder={
              state.language === "hi"
                ? `${t(label)} दर्ज करें`
                : `Enter your ${label.toLowerCase()}`
            }
          />
        </label>
      ))}
    </>
  );
}

export function Login() {
  const { state, login, logout } = useApp();
  const t = useT();
  const nav = useNavigate();
  const { role, changeRole, fields, values, setValues, complete } = useRoleForm("citizen");
  const [contact, setContact] = useState("citizen@jansetu.demo");
  const [password, setPassword] = useState("demo123");

  // If already authenticated, redirect straight to role dashboard
  useEffect(() => {
    if (state.user) {
      void nav({ to: `/${state.user.role}` as any, replace: true });
    }
  }, [state.user, nav]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!contact.trim() || password.length < 5) {
      toast.error("Please enter a valid email or mobile number and password");
      return;
    }
    const roleInfo = roles.find((r) => r.role === role);
    const displayName = values["name"]?.trim() || roleInfo?.demoName || "User";
    login(displayName, role);
    toast.success(`Signed in successfully to ${t(roleInfo?.title || role)}`);
    void nav({ to: `/${role}` as any, replace: true });
  }

  return (
    <AuthShell
      title="Stakeholder Login"
      intro="Sign in to access your role-specific dashboard and actions."
      isLogin={true}
    >
      {/* If already authenticated, show status banner */}
      {state.user && (
        <div className="mb-6 rounded-xl border border-accent/40 bg-accent/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-foreground">
                <Briefcase size={16} />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{t("Currently signed in as:")}</p>
                <p className="text-sm font-bold text-primary">
                  {state.user.name}{" "}
                  <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] uppercase font-bold text-accent">
                    {state.user.role}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10"
            >
              <LogOut size={13} />
              <span>{t("Logout")}</span>
            </button>
          </div>

          <div className="mt-3">
            <Link
              to={`/${state.user.role}` as any}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              <span>{t("Continue to My Workspace")}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* Standard Login Form */}
      <form onSubmit={submit} className="space-y-4">
        <label className="label text-slate-800 font-bold">
          {t("Select Stakeholder Role")}
          <select
            className="field mt-1.5 bg-white border-slate-300 text-slate-900 font-semibold shadow-sm focus:border-emerald-600 focus:ring-emerald-600"
            value={role}
            onChange={(e) => {
              const r = e.target.value as Role;
              changeRole(r);
              setContact(roles.find((x) => x.role === r)?.demoContact || "");
            }}
          >
            {roles.map((r) => (
              <option key={r.role} value={r.role}>
                {t(r.title)}
              </option>
            ))}
          </select>
        </label>

        <RoleFields fields={fields} values={values} setValues={setValues} />

        <label className="label text-slate-800 font-bold">
          {t("Email or Mobile Number")}
          <input
            className="field mt-1.5 bg-white border-slate-300 text-slate-900 shadow-sm focus:border-emerald-600 focus:ring-emerald-600"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </label>

        <label className="label text-slate-800 font-bold">
          {t("Password")}
          <input
            className="field mt-1.5 bg-white border-slate-300 text-slate-900 shadow-sm focus:border-emerald-600 focus:ring-emerald-600"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <AppButton type="submit" className="w-full mt-2 text-base font-bold shadow-md">
          <ShieldCheck size={18} />
          <span>{t("Sign In to Workspace")}</span>
        </AppButton>
      </form>

      <p className="mt-6 text-center text-xs text-slate-600">
        {t("New to JanSetu?")}{" "}
        <Link to="/register" className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline">
          {t("Register as a new stakeholder")}
        </Link>
      </p>
    </AuthShell>
  );
}

export function Register() {
  const { state, login } = useApp();
  const t = useT();
  const nav = useNavigate();
  const { role, changeRole, fields, values, setValues, complete } = useRoleForm("citizen");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  // If already authenticated, redirect straight to role dashboard
  useEffect(() => {
    if (state.user) {
      void nav({ to: `/${state.user.role}` as any, replace: true });
    }
  }, [state.user, nav]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!complete || !contact.trim() || password.length < 5) {
      toast.error("Please fill all required fields with a valid password");
      return;
    }
    const displayName = values["name"]?.trim() || "User";
    login(displayName, role);
    toast.success(`Account registered! Welcome to your ${role} workspace.`);
    void nav({ to: `/${role}` as any });
  }

  return (
    <AuthShell
      title="Create Stakeholder Account"
      intro="Register your institutional or citizen credentials to join JanSetu."
    >
      <form onSubmit={submit} className="space-y-4">
        <label className="label">
          {t("Choose Your Stakeholder Role")}
          <select
            className="field mt-1.5"
            value={role}
            onChange={(e) => changeRole(e.target.value as Role)}
          >
            {roles.map((r) => (
              <option key={r.role} value={r.role}>
                {t(r.title)}
              </option>
            ))}
          </select>
        </label>

        <RoleFields fields={fields} values={values} setValues={setValues} />

        <label className="label">
          {t("Email or Official Mobile Number")}
          <input
            className="field mt-1.5"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            placeholder="name@domain.gov.in or +91..."
          />
        </label>

        <label className="label">
          {t("Create Password")}
          <input
            className="field mt-1.5"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Minimum 6 characters"
          />
        </label>

        <AppButton type="submit" className="w-full">
          <UserRoundCheck size={18} />
          <span>{t("Complete Registration")}</span>
        </AppButton>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {t("Already have an account?")}{" "}
        <Link to="/login" className="font-bold text-primary hover:underline">
          {t("Sign in here")}
        </Link>
      </p>
    </AuthShell>
  );
}

function AuthShell({
  title,
  intro,
  children,
  isLogin = false,
}: {
  title: string;
  intro: string;
  children: any;
  isLogin?: boolean;
}) {
  const t = useT();
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-10 px-4 sm:px-6 lg:px-8">
      {/* Background Image with subtle overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isLogin ? (
          <>
            <img
              src={assetUrl("/rural-village-road.jpg")}
              alt="Rural village community road in Jharkhand"
              className="size-full object-cover object-center sm:object-[center_bottom] lg:object-center filter brightness-[0.98] contrast-[1.02]"
            />
            {/* Very subtle dark/navy transparent overlay for readability without blurring the photograph */}
            <div className="absolute inset-0 bg-[#07162c]/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020b18]/25 via-transparent to-[#020b18]/10" />
          </>
        ) : (
          <>
            <img
              src={assetUrl("/jharkhand-hero.jpg")}
              alt="JanSetu Background"
              className="size-full object-cover object-center filter brightness-[0.82] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/80 to-background/90 backdrop-blur-[2px]" />
          </>
        )}
      </div>

      {/* Login Card: semi-transparent white/glass effect centered */}
      <div
        className="relative z-10 w-full max-w-[520px] rounded-[22px] border border-white/80 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
        style={{
          background: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className="flex flex-col items-center text-center">
          {/* Official JanSetu Logo */}
          <Link to="/" className="mb-4 inline-block transition-transform hover:scale-[1.02]">
            <img
              src={assetUrl("/jansetu-logo.png")}
              alt="JanSetu — Connecting Problems. Creating Solutions. Measuring Impact."
              className="h-16 sm:h-20 w-auto object-contain mx-auto"
            />
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {t(title)}
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
            {t(intro)}
          </p>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
