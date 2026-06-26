"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "Mobile apps, web platforms, admin dashboards, and MVPs for founders and growing businesses. If it needs to be designed, built, and shipped, it's in our wheelhouse. We focus purely on product engineering — we don't do marketing or SEO.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends on scope, but we keep pricing transparent and tied to your product stage — no hidden fees, ever. Share your idea on WhatsApp and we'll come back with a clear, custom quote within a business day.",
  },
  {
    q: "How long does it take to build?",
    a: "Most MVPs ship in a matter of weeks, not months. After a quick scoping conversation we give you a fixed timeline and stick to it, with weekly demos so you always know exactly where things stand.",
  },
  {
    q: "Do I own the code?",
    a: "100%. Full source, clean repositories, and a complete handover. What we build is yours — no lock-in, no strings.",
  },
  {
    q: "You're a new studio — why should I trust you?",
    a: "Fair question. Being new means you get our full focus, direct access to the people building your product, and honest pricing without agency overhead. We'd rather earn trust with one great build than hide behind inflated numbers.",
  },
  {
    q: "What happens after launch?",
    a: "Launch is the halfway point, not the finish line. We offer ongoing support retainers for monitoring, fixes, and new features — so your product keeps improving long after it's live.",
  },
  {
    q: "How do we communicate during the project?",
    a: "Directly, through one clear channel — usually WhatsApp — straight to the builders, plus weekly demos. No account managers, no telephone game.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow mb-5">FAQ</span>
          <h2 className="h-section">
            Questions, <span className="text-emerald-gradient">answered</span>
          </h2>
          <p className="mt-5 text-white/60">
            Everything you might want to know before we start. Still curious? Message us — we reply
            fast.
          </p>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold text-white">{f.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-glow/30 text-emerald-glow transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-white/60">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
