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
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-primary/15 bg-tabbar pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-10px_28px_rgba(80,72,58,0.08)]">
      <ul className="grid grid-cols-5 px-1.5">
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
                  "relative flex min-h-12 flex-col items-center justify-center gap-1 py-0.5",
                  active ? "text-primary" : "text-foreground/55",
                )}
              >
                <span
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    active ? "bg-primary text-primary-foreground" : "bg-transparent",
                  )}
                >
                  <Icon size={18} strokeWidth={active ? 2.1 : 1.7} />
                  {tab.to === "/messages" && unread && (
                    <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </span>
                <span className={cn("text-[11px] font-medium leading-none", active && "text-primary")}>
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { shouldShowTabs };
