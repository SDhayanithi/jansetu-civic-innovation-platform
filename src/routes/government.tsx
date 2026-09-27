import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/Dashboards";
import { RoleGuard } from "@/components/RoleGuard";

export const Route = createFileRoute("/government")({
  head: () => ({
    meta: [
      { title: "Government Workspace — JanSetu" },
      {
        name: "description",
        content: "Government department verification, priority management, review of solutions, and implementation tracking in JanSetu.",
      },
      { property: "og:title", content: "Government Workspace — JanSetu" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => (
    <RoleGuard role="government">
      <Dashboard role="government" />
    </RoleGuard>
  ),
});
