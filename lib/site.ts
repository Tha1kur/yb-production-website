// =====================================================================
//  YB PRODUCTION — central site configuration
//  Edit anything here and it updates across the whole site.
// =====================================================================

export const site = {
  name: "YB Production",
  legalName: "YB Production",
  tagline: "Design. Code. Launch.",
  founder: "Aditya Yadav",
  description:
    "YB Production is a product engineering studio. We design, build, and ship fast, secure mobile and web products for founders and growing businesses.",
  url: "https://ybproduction.in",
  locale: "en_IN",

  // ---- Contact ----
  // WhatsApp business number in international format (no +, no spaces).
  whatsappNumber: "919754872026",
  // Used only in SEO structured data (no call button on the site).
  phone: "+919754872026",
  email: "support@ybproduction.in",
  // Office address shown in the footer. Leave "" to hide it.
  // TODO: fill in your office address.
  address: "",

  // ---- Social (footer). Leave "" to hide an icon. ----
  // TODO: paste your full profile URLs.
  social: {
    instagram: "",
    facebook: "",
    x: "",
  },

  // ---- Default WhatsApp pre-filled message ----
  whatsappMessage:
    "Hi YB Production 👋 I'd like to discuss a project. Here's what I'm looking to build:",
} as const;

export function waLink(message?: string) {
  const text = encodeURIComponent(message ?? site.whatsappMessage);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}
