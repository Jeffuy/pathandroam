import { siteConfig } from "./site-config.js";
import { absoluteUrl } from "./seo.js";

const context = "https://schema.org";

export function websiteStructuredData() {
  return {
    "@context": context,
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}/#website`,
    url: siteConfig.siteUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "en",
  };
}

export function organizationStructuredData() {
  return {
    "@context": context,
    "@type": "Organization",
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
  };
}

export function personStructuredData({ name, pathname, jobTitle, description }) {
  return {
    "@context": context,
    "@type": "Person",
    "@id": `${absoluteUrl(pathname)}#person`,
    name,
    url: absoluteUrl(pathname),
    jobTitle: jobTitle || undefined,
    description: description || undefined,
  };
}

export function articleStructuredData({ article, author, pathname }) {
  return {
    "@context": context,
    "@type": "Article",
    "@id": `${absoluteUrl(pathname)}#article`,
    headline: article.title,
    description: article.description,
    url: absoluteUrl(pathname),
    mainEntityOfPage: absoluteUrl(pathname),
    image: article.heroImage ? absoluteUrl(article.heroImage) : undefined,
    datePublished: article.publishedAt || undefined,
    dateModified: article.updatedAt || article.publishedAt || undefined,
    articleSection: article.contentType,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords]
      .filter(Boolean)
      .join(", ") || undefined,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: author.name,
      url: absoluteUrl(author.href),
    },
    publisher: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
  };
}

export function breadcrumbStructuredData(items) {
  return {
    "@context": context,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.pathname),
    })),
  };
}
