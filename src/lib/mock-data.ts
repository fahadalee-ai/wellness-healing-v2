import { PHOTOS } from "./images";

export const BUSINESS = {
  name: "Wellness & Healing SF",
  shortName: "W&H SF",
  address: "1807 2nd Street, Ste 71",
  phone: "(505) 670-7419",
  phoneHref: "tel:+15056707419",
} as const;

export const COACH = {
  name: "Jackie",
  fullName: "Jackie",
  title: "Wellness Coach",
  photo: PHOTOS.jackie,
  bio: "Trauma-informed coach supporting survivors and film professionals through seasons of change — with patience, privacy, and practical care.",
  credentials: "Certified Wellness Coach · Trauma-Informed Practitioner",
  stats: [
    { value: "12+", label: "Years of Practice" },
    { value: "20K+", label: "Sessions" },
    { value: "98%", label: "Client Satisfaction" },
  ],
} as const;

export type ServiceId = "one-on-one" | "small-group" | "large-group";

export type SessionStatus = "upcoming" | "past" | "cancelled";

export type BillingCycle = "monthly" | "quarterly";

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatar?: string;
  intakeComplete: boolean;
  intake?: IntakeAnswers;
  language?: "en" | "es";
  prefs: NotificationPrefs;
};

export type IntakeAnswers = {
  reason?: string;
  background?: string;
  support: string[];
  referral?: string;
};

export type NotificationPrefs = {
  sessionReminders: boolean;
  bookingUpdates: boolean;
  messages: boolean;
  resources: boolean;
};

export type CoachingSession = {
  id: string;
  serviceId: ServiceId;
  focus?: string;
  coachName: string;
  date: string;
  time: string;
  durationMin: number;
  status: SessionStatus;
  notes?: string;
  firstSession?: boolean;
  zoomUrl: string;
  price: number;
  coveredByPlan?: boolean;
  review?: { rating: number; text?: string };
};

export type Subscription = {
  planId: string;
  planName: string;
  price: number;
  cycle: BillingCycle;
  sessionsIncluded: number;
  sessionsUsed: number;
  renewalDate: string;
  status: "active" | "paused" | "cancelled";
};

export type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
};

export type Invoice = {
  id: string;
  date: string;
  amount: number;
  label: string;
};

export type ChatThreadId = "jackie" | "studio" | "care";

export type ChatMessage = {
  id: string;
  threadId: ChatThreadId;
  from: "me" | "them";
  text: string;
  at: string;
  status?: "sent" | "read";
  resourceId?: string;
};

export type BookingDraft = {
  serviceId?: ServiceId;
  focus?: string;
  date?: string;
  time?: string;
  durationMin?: number;
  notes?: string;
  firstSession?: boolean;
  promo?: string;
  rescheduleId?: string;
};

export type AppNotification = {
  id: string;
  title: string;
  text: string;
  time: string;
  read: boolean;
  href: string;
};

export const SERVICES: {
  id: ServiceId;
  title: string;
  blurb: string;
  price: number;
  durationMin: number;
}[] = [
  {
    id: "one-on-one",
    title: "Private 1-on-1 Coaching",
    blurb: "Focused, individual sessions tailored to your journey",
    price: 175,
    durationMin: 50,
  },
  {
    id: "small-group",
    title: "Small Group Coaching",
    blurb: "A shared space with a handful of people walking a similar path",
    price: 65,
    durationMin: 75,
  },
  {
    id: "large-group",
    title: "Large Group Sessions",
    blurb: "Guided gatherings for connection, practice, and perspective",
    price: 35,
    durationMin: 60,
  },
];

export const FOCUS_OPTIONS = [
  {
    id: "trauma",
    title: "Trauma-Informed Coaching",
    blurb: "Gentle, paced support for healing and nervous-system safety.",
  },
  {
    id: "career",
    title: "Career Transition Coaching",
    blurb: "For producers, directors, and actors navigating high-pressure change.",
  },
  {
    id: "wellness",
    title: "General Wellness Coaching",
    blurb: "Clarity, habits, and steadiness for everyday life.",
  },
] as const;

