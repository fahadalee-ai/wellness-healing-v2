import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Screen } from "@/components/kit";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Wellness & Healing SF" }] }),
  component: NotificationsScreen,
});

function NotificationsScreen() {
  const { notifications, markAllRead, markNotificationRead } = useApp();

  return (
    <Screen tabPad className="pt-0">
      <Header
        title="Notifications"
        fallbackTo="/home"
        right={
          <button type="button" onClick={markAllRead} className="text-[11px] uppercase tracking-[0.12em] text-primary">
            Mark read
          </button>
        }
      />
      <div className="divide-y divide-border border border-border">
        {notifications.map((n) => (
          <Link
            key={n.id}
            to={n.href as "/"}
            onClick={() => markNotificationRead(n.id)}
            className="block px-4 py-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className={cn("text-sm", n.read ? "text-muted-foreground" : "text-foreground")}>{n.title}</p>
              {!n.read && <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-primary" />}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{n.text}</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{n.time}</p>
          </Link>
        ))}
      </div>
    </Screen>
  );
}
