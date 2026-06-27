"use client";

import { Reveal, Stagger, StaggerItem } from "./Reveal";

type Service = {
  title: string;
  desc: string;
  points: string[];
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    title: "Mobile App Development",
    desc: "Native Android and iOS apps built for performance, security, and a flawless feel in the hand.",
    points: ["Kotlin & Jetpack Compose", "SwiftUI for iOS", "React Native / Flutter"],
    icon: (
      <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm5 16h.01M9 5h6" />
    ),
  },
  {
    title: "Web Apps & Dashboards",
    desc: "Robust admin panels, internal tools, and customer-facing platforms with role-based access and analytics.",
    points: ["Role-based dashboards", "Realtime analytics", "Scalable APIs"],
    icon: (
      <path d="M3 4h18v12H3zM3 20h18M9 16v4m6-4v4M7 8h4m-4 4h7" />
    ),
  },
  {
    title: "MVP & Product Engineering",
    desc: "Go from idea to investor-ready product fast — validated, polished, and built to grow without rewrites.",
    points: ["Idea to launch in weeks", "Investor-ready builds", "Validated fast"],
    icon: (
      <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Zm0 5v5l4 2M12 12 8 9" />
    ),
  },
  {
    title: "Maintenance & Scale",
    desc: "Ongoing support, feature iterations, monitoring, and infrastructure upgrades that keep you shipping.",
    points: ["Monthly retainers", "Monitoring & uptime", "Continuous iteration"],
    icon: (
      <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-7.07-2.83 2.83M9.76 14.24l-2.83 2.83m0-12.14 2.83 2.83m4.48 4.48 2.83 2.83" />
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-5">What we do</span>
          <h2 className="h-section">
            Everything you need to <span className="text-emerald-gradient">ship a product</span>
          </h2>
          <p className="mt-5 text-white/60">
            One studio, end to end — from the first wireframe to a launched, scaling product.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <StaggerItem key={s.title}>
              <article className="group card-glass relative h-full overflow-hidden p-7 transition-all duration-300 hover:border-emerald-glow/30 hover:bg-white/5">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-glow/0 blur-3xl transition-all duration-500 group-hover:bg-emerald-glow/15" />
                <div className="relative">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-glow/20 bg-emerald-glow/10 text-emerald-glow">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      {s.icon}
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{s.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-white/70">
                        <span className="text-gold">▹</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
