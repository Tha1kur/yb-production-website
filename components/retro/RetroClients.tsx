"use client";

import { waLink } from "@/lib/site";

/**
 * Honest credibility beat — no fabricated client logos. Keeps shader.se's
 * tongue-in-cheek "corporate results" energy but stays truthful: what we're
 * known for + an open invitation for founding clients. Swap in a real client
 * row here once there are logos to show.
 */
const PILLARS = [
  { k: "Ships in", v: "weeks", d: "MVPs live fast, with weekly demos." },
  { k: "Code you", v: "own", d: "Full source, clean repos, real handover." },
  { k: "Built to", v: "scale", d: "From one user to many — no rewrites." },
  { k: "Replies", v: "fast", d: "Straight to the founder, no ticket queue." },
];

export function RetroClients() {
  return (
    <section className="relative border-t border-crt-violet/15 py-24">
      <div className="mx-auto max-w-[1340px] px-6 md:px-10">
        <div className="font-pixel text-2xl uppercase tracking-[0.18em] text-crt-violet-soft">
          03 — Why founders pick us
        </div>
        <h2 className="yb-bloom mt-4 max-w-[20ch] font-serif text-[clamp(1.9rem,4.4vw,3.6rem)] font-medium leading-[1.05] text-crt-cream">
          We don&apos;t just close deals. We ship results that compound.
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-crt-violet/15 bg-crt-violet/15 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.k} className="bg-crt-void px-7 py-10">
              <div className="font-pixel text-base uppercase tracking-widest text-crt-violet-soft">
                {p.k}
              </div>
              <div className="yb-chroma mt-1 font-serif text-4xl font-semibold italic text-crt-cream">
                {p.v}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-crt-cream-dim">{p.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 max-w-[60ch] text-lg leading-relaxed text-crt-cream-dim">
          We&apos;re taking on a small number of{" "}
          <span className="text-crt-cream">founding clients</span> — early
          partners we build with closely and credit honestly. No fabricated
          logos here; just the work, once it&apos;s shipped.
        </p>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 border border-crt-cream/30 px-7 py-4 font-serif text-lg text-crt-cream transition-colors hover:bg-crt-cream/10"
        >
          Become a founding client →
        </a>
      </div>
    </section>
  );
}
