import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useApp } from "@/app/AppContext";
import type { Role } from "@/app/types";

export function RoleGuard({ role, children }: { role: Role; children: ReactNode }) {
  const { state } = useApp();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!state.user) {
      toast.error(
        state.language === "hi"
          ? "कृपया इस कार्यक्षेत्र तक पहुंचने के लिए लॉगिन करें"
          : "Please sign in to access this workspace",
      );
      void navigate({ to: "/login", replace: true });
      return;
    }
    if (state.user.role !== role) {
      toast.info(
        state.language === "hi"
          ? `आपके अधिकृत कार्यक्षेत्र (${state.user.role}) पर भेजा जा रहा है`
          : `Redirecting to your authorized workspace (${state.user.role})`,
      );
      void navigate({ to: `/${state.user.role}` as any, replace: true });
    }
  }, [mounted, state.user, state.language, role, navigate]);

  if (!mounted || !state.user || state.user.role !== role) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">
            {state.language === "hi"
              ? "हितधारक प्राधिकरण का सत्यापन हो रहा है..."
              : "Verifying stakeholder authorization..."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
