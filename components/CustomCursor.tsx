"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      const t = e.target as HTMLElement;
      const interactive = !!t.closest("a, button, input, textarea, select, [data-cursor]");
      if (interactive !== hovering) {
        hovering = interactive;
        ring.classList.toggle("cursor-hover", hovering);
      }
    };

    const render = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(render);
    };

    const onLeave = () => { ring.style.opacity = "0"; dot.style.opacity = "0"; };
    const onEnter = () => { ring.style.opacity = "1"; dot.style.opacity = "1"; };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="yb-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="yb-cursor-dot" aria-hidden="true" />
    </>
  );
}
