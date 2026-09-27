import type { AppState } from "@/app/types";
import { seedProblems,seedSolutions } from "@/data/seed";
const KEY = "jansetu-demo-v2";
const LANG_KEY = "jansetu-language";

export function initialState(): AppState {
  let lang: "en" | "hi" = "en";
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(LANG_KEY);
      if (stored === "en" || stored === "hi") {
        lang = stored;
      }
    } catch {}
  }
  return {
    problems: seedProblems,
    solutions: seedSolutions,
    notifications: [
      "Problem JS1023 was verified",
      "A university team submitted SOL201",
      "Pilot milestone updated",
    ],
    user: null,
    language: lang,
  };
}

export function loadState(): AppState {
  if (typeof window === "undefined") return initialState();
  try {
    const raw = window.localStorage.getItem(KEY);
    const state: AppState = raw ? JSON.parse(raw) : initialState();
    const storedLang = window.localStorage.getItem(LANG_KEY);
    if (storedLang === "en" || storedLang === "hi") {
      state.language = storedLang;
    }
    return state;
  } catch {
    return initialState();
  }
}

export function saveState(state: AppState) {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
      window.localStorage.setItem(LANG_KEY, state.language);
    } catch (e) {
      console.error(e);
    }
  }
}

