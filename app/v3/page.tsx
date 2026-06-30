import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Tracker } from "@/components/Tracker";
import { StudioNav } from "@/components/studio/StudioNav";
import { StudioHero } from "@/components/studio/StudioHero";

// "Behind the Mask" — original YB studio concept. Staging route; not indexed
// while in progress.
export const metadata: Metadata = {
  title: "YB Production — Behind the Mask (preview)",
  robots: { index: false, follow: false },
};

export default function V3Page() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-studio-bg text-studio-bone">
      <SmoothScroll />
      <Tracker />
      <StudioNav />
      <main>
        <StudioHero />
        <section id="work" className="flex min-h-screen items-center justify-center">
          <p className="text-sm uppercase tracking-[0.3em] text-studio-muted">
            The work · coming next
          </p>
        </section>
      </main>
    </div>
  );
}
