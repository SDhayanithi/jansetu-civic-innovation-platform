import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/Dashboards";
import { RoleGuard } from "@/components/RoleGuard";

export const Route = createFileRoute("/industry")({
  head: () => ({
    meta: [
      { title: "Industry Workspace — JanSetu" },
      {
        name: "description",
        content: "Industry partnerships, mentorship, seed funding, and CSR deployment in JanSetu.",
      },
      { property: "og:title", content: "Industry Workspace — JanSetu" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => (
    <RoleGuard role="industry">
      <Dashboard role="industry" />
    </RoleGuard>
  ),
});
