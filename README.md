# YB Production — Studio Website

Premium dark, product-engineering studio website for **YB Production**.
**Design. Code. Launch.**

🌐 Live: [ybproduction.in](https://ybproduction.in)

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animation
- **WebGL** custom shader background
- Fully static export-ready, SEO-complete, security-hardened

## Features

- Animated WebGL shader background (emerald + gold)
- Cinematic hero with framed video showreel
- Services, Work showcase, About, Process, Why-us, FAQ
- "Founding clients" section (honest, no fabricated testimonials)
- WhatsApp-driven contact form + direct channels
- Privacy Policy, Terms, branded 404
- SEO: metadata, Open Graph, sitemap, robots, JSON-LD (Organization + FAQ)
- Production security headers (CSP, HSTS, etc.)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm start        # serves the production build
```

## Configuration

All site content (contact details, WhatsApp number, email, socials, copy)
lives in [`lib/site.ts`](lib/site.ts) — edit there and it updates everywhere.

---

© YB Production. All rights reserved.
