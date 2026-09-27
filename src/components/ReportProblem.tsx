import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Camera, FileUp, LocateFixed, MapPin, Trash2, WandSparkles } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/app/AppContext";
import { districts, type Problem } from "@/data/seed";
import { analyzeUrgency, categorizeProblem, similarity } from "@/utils/aiAlgorithms";
import { districtFromAddress, nearestJharkhandDistrict } from "@/utils/districtResolver";
import { evalSDGAlignment } from "@/utils/sdgEvaluator";
import { calculateRanking } from "@/utils/rankingEngine";
import { categories, categoryHindi, translations } from "@/utils/translations";
import { AppButton } from "./AppButton";
import { CameraModal } from "./CameraModal";
import { MapView } from "./MapView";
import { Badge, Section } from "./Section";
export function ReportProblem() {
  const { state, addProblem } = useApp(),
    t = translations[state.language];
  const nav = useNavigate();
  const [title, setTitle] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState("Water"),
    [district, setDistrict] = useState("Ranchi"),
    [contact, setContact] = useState(""),
    [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null),
    [address, setAddress] = useState(""),
    [locating, setLocating] = useState(false),
    [camera, setCamera] = useState(false),
    [file, setFile] = useState<{ name: string; type: string; size: number; url: string } | null>(
      null,
    );
  const urgency = useMemo(
    () =>
      `${title} ${description}`.trim().length >= 8
        ? analyzeUrgency(`${title} ${description}`)
        : null,
    [title, description],
  );
  const categoryAnalysis = useMemo(
    () => (description.length >= 5 ? categorizeProblem(`${title} ${description}`) : null),
    [title, description],
  );
  useEffect(() => {
    if (categoryAnalysis) setCategory(categoryAnalysis.category);
  }, [categoryAnalysis]);
  const sdg = useMemo(() => evalSDGAlignment(category, description), [category, description]);
  const duplicate = useMemo(() => {
    if (description.length < 12) return null;
    const best = state.problems
      .map((p) => ({ p, score: similarity(description, p.description) }))
      .sort((a, b) => b.score - a.score)[0];
    return best && best.score >= 20 ? best : null;
  }, [description, state.problems]);
  const ranking = urgency ? calculateRanking(urgency.score, 72, 68, 76, sdg.score) : null;
  const setManual = useCallback(
    (p: { lat: number; lng: number }) => {
      setCoords(p);
      const resolved = nearestJharkhandDistrict(p.lat, p.lng);
      setDistrict(resolved);
      setAddress(`Selected location · ${resolved} district`);
      toast.success(`${t.locationSelected}: ${resolved}`);
    },
    [t.locationSelected],
  );
  async function gps() {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(c);
        setDistrict(nearestJharkhandDistrict(c.lat, c.lng));
        let found = "Current GPS location";
        try {
          const r = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${c.lat}&lon=${c.lng}`,
          );
          if (r.ok) {
            const d = await r.json();
            found = d.display_name || found;
            setDistrict(districtFromAddress(d.address) ?? nearestJharkhandDistrict(c.lat, c.lng));
          }
        } catch {
          setDistrict(nearestJharkhandDistrict(c.lat, c.lng));
        }
        setAddress(found);
        setLocating(false);
        toast.success("GPS location detected");
      },
      (e) => {
        setLocating(false);
        const m =
          e.code === 1
            ? "GPS permission denied"
            : e.code === 2
              ? "Location unavailable"
              : "Location request timed out";
        toast.error(m);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    );
  }
  function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) {
      toast.error("File must be smaller than 10 MB");
      return;
    }
    setFile({
      name: f.name,
      type: f.type || "Document",
      size: f.size,
      url: URL.createObjectURL(f),
    });
    toast.success("File added");
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (title.length < 5 || description.length < 20 || !coords || !urgency || !ranking) {
      toast.error(
        !coords ? "Select or detect a location" : "Complete the required problem details",
      );
      return;
    }
    const p: Problem = {
      id: `JS${1030 + state.problems.length}`,
      title,
      description,
      category,
      district,
      priority: urgency.level,
      status: "Under AI Analysis",
      lat: coords.lat,
      lng: coords.lng,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      population: 850,
      support: 1,
      sdg: sdg.number,
      sdgTitle: sdg.title,
      sdgScore: sdg.score,
      aiExplanation: urgency.explanation,
      duplicate: duplicate ? `${duplicate.score}% similar to ${duplicate.p.id}` : undefined,
      image: file?.url,
    };
    addProblem(p);
    toast.success("Problem submitted successfully");
    void nav({ to: "/citizen" as any });
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <span className="eyebrow">Citizen service</span>
      <h1 className="mt-2 text-3xl font-bold">{t.reportProblem}</h1>
      <p className="mt-2 text-muted-foreground">{t.reportIntro}</p>
      <form onSubmit={submit} className="mt-7 space-y-5">
        <Section title={`1. ${t.problemDetails}`}>
          <div className="space-y-4">
            <label className="label">
              {t.title}
              <input
                className="field mt-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                minLength={5}
              />
            </label>
            <label className="label">
              {t.description}
              <textarea
                className="field mt-2 min-h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                minLength={20}
              />
            </label>
            <label className="label">
              {t.category}
              <select
                className="field mt-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {state.language === "hi" ? categoryHindi[c] : c}
                  </option>
                ))}
              </select>
            </label>
            <label className="label">
              {t.district}
              <select
                className="field mt-2"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                {districts.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
            <label className="label">
              {t.contactOptional}
              <input
                className="field mt-2"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Phone or email"
              />
            </label>
            {urgency && (
              <div className="rounded-md border border-border bg-muted/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong>{t.aiUrgency}</strong>
                  <Badge
                    tone={
                      urgency.level === "Critical"
                        ? "red"
                        : urgency.level === "Complex"
                          ? "amber"
                          : "green"
                    }
                  >
                    {state.language === "hi"
                      ? t[urgency.level.toLowerCase() as "critical" | "complex" | "routine"]
                      : urgency.level}
                  </Badge>
                </div>
                <div className="mt-3 h-3 rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${urgency.level === "Critical" ? "bg-destructive" : urgency.level === "Complex" ? "bg-warning" : "bg-success"}`}
                    style={{ width: `${urgency.score}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {urgency.score}/100 · {urgency.explanation}
                </p>
              </div>
            )}
            {categoryAnalysis && (
              <div className="rounded-md border border-success bg-secondary p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong>{t.aiCategory}</strong>
                  <Badge tone="green">
                    {categoryAnalysis.confidence}% {t.confidence}
                  </Badge>
                </div>
                <p className="mt-2 text-lg font-bold">
                  {state.language === "hi"
                    ? categoryHindi[categoryAnalysis.category]
                    : categoryAnalysis.category}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{categoryAnalysis.reason}</p>
                {category !== categoryAnalysis.category && (
                  <AppButton
                    type="button"
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={() => setCategory(categoryAnalysis.category)}
                  >
                    {t.useSuggestion}
                  </AppButton>
                )}
              </div>
            )}
          </div>
        </Section>
        <Section
          title={`2. ${t.location}`}
          subtitle="Use real browser GPS or tap the map to select manually."
        >
          <div className="grid gap-3">
            <AppButton type="button" onClick={gps} disabled={locating} className="w-full">
              <LocateFixed />
              {locating ? t.detecting : t.useLocation}
            </AppButton>
            <div className="rounded-md bg-muted p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-muted-foreground">{t.latitude}</span>
                  <p className="font-mono font-bold">{coords?.lat.toFixed(6) || t.notSet}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">{t.longitude}</span>
                  <p className="font-mono font-bold">{coords?.lng.toFixed(6) || t.notSet}</p>
                </div>
              </div>
              {address && (
                <p className="mt-3 text-sm">
                  <MapPin className="mr-1 inline" size={15} />
                  {address}
                </p>
              )}
            </div>
            <p className="text-sm font-semibold">{t.manualLocation}: tap anywhere below</p>
            <MapView problems={[]} selected={coords} onSelect={setManual} />
          </div>
        </Section>
        <Section title={`3. ${t.addPhoto}`} subtitle="JPG, PNG, WEBP or PDF up to 10 MB.">
          <div className="grid gap-3 sm:grid-cols-2">
            <AppButton type="button" onClick={() => setCamera(true)}>
              <Camera />
              {t.openCamera}
            </AppButton>
            <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-4 font-semibold">
              <FileUp />
              {t.upload}
              <input
                type="file"
                className="sr-only"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                onChange={upload}
              />
            </label>
          </div>
          {file && (
            <div className="mt-4 rounded-md border border-border p-3">
              {file.type.startsWith("image/") && (
                <img
                  src={file.url}
                  alt="Uploaded evidence preview"
                  className="mb-3 max-h-56 w-full rounded-md object-cover"
                />
              )}
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.type} · {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  aria-label={t.removeFile}
                  className="grid size-11 place-items-center rounded-md hover:bg-muted"
                  onClick={() => setFile(null)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          )}
        </Section>
        <Section title={`4. ${t.aiAnalysis}`}>
          <div className="space-y-4">
            {urgency ? (
              <>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    tone={
                      urgency.level === "Critical"
                        ? "red"
                        : urgency.level === "Complex"
                          ? "amber"
                          : "green"
                    }
                  >
                    {state.language === "hi"
                      ? t[urgency.level.toLowerCase() as "critical" | "complex" | "routine"]
                      : urgency.level}
                  </Badge>
                  <span className="font-bold">AI score {urgency.score}/100</span>
                </div>
                <p className="text-sm text-muted-foreground">{urgency.explanation}</p>
                {duplicate && (
                  <div className="rounded-md border border-warning bg-warning-soft p-3 text-sm">
                    <strong>
                      {state.language === "hi"
                        ? "संभावित डुप्लिकेट मिला"
                        : "Possible duplicate detected"}
                    </strong>
                    <p>
                      {duplicate.score}% similar to “{duplicate.p.title}” in {duplicate.p.district}.
                    </p>
                  </div>
                )}
                <div className="rounded-md bg-secondary p-4">
                  <strong>
                    SDG {sdg.number} — {sdg.title}
                  </strong>
                  <p className="mt-1 text-sm">
                    Alignment: {sdg.score}% · {sdg.reason}
                  </p>
                </div>
                {ranking && (
                  <div>
                    <div className="flex justify-between font-bold">
                      <span>{t.hybridScore}</span>
                      <span>{ranking.score}/100</span>
                    </div>
                    <div className="mt-2 h-3 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${ranking.score}%` }}
                      />
                    </div>
                    <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                      <span>AI urgency 30%</span>
                      <span>Affected population 20%</span>
                      <span>Hotspot severity 15%</span>
                      <span>Community support 20%</span>
                      <span>SDG alignment 15%</span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                <WandSparkles className="mr-2 inline" />
                {t.enterAnalysis}
              </p>
            )}
          </div>
        </Section>
        <AppButton type="submit" className="w-full text-base">
          {t.submit}
        </AppButton>
      </form>
      <CameraModal
        open={camera}
        onClose={() => setCamera(false)}
        onUse={(url) =>
          setFile({
            name: "camera-capture.jpg",
            type: "image/jpeg",
            size: Math.round(url.length * 0.75),
            url,
          })
        }
      />
    </main>
  );
}
