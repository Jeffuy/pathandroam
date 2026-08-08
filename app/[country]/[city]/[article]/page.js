import { notFound } from "next/navigation";
import MarkdownContent from "../../../../components/MarkdownContent";
import ArticleLayout from "../../../../components/templates/ArticleLayout";
import StructuredData from "../../../../components/StructuredData";
import { getAuthor } from "../../../../data/authors";
import {
  getArticle,
  getArticleParams,
  getContentMetadata,
  getContentRoute,
  getRelatedContent,
} from "../../../../lib/content";
import {
  articleStructuredData,
  breadcrumbStructuredData,
} from "../../../../lib/structured-data.js";

export async function generateStaticParams() {
  return getArticleParams();
}

export async function generateMetadata({ params }) {
  const { country, city, article } = await params;
  const entry = await getArticle(country, city, article);
  return entry && !entry.draft ? getContentMetadata(entry) : {};
}

function formatDate(value) {
  if (!value) return null;
  return {
    iso: value,
    label: new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${value}T00:00:00Z`)),
  };
}

export default async function ArticlePage({ params }) {
  const { country, city, article } = await params;
  const entry = await getArticle(country, city, article);
  if (!entry || entry.draft) notFound();

  const author = getAuthor(entry.author);
  if (!author) notFound();
  const related = await getRelatedContent(entry.relatedSlugs);
  const articleContent = {
    category: entry.contentType === "article" ? "Travel guide" : entry.contentType,
    destination: entry.city,
    title: entry.title,
    subtitle: entry.description,
    author,
    publishedAt: formatDate(entry.publishedAt),
    updatedAt: entry.updatedAt !== entry.publishedAt ? formatDate(entry.updatedAt) : null,
    heroImage: entry.heroImage,
    heroAlt: entry.heroAlt,
    heroIllustrative: entry.heroIllustrative,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: entry.country, href: `/${country}` },
      { label: entry.city, href: `/${country}/${city}` },
      { label: entry.title },
    ],
    affiliateDisclosure: entry.affiliateDisclosure,
    affiliateKeys: entry.affiliateKeys,
    practicalSummary: null,
    tableOfContents: entry.tableOfContents,
    monetizationSlots: [],
    practicalInfo: [],
    sources: entry.sources,
    relatedArticles: related.map((item) => ({
      label: item.contentType === "country" ? "Country guide" : item.contentType === "city" ? "City guide" : "Article",
      title: item.title,
      href: getContentRoute(item),
    })),
    html: <MarkdownContent html={entry.html} />,
  };

  const pathname = getContentRoute(entry);

  return (
    <>
      <StructuredData
        data={[
          articleStructuredData({ article: entry, author, pathname }),
          breadcrumbStructuredData([
            { name: "Home", pathname: "/" },
            { name: entry.country, pathname: `/${country}` },
            { name: entry.city, pathname: `/${country}/${city}` },
            { name: entry.title, pathname },
          ]),
        ]}
      />
      <ArticleLayout article={articleContent} />
    </>
  );
}
