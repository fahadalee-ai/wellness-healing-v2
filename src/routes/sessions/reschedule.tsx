import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { DatePicker, TimeSlotPicker } from "@/components/booking";
import { Button, FadeIn, Header, Screen } from "@/components/kit";
import { formatDate, formatTime } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

type Search = { id?: string };

export const Route = createFileRoute("/sessions/reschedule")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    id: typeof search.id === "string" ? search.id : undefined,
  }),
  head: () => ({ meta: [{ title: "Reschedule — Wellness & Healing SF" }] }),
  component: RescheduleScreen,
});

function RescheduleScreen() {
  const { id } = Route.useSearch();
  const { sessions, rescheduleSession } = useApp();
  const navigate = useNavigate();
  const session = sessions.find((s) => s.id === id);
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();

  if (!session) {
    return (
      <Screen className="pt-0">
        <Header title="Reschedule Your Session" fallbackTo="/sessions" />
        <p className="text-sm text-muted-foreground">We couldn’t find that session.</p>
      </Screen>
    );
  }

  return (
    <Screen className="pt-0">
      <Header title="Reschedule Your Session" fallbackTo="/sessions" />
      <FadeIn>
        <div className="mb-5 border border-border bg-card px-4 py-3 text-sm">
          <p className="text-muted-foreground line-through">
            {formatDate(session.date)} at {formatTime(session.time)}
          </p>
          <p className="mt-1 text-foreground">Choose a new time that feels right.</p>
        </div>
        <DatePicker value={date} onChange={(next) => { setDate(next); setTime(undefined); }} />
        {date && (
          <div className="mt-8">
            <TimeSlotPicker
              date={date}
              value={time}
              durationMin={session.durationMin}
              onChange={setTime}
            />
          </div>
        )}
        <Button
          className="mt-8"
          full
          disabled={!date || !time}
          onClick={() => {
            if (!date || !time) return;
            rescheduleSession(session.id, date, time);
            navigate({ to: "/sessions" });
          }}
        >
          Confirm New Time
        </Button>
      </FadeIn>
    </Screen>
  );
}
