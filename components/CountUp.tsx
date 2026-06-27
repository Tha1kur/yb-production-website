"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric value up from 0 when it scrolls into view.
 * Only animates clean numbers (optionally suffixed %, +, k, x); anything
 * else (e.g. "1:1") renders as-is. Respects reduced-motion.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
    const suffix = match?.[3] ?? "";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animatable = !!match && ["", "%", "+", "k", "K", "x"].includes(suffix.trim());

    if (!match || !animatable || reduce) {
      setDisplay(value);
      return;
    }

    const prefix = match[1];
    const target = parseInt(match[2].replace(/,/g, ""), 10);
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(prefix + Math.round(eased * target).toLocaleString("en-IN") + suffix);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
