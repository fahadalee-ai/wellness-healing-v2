import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BottomSheet, Button, Card, Empty, Header, JoinZoomButton, LinkButton, Screen, Stars } from "@/components/kit";
import { isWithinCancelWindow } from "@/lib/booking";
import {
  canJoinZoom,
  formatDate,
  formatTime,
  serviceById,
  type CoachingSession,
} from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sessions")({
  head: () => ({ meta: [{ title: "My Sessions — Wellness & Healing SF" }] }),
  component: SessionsScreen,
});

const TABS = ["Upcoming", "Past", "Cancelled"] as const;

function SessionsScreen() {
  const { sessions, cancelSession, addReview } = useApp();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Upcoming");
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const key = tab.toLowerCase() as CoachingSession["status"];
  const list = sessions.filter((s) => s.status === key);
  const hasPast = sessions.some((s) => s.status === "past");
  const cancelTarget = sessions.find((s) => s.id === cancelId);
  const lateCancel = cancelTarget ? isWithinCancelWindow(cancelTarget.date, cancelTarget.time) : false;

  return (
    <Screen tabPad className="pt-0">
      <Header title="My Sessions" back={false} />
      <div className="mb-5 grid grid-cols-3 border border-border">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "min-h-12 text-[11px] uppercase tracking-[0.12em]",
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <Empty
          title={tab === "Upcoming" ? "No upcoming sessions yet" : `No ${tab.toLowerCase()} sessions`}
          body={tab === "Upcoming" ? "When you’re ready, we can find a time that feels unhurried." : undefined}
          action={
            tab === "Upcoming" ? (
              <LinkButton to="/book" full>
                {hasPast ? "Book a Session" : "Book Your First Session"}
              </LinkButton>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-3">
          {list.map((session) => {
            const service = serviceById(session.serviceId);
            return (
              <Card key={session.id}>
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {formatDate(session.date)} · {formatTime(session.time)}
                </p>
                <p className="mt-1 font-display text-xl">{session.focus ?? service.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  with {session.coachName} · {session.durationMin} min
                </p>

                {session.status === "upcoming" && (
                  <>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <JoinZoomButton
                        className="flex-1"
                        date={session.date}
                        time={session.time}
                        durationMin={session.durationMin}
                        href={session.zoomUrl}
                      />
                      <Link
                        to="/sessions/reschedule"
                        search={{ id: session.id }}
                        className="inline-flex min-h-12 items-center px-3 text-[12px] uppercase tracking-[0.14em] text-primary"
                      >
                        Reschedule
                      </Link>
                      <button
                        type="button"
                        onClick={() => setCancelId(session.id)}
                        className="inline-flex min-h-12 items-center px-3 text-[12px] uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                    {!canJoinZoom(session.date, session.time, session.durationMin) && (
                      <p className="mt-3 text-xs leading-relaxed text-cream">
                        Join Zoom opens 15 minutes before your session.
                      </p>
                    )}
                  </>
                )}

                {session.status === "past" && (
                  <div className="mt-4 flex gap-2">
                    <LinkButton to="/book" variant="outline" className="flex-1">
                      Book Again
                    </LinkButton>
                    {!session.review ? (
                      <button
                        type="button"
                        onClick={() => {
                          setReviewId(session.id);
                          setRating(5);
                          setReviewText("");
                        }}
                        className="min-h-12 px-3 text-[12px] uppercase tracking-[0.14em] text-primary"
                      >
                        Leave a Review
                      </button>
                    ) : (
                      <span className="flex items-center">
                        <Stars rating={session.review.rating} />
                      </span>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}

      <LinkButton to="/home" variant="soft" full className="mt-6">
        Back to Home
      </LinkButton>

      <BottomSheet open={!!cancelId} onClose={() => setCancelId(null)} title="Cancel This Session?">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {lateCancel
            ? "This is inside 24 hours. You can still cancel, but a plan session will not be returned."
            : "Cancelled with more than 24 hours’ notice, a covered plan session returns to this month. If you need to shift the time, rescheduling is often gentler."}
        </p>
        <div className="mt-6 space-y-2">
          <Button full variant="outline" onClick={() => setCancelId(null)}>
            Keep Session
          </Button>
          <Button
            full
            variant="danger"
            onClick={() => {
              if (cancelId) cancelSession(cancelId);
              setCancelId(null);
            }}
          >
            Cancel Session
          </Button>
        </div>
      </BottomSheet>

      <BottomSheet open={!!reviewId} onClose={() => setReviewId(null)} title="Leave a Review">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className={cn("h-11 w-11", n <= rating ? "bg-primary" : "bg-muted")}
              aria-label={`${n} stars`}
            />
          ))}
        </div>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Optional notes"
          className="mt-4 min-h-24 w-full border border-border bg-background px-3 py-3 text-sm outline-none"
        />
        <Button
          className="mt-4"
          full
          onClick={() => {
            if (reviewId) addReview(reviewId, rating, reviewText);
            setReviewId(null);
          }}
        >
          Submit Review
        </Button>
      </BottomSheet>
    </Screen>
  );
}
