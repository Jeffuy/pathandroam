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
        <h2>Research and review</h2>
        <p>
          Content is researched before publication and reviewed before it goes live.
          Time-sensitive facts should rely on current, reliable sources whenever possible.
        </p>
      </section>
      <section>
        <h2>AI assistance</h2>
        <p>
          AI may assist with research, organization, drafting and illustrative imagery.
          Editorial review remains part of the publication process. AI-generated imagery
          is not presented as documentary evidence.
        </p>
      </section>
      <section>
        <h2>Firsthand information</h2>
        <p>
          Firsthand experience is identified only when it is genuinely available. We do
          not imply personal visits, stays, tours or testing where none has been supplied.
        </p>
      </section>
      <section>
        <h2>Commercial independence</h2>
        <p>
          Affiliate relationships do not determine editorial conclusions. Commercial
          links are disclosed and kept separate from the research behind recommendations.
        </p>
      </section>
      <section>
        <h2>Corrections and updates</h2>
        <p>
          Readers may request corrections. Updated dates are changed only when a page has
          received a meaningful editorial or factual update.
        </p>
      </section>
    </EditorialPage>
  );
}
