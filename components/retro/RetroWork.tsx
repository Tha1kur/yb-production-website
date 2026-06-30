"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { projects } from "./projects";
import { waLink } from "@/lib/site";

const WorkReel = dynamic(() => import("./WorkReel"), { ssr: false });

const N = projects.length;

export function RetroWork() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const go = useCallback((i: number) => {
    const next = ((i % N) + N) % N;
    activeRef.current = next;
    setActive(next);
  }, []);

  const prev = useCallback(() => go(activeRef.current - 1), [go]);
  const next = useCallback(() => go(activeRef.current + 1), [go]);

  const p = projects[active];

  return (
    <section
      id="work"
      className="relative min-h-screen overflow-hidden border-t border-crt-violet/15 py-20"
      onWheel={(e) => {
        // horizontal-ish intent advances the reel
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.deltaX > 0 ? next() : prev();
        }
      }}
    >
      <div className="mx-auto max-w-[1340px] px-6 md:px-10">
        <div className="font-pixel text-2xl uppercase tracking-[0.18em] text-crt-violet-soft">
          01 — Selected Work
        </div>

        {/* morphing title (re-mounts on change → fade-up) */}
        <div key={active} className="yb-morph mt-3 text-center">
          <h2 className="yb-bloom font-serif text-[clamp(2.2rem,6vw,5.4rem)] font-medium leading-none text-crt-cream">
            {p.title}
          </h2>
          <div className="mt-3 text-lg text-crt-cream-dim">
            {p.category}
            <span className="mx-3 opacity-50">•</span>
            <a
              href={waLink(`Hi YB 👋 I'd like to discuss a ${p.title} project.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:opacity-70"
            >
              View project →
            </a>
          </div>
        </div>
      </div>

      {/* 3D reel */}
      <div className="relative mt-6 h-[52vh] min-h-[360px] w-full">
        <WorkReel activeRef={activeRef} onSelect={go} />
      </div>

      {/* controls */}
      <div className="mx-auto mt-4 flex max-w-[1340px] items-center justify-between px-6 md:px-10">
        <button
          onClick={prev}
          aria-label="Previous project"
          className="yb-reel-btn"
        >
          ←
        </button>
        <div className="flex items-center gap-2.5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to project ${i + 1}`}
              className="h-2.5 w-2.5 rounded-full transition-all"
              style={{
                background: i === active ? "#f2efe2" : "#4a4570",
                boxShadow:
                  i === active ? "0 0 8px rgba(245,238,220,0.8)" : "none",
              }}
            />
          ))}
        </div>
        <button onClick={next} aria-label="Next project" className="yb-reel-btn">
          →
        </button>
      </div>
    </section>
  );
}
