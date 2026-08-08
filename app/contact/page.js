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
          <p>Contact email will be published here once it has been configured.</p>
        )}
      </section>
      <section>
        <h2>Contact form</h2>
        <p>
          There is no contact form or backend form service at this stage. Please do not
          send sensitive personal information.
        </p>
      </section>
    </EditorialPage>
  );
}