export const PLANS = [
  {
    id: "foundation",
    name: "Foundation",
    sessionsPerMonth: 2,
    monthlyPrice: 180,
    quarterlyPrice: 486,
    features: [
      "2 private sessions each month",
      "Zoom sessions with Jackie",
      "Between-session notes with Jackie",
      "Cancel or change anytime",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    sessionsPerMonth: 4,
    monthlyPrice: 320,
    quarterlyPrice: 864,
    popular: true,
    features: [
      "4 private sessions each month",
      "Priority scheduling",
      "Zoom sessions with Jackie",
      "Between-session notes with Jackie",
      "Cancel or change anytime",
    ],
  },
  {
    id: "transformation",
    name: "Transformation",
    sessionsPerMonth: 4,
    monthlyPrice: 420,
    quarterlyPrice: 1134,
    features: [
      "4 private sessions each month",
      "Priority scheduling",
      "Group session access",
      "Between-session notes with Jackie",
      "Cancel or change anytime",
    ],
  },
] as const;

export const ONBOARDING = [
  {
    heading: "A Path Toward Healing, Clarity & Transformation",
    subtext: "Compassionate, one-on-one wellness coaching — wherever you are.",
    image: PHOTOS.sunroom,
    alt: "Soft-lit sunroom with plants by a window",
  },
  {
    heading: "Support Built for Where You Are Now",
    subtext: "Private sessions for trauma survivors and industry professionals navigating real change.",
    image: PHOTOS.windowPortrait,
    alt: "Person seated quietly by a window",
  },
  {
    heading: "Ready to Take the Next Step?",
    subtext: "When you are ready, booking takes a few quiet minutes — all sessions held securely over Zoom.",
    image: PHOTOS.duskLandscape,
    alt: "Warm dusk landscape with mountains and clouds",
  },
] as const;

export const INTAKE_REASONS = [
  "Personal/Trauma Healing",
  "Career & Industry Pressure",
  "Both",
  "Just Exploring",
] as const;

export const INTAKE_BACKGROUNDS = [
  "Film/Entertainment Industry",
  "Other Professional",
  "Prefer not to say",
] as const;

export const INTAKE_SUPPORT = [
  "Private 1-on-1 Coaching",
  "Small Group Coaching",
  "Large Group Sessions",
  "Not Sure Yet",
] as const;

export const INTAKE_REFERRALS = [
  "Friend or colleague",
  "Film industry referral",
  "Instagram / Social",
  "Google search",
  "Podcast or article",
  "Other",
] as const;

export const TESTIMONIALS = [
  {
    name: "Mira S.",
    quote: "Jackie held space for me without rushing. I left each session clearer than I arrived.",
    rating: 5,
    photo: PHOTOS.testimonial1,
  },
  {
    name: "Daniel R.",
    quote: "As a producer between projects, this was the first place that understood both the grief and the ambition.",
    rating: 5,
    photo: PHOTOS.testimonial2,
  },
  {
    name: "Asha K.",
    quote: "Private, grounded, and never salesy. I finally felt safe enough to begin.",
    rating: 5,
    photo: PHOTOS.testimonial3,
  },
] as const;

export const PILLARS = [
  { title: "For Trauma Survivors", blurb: "Paced, consent-led support.", image: PHOTOS.pillarTrauma },
  { title: "Mindful by Design", blurb: "No urgency. No pressure.", image: PHOTOS.pillarMindful },
  { title: "Industry Professionals", blurb: "For life between projects.", image: PHOTOS.pillarIndustry },
  { title: "Thoughtfully Curated", blurb: "Small, intentional offerings.", image: PHOTOS.pillarCurated },
] as const;

export { RESOURCES, resourceById, RESOURCE_CATEGORIES, type Resource, type ResourceCategory } from "./resources";

export const DEFAULT_PREFS: NotificationPrefs = {
  sessionReminders: true,
  bookingUpdates: true,
  messages: true,
  resources: false,
};

export const seedUsers: User[] = [
  {
    id: "u1",
    fullName: "Elena Vargas",
    email: "elena@wellnesshealingsf.com",
    phone: "(310) 555-0188",
    password: "Healing1",
    avatar: PHOTOS.testimonial1,
    language: "en",
    intakeComplete: true,
    intake: {
      reason: "Both",
      background: "Film/Entertainment Industry",
      support: ["Private 1-on-1 Coaching"],
      referral: "Friend or colleague",
    },
    prefs: DEFAULT_PREFS,
  },
];

export const seedSessions: CoachingSession[] = [
  {
    id: "s1",
    serviceId: "one-on-one",
    focus: "Career Transition Coaching",
    coachName: COACH.name,
    date: "2026-09-12",
    time: "10:00",
    durationMin: 50,
    status: "upcoming",
    notes: "Between projects — want to talk through next steps without the noise.",
    zoomUrl: "https://zoom.us/j/wellness-healing-sf",
    price: 0,
    coveredByPlan: true,
  },
  {
    id: "s2",
    serviceId: "one-on-one",
    focus: "Trauma-Informed Coaching",
    coachName: COACH.name,
    date: "2026-08-22",
    time: "09:00",
    durationMin: 65,
    status: "past",
    firstSession: true,
    zoomUrl: "https://zoom.us/j/wellness-healing-sf",
    price: 0,
    coveredByPlan: true,
  },
  {
    id: "s3",
    serviceId: "small-group",
    coachName: COACH.name,
    date: "2026-07-30",
    time: "18:00",
    durationMin: 75,
    status: "cancelled",
    zoomUrl: "https://zoom.us/j/wellness-healing-sf",
    price: 65,
  },
];

export const seedSubscription: Subscription = {
  planId: "growth",
  planName: "Growth",
  price: 320,
  cycle: "monthly",
  sessionsIncluded: 4,
  sessionsUsed: 2,
  renewalDate: "2026-10-01",
  status: "active",
};

export const seedPaymentMethods: PaymentMethod[] = [
  { id: "pm1", brand: "Visa", last4: "4242", expiry: "09/28" },
];

export const seedInvoices: Invoice[] = [
  { id: "inv1", date: "2026-09-01", amount: 320, label: "Growth — monthly" },
  { id: "inv2", date: "2026-08-01", amount: 320, label: "Growth — monthly" },
  { id: "inv3", date: "2026-07-01", amount: 320, label: "Growth — monthly" },
];

export const seedMessages: ChatMessage[] = [
  {
    id: "m1",
    threadId: "jackie",
    from: "them",
    text: "Welcome, Elena. I’m glad you’re here. Whenever you’re ready, we can begin.",
    at: "2026-09-02T15:12:00",
    status: "read",
  },
  {
    id: "m2",
    threadId: "jackie",
    from: "me",
    text: "Thank you. I’m looking forward to Friday.",
    at: "2026-09-02T16:40:00",
    status: "read",
  },
  {
    id: "m3",
    threadId: "jackie",
    from: "them",
    text: "I’ll send the Zoom link the day before. Rest well until then.",
    at: "2026-09-02T16:48:00",
    status: "read",
  },
  {
    id: "s1",
    threadId: "studio",
    from: "them",
    text: "Your session with Jackie is Friday, September 12 at 10:00 AM. The Zoom link will arrive 24 hours before.",
    at: "2026-09-06T09:15:00",
    status: "sent",
  },
  {
    id: "c1",
    threadId: "care",
    from: "them",
    text: "Jackie shared a short grounding practice for the days between sessions.",
    at: "2026-09-05T18:22:00",
    status: "sent",
    resourceId: "coming-back",
  },
];

export const seedNotifications: AppNotification[] = [
  {
    id: "n1",
    title: "Session reminder",
    text: "Your session with Jackie is Friday at 10:00 AM.",
    time: "Yesterday",
    read: false,
    href: "/sessions",
  },
  {
    id: "n2",
    title: "Zoom link",
    text: "Your Zoom link will arrive 24 hours before your session.",
    time: "2 days ago",
    read: false,
    href: "/sessions",
  },
  {
    id: "n3",
    title: "Welcome",
    text: "Your Growth plan is active. Two sessions remain this cycle.",
    time: "Sep 1",
    read: true,
    href: "/subscription",
  },
];

export const UNAVAILABLE_DATES = new Set(["2026-09-10", "2026-09-14", "2026-09-20", "2026-09-27"]);

export const BOOKED_SLOTS: Record<string, string[]> = {
  "2026-09-09": ["10:00", "15:00"],
  "2026-09-11": ["09:00", "13:00"],
  "2026-09-12": ["10:00"],
  "2026-09-16": ["11:00", "18:00"],
};

export const TIME_SLOTS = [
  { time: "08:00", period: "Morning" as const },
  { time: "09:00", period: "Morning" as const },
  { time: "10:00", period: "Morning" as const },
  { time: "11:00", period: "Morning" as const },
  { time: "13:00", period: "Afternoon" as const },
  { time: "14:00", period: "Afternoon" as const },
  { time: "15:00", period: "Afternoon" as const },
  { time: "16:00", period: "Afternoon" as const },
  { time: "17:00", period: "Evening" as const },
  { time: "18:00", period: "Evening" as const },
];

export function serviceById(id: ServiceId) {
  return SERVICES.find((s) => s.id === id) ?? SERVICES[0];
}

export function planById(id: string) {
  return PLANS.find((p) => p.id === id);
}

export function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

export function initials(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
}

export function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDateLong(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function todayIso() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

export function addDaysIso(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d + days);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function localTimezoneLabel() {
  try {
    const parts = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" }).formatToParts(new Date());
    return parts.find((p) => p.type === "timeZoneName")?.value ?? "local time";
  } catch {
    return "local time";
  }
}

export function canJoinZoom(date: string, time: string, durationMin = 50) {
  const start = new Date(`${date}T${time}:00`);
  if (Number.isNaN(start.getTime())) return false;
  const now = Date.now();
  const diffMin = (start.getTime() - now) / 60000;
  return diffMin <= 15 && diffMin > -durationMin;
}

export function money(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function moneyExact(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

export function isDateUnavailable(iso: string) {
  if (iso < todayIso()) return true;
  return UNAVAILABLE_DATES.has(iso);
}

export function slotsForDate(iso: string) {
  const booked = new Set(BOOKED_SLOTS[iso] ?? []);
  return TIME_SLOTS.map((slot) => ({
    ...slot,
    available: !booked.has(slot.time) && !(iso === todayIso() && slot.time <= currentHm()),
  }));
}

function currentHm() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
