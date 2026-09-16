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
      { userAgent: "*", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.siteUrl,
  };
}
