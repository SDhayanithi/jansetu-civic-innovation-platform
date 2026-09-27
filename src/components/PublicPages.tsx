import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Factory,
  GraduationCap,
  HeartHandshake,
  Landmark,
  MapPinned,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useApp } from "@/app/AppContext";
import { categories, translations } from "@/utils/translations";
import { translate, useT } from "@/utils/i18n";
import { MapView } from "./MapView";
import { Badge, Section } from "./Section";
import { Hero } from "./Hero";
import { PlatformEcosystem } from "./PlatformEcosystem";
import { ProcessTimeline } from "./ProcessTimeline";
import { AIAndMapSection } from "./AIAndMapSection";
import { CTASection } from "./CTASection";

export function Landing() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <PlatformEcosystem />
      <ProcessTimeline />
      <AIAndMapSection />
      <CTASection />
    </div>
  );
}
export function ImpactStrip() {
  const t = useT();
  return (
    <section className="border-y border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-[1100px] gap-3 px-4 py-10 sm:grid-cols-2">
        {[
          ["60,400+", "Problems Reported"],
          ["47,310+", "Solutions Provided"],
          ["78%", "Solution Success Rate"],
          ["24", "Districts Covered"],
        ].map((x) => (
          <div key={x[1]} className="rounded-lg border border-primary-foreground/15 p-5">
            <strong className="text-3xl">{x[0]}</strong>
            <p className="mt-1 text-primary-foreground/70">{t(x[1] as string)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
function Intelligence() {
  const t = useT();
  const cards = [
    [BrainCircuit, "AI Problem Classification", "Water · 96% confidence"],
    [Search, "Semantic Duplicate Detection", "87% match nearby"],
    [MapPinned, "Geographical Hotspot Detection", "Ranchi Ward 12 hotspot"],
    [TrendingUp, "Priority Scoring", "Score 89 / 100"],
    [GraduationCap, "University Recommendation", "BIT Mesra · strong fit"],
    [CheckCircle2, "Impact Analytics", "2,400 residents reached"],
  ];
  return (
    <section className="mx-auto max-w-[1100px] px-4 py-16">
      <h2 className="text-3xl font-bold">{t("Intelligence Behind JanSetu")}</h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {cards.map(([Icon, title, example]: any) => (
          <div key={title} className="rounded-lg border border-border p-5">
            <Icon className="text-accent" />
            <h3 className="mt-3 font-bold">{t(title)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("Transparent, explainable intelligence supports—not replaces—public decisions.")}
            </p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <Badge tone="green">Active</Badge>
              <span className="text-xs font-semibold">{example}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export function Challenges() {
  const { state } = useApp();
  const t = useT();
  const [q, setQ] = useState(""),
    [category, setCategory] = useState("All"),
    [district, setDistrict] = useState("All"),
    [priority, setPriority] = useState("All"),
    [status, setStatus] = useState("All");
  const rows = useMemo(
    () =>
      state.problems.filter(
        (p) =>
          (p.title + p.description).toLowerCase().includes(q.toLowerCase()) &&
          (category === "All" || p.category === category) &&
          (district === "All" || p.district === district) &&
          (priority === "All" || p.priority === priority) &&
          (status === "All" || p.status === status),
      ),
    [state.problems, q, category, district, priority, status],
  );
  return (
    <Page
      title="Civic Challenges"
      intro="Verified and emerging challenges from communities across Jharkhand."
    >
      <FilterBar
        q={q}
        setQ={setQ}
        category={category}
        setCategory={setCategory}
        district={district}
        setDistrict={setDistrict}
        priority={priority}
        setPriority={setPriority}
        status={status}
        setStatus={setStatus}
      />
      <div className="mt-5 grid gap-4">
        {rows.map((p) => (
          <Link
            key={p.id}
            to="/challenges/$id"
            params={{ id: p.id }}
            className="rounded-lg border border-border bg-card p-5 shadow-card hover:border-accent"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
              <div className="min-w-0">
                <span className="text-xs font-bold text-accent">
                  {p.id} · {t(p.category)}
                </span>
                <h2 className="mt-1 text-lg font-bold">{p.title}</h2>
              </div>
              <Badge
                tone={
                  p.priority === "Critical" ? "red" : p.priority === "Complex" ? "amber" : "green"
                }
              >
                {p.priority}
              </Badge>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <span>
                {t("District")}: {p.district}
              </span>
              <span>
                {t("Affected population")}: {p.population.toLocaleString()}
              </span>
              <span>
                {t("Status")}: {t(p.status)}
              </span>
              <span>
                SDG {p.sdg}: {p.sdgTitle}
              </span>
              <span>Reported: {p.date}</span>
            </div>
          </Link>
        ))}
        {!rows.length && <Empty />}
      </div>
      <div className="mt-7">
        <MapView problems={rows} />
      </div>
    </Page>
  );
}
function FilterBar({
  q,
  setQ,
  category,
  setCategory,
  district,
  setDistrict,
  priority,
  setPriority,
  status,
  setStatus,
}: any) {
  const { state } = useApp();
  const t = useT();
  return (
    <Section title="Filters">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("Search challenges")}
          className="field"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="field">
          <option value="All">{t("All")}</option>
          {categories.map((x) => (
            <option key={x} value={x}>
              {t(x)}
            </option>
          ))}
        </select>
        <select value={district} onChange={(e) => setDistrict(e.target.value)} className="field">
          <option>All</option>
          {[...new Set(state.problems.map((p) => p.district))].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="field">
          {["All", "Critical", "Complex", "Routine"].map((x) => (
            <option key={x} value={x}>
              {t(x)}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="field">
          <option value="All">{t("All")}</option>
          {[...new Set(state.problems.map((p) => p.status))].map((x) => (
            <option key={x} value={x}>
              {t(x)}
            </option>
          ))}
        </select>
      </div>
    </Section>
  );
}
export function Solutions() {
  const { state } = useApp();
  const t = useT();
  const [q, setQ] = useState(""),
    [status, setStatus] = useState("All");
  const rows = state.solutions.filter(
    (s) =>
      (s.title + s.university + s.approach).toLowerCase().includes(q.toLowerCase()) &&
      (status === "All" || s.status === status),
  );
  return (
    <Page
      title="Solutions Exchange"
      intro="Research-backed solutions ready for review, partnership and implementation."
    >
      <Section title="Find a solution">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="field"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("Search solutions")}
          />
          <select className="field" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">{t("All")}</option>
            {[...new Set(state.solutions.map((s) => s.status))].map((x) => (
              <option key={x} value={x}>
                {t(x)}
              </option>
            ))}
          </select>
        </div>
      </Section>
      <div className="mt-5 grid gap-4">
        {rows.map((s) => {
          const p = state.problems.find((p) => p.id === s.problemId);
          return (
            <Link
              key={s.id}
              to="/solutions/$id"
              params={{ id: s.id }}
              className="rounded-lg border border-border bg-card p-5 shadow-card"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-accent">
                    {s.id} · {s.university}
                  </span>
                  <h2 className="mt-1 text-lg font-bold">{s.title}</h2>
                </div>
                <Badge tone="green">{s.status}</Badge>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("Problem")}: {p?.title}
              </p>
              <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <span>SDG {s.sdg}</span>
                <span>Success probability: {s.success}%</span>
                <span>
                  {t("Funding")}: {s.funding}
                </span>
                <span>
                  {t("Timeline")}: {s.timeline}
                </span>
              </div>
            </Link>
          );
        })}
        {!rows.length && <Empty />}
      </div>
    </Page>
  );
}
export function About() {
  const t = useT();
  return (
    <Page
      title="About JanSetu"
      intro="A public-interest platform that turns lived community experience into accountable action."
    >
      <div className="grid gap-4">
        {(
          [
            [
              "What JanSetu is",
              "A shared civic workspace for citizens, government, universities, mentors, industry and communities.",
            ],
            [
              "Why it exists",
              "Public problems often lose momentum between reporting, technical design and implementation. JanSetu keeps every hand-off visible.",
            ],
            [
              "How AI is used",
              "Explainable local analysis classifies urgency, identifies possible duplicates, recommends SDGs and supports transparent ranking.",
            ],
            [
              "How GIS is used",
              "Real locations, district filters and hotspot views help teams understand where needs are concentrated.",
            ],
            [
              "Stakeholders",
              "Citizens provide evidence; government verifies; universities solve; mentors strengthen; industry funds and implements.",
            ],
            [
              "Technology and trust",
              "Secure cloud data, browser-based GPS and camera tools, interactive mapping and auditable status changes support responsible delivery.",
            ],
          ] as [string, string][]
        ).map((x) => (
          <Section key={x[0]} title={x[0]}>
            <p className="leading-7 text-muted-foreground">{t(x[1])}</p>
          </Section>
        ))}
      </div>
    </Page>
  );
}
const chartColors = ["#0f3d5c", "#12a150", "#f59e0b", "#ef4444", "#7c3aed", "#0ea5e9"];
export function Impact() {
  const { state } = useApp();
  const t = useT();
  const byCategory = categories
    .map((c) => ({ name: t(c), value: state.problems.filter((p) => p.category === c).length }))
    .filter((x) => x.value > 0);
  const byPriority = ["Critical", "Complex", "Routine"].map((p) => ({
    name: t(p),
    value: state.problems.filter((x) => x.priority === p).length,
  }));
  const byDistrict = [...new Set(state.problems.map((p) => p.district))].map((d) => ({
    name: d,
    value: state.problems.filter((p) => p.district === d).length,
  }));
  const lifecycle = [
    ["Problems to verified", 78],
    ["Verified to solution", 72],
    ["Solution to pilot", 54],
    ["Pilot to implemented", 43],
  ] as [string, number][];
  return (
    <Page
      title="Community Impact"
      intro="Transparent indicators connect completed work to measurable public value."
    >
      <ImpactStrip />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          ["42,910", "Problems Verified"],
          ["186", "Universities Participating"],
          ["312", "Industry Partners"],
          ["9,640", "Projects Implemented"],
        ].map((x) => (
          <Section key={x[1]}>
            <strong className="text-3xl text-primary">{x[0]}</strong>
            <p className="mt-1 text-muted-foreground">{t(x[1] as string)}</p>
          </Section>
        ))}
      </div>
      <Section title="Problems by category" className="mt-5">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius="80%" label>
                {byCategory.map((entry, i) => (
                  <Cell key={entry.name} fill={chartColors[i % chartColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Section>
      <Section title="Problems by priority" className="mt-5">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byPriority}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {byPriority.map((entry, i) => (
                  <Cell key={entry.name} fill={chartColors[i % chartColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>
      <Section title="Reports by district" className="mt-5">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byDistrict} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={110} />
              <Tooltip />
              <Bar dataKey="value" fill="#12a150" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>
      <Section title="Impact by lifecycle" className="mt-5">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={lifecycle.map(([name, value]) => ({ name: t(name), value }))}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" hide />
              <YAxis unit="%" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name={t("Completion %")} fill="#0f3d5c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-5 space-y-5">
          {lifecycle.map((x) => (
            <div key={x[0]}>
              <div className="flex justify-between text-sm font-semibold">
                <span>{t(x[0])}</span>
                <span>{x[1]}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div className="h-full rounded-full bg-accent" style={{ width: `${x[1]}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Page>
  );
}
export function HowItWorks() {
  const { state } = useApp();
  const t = translations[state.language];
  const defaultSteps: [string, string, string][] = [
    ["01", "Report", "Submit details, evidence and community context."],
    ["02", "Locate", "Use real GPS or select the location manually."],
    ["03", "AI Analysis", "AI detects category, urgency, duplicates and SDGs."],
    ["04", "Prioritization", "A transparent five-part score orders action."],
    ["05", "Co-Create Solutions", "Universities, mentors and industry collaborate."],
    ["06", "Implementation", "Government tracks delivery through impact."],
  ];
  const steps: [string, string, string][] =
    state.language === "hi"
      ? [
          ["01", "रिपोर्ट करें", "समस्या, प्रमाण और सामुदायिक संदर्भ दर्ज करें।"],
          ["02", "स्थान चुनें", "जीपीएस का उपयोग करें या मानचित्र पर स्थान चुनें।"],
          ["03", "विश्लेषण", "एआई श्रेणी, तात्कालिकता, डुप्लिकेट और एसडीजी पहचानता है।"],
          ["04", "प्राथमिकता", "पारदर्शी पाँच-भाग स्कोर कार्रवाई का क्रम तय करता है।"],
          ["05", "समाधान", "विश्वविद्यालय, मेंटर और उद्योग मिलकर समाधान बनाते हैं।"],
          ["06", "कार्यान्वयन", "सरकार प्रभाव तक हर चरण को ट्रैक करती है।"],
        ]
      : defaultSteps;
  return (
    <Page title={t.guideTitle} intro={t.guideIntro}>
      <div className="grid gap-4">
        {steps.map((s, i) => (
          <Section key={s[0]}>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-secondary font-black text-secondary-foreground">
                {s[0]}
              </span>
              <div>
                <h2 className="text-xl font-bold">{s[1]}</h2>
                <p className="mt-1 text-muted-foreground">{s[2]}</p>
                {i < steps.length - 1 && (
                  <div className="ml-5 mt-4 h-8 border-l-2 border-dashed border-accent" />
                )}
              </div>
            </div>
          </Section>
        ))}
      </div>
    </Page>
  );
}
export function DetailPage({ kind, id }: { kind: "problem" | "solution"; id: string }) {
  const { state } = useApp();
  if (kind === "problem") {
    const p = state.problems.find((x) => x.id === id);
    if (!p)
      return (
        <Page title="Challenge unavailable" intro="This record could not be found.">
          <Empty />
        </Page>
      );
    return (
      <Page title={p.title} intro={`${p.id} · ${p.district}`}>
        <Section>
          <div className="flex flex-wrap gap-2">
            <Badge tone={p.priority === "Critical" ? "red" : "amber"}>{p.priority}</Badge>
            <Badge tone="green">{p.status}</Badge>
          </div>
          <p className="mt-5 leading-7">{p.description}</p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <Info k="Affected population" v={p.population.toLocaleString()} />
            <Info k="Community support" v={`${p.support} endorsements`} />
            <Info k="AI assessment" v={p.aiExplanation} />
            <Info k="SDG alignment" v={`SDG ${p.sdg} · ${p.sdgTitle} (${p.sdgScore}%)`} />
          </dl>
        </Section>
        <MapView problems={[p]} />
      </Page>
    );
  }
  const s = state.solutions.find((x) => x.id === id);
  if (!s)
    return (
      <Page title="Solution unavailable" intro="This record could not be found.">
        <Empty />
      </Page>
    );
  return (
    <Page title={s.title} intro={`${s.id} · ${s.university}`}>
      <Section>
        <Badge tone="green">{s.status}</Badge>
        <dl className="mt-5 grid gap-4">
          <Info
            k="Problem"
            v={state.problems.find((p) => p.id === s.problemId)?.title || s.problemId}
          />
          <Info k="Student / Faculty" v={s.author} />
          <Info k="Technical approach" v={s.approach} />
          <Info k="Budget" v={s.budget} />
          <Info k="Timeline" v={s.timeline} />
          <Info k="Expected social impact" v={s.impact} />
          <Info k="Funding status" v={s.funding} />
        </dl>
      </Section>
    </Page>
  );
}
function Info({ k, v }: { k: string; v: string }) {
  const t = useT();
  return (
    <div>
      <dt className="text-xs font-bold uppercase text-muted-foreground">{t(k)}</dt>
      <dd className="mt-1 font-medium">{v}</dd>
    </div>
  );
}
function Empty() {
  const t = useT();
  return (
    <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
      {t("No matching records found.")}
    </div>
  );
}
function Page({ title, intro, children }: { title: string; intro: string; children: any }) {
  const { state } = useApp();
  return (
    <main className="mx-auto min-h-[70vh] max-w-[1100px] px-4 py-10 sm:py-14">
      <span className="eyebrow">JanSetu</span>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{translate(title, state.language)}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{translate(intro, state.language)}</p>
      <div className="mt-8">{children}</div>
    </main>
  );
}
