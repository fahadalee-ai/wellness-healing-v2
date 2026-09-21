import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/wellness-healing/")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
