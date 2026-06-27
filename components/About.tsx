"use client";

import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { site } from "@/lib/site";

const pillars = [
  {
    title: "Operator-friendly products",
    desc: "Every workflow starts with the people who'll live in it daily. Clear labels, tidy data, and sensible guardrails mean your team actually enjoys the tools we hand over.",
  },
  {
    title: "Always-on partnership",
    desc: "Launch day is halfway, not the finish line. We leave monitoring, dashboards, and a direct line in place so issues get caught before your customers ever feel them.",
  },
  {
    title: "Built-in growth loops",
    desc: "We study what makes your best customers stick, then bake those insights straight into the product — roadmaps tied to real revenue, not vanity features.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-site">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow mb-5">Who we are</span>
          <h2 className="h-section">
            A lean studio that <span className="text-emerald-gradient">ships</span>, not pitches
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/65">
            YB Production is a small, focused collective of engineers and designers who care more
            about measurable launches than pitch-deck buzzwords. We learn the quirks of how you
            actually work, then build software that survives real customers — clean, secure, and
            made to scale.
          </p>
          <p className="mt-4 text-white/55">
            As a new studio, we take on a deliberately small number of projects. That means yours
            gets genuine focus from the people actually building it — not a slot in an assembly line.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/3 py-2 pl-2 pr-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-emerald-glow/20 to-gold/20 font-display text-sm font-bold text-gold">
              AY
            </span>
            <span className="text-sm text-white/70">
              Founded by <span className="font-semibold text-white">{site.founder}</span>
            </span>
          </div>
        </Reveal>

        <Stagger className="mt-16 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <StaggerItem key={p.title}>
              <div className="card-glass h-full p-7 transition-colors hover:border-emerald-glow/25">
                <span className="font-display text-sm font-bold text-gold">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
