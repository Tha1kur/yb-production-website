"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

const steps = [
  {
    no: "01",
    title: "Discover",
    desc: "We dig into your goals, users, and constraints — then map a lean scope that gets you to value fast.",
  },
  {
    no: "02",
    title: "Design",
    desc: "Premium, conversion-focused UI/UX. You see clickable designs before a single line of production code.",
  },
  {
    no: "03",
    title: "Code",
    desc: "Clean, tested, scalable engineering. Weekly demos so you always know exactly where things stand.",
  },
  {
    no: "04",
    title: "Launch",
    desc: "We ship to the world — deployment, security, and the polish that makes it feel expensive.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-20 border-y border-white/5 bg-ink-800/30 py-24 sm:py-32">
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-5">How we work</span>
          <h2 className="h-section">
            A process built to <span className="text-gold-gradient">ship on time</span>
          </h2>
          <p className="mt-5 text-white/60">
            No black boxes, no surprises. A clear path from your idea to a live product.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Drawing connector line (desktop) */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-[60px] hidden h-px origin-left bg-linear-to-r from-emerald-glow/50 via-gold/50 to-emerald-glow/50 lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <Stagger className="relative z-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <StaggerItem key={s.no}>
              <div className="group relative h-full rounded-2xl border border-white/10 bg-white/2 p-7 transition-all duration-300 hover:border-gold/30">
                <span className="font-display text-5xl font-extrabold text-white/10 transition-colors group-hover:text-gold/30">
                  {s.no}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
