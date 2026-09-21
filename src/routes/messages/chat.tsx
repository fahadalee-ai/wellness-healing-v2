import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/messages/chat")({
  beforeLoad: () => {
    throw redirect({ to: "/messages/$threadId", params: { threadId: "jackie" } });
  },
  component: () => null,
});
