import {
  money,
  type BookingDraft,
  type ServiceId,
  type Subscription,
} from "./mock-data";

export function remainingPlanSessions(sub: Subscription | null) {
  if (!sub) return 0;
  return Math.max(0, sub.sessionsIncluded - sub.sessionsUsed);
}

export function planIncludesGroups(planId?: string) {
  return planId === "transformation";
}

export function sessionCoveredByPlan(sub: Subscription | null, serviceId?: ServiceId) {
  if (!sub || sub.status !== "active" || !serviceId) return false;
  if (serviceId === "one-on-one") return remainingPlanSessions(sub) > 0;
  return planIncludesGroups(sub.planId);
}

export function coverageLabel(sub: Subscription | null, serviceId: ServiceId, price: number) {
  if (sessionCoveredByPlan(sub, serviceId)) {
    if (serviceId === "one-on-one") {
      const left = remainingPlanSessions(sub);
      return `Included in Subscription · ${left} left this month`;
    }
    return "Included with Transformation";
  }
  if (sub?.status === "active" && serviceId === "one-on-one") {
    return `${money(price)} / session · plan sessions used`;
  }
  return `${money(price)} / session`;
}

export type BookResume =
  | { to: "/book" }
  | { to: "/book/focus" }
  | { to: "/book/date" }
  | { to: "/book/time" }
  | { to: "/book/notes" }
  | { to: "/book/review" };

export function resumeBookingTo(draft: BookingDraft): BookResume {
  if (!draft.serviceId) return { to: "/book" };
  if (draft.serviceId === "one-on-one" && !draft.focus) return { to: "/book/focus" };
  if (!draft.date) return { to: "/book/date" };
  if (!draft.time) return { to: "/book/time" };
  if (draft.notes === undefined && draft.firstSession === undefined) return { to: "/book/notes" };
  return { to: "/book/review" };
}

export function hoursUntilSession(date: string, time: string) {
  const start = new Date(`${date}T${time}:00`);
  if (Number.isNaN(start.getTime())) return 0;
  return (start.getTime() - Date.now()) / 3600000;
}

export function isWithinCancelWindow(date: string, time: string, hours = 24) {
  return hoursUntilSession(date, time) < hours;
}

function calendarStamp(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

export function googleCalendarUrl(opts: { title: string; date: string; time: string; durationMin: number }) {
  const start = new Date(`${opts.date}T${opts.time}:00`);
  if (Number.isNaN(start.getTime())) return undefined;
  const end = new Date(start.getTime() + opts.durationMin * 60000);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(opts.title)}&dates=${calendarStamp(start)}/${calendarStamp(end)}`;
}
