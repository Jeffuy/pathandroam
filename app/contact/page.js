import EditorialPage from "../../components/EditorialPage";
import { createPageMetadata } from "../../lib/seo.js";
import { siteConfig } from "../../lib/site-config.js";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Contact Path & Roam about corrections, sources or editorial questions.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <EditorialPage
      eyebrow="Get in touch"
      title="Contact"
      intro="For corrections, source updates and general editorial questions, contact Path & Roam by email."
    >
      <section>
        <h2>Email</h2>
        {siteConfig.contactEmail ? (
          <p>
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </p>
        ) : (
          <p>Email contact is not currently available.</p>
        )}
      </section>
    </EditorialPage>
  );
}
