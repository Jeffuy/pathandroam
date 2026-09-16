import { notFound } from "next/navigation";
import MarkdownContent from "../../components/MarkdownContent";
import CountryHubLayout from "../../components/templates/CountryHubLayout";
import StructuredData from "../../components/StructuredData";
import { breadcrumbStructuredData } from "../../lib/structured-data.js";
import { affiliateContextLabel } from "../../data/affiliates.js";
import {
  getContentMetadata,
  getAllContent,
  getContentRoute,
  getCountry,
  getCountryParams,
  getRelatedContent,
  isPublishedMonetizedContent,
  sortCommercialContent,
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
  if (!entry || entry.draft) notFound();

  const related = await getRelatedContent(entry.relatedSlugs);
  const commercialEntries = sortCommercialContent((await getAllContent())
    .filter((item) => item.contentType === "article" && item.countrySlug === countrySlug && isPublishedMonetizedContent(item)))
    .slice(0, 4);
  const country = {
    name: entry.country,
    introduction: entry.description,
    heroImage: entry.heroImage,
    heroAlt: entry.heroAlt,
    breadcrumbs: [{ label: "Home", href: "/" }, { label: entry.country }],
    relatedArticles: related.map((item) => ({
      label: item.contentType === "city" ? "City guide" : "Article",
      title: item.title,
      href: getContentRoute(item),
    })),
    commercialArticles: commercialEntries.map((item) => ({
      label: affiliateContextLabel(item.affiliateLinks?.[0]?.context || item.affiliateWidgets?.[0]?.context),
      title: item.title,
      description: item.description,
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
        <section className="template-copy content-copy" aria-label={`${entry.country} guide content`}>
          <MarkdownContent affiliateLinks={entry.affiliateLinks} affiliateWidgets={entry.affiliateWidgets} html={entry.html} showAffiliateDisclosure={entry.affiliateDisclosure} />
        </section>
      </CountryHubLayout>
    </>
  );
}
