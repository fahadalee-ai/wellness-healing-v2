import { COACH, type ChatMessage, type ChatThreadId } from "./mock-data";
import { PHOTOS } from "./images";

export type ChatThread = {
  id: ChatThreadId;
  title: string;
  subtitle: string;
  photo: string;
  kind: "coach" | "studio" | "care";
};

export const CHAT_THREADS: ChatThread[] = [
  {
    id: "jackie",
    title: COACH.name,
    subtitle: "Usually replies within a day",
    photo: COACH.photo,
    kind: "coach",
  },
  {
    id: "studio",
    title: "Studio notes",
    subtitle: "Bookings, Zoom, and reminders",
    photo: PHOTOS.heroInterior,
    kind: "studio",
  },
  {
    id: "care",
    title: "Between sessions",
    subtitle: "Practices Jackie has shared",
    photo: PHOTOS.teaJournal,
    kind: "care",
  },
];

export const JACKIE_PROMPTS = [
  "Can we talk through Friday?",
  "I’m feeling a bit overwhelmed",
  "Could I move my session?",
];

export function threadById(id: string) {
  return CHAT_THREADS.find((thread) => thread.id === id);
}

export function isChatThreadId(id: string): id is ChatThreadId {
  return CHAT_THREADS.some((thread) => thread.id === id);
}

export function normalizeMessages(raw: unknown, fallback: ChatMessage[]): ChatMessage[] {
  if (!Array.isArray(raw) || raw.length === 0) return fallback;

  const mapped: ChatMessage[] = raw.map((item, index) => {
    const row = item as Partial<ChatMessage> & { from?: string };
    const from = row.from === "me" ? "me" : "them";
    const threadId: ChatThreadId =
      row.threadId === "studio" || row.threadId === "care" || row.threadId === "jackie" ? row.threadId : "jackie";
    return {
      id: String(row.id ?? `m${index}`),
      threadId,
      from,
      text: String(row.text ?? ""),
      at: String(row.at ?? new Date().toISOString()),
      status: row.status ?? "read",
      resourceId: typeof row.resourceId === "string" ? row.resourceId : undefined,
    };
  });

  const missing = fallback.filter((seed) => !mapped.some((msg) => msg.threadId === seed.threadId));
  return [...mapped, ...missing];
}

export function replyFor(threadId: ChatThreadId, text: string): { text: string; resourceId?: string } {
  const t = text.toLowerCase();

  if (threadId === "studio") {
    return {
      text: "Noted — we’ll keep this with your booking. For schedule changes, you can reschedule from My Sessions anytime.",
    };
  }

  if (threadId === "care") {
    return {
      text: "Jackie will see this before your next session. If you’d rather talk it through live, you’re welcome to book time.",
    };
  }

  if (/suicid|kill myself|self[- ]?harm|emergency|crisis/.test(t)) {
    return {
      text: "I’m glad you reached out. This inbox is not a crisis line. Please call (505) 670-7419 or local emergency services if you are in danger. I am here for our scheduled work, and I want you safe.",
    };
  }

  if (/reschedul|cancel|move|change the time/.test(t)) {
    return {
      text: "Of course. You can reschedule from My Sessions, or tell me a few mornings that feel easier and I’ll meet you there.",
    };
  }

  if (/zoom|link|friday|session|tomorrow/.test(t)) {
    return {
      text: "Yes — I’ll send the Zoom link the day before. Come as you are. Camera off is always all right.",
    };
  }

  if (/overwhelm|anxious|anxiety|panic|trigger|ground|spiral/.test(t)) {
    return {
      text: "I’m with you. If it helps, there is a short grounding practice in Resources. We can also go slowly with this in session — nothing has to be solved in a message.",
      resourceId: "coming-back",
    };
  }

  if (/thank|grateful|appreciate/.test(t)) {
    return { text: "You’re welcome. I’m glad you’re here. Rest if you can — we’ll pick this up when you’re ready." };
  }

  return {
    text: "I received this. I’ll sit with it, and we can talk it through in session whenever that feels right.",
  };
}

export function formatChatTime(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function formatChatDay(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  if (sameDay(date, today)) return "Today";
  if (sameDay(date, yesterday)) return "Yesterday";
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function formatInboxTime(iso: string) {
  const day = formatChatDay(iso);
  if (day === "Today") return formatChatTime(iso);
  return day;
}

export function lastMessage(messages: ChatMessage[], threadId: ChatThreadId) {
  return [...messages].reverse().find((msg) => msg.threadId === threadId);
}

export function threadUnread(messages: ChatMessage[], threadId: ChatThreadId) {
  return messages.some((msg) => msg.threadId === threadId && msg.from === "them" && msg.status !== "read");
}
