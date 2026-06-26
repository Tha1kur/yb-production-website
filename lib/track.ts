// =====================================================================
//  Lightweight visitor tracking — fires to /api/track on the YB backend.
//  Silent (page_view / section_view) → just shows in dashboard.
//  Loud (intent: link_click / form_submit) → drives push notifications.
// =====================================================================

const SESSION_KEY = "yb_sid";
let inflight = false;
let started = false;

function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = uid();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

async function post(path: string, body: Record<string, unknown>) {
  try {
    const payload = JSON.stringify(body);
    // sendBeacon is fire-and-forget — survives page unload and never blocks navigation.
    if ("sendBeacon" in navigator) {
      const blob = new Blob([payload], { type: "application/json" });
      const ok = navigator.sendBeacon(path, blob);
      if (ok) return;
    }
    await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  } catch {
    // tracking should never throw — visitors must not see errors.
  }
}

export async function startSession() {
  if (typeof window === "undefined" || started || inflight) return;
  inflight = true;
  try {
    await post("/api/track/session", {
      sessionId: getSessionId(),
      referrer: document.referrer || "",
      landingPath: window.location.pathname + window.location.search,
    });
    started = true;
  } finally {
    inflight = false;
  }
}

export type EventKind =
  | "page_view"
  | "section_view"
  | "link_click"
  | "form_submit"
  | "engagement";

export async function trackEvent(
  kind: EventKind,
  label?: string,
  target?: string,
) {
  if (typeof window === "undefined") return;
  await post("/api/track/event", {
    sessionId: getSessionId(),
    kind,
    label: label ?? "",
    target: target ?? "",
  });
}
