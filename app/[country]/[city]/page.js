import { notFound } from "next/navigation";
import MarkdownContent from "../../../components/MarkdownContent";
import CityHubLayout from "../../../components/templates/CityHubLayout";
import {
  getCity,
  getCityParams,
  getContentMetadata,
  getContentRoute,
  getRelatedContent,
} from "../../../lib/content";

export async function generateStaticParams() {
  return getCityParams();
}

export async function generateMetadata({ params }) {
  const { country, city } = await params;
  return getContentMetadata(await getCity(country, city));
}

export default async function CityPage({ params }) {
  const { country, city } = await params;
  const entry = await getCity(country, city);
  if (!entry) notFound();

  const related = await getRelatedContent(entry.relatedSlugs);
  const cityContent = {
    name: entry.city,
    introduction: entry.description,
    heroImage: entry.heroImage,
    heroAlt: entry.heroAlt,
    draft: entry.draft,
    noindex: entry.noindex,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: entry.country, href: `/${country}` },
      { label: entry.city },
    ],
    practicalInfo: [
      { label: "Content status", value: entry.draft ? "Draft" : "Published" },
      { label: "Region", value: entry.region || "Not specified" },
      { label: "Indexing", value: entry.noindex ? "Noindex" : "Indexable" },
    ],
    relatedArticles: related.map((item) => ({
      label: item.contentType === "country" ? "Country guide" : "Article",
      title: item.title,
      href: getContentRoute(item),
    })),
  };

  return (
    <CityHubLayout city={cityContent}>
      <section className="template-copy content-copy" aria-label={`${entry.city} draft content`}>
        <MarkdownContent html={entry.html} />
      </section>
    </CityHubLayout>
  );
}
