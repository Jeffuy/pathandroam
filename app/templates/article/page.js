import Callout from "../../../components/Callout";
import ArticleLayout from "../../../components/templates/ArticleLayout";
import { previewAuthor, relatedTemplatePreviews } from "../../../data/template-previews";

const article = {
  category: "Trip planning",
  destination: "Ireland",
  title: "A clear framework for a thoughtful itinerary",
  subtitle: "A draft article preview demonstrating long-form hierarchy, planning modules and responsible monetization positions.",
  author: previewAuthor,
  publishedAt: { iso: "2026-08-07", label: "August 7, 2026" },
  updatedAt: null,
  heroImage: "/images/articles/rail-journey-placeholder.png",
  heroAlt: "Illustrative train window scene used for an article layout preview",
  breadcrumbs: [{ label: "Home", href: "/" }, { label: "Ireland", href: "/templates/country-hub" }, { label: "Article template" }],
  affiliateDisclosure: "Future affiliate recommendations will be clearly disclosed and will only render when a verified, enabled entry exists.",
  practicalSummary: [
    { label: "Status", value: "Draft template" },
    { label: "Reading time", value: "Placeholder" },
    { label: "Advice", value: "Not yet published" },
  ],
  tableOfContents: [
    { id: "planning-framework", label: "Planning framework" },
    { id: "route-logic", label: "Route logic" },
    { id: "sources", label: "Sources" },
  ],
  monetizationSlots: [
    { title: "A relevant planning tool", description: "Reserved for a useful, contextual recommendation connected to the surrounding editorial section." },
    { title: "A relevant booking option", description: "Reserved for a future recommendation without fake pricing, urgency or unsupported claims." },
  ],
  practicalInfo: [
    { label: "Publication status", value: "Draft and noindex" },
    { label: "Fact checking", value: "Required before publication" },
    { label: "Affiliate links", value: "Disabled" },
  ],
  sources: [
    { label: "Primary source citation placeholder", note: "To be replaced with a verified source." },
    { label: "Transport source citation placeholder", note: "Time-sensitive details require review." },
  ],
  relatedArticles: relatedTemplatePreviews.slice(0, 2),
};

export const metadata = { title: "Article Template" };

export default function ArticleTemplatePreviewPage() {
  return (
    <ArticleLayout article={article}>
      <section id="planning-framework">
        <p className="story-label">Section one</p>
        <h2>Planning framework</h2>
        <p>This draft section demonstrates the measure, spacing and typographic rhythm intended for server-rendered editorial text.</p>
        <p>Future articles can use this structure for researched guidance while keeping headings direct and the reading experience calm.</p>
      </section>
      <Callout title="Keep the purpose visible">
        <p>A useful article should help a reader make a decision, understand a tradeoff or plan the next practical step.</p>
      </Callout>
      <section id="route-logic">
        <p className="story-label">Section two</p>
        <h2>Route logic</h2>
        <p>This second section tests in-page navigation and the transition between narrative copy, callouts and later practical information.</p>
        <blockquote>Placeholder quotation styling should support emphasis without pretending to quote a traveller or source.</blockquote>
      </section>
    </ArticleLayout>
  );
}
