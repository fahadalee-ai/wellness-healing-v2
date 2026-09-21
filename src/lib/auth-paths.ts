const PUBLIC_PATHS = new Set([
  "/",
  "/onboarding",
  "/login",
  "/register",
  "/forgot-password",
  "/privacy",
  "/terms",
  "/preview",
  "/preview.html",
]);

export function normalizePath(pathname: string) {
  return pathname.replace(/\/$/, "") || "/";
}

export function isPublicPath(pathname: string) {
  const path = normalizePath(pathname);
  if (PUBLIC_PATHS.has(path)) return true;
  return path.endsWith("/preview") || path.endsWith("/preview.html");
}

export function isAuthEntryPath(pathname: string) {
  const path = normalizePath(pathname);
  return path === "/login" || path === "/register" || path === "/onboarding";
}

export function shouldShowTabs(pathname: string, authed = false) {
  const path = normalizePath(pathname);
  if (path.includes("/practice")) return false;
  if (path.startsWith("/book/") && path !== "/book") return false;
  if (path.startsWith("/sessions/")) return false;
  if (path.startsWith("/plans/") && path !== "/plans") return false;
  if (path.startsWith("/messages")) return true;
  if (path.startsWith("/profile")) return true;
  if (path === "/resources" || /^\/resources\/[^/]+$/.test(path)) return true;
  if (authed && (path === "/privacy" || path === "/terms")) return true;
  return [
    "/home",
    "/book",
    "/sessions",
    "/notifications",
    "/subscription",
    "/payment-methods",
    "/help",
    "/plans",
  ].includes(path);
}
