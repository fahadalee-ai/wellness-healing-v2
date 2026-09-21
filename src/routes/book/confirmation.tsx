import { createFileRoute } from "@tanstack/react-router";
import { LinkButton, SuccessState } from "@/components/kit";
import { googleCalendarUrl } from "@/lib/booking";
import { formatDateLong, formatTime } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/book/confirmation")({
  head: () => ({ meta: [{ title: "You're All Set — Wellness & Healing SF" }] }),
  component: ConfirmationScreen,
});

function ConfirmationScreen() {
  const { sessions, lastBookedSessionId } = useApp();
  const latest =
    sessions.find((s) => s.id === lastBookedSessionId) ??
    sessions.find((s) => s.status === "upcoming");
  const calendarHref = latest
    ? googleCalendarUrl({
        title: "Session with Jackie",
        date: latest.date,
        time: latest.time,
        durationMin: latest.durationMin,
      })
    : undefined;

  return (
    <div className="min-h-dvh bg-background px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))]">
      <SuccessState
        heading="You're All Set"
        subtext={
          latest
            ? `Your session with Jackie is confirmed for ${formatDateLong(latest.date)} at ${formatTime(latest.time)}`
            : "Your session with Jackie is confirmed."
        }
      >
        <div className="border border-border bg-card p-4 text-left text-sm leading-relaxed text-muted-foreground">
          Zoom link will be sent to your email 24 hours before your session.
          {calendarHref && (
            <a
              className="mt-3 block min-h-12 text-[12px] uppercase tracking-[0.14em] text-primary"
              href={calendarHref}
              target="_blank"
              rel="noreferrer"
            >
              Add to Calendar
            </a>
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <LinkButton to="/sessions" variant="soft">
            View Details
          </LinkButton>
          <LinkButton to="/book" variant="outline">
            Book Another
          </LinkButton>
        </div>
        <LinkButton to="/home" className="mt-3" full>
          Back to Home
        </LinkButton>
      </SuccessState>
    </div>
  );
}
