import Link from "next/link";
import EditorialPage from "../../components/EditorialPage";
import { createPageMetadata } from "../../lib/seo.js";

export const metadata = createPageMetadata({
  title: "Terms of Use",
  description: "Starter terms of use for Path & Roam.",
  pathname: "/terms",
  noindex: true,
});

export default function TermsPage() {
  return (
    <EditorialPage
      eyebrow="Legal"
      title="Terms of use"
      intro="These starter terms outline the intended use of Path & Roam."
      notice={
        <>
          <strong>Owner/legal review required:</strong> confirm ownership, permitted use,
          liability language, governing law, dispute terms and effective date before launch.
        </>
      }
    >
      <section>
        <h2>Editorial information</h2>
        <p>
          Content is provided for general travel planning and may change. Readers remain
          responsible for checking current requirements and making their own travel decisions.
        </p>
      </section>
      <section>
        <h2>Third-party services</h2>
        <p>
          Links may lead to services operated by third parties. Their availability, terms
          and performance are outside Path &amp; Roam&apos;s control. Affiliate links are
          explained in the <Link href="/affiliate-disclosure">affiliate disclosure</Link>.
        </p>
      </section>
      <section>
        <h2>Use of content</h2>
        <p>
          Site text, design and original materials may not be republished or commercially
          reused without permission, except where applicable law allows it. Final ownership
          and licensing language requires review.
        </p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>
          These terms may be updated when the site or applicable requirements change. An
          effective date and contact route must be added after owner/legal review.
        </p>
      </section>
    </EditorialPage>
  );
}
