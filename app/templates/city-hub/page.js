import Callout from "../../../components/Callout";
import CityHubLayout from "../../../components/templates/CityHubLayout";
import { relatedTemplatePreviews } from "../../../data/template-previews";

const city = {
  name: "Limerick",
  introduction: "A draft city hub preview for testing hierarchy, imagery and practical planning modules before real editorial content is added.",
  heroImage: "/images/articles/coastal-town-placeholder.webp",
  heroAlt: "Illustrative stone street used as a city hub template placeholder",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Ireland", href: "/templates/country-hub" }, { label: "Limerick" }],
  practicalInfo: [
    { label: "Content status", value: "Draft template only" },
    { label: "Research", value: "Verification pending" },
    { label: "Indexing", value: "Noindex" },
  ],
  relatedArticles: [relatedTemplatePreviews[0], relatedTemplatePreviews[2]],
};

export default function CityHubPreviewPage() {
  return (
    <CityHubLayout city={city}>
      <section className="template-copy" aria-labelledby="city-overview-title">
        <p className="story-label">City overview</p>
        <h2 id="city-overview-title">Build the visit around useful decisions</h2>
        <p>This placeholder area tests room for an editorial overview, transport context and links to future verified city guides.</p>
      </section>
      <Callout label="Template note" title="No destination claims yet">
        <p>All visible copy is structural placeholder text and does not describe personal experience or publish travel advice.</p>
      </Callout>
    </CityHubLayout>
  );
}
