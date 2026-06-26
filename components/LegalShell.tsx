import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Footer } from "./Footer";

export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-white/10 bg-ink/80 backdrop-blur-xl">
        <div className="container-site flex h-16 items-center justify-between md:h-20">
          <Link href="/" aria-label={`${site.name} home`}>
            <Image src="/yb-lockup.png" alt={`${site.name} logo`} width={1756} height={847} className="h-9 w-auto md:h-11" />
          </Link>
          <Link href="/" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="container-site py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-white/45">Last updated: {updated}</p>
          <div className="prose-legal mt-10 space-y-8">{children}</div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-white">{heading}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-white/65">{children}</div>
    </section>
  );
}
