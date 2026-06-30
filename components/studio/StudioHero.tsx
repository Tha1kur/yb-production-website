"use client";

import dynamic from "next/dynamic";
import { waLink } from "@/lib/site";

const RobotScene = dynamic(() => import("./RobotScene"), { ssr: false });

export function StudioHero() {
  return (
    <header
      id="top"
      className="relative grid min-h-screen grid-cols-1 items-center overflow-hidden md:grid-cols-[1.1fr_0.9fr]"
    >
      {/* dramatic backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 70% at 72% 38%, rgba(226,54,54,0.20), transparent 55%), radial-gradient(60% 60% at 78% 60%, rgba(212,175,55,0.12), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 120%, transparent 55%, rgba(0,0,0,0.6))",
          }}
        />
      </div>

      {/* copy */}
      <div className="relative z-10 px-6 pt-28 pb-10 md:px-12">
        <div className="mb-7 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-studio-muted">
          <span className="h-px w-8 bg-studio-gold" />
          Product Engineering Studio · India → Worldwide
        </div>
        <h1 className="font-display text-[clamp(2.6rem,6.2vw,5.6rem)] font-extrabold leading-[0.98] tracking-tight text-studio-bone">
          Anonymous by design.
          <br />
          <span className="text-studio-gold">Unmistakable</span> by results.
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-studio-muted">
          YB Production is the engineering team behind ambitious mobile and web
          products. We stay behind the mask — your product takes the spotlight.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-studio-gold px-7 py-3.5 font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            Start your build
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-medium text-studio-bone transition-colors hover:border-studio-red hover:text-studio-red"
          >
            See what we ship
          </a>
        </div>
      </div>

      {/* robot */}
      <div className="relative z-[5] h-[55vh] min-h-[360px] w-full md:h-screen">
        <RobotScene />
      </div>
    </header>
  );
}
