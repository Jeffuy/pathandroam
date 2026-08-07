import { notFound } from "next/navigation";
import MarkdownContent from "../../../../components/MarkdownContent";
import ArticleLayout from "../../../../components/templates/ArticleLayout";
import { getAuthor } from "../../../../data/authors";
import {
  getArticle,
  getArticleParams,
  getContentMetadata,
  getContentRoute,
  getRelatedContent,
} from "../../../../lib/content";

export async function generateStaticParams() {
  return getArticleParams();
}

export async function generateMetadata({ params }) {
  const { country, city, article } = await params;
  return getContentMetadata(await getArticle(country, city, article));
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
  if (!entry) notFound();

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
    draft: entry.draft,
    heroImage: entry.heroImage,
    heroAlt: entry.heroAlt,
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: entry.country, href: `/${country}` },
      { label: entry.city, href: `/${country}/${city}` },
      { label: entry.title },
    ],
    affiliateDisclosure: entry.affiliateDisclosure,
    affiliateKeys: entry.affiliateKeys,
    practicalSummary: [
      { label: "Status", value: entry.draft ? "Draft" : "Published" },
      { label: "Region", value: entry.region || "Not specified" },
      { label: "Indexing", value: entry.noindex ? "Noindex" : "Indexable" },
    ],
    tableOfContents: entry.tableOfContents,
    monetizationSlots: [],
    practicalInfo: [
      { label: "Publication status", value: entry.draft ? "Draft and noindex" : "Published" },
      { label: "Fact checking", value: "Required before publication" },
      { label: "Affiliate links", value: entry.affiliateKeys.length ? "Configured" : "Disabled" },
    ],
    sources: entry.sources,
    relatedArticles: related.map((item) => ({
      label: item.contentType === "country" ? "Country guide" : item.contentType === "city" ? "City guide" : "Article",
      title: item.title,
      href: getContentRoute(item),
    })),
    html: <MarkdownContent html={entry.html} />,
  };

  return <ArticleLayout article={articleContent} />;
}
