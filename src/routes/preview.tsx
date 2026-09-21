import { createFileRoute } from "@tanstack/react-router";
import { PhonePreview } from "@/components/PhonePreview";

export const Route = createFileRoute("/preview")({
  head: () => ({ meta: [{ title: "Preview — Wellness & Healing SF" }] }),
  component: PhonePreview,
});
