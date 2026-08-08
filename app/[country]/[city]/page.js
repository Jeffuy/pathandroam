import { notFound } from "next/navigation";
import MarkdownContent from "../../../components/MarkdownContent";
import SourcesList from "../../../components/SourcesList";
import CityHubLayout from "../../../components/templates/CityHubLayout";
import StructuredData from "../../../components/StructuredData";
import { breadcrumbStructuredData } from "../../../lib/structured-data.js";
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
    heroIllustrative: entry.heroIllustrative,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: entry.country, href: `/${country}` },
      { label: entry.city },
    ],
    practicalInfo: [
      { label: "Region", value: entry.region || "Not specified" },
    ],
    relatedArticles: related.map((item) => ({
      label: item.contentType === "country" ? "Country guide" : "Article",
      title: item.title,
      href: getContentRoute(item),
    })),
  };

  return (
    <>
      <StructuredData
        data={breadcrumbStructuredData([
          { name: "Home", pathname: "/" },
          { name: entry.country, pathname: `/${country}` },
          { name: entry.city, pathname: getContentRoute(entry) },
        ])}
      />
      <CityHubLayout city={cityContent}>
        <div className="template-copy content-copy">
          <MarkdownContent html={entry.html} />
          <SourcesList sources={entry.sources} />
        </div>
      </CityHubLayout>
    </>
  );
}
