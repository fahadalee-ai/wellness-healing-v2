import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BottomSheet, Button, Header, LinkButton, Screen } from "@/components/kit";
import {
  formatChatDay,
  formatChatTime,
  isChatThreadId,
  JACKIE_PROMPTS,
  threadById,
} from "@/lib/chat";
import { BUSINESS, COACH } from "@/lib/mock-data";
import { resourceById } from "@/lib/resources";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

type Search = { prompt?: string };

export const Route = createFileRoute("/messages/$threadId")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    prompt: typeof search.prompt === "string" ? search.prompt : undefined,
  }),
  head: ({ params }) => ({
    meta: [{ title: `${threadById(params.threadId)?.title ?? "Messages"} — Wellness & Healing SF` }],
  }),
  component: ChatScreen,
});

function ChatScreen() {
  const { threadId } = Route.useParams();
  const { prompt } = Route.useSearch();
  const { messages, sendMessage, markThreadRead } = useApp();
  const [text, setText] = useState(prompt ?? "");
  const [typing, setTyping] = useState(false);
  const [info, setInfo] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  const thread = threadById(threadId);
  const threadMessages = useMemo(
    () => messages.filter((msg) => msg.threadId === threadId),
    [messages, threadId],
  );

  useEffect(() => {
    if (isChatThreadId(threadId)) markThreadRead(threadId);
  }, [threadId, markThreadRead]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [threadMessages, typing]);

  useEffect(() => {
    if (prompt) setText(prompt);
  }, [prompt]);

  if (!thread || !isChatThreadId(threadId)) {
    return <Navigate to="/messages" />;
  }

  const last = threadMessages[threadMessages.length - 1];
  const showPrompts = thread.id === "jackie" && last?.from === "them" && !typing;

  function send(next = text) {
    const value = next.trim();
    if (!value || !isChatThreadId(threadId)) return;
    sendMessage(threadId, value);
    setText("");
    setTyping(true);
    window.setTimeout(() => setTyping(false), 1400);
  }

  return (
    <Screen padded={false} tabPad className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="px-5">
        <Header
          title={thread.title}
          subtitle={thread.subtitle}
          fallbackTo="/messages"
          right={
            <button
              type="button"
              onClick={() => setInfo(true)}
              className="overflow-hidden border border-border"
              aria-label={`${thread.title} details`}
            >
              <img src={thread.photo} alt="" className="h-12 w-12 object-cover" />
            </button>
          }
        />
      </div>

      {thread.kind === "coach" && (
        <div className="mx-5 mb-3 border border-border bg-card px-3 py-2 text-center text-[11px] leading-relaxed text-muted-foreground">
          For urgent matters, please contact {BUSINESS.phone} directly — this is not a crisis line
        </div>
      )}

      <div ref={scroller} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 pb-4 no-scrollbar">
        {threadMessages.map((msg, index) => {
          const prev = threadMessages[index - 1];
          const showDay = !prev || formatChatDay(prev.at) !== formatChatDay(msg.at);
          const resource = msg.resourceId ? resourceById(msg.resourceId) : undefined;
          return (
            <div key={msg.id}>
              {showDay && (
                <p className="mb-3 text-center text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {formatChatDay(msg.at)}
                </p>
              )}
              <div className={cn("flex", msg.from === "me" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] px-3 py-2 text-sm leading-relaxed",
                    msg.from === "me" ? "bg-primary text-primary-foreground" : "bg-card text-foreground",
                  )}
                >
                  <p>{msg.text}</p>
                  {resource && (
                    <Link
                      to="/resources/$resourceId"
                      params={{ resourceId: resource.id }}
                      className="mt-2 block border border-primary-foreground/25 bg-[#141312]/20 p-2"
                    >
                      <p className="text-[10px] uppercase tracking-[0.14em] opacity-80">{resource.category}</p>
                      <p className="mt-1 font-medium">{resource.title}</p>
                    </Link>
                  )}
                  <p
                    className={cn(
                      "mt-1 text-[10px]",
                      msg.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {formatChatTime(msg.at)}
                    {msg.from === "me" ? (msg.status === "read" ? " · Read" : " · Sent") : ""}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-card px-3 py-2 text-sm text-muted-foreground">
              {thread.kind === "coach"
                ? "Jackie is writing…"
                : thread.kind === "studio"
                  ? "Studio is writing…"
                  : "A note is arriving…"}
            </div>
          </div>
        )}
      </div>

      {showPrompts && (
        <div className="flex gap-2 overflow-x-auto px-5 pb-2 no-scrollbar">
          {JACKIE_PROMPTS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => send(item)}
              className="shrink-0 border border-border bg-card px-3 py-2 text-xs text-foreground"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <form
        className="flex items-end gap-2 border-t border-border px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={thread.kind === "coach" ? "Write a note to Jackie…" : "Write a reply…"}
          rows={1}
          className="max-h-32 min-h-12 flex-1 resize-none border border-border bg-card px-3 py-3 text-sm outline-none"
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={!text.trim()}
          className="flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </form>

      <BottomSheet open={info} onClose={() => setInfo(false)} title={thread.title}>
        <div className="flex items-center gap-3">
          <img src={thread.photo} alt="" className="h-16 w-16 object-cover" />
          <div>
            <p className="text-sm text-muted-foreground">
              {thread.kind === "coach" ? COACH.credentials : thread.subtitle}
            </p>
          </div>
        </div>
        {thread.kind === "coach" && (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{COACH.bio}</p>
        )}
        <div className="mt-5 space-y-2">
          {thread.kind === "coach" && (
            <LinkButton to="/book" full>
              Book a session
            </LinkButton>
          )}
          <a
            href={BUSINESS.phoneHref}
            className="inline-flex min-h-12 w-full items-center justify-center border border-border text-[12px] uppercase tracking-[0.16em]"
          >
            Call studio
          </a>
          <Button variant="ghost" full onClick={() => setInfo(false)}>
            Close
          </Button>
        </div>
      </BottomSheet>
    </Screen>
  );
}
