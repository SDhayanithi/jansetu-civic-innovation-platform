import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/Dashboards";
import { RoleGuard } from "@/components/RoleGuard";

export const Route = createFileRoute("/university")({
  head: () => ({
    meta: [
      { title: "University Workspace — JanSetu" },
      {
        name: "description",
        content: "University student/faculty problem discovery, solution proposals, and project progress in JanSetu.",
      },
      { property: "og:title", content: "University Workspace — JanSetu" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => (
    <RoleGuard role="university">
      <Dashboard role="university" />
    </RoleGuard>
  ),
});
