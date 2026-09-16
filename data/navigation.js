import { siteConfig } from "../lib/site-config.js";

export const primaryNavigation = [
  { label: "Ireland", href: "/ireland/" },
  { label: "Limerick", href: "/ireland/limerick/" },
  { label: "Plan & book", href: "/#bookable-guides", emphasis: true },
  { label: "About", href: "/about" },
];

export const footerNavigation = [
  ...primaryNavigation,
  { label: "Editorial Policy", href: "/editorial-policy" },
  ...(siteConfig.contactEmail ? [{ label: "Contact", href: "/contact" }] : []),
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
  { label: "Terms", href: "/terms" },
];
