import "./globals.css";
import Script from "next/script";
import { siteConfig } from "../lib/site-config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StructuredData from "../components/StructuredData";
import { createPageMetadata } from "../lib/seo.js";
import {
  organizationStructuredData,
  websiteStructuredData,
} from "../lib/structured-data.js";

const travelpayoutsDriveScript = `
  (function () {
      var script = document.createElement("script");
      script.async = 1;
      script.setAttribute("data-cmp-ab","2");
      script.src = 'https://emrld.ltd/NTU5ODY5.js?t=559869';
      document.head.appendChild(script);
  })();
`;

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
        <Script
          id="travelpayouts-drive"
          strategy="lazyOnload"
          nowprocket=""
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          seraph-accel-crit="1"
          data-no-defer="1"
          data-cmp-ab="2"
          dangerouslySetInnerHTML={{ __html: travelpayoutsDriveScript }}
        />
      </body>
    </html>
  );
}
