import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FileDown,
  GraduationCap,
  HandCoins,
  Handshake,
  MapPinned,
  Megaphone,
  MessageSquareMore,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/app/AppContext";
import { useT } from "@/utils/i18n";
import type { Role } from "@/app/types";
import type { Problem, Solution } from "@/data/seed";
import { overallProgress, stageProgress } from "@/utils/progress";
import { AppButton } from "./AppButton";
import { MapView } from "./MapView";
import { Modal } from "./Modal";
import { Badge, Section } from "./Section";

export function Dashboard({ role }: { role: Role }) {
  if (role === "citizen") return <Citizen />;
  if (role === "government") return <Government />;
  if (role === "university") return <University />;
  return <Industry />;
}

function Shell({ title, role, children }: { title: string; role?: Role; children: any }) {
  const { state } = useApp();
  const t = useT();
  const activeRole = role || state.user?.role || "citizen";

  const theme = {
    citizen: {
      gradient: "from-emerald-700 via-emerald-800 to-emerald-900",
      letter: "C",
      roleLabel: "Citizen",
    },
    government: {
      gradient: "from-rose-800 via-rose-900 to-[#7f1d1d]",
      letter: "G",
      roleLabel: "Government",
    },
    university: {
      gradient: "from-[#0d3b66] via-blue-900 to-indigo-950",
      letter: "U",
      roleLabel: "University",
    },
    industry: {
      gradient: "from-amber-600 via-amber-700 to-amber-800",
      letter: "I",
      roleLabel: "Industry",
    },
  }[activeRole];

  return (
    <main className="mx-auto max-w-[1140px] px-4 py-8">
      {/* Role-Themed Gradient Header Banner Matching Mockup */}
      <div className={`rounded-2xl bg-gradient-to-r ${theme.gradient} p-6 text-white shadow-elevated`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/75">
              {new Date().getHours() < 12 ? t("Good morning") : t("Welcome back")},
            </span>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight">{t(title)}</h1>
            <p className="mt-1 text-sm text-white/80">
              {state.user?.name || (state.language === "hi" ? "डेमो उपयोगकर्ता" : "Demo user")}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-white/10 text-white/90">
              <Bell size={18} />
            </span>
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 px-3 backdrop-blur-sm">
              <span className="grid size-6 place-items-center rounded-full bg-white text-xs font-extrabold text-primary">
                {theme.letter}
              </span>
              <span className="text-xs font-bold text-white capitalize">{t(theme.roleLabel)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-6">{children}</div>
    </main>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  note,
  onClick,
}: {
  icon: any;
  label: string;
  value: string;
  note: string;
  onClick?: (() => void) | undefined;
}) {
  const t = useT();
  const inner = (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-left">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t(label)}</p>
        <strong className="mt-1.5 block text-3xl font-extrabold text-primary">{t(value)}</strong>
        <p className="mt-1.5 text-xs text-muted-foreground">{t(note)}</p>
      </div>
      <span className="grid size-12 place-items-center rounded-xl bg-secondary/80 text-secondary-foreground">
        <Icon size={22} />
      </span>
    </div>
  );
  if (onClick)
    return (
      <button
        type="button"
        onClick={onClick}
        className="hover-card-lift w-full rounded-xl border border-border/80 bg-card p-5 shadow-card transition-all active:scale-[0.99]"
      >
        {inner}
        <span className="mt-3 block text-left text-xs font-bold text-accent">{t("View all")}</span>
      </button>
    );
  return (
    <div className="hover-card-lift rounded-xl border border-border/80 bg-card p-5 shadow-card">
      {inner}
    </div>
  );
}

function ProgressBar({ label, percent }: { label: string; percent: number }) {
  const t = useT();
  return (
    <div>
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>{t(label)}</span>
        <span className="text-primary">{percent}%</span>
      </div>
      <div className="mt-2 h-2.5 rounded-full bg-muted">
        <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function StageCard({
  solution,
  problemTitle,
}: {
  solution: Solution;
  problemTitle?: string | undefined;
}) {
  const t = useT();
  return (
    <div className="rounded-lg border border-border p-4">
      <span className="text-xs font-bold text-accent">
        {solution.id} · {solution.university}
      </span>
      <h3 className="mt-1 font-bold">{solution.title}</h3>
      {problemTitle && (
        <p className="mt-1 text-sm text-muted-foreground">
          {t("Problem")}: {problemTitle}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between text-sm font-bold">
        <span>{t("Overall progress")}</span>
        <Badge tone="green">{`${overallProgress(solution)}%`}</Badge>
      </div>
      <div className="mt-4 space-y-3">
        {stageProgress(solution).map((s) => (
          <ProgressBar key={s.stage} label={s.stage} percent={s.percent} />
        ))}
      </div>
    </div>
  );
}

function SolutionDetail({ solution }: { solution: Solution }) {
  const { state } = useApp();
  const t = useT();
  const problem = state.problems.find((p) => p.id === solution.problemId);
  const rows: [string, string][] = [
    ["Linked problem", problem ? `${problem.id} · ${problem.title}` : solution.problemId],
    ["Problem understanding", solution.understanding || solution.approach],
    ["Proposed solution", solution.title],
    ["Technical approach", solution.approach],
    ["SDG alignment", `SDG ${solution.sdg}`],
    ["Feasibility", `${solution.success}% success probability`],
    ["Budget", solution.budget],
    ["Implementation timeline", solution.timeline],
    ["Expected social impact", solution.impact],
    ["Submitted by", `${solution.author} · ${solution.university}`],
    ["Attachment", solution.attachment || "None"],
    ["Current status", solution.status],
  ];
  return (
    <dl className="space-y-3">
      {rows.map(([k, v]) => (
        <div key={k} className="rounded-md bg-muted p-3">
          <dt className="text-xs font-bold uppercase text-muted-foreground">{t(k)}</dt>
          <dd className="mt-1 text-sm font-medium">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Citizen() {
  const { state } = useApp();
  const t = useT();

  const verifiedCount = state.problems.filter((p) => p.status === "Verified").length;
  const inProgressCount = state.problems.filter((p) => p.status.includes("Analysis") || p.status.includes("Pending")).length;
  const resolvedCount = state.problems.filter((p) => p.status === "Resolved" || p.status === "Approved").length;

  return (
    <Shell title="Citizen Dashboard" role="citizen">
      <Link
        to="/report"
        className="flex min-h-16 items-center justify-between rounded-xl bg-accent px-5 font-bold text-accent-foreground shadow-card transition hover:bg-accent/95"
      >
        <span>
          <span className="block text-lg">{t("Report a Problem")}</span>
          <small className="font-normal opacity-90">{t("Submit a civic issue with GPS and evidence")}</small>
        </span>
        <Megaphone />
      </Link>

      {/* 4 Metric Cards Matching Mockup */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric
          icon={ClipboardCheck}
          label="My Problems"
          value={String(state.problems.length)}
          note="Submitted by community"
        />
        <Metric
          icon={CheckCircle2}
          label="Verified"
          value={String(verifiedCount || 3)}
          note="Field verified"
        />
        <Metric
          icon={TrendingUp}
          label="In Progress"
          value={String(inProgressCount || 2)}
          note="Under active solution"
        />
        <Metric
          icon={ShieldCheck}
          label="Resolved"
          value={String(resolvedCount || 1)}
          note="Milestones delivered"
        />
      </div>
      <Section title="My Problems">
        <div className="space-y-3">
          {state.problems.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              to="/challenges/$id"
              params={{ id: p.id }}
              className="block rounded-md border border-border p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <strong>{p.title}</strong>
                <Badge tone={p.priority === "Critical" ? "red" : "amber"}>{p.priority}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {p.id} · {p.district} · {t(p.status)}
              </p>
            </Link>
          ))}
        </div>
      </Section>
      <Section title="Nearby Problems Map">
        <MapView problems={state.problems} />
      </Section>
      <Notifications />
    </Shell>
  );
}

function ProblemRow({ p }: { p: Problem }) {
  const t = useT();
  return (
    <div className="rounded-md border border-border p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-accent">{p.id}</span>
          <strong className="block">{p.title}</strong>
        </div>
        <Badge tone={p.priority === "Critical" ? "red" : "amber"}>{p.priority}</Badge>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
      <p className="mt-2 text-sm">
        {p.district} · {t(p.status)} · SDG {p.sdg}
      </p>
    </div>
  );
}

function Government() {
  const { state, updateProblem, updateSolution, notify } = useApp();
  const t = useT();
  const [reject, setReject] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [review, setReview] = useState<Solution | null>(null);
  const [list, setList] = useState<null | "pending" | "critical" | "awaiting" | "implementation">(
    null,
  );
  const pending = state.problems.filter(
    (p) => p.status.includes("Pending") || p.status.includes("Analysis"),
  );
  const critical = state.problems.filter((p) => p.priority === "Critical");
  const awaiting = state.solutions.filter((s) => s.status === "Under Review");
  const reviewed = state.solutions.filter((s) => s.status !== "Under Review");
  const selected = state.solutions.filter(
    (s) => s.status === "Approved" || s.status === "Industry Partnership",
  );
  function verify(id: string) {
    updateProblem(id, { status: "Verified" });
    notify(`Problem ${id} verified`);
    toast.success("Problem verified successfully");
  }
  function rejectNow() {
    if (!reject || !reason.trim()) {
      toast.error("Rejection reason is required");
      return;
    }
    updateProblem(reject, { status: "Rejected", rejectionReason: reason });
    notify(`Problem ${reject} rejected`);
    setReject(null);
    setReason("");
    toast.success("Problem rejected with reason saved");
  }
  function decide(id: string, status: string) {
    updateSolution(id, { status });
    notify(`Solution ${id} ${status.toLowerCase()}`);
    setReview(null);
    toast.success(`Solution ${status.toLowerCase()}`);
  }
  const listTitle =
    list === "pending"
      ? "Pending Verification"
      : list === "critical"
        ? "Critical Problems"
        : list === "awaiting"
          ? "Solutions Awaiting Review"
          : "In Implementation";
  return (
    <Shell title="Government Dashboard" role="government">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric
          icon={ShieldCheck}
          label="Pending Verification"
          value={String(pending.length)}
          note="Evidence awaiting officer action"
          onClick={() => setList("pending")}
        />
        <Metric
          icon={MapPinned}
          label="Critical Problems"
          value={String(critical.length)}
          note="Highest priority across Jharkhand"
          onClick={() => setList("critical")}
        />
        <Metric
          icon={GraduationCap}
          label="Solutions Awaiting Review"
          value={String(awaiting.length)}
          note="University submissions"
          onClick={() => setList("awaiting")}
        />
        <Metric
          icon={TrendingUp}
          label="In Implementation"
          value={String(selected.length)}
          note="Across planning, testing and pilot"
          onClick={() => setList("implementation")}
        />
      </div>
      <Section title="Priority Problems">
        <div className="grid gap-3 sm:grid-cols-2">
          {["Critical", "Complex", "Routine"].map((x) => (
            <div key={x} className="rounded-md bg-muted p-4">
              <p className="text-sm">{t(x)}</p>
              <strong className="text-2xl">
                {state.problems.filter((p) => p.priority === x).length}
              </strong>
            </div>
          ))}
        </div>
      </Section>
      <Section
        title="Verification Queue"
        subtitle="Review GPS, evidence, duplicate checks, AI urgency and SDG alignment."
      >
        <div className="space-y-4">
          {pending.map((p) => (
            <div key={p.id} className="rounded-md border border-border p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-accent">{p.id}</span>
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {p.district} · GPS {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                  </p>
                </div>
                <Badge tone="red">{p.priority}</Badge>
              </div>
              <div className="mt-3 rounded-md bg-muted p-3 text-sm">
                <strong>AI:</strong> {p.aiExplanation}
                <br />
                <strong>SDG {p.sdg}:</strong> {p.sdgTitle} · {p.sdgScore}%
                {p.duplicate && (
                  <>
                    <br />
                    <strong>{t("Possible duplicate detected")}:</strong> {p.duplicate}
                  </>
                )}
              </div>
              {p.image && (
                <img
                  src={p.image}
                  alt="Problem evidence"
                  className="mt-3 max-h-48 rounded-md object-cover"
                />
              )}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <AppButton onClick={() => verify(p.id)}>
                  <CheckCircle2 />
                  {t("Verify")}
                </AppButton>
                <AppButton variant="outline" onClick={() => setReject(p.id)}>
                  {t("Reject")}
                </AppButton>
              </div>
            </div>
          ))}
          {!pending.length && (
            <div className="rounded-md border border-dashed border-border p-6 text-center text-muted-foreground">
              {t("No problems are waiting for verification.")}
            </div>
          )}
        </div>
      </Section>
      <Section title="Problem Map">
        <MapView problems={state.problems} />
      </Section>
      <Section
        title="Solutions Awaiting Review"
        subtitle="Open the full solution format before taking a decision."
      >
        <div className="space-y-4">
          {awaiting.map((s) => (
            <div key={s.id} className="rounded-md border border-border p-4">
              <span className="text-xs font-bold text-accent">
                {s.id} · {s.university}
              </span>
              <h3 className="mt-1 font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.approach}</p>
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <span>
                  {t("Budget")}: {s.budget}
                </span>
                <span>
                  {t("Timeline")}: {s.timeline}
                </span>
                <span>SDG {s.sdg}</span>
                <span>
                  {t("Impact")}: {s.impact}
                </span>
              </div>
              <AppButton className="mt-4 w-full" onClick={() => setReview(s)}>
                {t("Review full solution")}
              </AppButton>
            </div>
          ))}
          {!awaiting.length && (
            <div className="rounded-md border border-dashed border-border p-6 text-center text-muted-foreground">
              {t("All submitted solutions have been reviewed.")}
            </div>
          )}
        </div>
      </Section>
      {!!reviewed.length && (
        <Section
          title="Reviewed Solutions"
          subtitle="Every solution keeps its review decision on record."
        >
          <div className="space-y-3">
            {reviewed.map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => setReview(s)}
                className="flex w-full flex-col gap-2 rounded-md border border-border p-4 text-left sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <strong>{s.title}</strong>
                  <p className="text-sm text-muted-foreground">
                    {s.id} · {s.university}
                  </p>
                </div>
                <Badge tone={s.status === "Rejected" ? "red" : "green"}>{s.status}</Badge>
              </button>
            ))}
          </div>
        </Section>
      )}
      <Section
        title="Selected Solutions — Implementation"
        subtitle="Stage-wise progress for every approved solution."
      >
        <div className="space-y-4">
          {selected.map((s) => (
            <StageCard
              key={s.id}
              solution={s}
              problemTitle={state.problems.find((p) => p.id === s.problemId)?.title}
            />
          ))}
          {!selected.length && (
            <div className="rounded-md border border-dashed border-border p-6 text-center text-muted-foreground">
              {t("Approve a solution to start implementation tracking.")}
            </div>
          )}
        </div>
      </Section>
      <Modal open={!!list} onClose={() => setList(null)} title={t(listTitle)}>
        <div className="space-y-3">
          {list === "pending" && pending.map((p) => <ProblemRow key={p.id} p={p} />)}
          {list === "critical" && critical.map((p) => <ProblemRow key={p.id} p={p} />)}
          {list === "awaiting" &&
            awaiting.map((s) => (
              <div key={s.id} className="rounded-md border border-border p-4">
                <strong>{s.title}</strong>
                <p className="mt-1 text-sm text-muted-foreground">
                  {s.id} · {s.university}
                </p>
                <p className="mt-2 text-sm">{s.approach}</p>
              </div>
            ))}
          {list === "implementation" &&
            selected.map((s) => (
              <StageCard
                key={s.id}
                solution={s}
                problemTitle={state.problems.find((p) => p.id === s.problemId)?.title}
              />
            ))}
        </div>
      </Modal>
      <Modal open={!!review} onClose={() => setReview(null)} title={t("Solution Review")}>
        {review && (
          <>
            <SolutionDetail solution={review} />
            {review.status === "Under Review" ? (
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <AppButton onClick={() => decide(review.id, "Approved")}>{t("Approve")}</AppButton>
                <AppButton variant="outline" onClick={() => decide(review.id, "Rejected")}>
                  {t("Reject")}
                </AppButton>
                <AppButton
                  variant="outline"
                  className="sm:col-span-2"
                  onClick={() => decide(review.id, "Changes Requested")}
                >
                  {t("Request Changes")}
                </AppButton>
              </div>
            ) : (
              <p className="mt-5 rounded-md bg-muted p-3 text-sm font-semibold">
                {t("Decision recorded")}: {t(review.status)}
              </p>
            )}
          </>
        )}
      </Modal>
      <Modal open={!!reject} onClose={() => setReject(null)} title={t("Reject Problem")}>
        <label className="label">
          {t("Reason")}
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="field mt-2 min-h-32"
          />
        </label>
        <AppButton onClick={rejectNow} className="mt-4 w-full">
          {t("Submit Rejection")}
        </AppButton>
      </Modal>
    </Shell>
  );
}

const emptyForm = {
  problemId: "JS1023",
  title: "",
  understanding: "",
  approach: "",
  budget: "",
  timeline: "",
  impact: "",
  file: "",
};

function University() {
  const { state, addSolution } = useApp();
  const t = useT();
  const [verified, setVerified] = useState(false);
  const [id, setId] = useState("");
  const [template, setTemplate] = useState(false);
  const [form, setForm] = useState(false);
  const [detail, setDetail] = useState<Solution | null>(null);
  const [data, setData] = useState({ ...emptyForm });
  function set(key: keyof typeof emptyForm, value: string) {
    setData((prev) => ({ ...prev, [key]: value }));
  }
  function openForm(problemId: string) {
    setData({ ...emptyForm, problemId });
    setForm(true);
  }
  function validate() {
    if (/^(STU|FAC)-\d{4}$/i.test(id)) {
      setVerified(true);
      toast.success("University ID verified");
    } else
      toast.error("Please enter a valid Student ID / Faculty ID before submitting a solution.");
  }
  function download() {
    const text = `JANSETU SOLUTION TEMPLATE\n\nProblem Understanding:\n\nProposed Solution:\n\nTechnical Approach:\n\nInnovation:\n\nSDG Alignment:\n\nFeasibility:\n\nBudget:\n\nImplementation Timeline:\n\nExpected Social Impact:\n`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    a.download = "JanSetu-Solution-Template.txt";
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success("Solution template downloaded");
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!verified) {
      toast.error("Please enter a valid Student ID / Faculty ID before submitting a solution.");
      return;
    }
    if (!data.title || !data.approach || !data.budget || !data.timeline) {
      toast.error("Complete the required solution fields");
      return;
    }
    const s: Solution = {
      id: `SOL${210 + state.solutions.length}`,
      problemId: data.problemId,
      title: data.title,
      university: state.user?.name || "Demo University",
      author: id,
      approach: data.approach,
      understanding: data.understanding,
      budget: data.budget,
      timeline: data.timeline,
      impact: data.impact,
      sdg: state.problems.find((p) => p.id === data.problemId)?.sdg ?? 11,
      status: "Under Review",
      success: 78,
      funding: "Open",
      attachment: data.file,
    };
    addSolution(s);
    setForm(false);
    setData({ ...emptyForm });
    toast.success("Solution submitted successfully");
  }
  const selected = state.solutions.filter((s) => s.status !== "Rejected");
  const rejected = state.solutions.filter((s) => s.status === "Rejected");
  const inDevCount = state.solutions.filter((s) => s.status === "Approved" || s.status === "Industry Partnership").length;
  const completedCount = state.solutions.filter((s) => s.status === "Completed").length;

  return (
    <Shell title="University Dashboard" role="university">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric
          icon={GraduationCap}
          label="Recommended"
          value={String(state.problems.filter((p) => p.status === "Verified").length || 3)}
          note="Matched challenges"
        />
        <Metric
          icon={CheckCircle2}
          label="Selected"
          value={String(selected.length || 1)}
          note="Shortlisted proposals"
        />
        <Metric
          icon={TrendingUp}
          label="In Development"
          value={String(inDevCount || 1)}
          note="Prototypes active"
        />
        <Metric
          icon={ShieldCheck}
          label="Completed"
          value={String(completedCount || 0)}
          note="Delivered milestones"
        />
      </div>
      <Section
        title="Student / Faculty ID Verification"
        subtitle="Demo format: STU-1234 or FAC-1234"
      >
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <input
            className="field"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setVerified(false);
            }}
            placeholder="STU-1234"
          />
          <AppButton onClick={validate}>
            <UserCheck />
            {t("Verify ID")}
          </AppButton>
        </div>
        {verified && <p className="mt-3 text-sm font-bold text-success">✓ {t("Verified")}</p>}
      </Section>
      <Section title="Recommended Challenges">
        <div className="space-y-3">
          {state.problems
            .filter((p) => p.status === "Verified" || p.status === "University Matching")
            .map((p) => (
              <div key={p.id} className="rounded-md border border-border p-4">
                <Badge tone={p.priority === "Critical" ? "red" : "amber"}>{p.priority}</Badge>
                <h3 className="mt-2 font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.district} · SDG {p.sdg}
                </p>
                <AppButton onClick={() => openForm(p.id)} className="mt-4 w-full">
                  {t("Select Challenge")}
                </AppButton>
              </div>
            ))}
        </div>
      </Section>
      <Section title="Solution Template">
        <div className="grid gap-3 sm:grid-cols-2">
          <AppButton variant="outline" onClick={() => setTemplate(true)}>
            {t("View Solution Template")}
          </AppButton>
          <AppButton onClick={download}>
            <FileDown />
            {t("Download Template")}
          </AppButton>
        </div>
      </Section>
      <Section
        title="Selected Solutions"
        subtitle="Approved and in-review work with full topics and description."
      >
        <div className="space-y-4">
          {selected.map((s) => (
            <div key={s.id} className="rounded-md border border-border p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-accent">{s.id}</span>
                  <strong className="block">{s.title}</strong>
                </div>
                <Badge tone="green">{s.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.approach}</p>
              <AppButton variant="outline" className="mt-3 w-full" onClick={() => setDetail(s)}>
                {t("View details")}
              </AppButton>
              <div className="mt-4 space-y-3">
                {stageProgress(s).map((x) => (
                  <ProgressBar key={x.stage} label={x.stage} percent={x.percent} />
                ))}
              </div>
            </div>
          ))}
          {!selected.length && (
            <div className="rounded-md border border-dashed border-border p-6 text-center text-muted-foreground">
              {t("No selected solutions yet.")}
            </div>
          )}
        </div>
      </Section>
      <Section title="Rejected Solutions" subtitle="Feedback to improve and resubmit.">
        <div className="space-y-3">
          {rejected.map((s) => (
            <div key={s.id} className="rounded-md border border-destructive/40 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-accent">{s.id}</span>
                  <strong className="block">{s.title}</strong>
                </div>
                <Badge tone="red">{s.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.approach}</p>
              <AppButton variant="outline" className="mt-3 w-full" onClick={() => setDetail(s)}>
                {t("View details")}
              </AppButton>
            </div>
          ))}
          {!rejected.length && (
            <div className="rounded-md border border-dashed border-border p-6 text-center text-muted-foreground">
              {t("No rejected solutions.")}
            </div>
          )}
        </div>
      </Section>
      <Notifications />
      <Modal open={!!detail} onClose={() => setDetail(null)} title={t("Solution Details")}>
        {detail && <SolutionDetail solution={detail} />}
      </Modal>
      <Modal open={template} onClose={() => setTemplate(false)} title="JanSetu Solution Template">
        <ol className="space-y-3 text-sm">
          {[
            "Problem Understanding",
            "Proposed Solution",
            "Technical Approach",
            "Innovation",
            "SDG Alignment",
            "Feasibility",
            "Budget",
            "Implementation Timeline",
            "Expected Social Impact",
          ].map((x, i) => (
            <li key={x} className="rounded-md bg-muted p-3">
              <strong>
                {i + 1}. {x}
              </strong>
            </li>
          ))}
        </ol>
        <AppButton onClick={download} className="mt-5 w-full">
          <FileDown />
          {t("Download Template")}
        </AppButton>
      </Modal>
      <Modal open={form} onClose={() => setForm(false)} title={t("Submit Solution")}>
        <form onSubmit={submit} className="space-y-4">
          <label className="label">
            {t("Challenge")}
            <select
              className="field mt-2"
              value={data.problemId}
              onChange={(e) => set("problemId", e.target.value)}
            >
              {state.problems.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </label>
          <label className="label">
            {t("Solution title")}
            <input
              className="field mt-2"
              value={data.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </label>
          <label className="label">
            {t("Problem understanding")}
            <textarea
              className="field mt-2"
              value={data.understanding}
              onChange={(e) => set("understanding", e.target.value)}
            />
          </label>
          <label className="label">
            {t("Technical approach")}
            <textarea
              className="field mt-2"
              value={data.approach}
              onChange={(e) => set("approach", e.target.value)}
            />
          </label>
          <label className="label">
            {t("Budget")}
            <input
              className="field mt-2"
              value={data.budget}
              onChange={(e) => set("budget", e.target.value)}
            />
          </label>
          <label className="label">
            {t("Implementation timeline")}
            <input
              className="field mt-2"
              value={data.timeline}
              onChange={(e) => set("timeline", e.target.value)}
            />
          </label>
          <label className="label">
            {t("Expected social impact")}
            <textarea
              className="field mt-2"
              value={data.impact}
              onChange={(e) => set("impact", e.target.value)}
            />
          </label>
          <label className="label">
            {t("Prototype / document")}
            <input
              type="file"
              className="field mt-2"
              accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
              onChange={(e) => set("file", e.target.files?.[0]?.name || "")}
            />
          </label>
          {data.file && <p className="text-sm">Attached: {data.file}</p>}
          <AppButton type="submit" className="w-full">
            {t("Submit Solution")}
          </AppButton>
        </form>
      </Modal>
    </Shell>
  );
}

function Industry() {
  const { state, updateSolution } = useApp();
  const t = useT();
  const [action, setAction] = useState<"partner" | "reject" | "mentor" | "fund" | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [detail, setDetail] = useState<Solution | null>(null);
  function open(a: typeof action, id: string) {
    setAction(a);
    setSelectedId(id);
    setFields({});
  }
  const configs: Record<"partner" | "reject" | "mentor" | "fund", [string, string][]> = {
    partner: [
      ["organization", "Partnership organization"],
      ["timeline", "Implementation timeline"],
      ["scope", "Partnership scope"],
      ["contact", "Contact person"],
      ["confirmation", "Type CONFIRM"],
    ],
    reject: [["reason", "Rejection reason"]],
    mentor: [
      ["mentor", "Mentor name"],
      ["domain", "Expertise domain"],
      ["date", "Available date"],
      ["time", "Available time"],
      ["notes", "Mentorship notes"],
    ],
    fund: [
      ["amount", "Funding amount"],
      ["type", "Funding type"],
      ["milestones", "Milestone schedule"],
      ["comments", "Comments"],
    ],
  };
  function submit() {
    const required = action ? configs[action].map(([k]) => k) : [];
    if (!selectedId || required.some((k) => !fields[k]?.trim())) {
      toast.error("Complete all required fields");
      return;
    }
    const patch =
      action === "partner"
        ? { partnership: `Accepted by ${fields["organization"]}`, status: "Industry Partnership" }
        : action === "reject"
          ? { partnership: `Rejected: ${fields["reason"]}` }
          : action === "mentor"
            ? { mentorship: `${fields["mentor"]} · ${fields["domain"]}` }
            : { funding: `Funded ${fields["amount"]}` };
    updateSolution(selectedId, patch);
    toast.success(
      action === "partner"
        ? "Partnership accepted"
        : action === "reject"
          ? "Solution rejected"
          : action === "mentor"
            ? "Mentorship request submitted"
            : "Funding submitted",
    );
    setAction(null);
  }
  const isRejected = (s: Solution) => !!s.partnership?.startsWith("Rejected");
  const isEngaged = (s: Solution) =>
    !!s.partnership?.startsWith("Accepted") || !!s.funding?.startsWith("Funded");
  const engaged = state.solutions.filter((s) => isEngaged(s));
  const rejected = state.solutions.filter((s) => isRejected(s));
  const recommended = state.solutions.filter((s) => !isRejected(s) && !isEngaged(s));
  const fundedCount = state.solutions.filter((s) => !!s.funding?.startsWith("Funded")).length;
  const completedCount = state.solutions.filter((s) => s.status === "Completed").length;

  return (
    <Shell title="Industry Dashboard" role="industry">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric
          icon={Factory}
          label="Recommended"
          value={String(recommended.length || 2)}
          note="Vetted proposals"
        />
        <Metric
          icon={Handshake}
          label="Active Partnership"
          value={String(engaged.length || 1)}
          note="Collaborations"
        />
        <Metric
          icon={HandCoins}
          label="Funding Provided"
          value={String(fundedCount || 1)}
          note="Committed capital"
        />
        <Metric
          icon={ShieldCheck}
          label="Completed"
          value={String(completedCount || 0)}
          note="Deployed projects"
        />
      </div>
      <Section title="Recommended Solutions" subtitle="Open opportunities awaiting your decision.">
        <div className="space-y-4">
          {recommended.map((s) => (
            <div className="rounded-md border border-border p-4" key={s.id}>
              <Badge tone="green">{s.status}</Badge>
              <h3 className="mt-2 font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {s.university} · {s.budget} · {s.success}%
              </p>
              {s.mentorship && (
                <p className="mt-1 text-sm">
                  {t("Mentorship")}: {s.mentorship}
                </p>
              )}
              <AppButton variant="outline" className="mt-3 w-full" onClick={() => setDetail(s)}>
                {t("View details")}
              </AppButton>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <AppButton onClick={() => open("partner", s.id)}>
                  <Handshake />
                  {t("Accept & Partner")}
                </AppButton>
                <AppButton variant="outline" onClick={() => open("mentor", s.id)}>
                  <MessageSquareMore />
                  {t("Provide Mentorship")}
                </AppButton>
                <AppButton onClick={() => open("fund", s.id)}>
                  <HandCoins />
                  {t("Provide Funding")}
                </AppButton>
                <AppButton variant="outline" onClick={() => open("reject", s.id)}>
                  {t("Reject")}
                </AppButton>
              </div>
            </div>
          ))}
          {!recommended.length && (
            <div className="rounded-md border border-dashed border-border p-6 text-center text-muted-foreground">
              {t("No open recommendations right now.")}
            </div>
          )}
        </div>
      </Section>
      <Section
        title="Accepted Partnerships & Funding"
        subtitle="University solutions your organisation supports."
      >
        <div className="space-y-4">
          {engaged.map((s) => (
            <div key={s.id} className="rounded-lg border border-success bg-secondary p-4">
              <div className="flex flex-col gap-2">
                <Badge tone="green">{s.status}</Badge>
                <strong>{s.title}</strong>
                <p className="text-sm text-muted-foreground">
                  {s.university} · {s.budget} · {s.timeline}
                </p>
                {s.partnership?.startsWith("Accepted") && (
                  <p className="text-sm font-semibold">
                    {t("Partnership")}: {s.partnership}
                  </p>
                )}
                {s.funding?.startsWith("Funded") && (
                  <p className="text-sm font-semibold">
                    {t("Funding")}: {s.funding}
                  </p>
                )}
              </div>
              <AppButton variant="outline" className="mt-3 w-full" onClick={() => setDetail(s)}>
                {t("View details")}
              </AppButton>
            </div>
          ))}
          {!engaged.length && (
            <div className="rounded-md border border-dashed border-border p-6 text-center text-muted-foreground">
              {t("No accepted partnerships or funding yet.")}
            </div>
          )}
        </div>
      </Section>
      <Section
        title="Rejected Solutions"
        subtitle="Closed opportunities with the reason on record."
      >
        <div className="space-y-3">
          {rejected.map((s) => (
            <div key={s.id} className="rounded-md border border-destructive/40 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <strong>{s.title}</strong>
                  <p className="text-sm text-muted-foreground">
                    {s.id} · {s.university}
                  </p>
                </div>
                <XCircle className="text-destructive" />
              </div>
              <p className="mt-2 text-sm">{s.partnership}</p>
              <AppButton variant="outline" className="mt-3 w-full" onClick={() => setDetail(s)}>
                {t("View details")}
              </AppButton>
            </div>
          ))}
          {!rejected.length && (
            <div className="rounded-md border border-dashed border-border p-6 text-center text-muted-foreground">
              {t("No rejected solutions.")}
            </div>
          )}
        </div>
      </Section>
      <Section title="Impact">
        <div className="grid gap-3 sm:grid-cols-2">
          <Metric
            icon={Users}
            label="Residents reached"
            value="18,420"
            note="Across active projects"
          />
          <Metric
            icon={TrendingUp}
            label="Projected outcomes"
            value="86%"
            note="On track for target impact"
          />
        </div>
      </Section>
      <Modal open={!!detail} onClose={() => setDetail(null)} title={t("Solution Details")}>
        {detail && <SolutionDetail solution={detail} />}
      </Modal>
      <Modal
        open={!!action}
        onClose={() => setAction(null)}
        title={
          action === "partner"
            ? t("Accept & Partner")
            : action === "reject"
              ? t("Reject")
              : action === "mentor"
                ? t("Provide Mentorship")
                : t("Provide Funding")
        }
      >
        <div className="space-y-4">
          {action &&
            configs[action]?.map(([key, label]) => (
              <label className="label" key={key}>
                {t(label)}
                {key === "reason" ||
                key === "scope" ||
                key === "notes" ||
                key === "comments" ||
                key === "milestones" ? (
                  <textarea
                    className="field mt-2"
                    value={fields[key] || ""}
                    onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.value }))}
                  />
                ) : (
                  <input
                    className="field mt-2"
                    value={fields[key] || ""}
                    type={key === "date" ? "date" : key === "time" ? "time" : "text"}
                    onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.value }))}
                  />
                )}
              </label>
            ))}
          <AppButton onClick={submit} className="w-full">
            {t("Confirm action")}
          </AppButton>
        </div>
      </Modal>
    </Shell>
  );
}

function Notifications() {
  const { state } = useApp();
  const t = useT();
  return (
    <Section title="Recent Notifications">
      <div className="space-y-3">
        {state.notifications.slice(0, 5).map((n, i) => (
          <div
            key={`${n}-${i}`}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-md bg-muted p-3"
          >
            <Bell size={18} className="text-accent" />
            <p className="text-sm">{t(n)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
