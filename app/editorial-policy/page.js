import EditorialPage from "../../components/EditorialPage";
import { createPageMetadata } from "../../lib/seo.js";

export const metadata = createPageMetadata({
  title: "Editorial Policy",
  description: "How Path & Roam researches, reviews, updates and funds its editorial work.",
  pathname: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <EditorialPage
      eyebrow="Standards"
      title="Editorial policy"
      intro="The principles behind how Path & Roam prepares and maintains travel content."
    >
      <section>
        <h2>Research and current information</h2>
        <p>
          Guides are based on reliable sources, with official information preferred for
          transport, opening times, prices and other details that can change. Important
          facts are checked before publication.
        </p>
      </section>
      <section>
        <h2>Firsthand information</h2>
        <p>
          Firsthand input is included only when it is genuinely available and clearly
          relevant. We do not imply personal visits, stays, tours or testing where none
          has been supplied.
        </p>
      </section>
      <section>
        <h2>Images</h2>
        <p>
          Documentary photographs are credited when their licences require it.
          Illustrations are labelled and are not presented as photographs of named places.
        </p>
      </section>
      <section>
        <h2>Commercial independence</h2>
        <p>
          Affiliate relationships do not determine editorial conclusions. Commercial
          links are disclosed, and recommendations must remain useful without a purchase.
        </p>
      </section>
      <section>
        <h2>Corrections and updates</h2>
        <p>
          Readers may request corrections. An updated date reflects a meaningful factual
          or editorial change rather than a cosmetic edit.
        </p>
      </section>
    </EditorialPage>
  );
}
