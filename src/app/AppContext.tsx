import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AppState, Role } from "./types";
import type { Problem, Solution } from "@/data/seed";
import { initialState, loadState, saveState } from "@/services/demoStore";
type Ctx = {
  state: AppState;
  setLanguage: (l: "en" | "hi") => void;
  login: (name: string, role: Role) => void;
  logout: () => void;
  addProblem: (p: Problem) => void;
  updateProblem: (id: string, patch: Partial<Problem>) => void;
  addSolution: (s: Solution) => void;
  updateSolution: (id: string, patch: Partial<Solution>) => void;
  notify: (m: string) => void;
};
const Context = createContext<Ctx | undefined>(undefined);
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState());
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setState(loadState());
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) saveState(state);
  }, [state, loaded]);
  const mutate = (fn: (s: AppState) => AppState) => setState(fn);
  return (
    <Context.Provider
      value={{
        state,
        setLanguage: (language) => {
          if (typeof window !== "undefined") {
            try {
              window.localStorage.setItem("jansetu-language", language);
            } catch {}
          }
          mutate((s) => ({ ...s, language }));
        },
        login: (name, role) => mutate((s) => ({ ...s, user: { name, role } })),
        logout: () => {
          mutate((s) => {
            const next = { ...s, user: null };
            saveState(next);
            return next;
          });
        },
        addProblem: (p) =>
          mutate((s) => ({
            ...s,
            problems: [p, ...s.problems],
            notifications: [`Problem ${p.id} submitted`, ...s.notifications],
          })),
        updateProblem: (id, patch) =>
          mutate((s) => ({
            ...s,
            problems: s.problems.map((p) => (p.id === id ? { ...p, ...patch } : p)),
          })),
        addSolution: (solution) =>
          mutate((s) => ({
            ...s,
            solutions: [solution, ...s.solutions],
            notifications: [`Solution ${solution.id} submitted`, ...s.notifications],
          })),
        updateSolution: (id, patch) =>
          mutate((s) => ({
            ...s,
            solutions: s.solutions.map((x) => (x.id === id ? { ...x, ...patch } : x)),
          })),
        notify: (m) => mutate((s) => ({ ...s, notifications: [m, ...s.notifications] })),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useApp() {
  const c = useContext(Context);
  if (!c) throw new Error("useApp must be inside AppProvider");
  return c;
}
