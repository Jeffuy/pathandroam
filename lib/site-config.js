function normalizeSiteUrl(value) {
  try {
    const url = new URL(value || "http://localhost:3000");
    url.hash = "";
    url.search = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return "http://localhost:3000";
  }
}

const configuredSiteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const siteConfig = Object.freeze({
  name: "Path & Roam",
  tagline: "See more. Plan smarter.",
  description: "Independent travel guides, practical itineraries and clear planning advice.",
  siteUrl: configuredSiteUrl,
  indexingEnabled: process.env.NEXT_PUBLIC_INDEXING_ENABLED === "true",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
});
