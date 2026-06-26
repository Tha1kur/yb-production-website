"use client";

import { motion } from "framer-motion";
import { site, waLink } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* local glows layered over the global shader */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute left-1/2 top-[-8%] h-[460px] w-[680px] -translate-x-1/2 rounded-full bg-emerald-glow/15 blur-[130px]" />
        <div className="absolute bottom-[6%] right-[8%] h-[320px] w-[320px] rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="container-site flex min-h-[100svh] flex-col items-center justify-center pt-28 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="eyebrow mb-7"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-glow animate-pulse-glow" />
          Product Engineering Studio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.03em] text-white sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem]"
        >
          We build products
          <br />
          that <span className="text-gold-gradient">actually ship.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl"
        >
          A creative engineering studio designing, building, and launching fast, secure
          mobile&nbsp;&amp;&nbsp;web products — for founders and growing businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.52 }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
            <WhatsAppIcon className="h-4 w-4" />
            Start your project
          </a>
          <a href="#work" className="btn-ghost w-full sm:w-auto">
            See what we build
          </a>
        </motion.div>

        {/* Framed showreel — your video, presented like a real studio reel */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="group relative mt-16 w-full max-w-4xl"
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-glow/40 via-gold/30 to-emerald-glow/40 opacity-60 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 shadow-2xl backdrop-blur-sm">
            {/* browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-ink-900/80 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-glow/60" />
              <span className="ml-3 text-xs text-white/30">ybproduction.in</span>
            </div>
            <video
              className="aspect-video w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/yb-mark.png"
              aria-label="YB Production showreel"
            >
              <source src="/yb-hero.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
