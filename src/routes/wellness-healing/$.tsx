import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/wellness-healing/$")({
  beforeLoad: ({ params }) => {
    const rest = (params as { _splat?: string })._splat?.replace(/^\/+/, "") ?? "";
    if (rest.toLowerCase().includes("preview")) {
      throw redirect({ to: "/preview.html" });
    }
    throw redirect({ to: `/${rest}` as "/" });
  },
  component: () => null,
});
