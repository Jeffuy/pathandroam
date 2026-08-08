import { siteConfig } from "../lib/site-config.js";
import { absoluteUrl } from "../lib/seo.js";

export default function robots() {
  if (!siteConfig.indexingEnabled) {
    return {
      rules: [
        { userAgent: "*", disallow: "/" },
        { userAgent: "Googlebot", disallow: "/" },
      ],
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/templates/" },
      { userAgent: "Googlebot", allow: "/", disallow: "/templates/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.siteUrl,
  };
}
