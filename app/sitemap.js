import { getAllContent, getContentRoute } from "../lib/content.js";
import { siteConfig } from "../lib/site-config.js";
import { absoluteUrl } from "../lib/seo.js";

export default async function sitemap() {
  if (!siteConfig.indexingEnabled) return [];

  const content = await getAllContent();
  const contentEntries = content
    .filter((entry) => !entry.draft && !entry.noindex)
    .map((entry) => ({
      url: absoluteUrl(getContentRoute(entry)),
      lastModified: entry.updatedAt || entry.publishedAt || undefined,
      changeFrequency: entry.contentType === "article" ? "monthly" : "weekly",
      priority: entry.contentType === "country" ? 0.9 : entry.contentType === "city" ? 0.8 : 0.7,
    }));

  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/authors/mara-vale"), changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/editorial-policy"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/affiliate-disclosure"), changeFrequency: "yearly", priority: 0.2 },
    ...contentEntries,
  ];
}
