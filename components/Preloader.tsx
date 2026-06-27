"use client";

import { useEffect, useState } from "react";

const SEGMENTS = 22;
const DURATION = 2200; // ms

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyBooted = sessionStorage.getItem("yb_booted") === "1";

    if (reduce || alreadyBooted) {
      setHidden(true);
      return;
    }

    // Lock scroll while booting.
    document.documentElement.style.overflow = "hidden";

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-out, then quantise to the segment grid for that chunky retro feel
      const eased = 1 - Math.pow(1 - t, 2);
      setProgress(Math.round(eased * SEGMENTS) / SEGMENTS);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("yb_booted", "1");
        setLeaving(true);
        document.documentElement.style.overflow = "";
        window.setTimeout(() => setHidden(true), 700);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  const filled = Math.round(progress * SEGMENTS);
  const pct = Math.round(progress * 100);

  return (
    <div className={`yb-boot ${leaving ? "yb-boot--leaving" : ""}`} aria-hidden="true">
      <div className="yb-boot__crt">
        <div className="yb-boot__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/yb-mark.png" alt="" className="yb-boot__mark" />
          <span className="yb-boot__word" data-text="YB PRODUCTION">YB PRODUCTION</span>
        </div>

        <p className="yb-boot__sub">Product Engineering Studio &middot; Website</p>
        <p className="yb-boot__ver">Version 1.0</p>

        <div className="yb-boot__bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <span key={i} className={`yb-boot__seg ${i < filled ? "is-on" : ""}`} />
          ))}
        </div>
        <p className="yb-boot__pct">{pct}%</p>

        <p className="yb-boot__copy">© {new Date().getFullYear()} YB Production. All Rights Reserved.</p>
      </div>
      <div className="yb-boot__scanlines" />
      <div className="yb-boot__vignette" />
    </div>
  );
}
