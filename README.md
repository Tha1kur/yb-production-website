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
```

## Configuration

All site content (contact details, WhatsApp number, email, address, socials, copy)
lives in [`lib/site.ts`](lib/site.ts) — edit there and it updates everywhere.

## Project structure

```
app/          Next.js App Router (pages, layout, SEO routes, legal pages, 404)
components/   UI components (hero, shader bg, services, showcase, contact, …)
lib/          site.ts — single source of truth for all site content
public/        favicons, logos, showreel video, work images, OG image
brand/         original logo variants + source video (design source assets)
private/       sensitive docs (GSTIN/Udyam, design guide) — git-ignored, never committed
```

## Deployment

Hosted on Cloudflare Pages at https://yb-production-website.pages.dev.

- Repository root: build command `npm run build`, output directory `out`.
- `output: "export"` generates static files; `next start` is not used.
- `public/_headers` supplies security headers for static files.
- `functions/api/[[path]].js` forwards `/api/*` to the HTTPS Render backend.
- Push to the connected production branch to deploy. Configure custom domains in
  Cloudflare separately; a successful Pages deployment does not configure DNS.

---

© YB Production. All rights reserved.
