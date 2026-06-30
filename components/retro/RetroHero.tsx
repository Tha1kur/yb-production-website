"use client";

import dynamic from "next/dynamic";

// 3D scene is desktop/client-only — never SSR'd (three.js touches the DOM).
const MonitorScene = dynamic(() => import("./MonitorScene"), { ssr: false });

export function RetroHero() {
  return (
    <header
      id="top"
      className="relative grid min-h-screen grid-cols-1 items-center gap-6 overflow-hidden px-6 pt-28 pb-16 md:grid-cols-[1.05fr_0.95fr] md:px-10"
    >
      {/* floor glow */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "radial-gradient(120% 140% at 30% 120%, rgba(120,86,200,0.42), transparent 60%)",
        }}
      />

      {/* headline */}
      <div className="relative z-10">
        <h1
          className="yb-bloom max-w-[13ch] font-serif text-[clamp(2.8rem,7.4vw,7rem)] font-medium leading-[0.96] tracking-tight text-crt-cream"
        >
          A Creative Engineering Studio, Plugged into the Future
        </h1>
        <div className="mt-8 flex items-center gap-3">
          <span className="yb-chroma font-pixel text-2xl tracking-wide text-crt-cream-dim">
            Scroll to Inspect Our Work
          </span>
          <span className="flex gap-1 text-xl text-crt-cream">
            <span className="yb-point">☞</span>
            <span className="yb-point yb-point--2">☞</span>
            <span className="yb-point yb-point--3">☞</span>
          </span>
        </div>
      </div>

      {/* 3D monitor */}
      <div className="relative z-10 h-[46vh] min-h-[320px] w-full md:h-[78vh]">
        <MonitorScene />
      </div>
    </header>
  );
}
