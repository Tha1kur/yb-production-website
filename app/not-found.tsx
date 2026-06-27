import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <div className="absolute left-1/2 top-1/3 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-glow/15 blur-[120px]" />

      <Image
        src="/yb-mark.png"
        alt={`${site.name} mark`}
        width={816}
        height={910}
        className="h-24 w-auto animate-float opacity-90 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]"
      />
      <p className="mt-8 font-display text-7xl font-extrabold text-gold-gradient">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
        This page wandered off.
      </h1>
      <p className="mt-3 max-w-md text-white/55">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on
        track.
      </p>
      <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
        <Link href="/" className="btn-primary w-full sm:w-auto">
          Back to home
        </Link>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full sm:w-auto">
          Message us
        </a>
      </div>
    </main>
  );
}
