import { Navigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { shouldShowTabs, TabBar } from "@/components/TabBar";
import { isAuthEntryPath, isPublicPath } from "@/lib/auth-paths";
import { useApp } from "@/lib/store";

function isPreviewPath(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  return path === "/preview" || path === "/preview.html" || path.endsWith("/preview.html") || path.endsWith("/preview");
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { toasts, dismissToast, hydrated, user } = useApp();
  const tabs = shouldShowTabs(pathname, !!user);
  const preview = isPreviewPath(pathname);

  if (preview) {
    return <div className="min-h-dvh w-full bg-[#0b0b0c]">{children}</div>;
  }

  if (!hydrated && !isPublicPath(pathname)) {
    return <div className="min-h-dvh w-full bg-background" />;
  }

  if (hydrated && !user && !isPublicPath(pathname)) {
    return <Navigate to="/login" />;
  }

  if (hydrated && user && isAuthEntryPath(pathname)) {
    return <Navigate to={user.intakeComplete ? "/home" : "/intake"} />;
  }

  return (
    <div className="mx-auto flex h-dvh max-h-dvh w-full max-w-[480px] flex-col overflow-hidden bg-background">
      <main className="relative flex min-h-0 flex-1 flex-col overflow-y-auto no-scrollbar">{children}</main>
      {tabs && <TabBar />}
      <Toaster theme="dark" position="top-center" />
      <div className="pointer-events-none fixed inset-x-0 top-6 z-50 mx-auto flex max-w-[480px] flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => dismissToast(t.id)}
            className="pointer-events-auto w-full border border-border bg-card px-4 py-3 text-left"
          >
            <p className="text-sm text-foreground">{t.title}</p>
            {t.body && <p className="mt-0.5 text-xs text-muted-foreground">{t.body}</p>}
          </button>
        ))}
      </div>
    </div>
  );
}
