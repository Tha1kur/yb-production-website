"use client";

import { waLink } from "@/lib/site";

const LINKS = [
  { href: "#top", label: "Home" },
  { href: "#work", label: "Selected Work" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

/**
 * Retro nav — text wordmark placeholder (swapped for the real logo once
 * provided) with the spinning rainbow mark, over a top fade.
 */
export function RetroNav() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-[200] flex items-center justify-between px-6 py-5 md:px-10"
      style={{
        background:
          "linear-gradient(rgba(6,5,16,0.85), rgba(6,5,16,0))",
      }}
    >
      <a href="#top" className="flex items-center gap-3">
        <span className="yb-rainbow inline-block h-[30px] w-[42px] rounded-md" />
        <span className="yb-chroma font-serif text-2xl font-semibold italic text-crt-cream">
          YB&nbsp;Production
        </span>
      </a>
      <div className="hidden items-center gap-7 md:flex">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-serif text-lg text-crt-cream underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
          >
            {l.label}
          </a>
        ))}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-lg text-crt-cream underline decoration-1 underline-offset-4"
        >
          ☎ Book a call
        </a>
      </div>
    </nav>
  );
}
