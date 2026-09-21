import { PHOTOS } from "./images";

export type ResourceCategory = "Practice" | "Journal" | "Read";

export type PracticeStep = {
  title: string;
  body: string;
};

export type Resource = {
  id: string;
  title: string;
  excerpt: string;
  category: ResourceCategory;
  minutes: number;
  image: string;
  alt: string;
  body: string[];
  prompts?: string[];
  steps?: PracticeStep[];
  related: string[];
};

export const RESOURCE_CATEGORIES: ResourceCategory[] = ["Practice", "Journal", "Read"];

export const RESOURCES: Resource[] = [
  {
    id: "quieter-morning",
    title: "A quieter morning",
    excerpt: "Five minutes with a page, before the day starts making decisions for you.",
    category: "Journal",
    minutes: 5,
    image: PHOTOS.teaJournal,
    alt: "Open journal and tea on a wooden table in morning light",
    body: [
      "Some mornings arrive already full. This is not a productivity ritual. It is a small place to set something down before you pick the day up.",
      "You do not have to write well. You do not have to finish a thought. A few honest lines are enough.",
      "If a prompt feels like too much, skip it. The point is the pause — not the page.",
    ],
    prompts: [
      "What is one thing I do not have to solve before noon?",
      "Where in my body am I holding today already?",
      "What would a kinder pace look like for the next hour?",
    ],
    related: ["coming-back", "after-session"],
  },
  {
    id: "coming-back",
    title: "Coming back to the body",
    excerpt: "A short grounding practice for the minutes before a Zoom session — or any moment that feels far away.",
    category: "Practice",
    minutes: 6,
    image: PHOTOS.plants,
    alt: "Sunlit plants on a wooden windowsill",
    body: [
      "When the mind is loud, the body is still here. This practice is paced on purpose. Nothing is rushed, and nothing has to be felt all the way through.",
      "You can keep your eyes open. You can stop at any step. Consent includes leaving.",
      "Use it before a session, after a long day on set, or whenever you notice you’ve left the room you’re sitting in.",
    ],
    steps: [
      {
        title: "Arrive",
        body: "Feel the surface under you — chair, floor, bed. Name it quietly: I am sitting. I am supported.",
      },
      {
        title: "Look around",
        body: "Find three ordinary things you can see. A plant. A cup. The edge of a window. Let your eyes rest on each one.",
      },
      {
        title: "Feel the edges",
        body: "Press your feet into the floor, or your hands into your legs. Notice temperature, fabric, weight. Stay only as long as it feels useful.",
      },
      {
        title: "One slower breath",
        body: "If it feels all right, lengthen the exhale a little. If breath work is too much today, skip this and return to the room.",
      },
      {
        title: "Close",
        body: "Say one true sentence: I am here, and I can stop whenever I need to.",
      },
    ],
    related: ["before-zoom", "quieter-morning"],
  },
  {
    id: "between-projects",
    title: "Between projects",
    excerpt: "Notes on identity, rest, and the strange quiet after a production wraps.",
    category: "Read",
    minutes: 8,
    image: PHOTOS.between,
    alt: "Empty chair on a wooden deck at warm dusk",
    body: [
      "The industry is built on motion. Then the job ends, and the silence can feel like a verdict. It isn’t. It is a gap — uncomfortable, and also a place where your nervous system finally has room.",
      "You are not only as good as your last credit. You are also the person who made breakfast, who needed rest, who wanted something quieter than another call sheet.",
      "If this season feels like grief, treat it as grief. If it feels like relief, you are allowed that too. Both can sit in the same week.",
      "Jackie often asks: what would this pause be for, if it did not have to prove anything?",
    ],
    related: ["private-pace", "quieter-morning"],
  },
  {
    id: "before-zoom",
    title: "Before you join Zoom",
    excerpt: "Four unhurried minutes to settle the room — and yourself — before a session begins.",
    category: "Practice",
    minutes: 4,
    image: PHOTOS.breath,
    alt: "Empty linen chair by a sunlit window",
    body: [
      "A session does not start when the link opens. It starts in the minutes before — the chair you choose, the light, the glass of water, the choice to arrive a little less braced.",
      "This is not a performance warmup. It is a way to meet Jackie from a body that has been invited, not pushed.",
    ],
    steps: [
      {
        title: "Choose the room",
        body: "Sit where you will not be overheard if you can. Close a door. Soften the light. Put a glass of water nearby.",
      },
      {
        title: "Set the frame",
        body: "Open Zoom a minute early if you like, camera off. You decide when you are visible.",
      },
      {
        title: "One sentence",
        body: "Write or think: What I might want from the next hour is… If you do not know, “to not be alone with this” is enough.",
      },
      {
        title: "Join when ready",
        body: "You can arrive late by a minute. You can leave the camera off. The session will wait for you.",
      },
    ],
    related: ["coming-back", "after-session"],
  },
  {
    id: "after-session",
    title: "After we close",
    excerpt: "A gentle landing for the hour after coaching — so the session does not spill into the rest of the day all at once.",
    category: "Journal",
    minutes: 5,
    image: PHOTOS.linen,
    alt: "Rumpled cream linen in morning window light",
    body: [
      "Sessions can leave you clearer, tender, or unexpectedly tired. None of those mean you did it wrong.",
      "Give yourself a buffer if you can — even ten minutes — before email, school pickup, or the next Zoom. The work continues in the quiet after, not only in the hour itself.",
    ],
    prompts: [
      "What do I want to remember from today, in one sentence?",
      "What can wait until tomorrow?",
      "What would care look like for the next hour — water, a walk, a closed laptop?",
    ],
    related: ["coming-back", "private-pace"],
  },
  {
    id: "private-pace",
    title: "A pace that is yours",
    excerpt: "How this practice treats privacy, consent, and the right to go slowly.",
    category: "Read",
    minutes: 6,
    image: PHOTOS.evening,
    alt: "Lamp, journal, and tea at dusk",
    body: [
      "Nothing here is meant to hurry you. You can skip a prompt, leave a practice, keep the camera off, or say “not today” in a session. That is part of the work, not a break from it.",
      "Your notes, messages, and intake stay in this space. Jackie does not share your story with a set, a producer, or anyone else.",
      "If something in a resource or a session feels like too much, stop. You can write Jackie, book a quieter follow-up, or simply rest. Healing is not a schedule.",
    ],
    related: ["between-projects", "after-session"],
  },
];

export function resourceById(id: string) {
  return RESOURCES.find((item) => item.id === id);
}

export function resourcesByCategory(category: ResourceCategory | "All" | "Saved", savedIds: string[]) {
  if (category === "Saved") return RESOURCES.filter((item) => savedIds.includes(item.id));
  if (category === "All") return RESOURCES;
  return RESOURCES.filter((item) => item.category === category);
}
