import { createFileRoute } from "@tanstack/react-router";
import { HowItWorks } from "@/components/PublicPages";
export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "JanSetu User Guide" },
      {
        name: "description",
        content: "Learn how to report and track a community problem in JanSetu.",
      },
      { property: "og:title", content: "JanSetu User Guide" },
      {
        property: "og:description",
        content: "A practical guide from citizen report to verified community impact.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});
