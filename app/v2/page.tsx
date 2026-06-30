import type { Metadata } from "next";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CRTOverlay } from "@/components/CRTOverlay";
import { Tracker } from "@/components/Tracker";
import { RetroNav } from "@/components/retro/RetroNav";
import { RetroHero } from "@/components/retro/RetroHero";
import { RetroWork } from "@/components/retro/RetroWork";
import { RetroAbout } from "@/components/retro/RetroAbout";
import { RetroClients } from "@/components/retro/RetroClients";

// Staging route for the retro-CRT rebuild. Lives at /v2 so the live homepage
// stays untouched until we promote this. Not indexed while in progress.
export const metadata: Metadata = {
  title: "YB Production — Retro build (preview)",
  robots: { index: false, follow: false },
};

export default function V2Page() {
  return (
    <div className="yb-retro relative min-h-screen overflow-x-hidden">
      <SmoothScroll />
      <CRTOverlay />
      <Tracker />
      <RetroNav />
      <main>
        <RetroHero />
        <RetroWork />
        <RetroAbout />
        <RetroClients />
      </main>
    </div>
  );
}
