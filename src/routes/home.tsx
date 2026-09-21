import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bell, BookOpen, CalendarPlus, CreditCard, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button, Card, JoinZoomButton, LinkButton, PageDots, Screen, SectionTitle, Stars } from "@/components/kit";
import { resumeBookingTo } from "@/lib/booking";
import { PHOTOS } from "@/lib/images";
import {
  canJoinZoom,
  firstName,
  formatDate,
  formatTime,
  greeting,
  PILLARS,
  RESOURCES,
  SERVICES,
  TESTIMONIALS,
} from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home — Wellness & Healing SF" }] }),
  component: HomeScreen,
});

const QUICK = [
  { to: "/book", label: "Book Session", icon: CalendarPlus },
  { to: "/subscription", label: "My Subscription", icon: CreditCard },
  { to: "/messages", label: "Messages", icon: MessageCircle },
  { to: "/resources", label: "Resources", icon: BookOpen },
] as const;

function HomeScreen() {
  const { user, sessions, notifications, draft, setDraft } = useApp();
  const navigate = useNavigate();
  const name = firstName(user?.fullName ?? "there");
  const upcoming = sessions.find((s) => s.status === "upcoming");
  const unread = notifications.some((n) => !n.read);
  const [quote, setQuote] = useState(0);

  return (
    <Screen tabPad className="pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-[1.35rem] leading-tight text-foreground">
            {greeting()}, {name}
          </p>
          <p className="mt-1 text-sm text-cream">Here’s your space to grow</p>
        </div>
        <Link
          to="/notifications"
          aria-label="Notifications"
          className="relative flex h-12 w-12 shrink-0 items-center justify-center border border-white text-white"
        >
          <Bell size={20} strokeWidth={1.75} />
          {unread && <span className="absolute right-2 top-2 h-1.5 w-1.5 bg-primary" />}
        </Link>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-[4px]">
        <img src={PHOTOS.heroInterior} alt="Woman seated on a sunroom window ledge" className="h-52 w-full object-cover" />
        <div className="absolute inset-0 bg-[#141312]/55" />
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <h2 className="font-display text-xl leading-snug text-cream">
            A Path Toward Healing, Clarity & Transformation
          </h2>
          <Button className="mt-4 w-auto self-start px-6" onClick={() => navigate({ to: "/book" })}>
            Book a Session
          </Button>
        </div>
      </div>

      {user && !user.intakeComplete && (
        <Card className="mt-5" onClick={() => navigate({ to: "/intake" })}>
          <p className="text-[11px] uppercase tracking-[0.16em] text-primary">A few questions remain</p>
          <p className="mt-2 font-display text-xl">Continue when you’re ready</p>
          <p className="mt-1 text-sm text-muted-foreground">Your answers are saved. Nothing here is required to book.</p>
        </Card>
      )}

      {(draft.serviceId || draft.date || draft.time) && (
        <Card className="mt-5" onClick={() => navigate(resumeBookingTo(draft))}>
          <p className="text-[11px] uppercase tracking-[0.16em] text-primary">Continue your booking</p>
          <p className="mt-2 font-display text-xl">You left a session in progress</p>
          <p className="mt-1 text-sm text-muted-foreground">Pick up where you paused — nothing is booked yet.</p>
        </Card>
      )}

      {upcoming && (
        <Card className="mt-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Upcoming session</p>
          <p className="mt-2 font-display text-xl">{upcoming.focus ?? "Wellness Session"}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            with {upcoming.coachName} · {formatDate(upcoming.date)} at {formatTime(upcoming.time)}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <JoinZoomButton
              date={upcoming.date}
              time={upcoming.time}
              durationMin={upcoming.durationMin}
              href={upcoming.zoomUrl}
            />
            <Link
              to="/sessions/reschedule"
              search={{ id: upcoming.id }}
              className="inline-flex min-h-12 items-center justify-center border border-white bg-transparent text-[12px] font-medium uppercase tracking-[0.16em] text-white"
            >
              Reschedule
            </Link>
          </div>
          {!canJoinZoom(upcoming.date, upcoming.time, upcoming.durationMin) && (
            <p className="mt-3 text-xs leading-relaxed text-cream">
              Join Zoom opens 15 minutes before your session.
            </p>
          )}
        </Card>
      )}

      <div className="mt-6 flex gap-3 overflow-x-auto no-scrollbar">
        {QUICK.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex min-w-[6.4rem] flex-col items-center gap-2 border border-border bg-card px-3 py-4 text-center"
          >
            <item.icon size={18} className="text-primary" strokeWidth={1.6} />
            <span className="text-[11px] leading-tight text-cream">{item.label}</span>
          </Link>
        ))}
      </div>

      <SectionTitle>Choose the Support That Fits You</SectionTitle>
      <div className="space-y-2">
        {SERVICES.map((service) => (
          <Card
            key={service.id}
            onClick={() => {
              setDraft({ serviceId: service.id, durationMin: service.durationMin });
              navigate({ to: "/book" });
            }}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-foreground">{service.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{service.blurb}</p>
            </div>
            <span className="ml-3 shrink-0 bg-primary px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-primary-foreground">
              Book Now
            </span>
          </Card>
        ))}
      </div>

      <SectionTitle>Coaching for Where Life Meets Change</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {PILLARS.map((p) => (
          <Card key={p.title} className="overflow-hidden p-0">
            <img src={p.image} alt={p.title} className="h-28 w-full object-cover" />
            <div className="p-3">
              <p className="text-sm font-medium text-foreground">{p.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{p.blurb}</p>
            </div>
          </Card>
        ))}
      </div>

      <SectionTitle>From those who’ve sat here</SectionTitle>
      <div
        className="overflow-hidden"
        onTouchStart={(e) => {
          const x = e.changedTouches[0].clientX;
          const handler = (ev: TouchEvent) => {
            const dx = ev.changedTouches[0].clientX - x;
            if (dx < -30) setQuote((q) => (q + 1) % TESTIMONIALS.length);
            if (dx > 30) setQuote((q) => (q - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
            document.removeEventListener("touchend", handler);
          };
          document.addEventListener("touchend", handler);
        }}
      >
        <Card>
          <div className="flex items-center gap-3">
            <img src={TESTIMONIALS[quote].photo} alt={TESTIMONIALS[quote].name} className="h-12 w-12 object-cover" />
            <div>
              <p className="text-sm font-medium">{TESTIMONIALS[quote].name}</p>
              <Stars rating={TESTIMONIALS[quote].rating} />
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-cream/90">“{TESTIMONIALS[quote].quote}”</p>
        </Card>
        <PageDots count={TESTIMONIALS.length} index={quote} onChange={setQuote} label="Testimonial" />
      </div>

      <SectionTitle
        action={
          <Link to="/resources" className="text-[11px] uppercase tracking-[0.14em] text-primary">
            See all
          </Link>
        }
      >
        For the days in between
      </SectionTitle>
      <div className="space-y-2">
        {RESOURCES.slice(0, 2).map((item) => (
          <Link key={item.id} to="/resources/$resourceId" params={{ resourceId: item.id }}>
            <Card className="flex gap-3 overflow-hidden p-0">
              <img src={item.image} alt={item.alt} className="h-24 w-24 object-cover" />
              <div className="min-w-0 flex-1 py-3 pr-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-primary">{item.category}</p>
                <p className="mt-1 font-medium">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.excerpt}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <LinkButton to="/book" full className="mt-8">
        Book a Session
      </LinkButton>
    </Screen>
  );
}
