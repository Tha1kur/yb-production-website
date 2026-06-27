"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { waLink } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const work = [
  { img: "/work/mobile.jpg", tag: "Mobile", title: "Native mobile apps", desc: "iOS & Android experiences that feel fast and effortless in the hand." },
  { img: "/work/dashboard.jpg", tag: "Platforms", title: "Dashboards & web apps", desc: "Admin panels and internal tools your team will actually enjoy using." },
  { img: "/work/ecommerce.jpg", tag: "Commerce", title: "E-commerce & storefronts", desc: "Conversion-focused stores built to sell and built to scale." },
  { img: "/work/team.jpg", tag: "Startups", title: "MVPs for founders", desc: "Idea to investor-ready product in weeks, not months." },
  { img: "/work/code.jpg", tag: "Engineering", title: "Custom software", desc: "Clean, tested, scalable systems engineered around your workflow." },
  { img: "/work/abstract1.jpg", tag: "Modern stack", title: "Built for the future", desc: "React, Next.js, and native frameworks — modern foundations that last." },
  { img: "/work/design.jpg", tag: "Design", title: "Brand & UI design", desc: "Premium interfaces and design systems that make your product feel expensive." },
  { img: "/work/ai.jpg", tag: "AI", title: "AI & automation", desc: "Smart features and workflows that save your team hours, every week." },
  { img: "/work/cloud.jpg", tag: "Cloud", title: "Cloud & scale", desc: "Secure, cloud-native infrastructure ready to grow from one user to millions." },
];

function Card({ item, index }: { item: (typeof work)[number]; index: number }) {
  return (
    <article className="group relative h-[58vh] max-h-[480px] w-[80vw] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 sm:w-[60vw] lg:w-[440px]">
      <Image
        src={item.img}
        alt={item.title}
        fill
        sizes="(max-width: 1024px) 80vw, 440px"
        className="object-cover opacity-70 transition-transform duration-[900ms] ease-out group-hover:scale-110"
      />
      {/* dark emerald duotone wash for a unified cinematic feel */}
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-emerald-ink/25" />
      <div className="absolute inset-0 mix-blend-color bg-emerald-deep/20" />
      <div className="absolute inset-0 ring-1 ring-inset ring-emerald-glow/0 transition duration-500 group-hover:ring-emerald-glow/40" />

      <span className="absolute right-6 top-5 font-display text-sm font-bold text-white/35">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-7">
        <span className="inline-flex rounded-full border border-emerald-glow/30 bg-emerald-glow/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-emerald-glow">
          {item.tag}
        </span>
        <h3 className="mt-3 font-display text-2xl font-semibold text-white">{item.title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/65">{item.desc}</p>
      </div>
    </article>
  );
}

export function WorkCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setDesktop(
      window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 1024 && !reduce
    );
  }, []);

  useEffect(() => {
    if (!desktop) return;
    const section = sectionRef.current!;
    const track = trackRef.current!;
    const amount = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, { x: () => -amount(), ease: "none" });
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + amount(),
        pin: true,
        scrub: 1,
        animation: tween,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
        },
      });
    }, section);
    return () => ctx.revert();
  }, [desktop]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className={desktop ? "relative h-screen overflow-hidden" : "relative scroll-mt-20 py-24 sm:py-32"}
    >
      <div className={desktop ? "container-site absolute inset-x-0 top-0 z-10 pt-24" : "container-site"}>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow mb-5">What we build</span>
            <h2 className="h-section">
              The range of what we can <span className="text-emerald-gradient">ship for you</span>
            </h2>
          </div>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0 py-3!">
            Start a project →
          </a>
        </div>
      </div>

      <div
        ref={trackRef}
        className={
          desktop
            ? "flex h-full w-max items-center gap-6 pl-[6vw] pr-[10vw]"
            : "mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory px-5 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        }
      >
        {work.map((item, i) => (
          <Card key={item.title} item={item} index={i} />
        ))}
      </div>

      {desktop && (
        <div className="absolute bottom-8 left-1/2 h-[3px] w-44 -translate-x-1/2 overflow-hidden rounded-full bg-white/10">
          <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-linear-to-r from-emerald-glow to-gold" />
        </div>
      )}
    </section>
  );
}
