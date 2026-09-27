import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/Dashboards";
import { RoleGuard } from "@/components/RoleGuard";

export const Route = createFileRoute("/citizen")({
  head: () => ({
    meta: [
      { title: "Citizen Workspace — JanSetu" },
      {
        name: "description",
        content: "Citizen problem reporting, status tracking, and community challenges in JanSetu.",
      },
      { property: "og:title", content: "Citizen Workspace — JanSetu" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => (
    <RoleGuard role="citizen">
      <Dashboard role="citizen" />
    </RoleGuard>
  ),
});
