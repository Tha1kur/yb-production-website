"use client";

import { waLink } from "@/lib/site";

/**
 * About — shader.se-style flip: a full-bleed retro "team photo" band drops into
 * a cream printed-page editorial whose headline ripples like a flag (SVG
 * displacement). Copy is original to YB. The photo is a swappable slot: drop the
 * founders' shot at /public/yb-team.jpg (or pass `teamSrc`) and it replaces the
 * placeholder automatically.
 */
export function RetroAbout({
  teamSrc = "/work-retro/ambient.jpg",
}: {
  teamSrc?: string;
}) {
  return (
    <section id="about" className="relative border-t border-crt-violet/15">
      {/* hidden SVG filter powering the flag-wave */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <filter id="yb-flag">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.014"
            numOctaves={2}
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="14s"
              values="0.006 0.014; 0.010 0.009; 0.006 0.014"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* full-bleed team-photo band */}
      <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden">
        {teamSrc ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={teamSrc}
              alt="YB Production — studio"
              className="h-full w-full object-cover"
              style={{ filter: "saturate(0.75) contrast(1.05)" }}
            />
            {/* duotone tint to fold the photo into the CRT palette */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(58,55,176,0.30), rgba(10,7,22,0.10) 40%, rgba(10,7,22,0.78))",
                mixBlendMode: "multiply",
              }}
            />
            <span className="absolute bottom-5 left-6 font-pixel text-sm tracking-[0.14em] text-crt-cream/55">
              [ founders&apos; photo swaps in here ]
            </span>
          </>
        ) : (
          <div className="yb-team-ph relative flex h-full w-full items-end justify-center">
            <span className="mb-8 font-pixel text-lg tracking-[0.14em] text-[#0c2a3a]/70">
              [ the founding team — photo goes here ]
            </span>
          </div>
        )}
        {/* watermark + fade into the cream below */}
        <span className="yb-chroma absolute bottom-5 right-6 font-serif text-2xl font-semibold italic text-crt-cream/90">
          YB&nbsp;Production
        </span>
      </div>

      {/* cream editorial */}
      <div className="yb-paper">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10">
          <div className="yb-paper-eyebrow mb-8 text-sm">02 — Who we are</div>
          <h2 className="yb-flag max-w-[18ch] font-serif text-[clamp(2.2rem,5.2vw,4.6rem)] font-medium leading-[1.05] text-[#1a0c2e]">
            Making software that&apos;s useful, reliable, and quietly alive.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-14">
            <p className="text-lg leading-relaxed text-[#2c2148]">
              YB Production is a product-engineering studio. We design, build and
              ship fast, secure mobile and web products — serious about the
              business behind them. Based in India, building for founders and
              brands worldwide.
            </p>
            <p className="text-lg leading-relaxed text-[#2c2148]">
              We&apos;re a small team of engineers with a hand-picked network of
              designers, motion artists and technologists ready to plug in. That
              keeps us fast and adaptable — and means we build products that earn
              attention and reward daily use. We&apos;re not your regular IT
              department.
            </p>
          </div>
          <div className="mt-12">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1a0c2e] px-7 py-4 font-serif text-lg text-crt-cream transition-transform hover:-translate-y-0.5"
            >
              ☎ Book a call today →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
