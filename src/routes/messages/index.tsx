import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header, Screen } from "@/components/kit";
import { CHAT_THREADS, formatInboxTime, lastMessage, threadUnread } from "@/lib/chat";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messages/")({
  head: () => ({ meta: [{ title: "Messages — Wellness & Healing SF" }] }),
  component: MessagesScreen,
});

function MessagesScreen() {
  const { messages } = useApp();
  const [query, setQuery] = useState("");

  const threads = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...CHAT_THREADS]
      .map((thread) => {
        const last = lastMessage(messages, thread.id);
        return { thread, last, unread: threadUnread(messages, thread.id) };
      })
      .sort((a, b) => (b.last?.at ?? "").localeCompare(a.last?.at ?? ""))
      .filter(({ thread, last }) => {
        if (!q) return true;
        return (
          thread.title.toLowerCase().includes(q) ||
          thread.subtitle.toLowerCase().includes(q) ||
          (last?.text ?? "").toLowerCase().includes(q)
        );
      });
  }, [messages, query]);

  return (
    <Screen tabPad className="pt-0">
      <Header title="Messages" subtitle="Notes between sessions" back={false} />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search conversations"
        className="mb-4 min-h-12 w-full border border-border bg-card px-4 text-sm outline-none placeholder:text-muted-foreground"
      />
      <div className="space-y-2">
        {threads.map(({ thread, last, unread }) => (
          <Link
            key={thread.id}
            to="/messages/$threadId"
            params={{ threadId: thread.id }}
            className="flex items-center gap-3 border border-border bg-card p-4"
          >
            <img src={thread.photo} alt="" className="h-12 w-12 object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-medium">{thread.title}</p>
                {last && (
                  <span className="shrink-0 text-[11px] text-muted-foreground">{formatInboxTime(last.at)}</span>
                )}
              </div>
              <p className={cn("truncate text-sm", unread ? "text-foreground" : "text-muted-foreground")}>
                {last?.text ?? thread.subtitle}
              </p>
            </div>
            {unread && <span className="h-2 w-2 shrink-0 bg-primary" aria-label="Unread" />}
          </Link>
        ))}
        {threads.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">No conversations match that search.</p>
        )}
      </div>
    </Screen>
  );
}
