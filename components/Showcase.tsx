"use client";

import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { waLink } from "@/lib/site";

const work = [
  {
    img: "/work/mobile.jpg",
    tag: "Mobile",
    title: "Native mobile apps",
    desc: "iOS & Android experiences that feel fast and effortless in the hand.",
  },
  {
    img: "/work/dashboard.jpg",
    tag: "Platforms",
    title: "Dashboards & web apps",
    desc: "Admin panels and internal tools your team will actually enjoy using.",
  },
  {
    img: "/work/ecommerce.jpg",
    tag: "Commerce",
    title: "E-commerce & storefronts",
    desc: "Conversion-focused stores built to sell and built to scale.",
  },
  {
    img: "/work/team.jpg",
    tag: "Startups",
    title: "MVPs for founders",
    desc: "Idea to investor-ready product in weeks, not months.",
  },
  {
    img: "/work/code.jpg",
    tag: "Engineering",
    title: "Custom software",
    desc: "Clean, tested, scalable systems engineered around your workflow.",
  },
  {
    img: "/work/abstract1.jpg",
    tag: "Modern stack",
    title: "Built for the future",
    desc: "React, Next.js, and native frameworks — modern foundations that last.",
  },
];

export function Showcase() {
  return (
    <section id="work" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-site">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow mb-5">What we build</span>
            <h2 className="h-section">
              The range of what we can <span className="text-emerald-gradient">ship for you</span>
            </h2>
          </div>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0 !py-3">
            Start a project →
          </a>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {work.map((w) => (
            <StaggerItem key={w.title}>
              <article className="group relative h-72 overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={w.img}
                  alt={w.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
                {/* emerald/dark wash for theme cohesion + readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-emerald-ink/20 transition-opacity duration-500 group-hover:from-ink/95" />
                <div className="absolute inset-0 ring-1 ring-inset ring-emerald-glow/0 transition-all duration-500 group-hover:ring-emerald-glow/30" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-flex rounded-full border border-emerald-glow/30 bg-emerald-glow/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-emerald-glow">
                    {w.tag}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-white">{w.title}</h3>
                  <p className="mt-1.5 max-h-0 overflow-hidden text-sm leading-relaxed text-white/60 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {w.desc}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
