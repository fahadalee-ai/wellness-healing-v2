import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Home, MessageCircle, PlusSquare, User } from "lucide-react";
import { shouldShowTabs } from "@/lib/auth-paths";
import { CHAT_THREADS, threadUnread } from "@/lib/chat";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/book", label: "Book", icon: PlusSquare },
  { to: "/sessions", label: "Sessions", icon: CalendarDays },
  { to: "/messages", label: "Messages", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function TabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { messages } = useApp();
  const unread = CHAT_THREADS.some((thread) => threadUnread(messages, thread.id));

  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-border bg-background pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
      <ul className="grid grid-cols-5">
        {TABS.map((tab) => {
          const active =
            pathname === tab.to ||
            (tab.to !== "/book" && pathname.startsWith(`${tab.to}/`)) ||
            (tab.to === "/book" && pathname === "/book");
          const Icon = tab.icon;
          return (
            <li key={tab.to}>
              <Link
                to={tab.to}
                className={cn(
                  "relative flex min-h-12 flex-col items-center justify-center gap-1 py-2 text-[11px] uppercase tracking-[0.12em]",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span className="relative">
                  <Icon size={20} strokeWidth={active ? 1.9 : 1.5} />
                  {tab.to === "/messages" && unread && (
                    <span className="absolute -right-1 -top-0.5 h-1.5 w-1.5 bg-primary" />
                  )}
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { shouldShowTabs };
