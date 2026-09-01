import { notFound } from "next/navigation";
import MarkdownContent from "../../../components/MarkdownContent";
import SourcesList from "../../../components/SourcesList";
import CityHubLayout from "../../../components/templates/CityHubLayout";
import StructuredData from "../../../components/StructuredData";
import { breadcrumbStructuredData } from "../../../lib/structured-data.js";
import { affiliateContextLabel } from "../../../data/affiliates.js";
import {
  getCity,
  getAllContent,
  getCityParams,
  getContentMetadata,
  getContentRoute,
  getRelatedContent,
  isPublishedMonetizedContent,
  sortCommercialContent,
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
  const commercialEntries = sortCommercialContent((await getAllContent())
    .filter((item) => item.contentType === "article" && item.countrySlug === country && item.citySlug === city && isPublishedMonetizedContent(item)))
    .slice(0, 4);
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
    practicalInfo: [],
    commercialArticles: commercialEntries.map((item) => ({
      label: affiliateContextLabel(item.affiliateLinks?.[0]?.context || item.affiliateWidgets?.[0]?.context),
      title: item.title,
      description: item.description,
      href: getContentRoute(item),
    })),
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
          <MarkdownContent affiliateLinks={entry.affiliateLinks} affiliateWidgets={entry.affiliateWidgets} html={entry.html} showAffiliateDisclosure={entry.affiliateDisclosure} />
          <SourcesList sources={entry.sources} />
        </div>
      </CityHubLayout>
    </>
  );
}
