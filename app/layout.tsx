import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Product Engineering Studio | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "product engineering studio",
    "mobile app development India",
    "web app development",
    "MVP development",
    "startup software development",
    "YB Production",
    "Android iOS development",
    "custom software India",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — Product Engineering Studio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
  ...(site.googleSiteVerification
    ? { verification: { google: site.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#05080a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  image: `${site.url}/og-image.png`,
  logo: `${site.url}/icon-512.png`,
  telephone: site.phone,
  email: site.email,
  founder: { "@type": "Person", name: site.founder },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.addressParts.street,
    addressLocality: site.addressParts.city,
    addressRegion: site.addressParts.region,
    postalCode: site.addressParts.postalCode,
    addressCountry: site.addressParts.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  priceRange: "₹₹",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      "Mobile App Development",
      "Web App & Dashboard Development",
      "MVP & Product Engineering",
      "Maintenance & Scale",
    ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
  },
  sameAs: [site.social.instagram, site.social.facebook, site.social.x].filter(Boolean),
  areaServed: "Worldwide",
  slogan: site.tagline,
  knowsAbout: [
    "Mobile App Development",
    "Web Application Development",
    "MVP Development",
    "Product Engineering",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phone,
    email: site.email,
    contactType: "sales",
    availableLanguage: ["English", "Hindi"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
