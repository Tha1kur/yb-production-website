"use client";

import { Reveal } from "./Reveal";
import { waLink } from "@/lib/site";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-12">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-3xl border border-emerald-glow/20 bg-linear-to-br from-emerald-ink via-ink-800 to-ink px-8 py-16 text-center sm:px-16 sm:py-20">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-glow/20 blur-[100px]" />
          <div className="absolute bottom-0 right-10 h-48 w-48 rounded-full bg-gold/10 blur-[90px]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Have an idea? <span className="text-gold-gradient">Let&apos;s build it.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/65">
              Tell us what you&apos;re imagining and we&apos;ll come back with a clear plan, timeline,
              and a custom quote — no pressure, no jargon.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
                Get a custom quote
              </a>
              <a href="#contact" className="btn-ghost w-full sm:w-auto">
                Send us a brief
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
