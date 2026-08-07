import Callout from "../../../components/Callout";
import CountryHubLayout from "../../../components/templates/CountryHubLayout";
import { relatedTemplatePreviews } from "../../../data/template-previews";

const country = {
  name: "Ireland",
  introduction: "A visual preview of the country hub structure. Destination research and publishable guidance will be added in a later phase.",
  heroImage: "/images/destinations/ireland-coast-placeholder.png",
  heroAlt: "Illustrative green coastal landscape used for the Ireland template preview",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Template previews" }, { label: "Ireland" }],
  relatedArticles: relatedTemplatePreviews.slice(1),
};

export const metadata = { title: "Country Hub Template" };

export default function CountryHubPreviewPage() {
  return (
    <CountryHubLayout country={country}>
      <section className="template-copy" aria-labelledby="country-overview-title">
        <p className="story-label">Country overview</p>
        <h2 id="country-overview-title">A clear starting point for planning</h2>
        <p>This space demonstrates the editorial introduction, destination hierarchy and reading rhythm without publishing factual destination content.</p>
      </section>
      <Callout title="Research before publishing">
        <p>Transport, timing and practical details shown in a future country hub must be verified against reliable sources.</p>
      </Callout>
    </CountryHubLayout>
  );
}
