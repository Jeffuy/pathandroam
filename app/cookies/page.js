import EditorialPage from "../../components/EditorialPage";
import { createPageMetadata } from "../../lib/seo.js";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description: "Starter cookie information for Path & Roam.",
  pathname: "/cookies",
  noindex: true,
});

export default function CookiesPage() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Cookie policy"
      intro="This starter notice explains how cookies and similar browser storage may be used."
      notice={
        <>
          <strong>Owner/legal review required:</strong> audit active cookies and storage,
          confirm consent requirements and document the controls available to visitors.
        </>
      }
    >
      <section>
        <h2>How cookies may be used</h2>
        <p>
          Site infrastructure and third-party services may use cookies or similar storage
          for essential operation, measurement or affiliate attribution. The final list
          must reflect the services actually active on the site.
        </p>
      </section>
      <section>
        <h2>Your controls</h2>
        <p>
          Browser settings can usually remove or block cookies. Any required consent tool,
          category controls and withdrawal process must be confirmed before launch.
        </p>
      </section>
    </EditorialPage>
  );
}
