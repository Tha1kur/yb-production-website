"use client";

import { useEffect, useState } from "react";

/**
 * Page-wide CRT post-overlay: scanlines, animated film grain, vignette and a
 * subtle phosphor flicker, layered above all content but below modals/cursor.
 * Purely decorative (pointer-events: none). The barrel curve + chromatic
 * aberration on the 3D showpieces is handled per-canvas in the R3F scenes.
 *
 * Bows out under prefers-reduced-motion (drops the animated grain/flicker but
 * keeps a faint static vignette so the framing survives).
 */
export function CRTOverlay() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="yb-crt" aria-hidden="true">
      <div className="yb-crt__scan" />
      {!reduced && <div className="yb-crt__grain" />}
      {!reduced && <div className="yb-crt__flicker" />}
      <div className="yb-crt__vignette" />
    </div>
  );
}
