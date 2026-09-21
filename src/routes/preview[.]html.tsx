import { createFileRoute } from "@tanstack/react-router";
import { PhonePreview } from "@/components/PhonePreview";

export const Route = createFileRoute("/preview.html")({
  head: () => ({ meta: [{ title: "Preview — Wellness & Healing SF" }] }),
  component: PhonePreview,
});
