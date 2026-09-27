import type { Solution } from "@/data/seed";

export const lifecycleStages = [
  "Planning",
  "Development",
  "Testing",
  "Pilot",
  "Implementation",
] as const;

const byStatus: Record<string, number[]> = {
  "Under Review": [100, 35, 10, 0, 0],
  "Changes Requested": [100, 25, 5, 0, 0],
  Approved: [100, 80, 55, 25, 8],
  "Industry Partnership": [100, 100, 80, 55, 28],
  Implemented: [100, 100, 100, 100, 100],
  Rejected: [100, 15, 0, 0, 0],
};

export function stageProgress(solution: Solution) {
  const base = byStatus[solution.status] ?? [100, 45, 20, 5, 0];
  const boost =
    (solution.partnership?.startsWith("Accepted") ? 10 : 0) +
    (solution.funding && solution.funding.startsWith("Funded") ? 8 : 0);
  return lifecycleStages.map((stage, i) => ({
    stage,
    percent: Math.min(100, Math.round((base[i] ?? 0) + (i > 0 ? boost : 0))),
  }));
}

export function overallProgress(solution: Solution) {
  const stages = stageProgress(solution);
  return Math.round(stages.reduce((a, s) => a + s.percent, 0) / stages.length);
}

export const guidanceStages = [
  "Concept Review",
  "Technical Guidance",
  "Testing Support",
  "Deployment Readiness",
] as const;

export function guidanceLevels(solution: Solution) {
  const seed = solution.success || 70;
  return guidanceStages.map((stage, i) => ({
    stage,
    percent: Math.max(15, Math.min(100, Math.round(seed - i * 16))),
  }));
}
