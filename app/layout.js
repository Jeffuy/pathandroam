import "./globals.css";
import { siteConfig } from "../lib/site-config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StructuredData from "../components/StructuredData";
import TrackingConsent from "../components/analytics/TrackingConsent";
import { createPageMetadata } from "../lib/seo.js";
import { getAllContent, getContentRoute } from "../lib/content.js";
import {
  organizationStructuredData,
  websiteStructuredData,
} from "../lib/structured-data.js";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  ...createPageMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    pathname: "/",
  }),
  alternates: undefined,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  verification: siteConfig.googleSiteVerification
    ? { google: siteConfig.googleSiteVerification }
    : undefined,
};

export default async function RootLayout({ children }) {
  const catalog = Object.fromEntries((await getAllContent())
    .filter((entry) => !entry.draft && !entry.noindex)
    .map((entry) => [getContentRoute(entry), {
      content_type: entry.contentType === "article" ? "article" : "destination",
      content_id: entry.slug,
      content_title: entry.title,
      destination: entry.citySlug || entry.countrySlug || entry.slug,
      country: entry.country,
    }]));
  catalog["/"] = { content_type: "homepage", content_id: "home", content_title: siteConfig.name };
  return (
    <html lang="en">
      <head>
        <script
          id="travelpayouts-drive"
          nowprocket=""
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          seraph-accel-crit="1"
          data-no-defer="1"
          data-cmp-ab="2"
          dangerouslySetInnerHTML={{ __html: `
            (function () {
                var script = document.createElement("script");
                script.async = 1;
                script.setAttribute("data-cmp-ab","2");
                script.src = 'https://emrld.ltd/NTU5ODY5.js?t=559869';
                document.head.appendChild(script);
            })();
          ` }}
        />
      </head>
      <body>
        <StructuredData
          data={[websiteStructuredData(), organizationStructuredData()]}
        />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        {children}
        <Footer />
        <TrackingConsent
          catalog={catalog}
          deployment={process.env.NODE_ENV === "production" ? process.env.VERCEL_ENV || "unknown" : "development"}
        />
      </body>
    </html>
  );
}
