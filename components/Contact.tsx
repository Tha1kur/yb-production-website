"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { site, waLink } from "@/lib/site";

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const msg =
      `Hi YB Production 👋 New project enquiry:\n\n` +
      `• Name: ${data.get("name")}\n` +
      `• Phone: ${data.get("phone")}\n` +
      (data.get("email") ? `• Email: ${data.get("email")}\n` : "") +
      `• Service: ${data.get("service")}\n` +
      `• Details: ${data.get("message")}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section id="contact" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left: pitch + direct channels */}
        <Reveal>
          <span className="eyebrow mb-5">Get in touch</span>
          <h2 className="h-section">
            Tell us what you want to <span className="text-gold-gradient">build</span>
          </h2>
          <p className="mt-5 max-w-md text-white/60">
            Fill in a few details and hit send — it opens WhatsApp with your brief ready to go.
            Prefer email? We&apos;re one message away.
          </p>

          <div className="mt-9 space-y-4">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-emerald-glow/20 bg-emerald-glow/5 p-5 transition-colors hover:bg-emerald-glow/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-glow/15 text-emerald-glow">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884" /></svg>
              </span>
              <div>
                <div className="font-semibold text-white">Chat on WhatsApp</div>
                <div className="text-sm text-white/55">Usually replies fast</div>
              </div>
              <span className="ml-auto text-white/30 transition-transform group-hover:translate-x-1">→</span>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.05]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
              </span>
              <div>
                <div className="font-semibold text-white">Email us</div>
                <div className="text-sm text-white/55">{site.email}</div>
              </div>
              <span className="ml-auto text-white/30 transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="card-glass space-y-4 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" required />
              <Field label="Phone / WhatsApp" name="phone" type="tel" placeholder="+91 …" required />
            </div>
            <Field label="Email" name="email" type="email" placeholder="you@email.com" />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/70">What do you need?</label>
              <select
                name="service"
                required
                defaultValue=""
                className="w-full rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-emerald-glow/50"
              >
                <option value="" disabled>Select a service</option>
                <option>Mobile App Development</option>
                <option>Web App / Dashboard</option>
                <option>MVP / Product Engineering</option>
                <option>Maintenance & Scale</option>
                <option>Something else</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/70">Project details</label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Tell us about your idea, timeline, and budget…"
                className="w-full resize-none rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-emerald-glow/50"
              />
            </div>

            <button type="submit" className="btn-gold w-full">
              Send via WhatsApp
            </button>

            {sent && (
              <p className="text-center text-sm text-emerald-glow">
                Opening WhatsApp with your brief… didn&apos;t open?{" "}
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="underline">
                  Tap here
                </a>
                .
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-white/70">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-emerald-glow/50"
      />
    </div>
  );
}
