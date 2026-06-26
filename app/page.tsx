import { Navbar } from "@/components/Navbar";
import { ShaderBackground } from "@/components/ShaderBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Showcase } from "@/components/Showcase";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { WhyUs } from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ["What kind of projects do you take on?", "Mobile apps, web platforms, admin dashboards, and MVPs for founders and growing businesses. We focus purely on product engineering — we don't do marketing or SEO."],
    ["How much does a project cost?", "Pricing is transparent and tied to your product stage with no hidden fees. Share your idea on WhatsApp and we'll return a clear custom quote within a business day."],
    ["How long does it take to build?", "Most MVPs ship in weeks, not months. After scoping we give you a fixed timeline with weekly demos."],
    ["Do I own the code?", "100%. Full source, clean repositories, and a complete handover. What we build is yours."],
    ["What happens after launch?", "We offer ongoing support retainers for monitoring, fixes, and new features so your product keeps improving."],
  ].map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ShaderBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Showcase />
        <About />
        <Process />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
