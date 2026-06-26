"use client";

import { useEffect } from "react";
import { startSession, trackEvent } from "@/lib/track";

// Map link patterns → the analytics label used on the backend.
// Anything here counts as "intent" (loud event → push notification).
function classifyHref(href: string | null): string | null {
  if (!href) return null;
  const s = href.toLowerCase();
  if (s.startsWith("https://wa.me/") || s.includes("api.whatsapp.com")) return "whatsapp";
  if (s.includes("instagram.com")) return "instagram";
  if (s.startsWith("https://x.com/") || s.startsWith("https://twitter.com/")) return "x";
  if (s.includes("facebook.com")) return "facebook";
  if (s.startsWith("mailto:")) return "email";
  if (s.startsWith("tel:")) return "phone";
  return null;
}

export function Tracker() {
  useEffect(() => {
    // 1) Session start — fires once per visit.
    startSession();

    // 2) Section-view tracking — fire when a section's id-bearing element
    //    becomes 40% visible. Deduped per session via a local Set; the
    //    backend also dedupes via `$addToSet`-style behaviour.
    const seen = new Set<string>();
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    let observer: IntersectionObserver | null = null;
    if (sections.length && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              const id = (e.target as HTMLElement).id;
              if (id && !seen.has(id)) {
                seen.add(id);
                trackEvent("section_view", id, id);
              }
            }
          }
        },
        { threshold: 0.4 },
      );
      sections.forEach((s) => observer!.observe(s));
    }

    // 3) Link click tracking — captures intent on outbound social / contact links.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      const label = classifyHref(href);
      if (label) trackEvent("link_click", label, href ?? "");
    };
    document.addEventListener("click", onClick, true);

    // 4) Engagement signal — visitor stayed > 25s actively scrolling.
    let engaged = false;
    const engageTimer = window.setTimeout(() => {
      if (!engaged) {
        engaged = true;
        trackEvent("engagement", "dwell_25s", document.title || "");
      }
    }, 25_000);

    return () => {
      observer?.disconnect();
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(engageTimer);
    };
  }, []);

  return null;
}
