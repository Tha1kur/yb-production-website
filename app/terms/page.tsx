import type { Metadata } from "next";
import { LegalShell, LegalSection } from "@/components/LegalShell";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of the ${site.name} website.`,
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="26 June 2026">
      <p className="text-[15px] leading-relaxed text-white/70">
        These terms govern your use of the {site.name} website. By browsing this site or contacting us
        through it, you agree to the terms below.
      </p>

      <LegalSection heading="1. About us">
        <p>
          {site.name} is a product engineering studio that designs, builds, and launches mobile and web
          products. This website is an introduction to our work and a way to get in touch — it is not an
          offer or a binding contract for services.
        </p>
      </LegalSection>

      <LegalSection heading="2. Use of this website">
        <p>
          You may use this website for lawful purposes only. You agree not to misuse it, attempt to
          disrupt it, or access it in any way that could damage or impair the site or its availability to
          others.
        </p>
      </LegalSection>

      <LegalSection heading="3. Enquiries & quotes">
        <p>
          Any quote, timeline, or estimate we share in response to your enquiry is indicative until
          confirmed in a written agreement signed by both parties. Project scope, pricing, deliverables,
          and timelines are defined in that separate engagement agreement.
        </p>
      </LegalSection>

      <LegalSection heading="4. Intellectual property">
        <p>
          The {site.name} name, logo, branding, and the content of this website are our property. Work we
          build for clients is governed by the relevant engagement agreement — where agreed, clients
          receive full ownership of the delivered source code.
        </p>
      </LegalSection>

      <LegalSection heading="5. Limitation of liability">
        <p>
          This website is provided &ldquo;as is&rdquo;. While we work to keep information accurate and the
          site available, we make no warranties and are not liable for any loss arising from your use of,
          or inability to use, this website.
        </p>
      </LegalSection>

      <LegalSection heading="6. Changes to these terms">
        <p>
          We may update these terms from time to time. The latest version will always be available on this
          page, with the &ldquo;last updated&rdquo; date reflecting any changes.
        </p>
      </LegalSection>

      <LegalSection heading="7. Contact">
        <p>
          Questions about these terms? Reach us on{" "}
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-emerald-glow underline">
            WhatsApp
          </a>{" "}
          or email <a href={`mailto:${site.email}`} className="text-emerald-glow underline">{site.email}</a>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
