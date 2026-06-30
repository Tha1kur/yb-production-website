// =====================================================================
//  Shared scroll bus — a single module-level object the R3F scenes read
//  inside useFrame (cheap, no React re-renders). Lenis scrolls the real
//  window, so the native scroll event keeps this in sync.
// =====================================================================

export const scrollState = {
  y: 0,
  /** 0..1 over the whole document */
  progress: 0,
  vh: 1,
};

if (typeof window !== "undefined") {
  const update = () => {
    scrollState.y = window.scrollY;
    scrollState.vh = window.innerHeight || 1;
    const max =
      document.documentElement.scrollHeight - window.innerHeight || 1;
    scrollState.progress = Math.min(1, Math.max(0, window.scrollY / max));
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}
