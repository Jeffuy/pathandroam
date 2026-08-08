import EditorialPage from "../../components/EditorialPage";
import { createPageMetadata } from "../../lib/seo.js";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description: "Cookie information for Path & Roam.",
  pathname: "/cookies",
  noindex: true,
});

export default function CookiesPage() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Cookie policy"
      intro="This notice explains how cookies and similar browser storage may be used."
    >
      <section>
        <h2>How cookies may be used</h2>
        <p>
          Site infrastructure and third-party services may use cookies or similar storage
          for essential operation, measurement or affiliate attribution.
        </p>
      </section>
      <section>
        <h2>Your controls</h2>
        <p>
          Browser settings can usually remove or block cookies. Blocking some storage may
          affect how third-party features work.
        </p>
      </section>
    </EditorialPage>
  );
}
