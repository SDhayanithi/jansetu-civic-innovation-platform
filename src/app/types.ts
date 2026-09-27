import type { Problem, Solution } from "@/data/seed";
export type Role = "citizen" | "government" | "university" | "industry";
export type AppState = {
  problems: Problem[];
  solutions: Solution[];
  notifications: string[];
  user: { name: string; role: Role } | null;
  language: "en" | "hi";
};
