import { notFound } from "next/navigation";
import MarkdownContent from "../../components/MarkdownContent";
import CountryHubLayout from "../../components/templates/CountryHubLayout";
import StructuredData from "../../components/StructuredData";
import { breadcrumbStructuredData } from "../../lib/structured-data.js";
import {
  getContentMetadata,
  getContentRoute,
  getCountry,
  getCountryParams,
  getRelatedContent,
} from "../../lib/content";

export async function generateStaticParams() {
  return getCountryParams();
}

export async function generateMetadata({ params }) {
  const { country } = await params;
  return getContentMetadata(await getCountry(country));
}

export default async function CountryPage({ params }) {
  const { country: countrySlug } = await params;
  const entry = await getCountry(countrySlug);
  if (!entry) notFound();

  const related = await getRelatedContent(entry.relatedSlugs);
  const country = {
    name: entry.country,
    introduction: entry.description,
    heroImage: entry.heroImage,
    heroAlt: entry.heroAlt,
    draft: entry.draft,
    noindex: entry.noindex,
    breadcrumbs: [{ label: "Home", href: "/" }, { label: entry.country }],
    relatedArticles: related.map((item) => ({
      label: item.contentType === "city" ? "City guide" : "Article",
      title: item.title,
      href: getContentRoute(item),
    })),
  };

  return (
    <>
      <StructuredData
        data={breadcrumbStructuredData([
          { name: "Home", pathname: "/" },
          { name: entry.country, pathname: getContentRoute(entry) },
        ])}
      />
      <CountryHubLayout country={country}>
        <section className="template-copy content-copy" aria-label={`${entry.country} draft content`}>
          <MarkdownContent html={entry.html} />
        </section>
      </CountryHubLayout>
    </>
  );
}
