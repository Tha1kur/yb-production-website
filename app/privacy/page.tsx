import type { Metadata } from "next";
import { LegalShell, LegalSection } from "@/components/LegalShell";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your information.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="26 June 2026">
      <p className="text-[15px] leading-relaxed text-white/70">
        At {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), your privacy matters.
        This policy explains what information we collect when you use this website, why we collect it,
        and how we keep it safe.
      </p>

      <LegalSection heading="1. Information we collect">
        <p>
          We only collect information you choose to give us. When you submit our contact form or message
          us, we may collect your <strong>name, phone number, email address</strong>, and the{" "}
          <strong>project details</strong> you share. We do not require you to create an account, and we
          do not collect sensitive personal data.
        </p>
      </LegalSection>

      <LegalSection heading="2. How we use your information">
        <p>We use the information you provide only to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Respond to your enquiry and discuss your project;</li>
          <li>Prepare quotes, proposals, and deliver work you engage us for;</li>
          <li>Communicate with you about your project.</li>
        </ul>
        <p>We never sell, rent, or trade your personal information to third parties.</p>
      </LegalSection>

      <LegalSection heading="3. How your data is handled">
        <p>
          Contact-form submissions are delivered to us through a secure third-party form provider and by
          email. Messages you send over WhatsApp are handled in line with WhatsApp&apos;s own privacy
          policy. We keep your information only for as long as needed to assist you, and we apply
          reasonable safeguards to protect it.
        </p>
      </LegalSection>

      <LegalSection heading="4. Cookies & analytics">
        <p>
          This website is intentionally lightweight. We do not use advertising trackers. If we add basic,
          privacy-respecting analytics in the future to understand site usage, this policy will be updated
          accordingly.
        </p>
      </LegalSection>

      <LegalSection heading="5. Third-party links">
        <p>
          Our site may link to external services (such as WhatsApp). We are not responsible for the
          privacy practices of those services and encourage you to review their policies.
        </p>
      </LegalSection>

      <LegalSection heading="6. Your rights">
        <p>
          You can ask us to access, correct, or delete the personal information you&apos;ve shared with us
          at any time. Just reach out and we&apos;ll take care of it promptly.
        </p>
      </LegalSection>

      <LegalSection heading="7. Contact us">
        <p>
          Questions about this policy or your data? Message us on{" "}
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-emerald-glow underline">
            WhatsApp
          </a>{" "}
          or email <a href={`mailto:${site.email}`} className="text-emerald-glow underline">{site.email}</a>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
