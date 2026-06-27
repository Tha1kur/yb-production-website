"use client";

import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { waLink } from "@/lib/site";

// =====================================================================
//  Add real client quotes here as you collect them. Leave the array
//  empty and the section automatically shows the "founding client"
//  invitation instead — no fake testimonials, ever.
//  Example:
//  { quote: "They shipped our MVP in 5 weeks.", name: "Asha R.",
//    role: "Founder, Acme" }
// =====================================================================
const testimonials: { quote: string; name: string; role: string }[] = [];

export function Testimonials() {
  const hasReal = testimonials.length > 0;

  return (
    <section id="testimonials" className="relative scroll-mt-20 border-y border-white/5 bg-ink-800/30 py-24 sm:py-32">
      <div className="container-site">
        {hasReal ? (
          <>
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="eyebrow mb-5">What partners say</span>
              <h2 className="h-section">
                Proof that we <span className="text-gold-gradient">ship outcomes</span>
              </h2>
            </Reveal>
            <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <StaggerItem key={t.name}>
                  <figure className="card-glass h-full p-7">
                    <div className="mb-4 text-3xl leading-none text-gold/60">&ldquo;</div>
                    <blockquote className="text-sm leading-relaxed text-white/75">{t.quote}</blockquote>
                    <figcaption className="mt-5 border-t border-white/10 pt-4">
                      <div className="font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-white/50">{t.role}</div>
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
            </Stagger>
          </>
        ) : (
          <Reveal className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gold/20 bg-linear-to-br from-emerald-ink/60 via-ink-800 to-ink p-10 text-center sm:p-14">
            <div className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-gold/10 blur-[90px]" />
            <div className="relative">
              <span className="eyebrow mb-6">Founding clients</span>
              <h2 className="h-section">
                Be one of our <span className="text-gold-gradient">first success stories</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-white/65">
                We&apos;re a new studio taking on a small number of founding clients at launch
                pricing. Early partners get our deepest focus, direct access to the builders, and a
                real say in how we work — plus a case study we&apos;ll be proud to show off together.
              </p>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-gold mt-9">
                Claim a founding slot
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
