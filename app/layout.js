import "./globals.css";
import { siteConfig } from "../lib/site-config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StructuredData from "../components/StructuredData";
import { createPageMetadata } from "../lib/seo.js";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StructuredData
          data={[websiteStructuredData(), organizationStructuredData()]}
        />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
