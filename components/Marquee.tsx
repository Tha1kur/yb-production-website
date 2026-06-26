"use client";

const stack = [
  "React",
  "Next.js",
  "React Native",
  "Kotlin",
  "Swift",
  "TypeScript",
  "Node.js",
  "Flutter",
  "PostgreSQL",
  "Firebase",
  "AWS",
  "Tailwind CSS",
];

export function Marquee() {
  const row = [...stack, ...stack];
  return (
    <section className="relative border-y border-white/5 bg-ink-800/40 py-8">
      <p className="container-site mb-6 text-center text-xs uppercase tracking-[0.25em] text-white/35">
        The modern stack we build on
      </p>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
          {row.map((tech, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-lg font-semibold text-white/45 transition-colors hover:text-emerald-glow"
            >
              {tech}
            </span>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex shrink-0 animate-marquee items-center gap-12 pr-12"
        >
          {row.map((tech, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-lg font-semibold text-white/45"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
