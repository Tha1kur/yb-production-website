"use client";

import { waLink } from "@/lib/site";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "The Team" },
  { href: "#contact", label: "Contact" },
];

export function StudioNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-[200] flex items-center justify-between px-6 py-5 md:px-12">
      <a href="#top" className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-studio-bone text-sm font-extrabold text-black">
          YB
        </span>
        <span className="text-lg font-bold tracking-tight text-studio-bone">
          YB&nbsp;Production
        </span>
      </a>
      <div className="hidden items-center gap-8 md:flex">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-sm font-medium text-studio-muted transition-colors hover:text-studio-bone"
          >
            {l.label}
          </a>
        ))}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-studio-bone transition-colors hover:bg-studio-bone hover:text-black"
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}
