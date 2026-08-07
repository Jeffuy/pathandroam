const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteConfig = Object.freeze({
  name: "Path & Roam",
  tagline: "See more. Plan smarter.",
  siteUrl: configuredSiteUrl.replace(/\/$/, ""),
  indexingEnabled: process.env.NEXT_PUBLIC_INDEXING_ENABLED === "true",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
});
