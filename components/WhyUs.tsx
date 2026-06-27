"use client";

import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { waLink } from "@/lib/site";
import { CountUp } from "./CountUp";

const reasons = [
  {
    title: "You talk to the builders",
    desc: "No account managers or middlemen. You work directly with the people designing and engineering your product.",
  },
  {
    title: "You own 100% of the code",
    desc: "Full source, clean repos, complete handover. What we build is yours — no lock-in, ever.",
  },
  {
    title: "Security-first by default",
    desc: "Hardened headers, safe data handling, and best practices baked in from line one — not bolted on later.",
  },
  {
    title: "Transparent, weekly demos",
    desc: "See real progress every week. You always know what's done, what's next, and exactly where you stand.",
  },
  {
    title: "Designed to feel premium",
    desc: "Motion, polish, and detail that make your product feel expensive — because perception drives conversion.",
  },
  {
    title: "Fixed scope, clear timelines",
    desc: "We agree on what ships and when, up front. No moving goalposts, no surprise invoices.",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <span className="eyebrow mb-5">Why YB Production</span>
          <h2 className="h-section">
            A new studio with an <span className="text-emerald-gradient">old-school</span> standard
          </h2>
          <p className="mt-5 text-white/60">
            We&apos;re selective about the work we take on — which means your project gets real
            focus, not a slot in an assembly line. Every build ships with craft, care, and
            accountability.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
            <Stat value="1:1" label="Direct founder access" />
            <Stat value="100%" label="Code ownership" />
            <Stat value="0" label="Hidden fees" />
          </div>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-9">
            Let&apos;s talk
          </a>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2">
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <div className="card-glass h-full p-6 transition-colors hover:border-emerald-glow/25">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-glow/10 text-emerald-glow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="m20 6-11 11L4 12" />
                  </svg>
                </div>
                <h3 className="font-display text-base font-semibold text-white">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{r.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-extrabold text-gold-gradient">
        <CountUp value={value} />
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-white/45">{label}</div>
    </div>
  );
}
