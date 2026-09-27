export type Urgency = "Critical" | "Complex" | "Routine";
export function analyzeUrgency(description: string): {
  level: Urgency;
  score: number;
  explanation: string;
} {
  const text = description.toLowerCase();
  const critical = [
    "drinking water",
    "dirty water",
    "contaminated",
    "hospital",
    "emergency",
    "death",
    "unsafe",
    "flood",
    "पेयजल",
    "गंदा पानी",
    "अस्पताल",
    "आपात",
    "बाढ़",
  ];
  const complex = [
    "pipeline",
    "bridge",
    "road",
    "infrastructure",
    "irrigation",
    "school building",
    "पाइपलाइन",
    "पुल",
    "सड़क",
    "सिंचाई",
    "भवन",
  ];
  const criticalHits = critical.filter((k) => text.includes(k)).length;
  const complexHits = complex.filter((k) => text.includes(k)).length;
  if (criticalHits > 0)
    return {
      level: "Critical",
      score: 92,
      explanation:
        "High priority because the issue may threaten health, safety, or essential services for residents.",
    };
  if (complexHits > 0)
    return {
      level: "Complex",
      score: 68,
      explanation:
        "Medium priority because the issue requires coordinated infrastructure or institutional intervention.",
    };
  return {
    level: "Routine",
    score: 42,
    explanation:
      "Lower immediate priority, with a localized impact that can be handled through routine civic action.",
  };
}
const words = (s: string) =>
  new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9\u0900-\u097f ]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2),
  );
export function similarity(a: string, b: string) {
  const x = words(a),
    y = words(b);
  const common = [...x].filter((w) => y.has(w)).length;
  return Math.round((common / Math.max(1, new Set([...x, ...y]).size)) * 100);
}
const categoryRules = {
  Water: ["water", "pipeline", "tap", "drain", "sewage", "पानी", "जल", "नाली"],
  Healthcare: [
    "health",
    "hospital",
    "medicine",
    "doctor",
    "clinic",
    "ambulance",
    "स्वास्थ्य",
    "अस्पताल",
    "दवा",
  ],
  Education: [
    "school",
    "teacher",
    "classroom",
    "student",
    "education",
    "स्कूल",
    "शिक्षक",
    "शिक्षा",
  ],
  Agriculture: ["farm", "crop", "irrigation", "canal", "farmer", "सिंचाई", "कृषि", "किसान"],
  Environment: ["forest", "waste", "garbage", "pollution", "smoke", "कचरा", "प्रदूषण", "पर्यावरण"],
  Infrastructure: ["road", "bridge", "streetlight", "building", "pothole", "सड़क", "पुल", "बिजली"],
} as const;
export function categorizeProblem(text: string) {
  const t = text.toLowerCase();
  const ranked = Object.entries(categoryRules)
    .map(([category, words]) => ({
      category,
      hits: words.filter((word) => t.includes(word)).length,
    }))
    .sort((a, b) => b.hits - a.hits);
  const best = ranked[0];
  if (!best || best.hits === 0)
    return {
      category: "Infrastructure",
      confidence: 55,
      reason: "No strong service keyword was found, so general infrastructure is suggested.",
    };
  return {
    category: best.category,
    confidence: Math.min(98, 72 + (best.hits - 1) * 9),
    reason: `Matched ${best.hits} civic service keyword${best.hits === 1 ? "" : "s"} in the report.`,
  };
}
export function detectCategory(text: string) {
  return categorizeProblem(text).category;
}
