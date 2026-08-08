import { siteConfig } from "./site-config.js";

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, `${siteConfig.siteUrl}/`).toString();
}

export function isIndexable({ draft = false, noindex = false } = {}) {
  return siteConfig.indexingEnabled && !draft && !noindex;
}

export function getCanonicalUrl(pathname, options = {}) {
  return isIndexable(options) ? absoluteUrl(pathname) : undefined;
}

export function getRobotsMetadata(options = {}) {
  const indexable = isIndexable(options);
  return {
    index: indexable,
    follow: indexable,
    googleBot: {
      index: indexable,
      follow: indexable,
    },
  };
}

export function createPageMetadata({
  title,
  description,
  pathname = "/",
  image,
  imageAlt,
  type = "website",
  draft = false,
  noindex = false,
}) {
  const options = { draft, noindex };
  const canonical = getCanonicalUrl(pathname, options);
  const pageUrl = absoluteUrl(pathname);
  const imageUrl = image ? absoluteUrl(image) : undefined;
  const brandedTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: getRobotsMetadata(options),
    openGraph: {
      type,
      siteName: siteConfig.name,
      title: brandedTitle,
      description,
      url: pageUrl,
      locale: "en_US",
      images: imageUrl
        ? [{ url: imageUrl, alt: imageAlt || title }]
        : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: brandedTitle,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
