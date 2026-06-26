import Image from "next/image";
import { site, waLink } from "@/lib/site";

const nav = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  const socials = (
    [
      { label: "Instagram", href: site.social.instagram, icon: InstagramIcon },
      { label: "Facebook", href: site.social.facebook, icon: FacebookIcon },
      { label: "X", href: site.social.x, icon: XIcon },
    ] as { label: string; href: string; icon: () => React.ReactNode }[]
  ).filter((s) => s.href.length > 0);

  return (
    <footer className="relative border-t border-white/10 bg-ink-800/40">
      <div className="container-site py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Image src="/yb-lockup.png" alt={`${site.name} logo`} width={1756} height={847} className="h-10 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-white/55">{site.description}</p>
            <p className="mt-4 text-sm font-medium text-emerald-glow">{site.tagline}</p>
          </div>

          <div className="flex gap-14">
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">Explore</h4>
              <ul className="space-y-2.5">
                {nav.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-white/65 transition-colors hover:text-white">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">Contact</h4>
              <ul className="space-y-2.5 text-sm text-white/65">
                <li>
                  <a href={waLink()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">WhatsApp</a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">{site.email}</a>
                </li>
                {site.address && <li className="max-w-[200px] text-white/45">{site.address}</li>}
              </ul>
              {socials.length > 0 && (
                <div className="mt-5 flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-emerald-glow/40 hover:text-emerald-glow"
                    >
                      {s.icon()}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {legal.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-white/70">
                {l.label}
              </a>
            ))}
            <span className="text-emerald-glow/60">{site.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07Z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
