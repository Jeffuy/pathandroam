import Link from "next/link";
import EditorialPage from "../../components/EditorialPage";
import { createPageMetadata } from "../../lib/seo.js";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy information for Path & Roam.",
  pathname: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="This notice describes the main ways information may be handled on Path & Roam."
    >
      <section>
        <h2>Information you provide</h2>
        <p>
          Path &amp; Roam may receive information you choose to send by email, such as
          your email address and message. It should be used only to respond and manage
          the related correspondence.
        </p>
      </section>
      <section>
        <h2>Technical information</h2>
        <p>
          Hosting processes technical information needed to deliver and protect this
          website. Google&apos;s tag loads with analytics storage denied before consent and
          may send cookieless measurement pings. Advertising consent remains denied.
          With your consent, Google Analytics (when configured) measures visits
          and booking-link interactions, content engagement and page performance.
          Affiliate booking widgets load when you
          accept that category. Travelpayouts Drive loads on every page independently
          of these choices for the site&apos;s affiliate integration. These providers
          may process device, browser, referral and interaction information.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          Use Cookie settings at the bottom of any page to reject optional tracking
          or revise your choices. See the <Link href="/cookies">cookie policy</Link> for
          storage duration, provider policies and withdrawal details. Ordinary
          outbound booking links remain available without optional tracking consent.
        </p>
      </section>
    </EditorialPage>
  );
}
