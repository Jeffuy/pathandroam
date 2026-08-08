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
          Hosting, analytics or affiliate technology may process standard technical data,
          such as device, browser, referral and interaction information.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          Available privacy rights and request procedures depend on applicable law and
          the visitor&apos;s location.
        </p>
      </section>
    </EditorialPage>
  );
}
