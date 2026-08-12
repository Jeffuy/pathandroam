import { isValidAffiliateWidgetUrl } from "../lib/affiliate-widget.js";

export const affiliateRegistry = Object.freeze({
  viator: Object.freeze({
    key: "viator",
    provider: "Viator",
    url: "",
    label: "Browse relevant tours",
    description: "A contextual tour option for the destination being discussed.",
    destination: null,
    enabled: false,
  }),
  getyourguide: Object.freeze({
    key: "getyourguide",
    provider: "GetYourGuide",
    url: "",
    label: "Explore relevant activities",
    description: "A contextual activity option for the destination being discussed.",
    destination: null,
    enabled: false,
  }),
  travelpayouts: Object.freeze({
    key: "travelpayouts",
    provider: "Travelpayouts",
    url: "",
    label: "Compare travel options",
    description: "A relevant transport or booking option for the trip being planned.",
    destination: null,
    enabled: false,
  }),
  klook: Object.freeze({
    key: "klook",
    provider: "Klook",
    url: "",
    label: "Browse relevant activities",
    description: "A contextual activity option for the destination being discussed.",
    destination: null,
    enabled: false,
  }),
  kkday: Object.freeze({
    key: "kkday",
    provider: "KKday",
    url: "",
    label: "Browse relevant private trips",
    description: "A contextual private itinerary option for the destination being discussed.",
    destination: null,
    enabled: false,
  }),
  gettransfer: Object.freeze({
    key: "gettransfer",
    provider: "GetTransfer",
    url: "",
    label: "Review private transfer options",
    description: "A private transport option for routes where timing and door-to-door travel matter.",
    destination: null,
    enabled: false,
  }),
  tiqets: Object.freeze({
    key: "tiqets",
    provider: "Tiqets",
    url: "",
    label: "Browse relevant attraction tickets",
    description: "A contextual ticket option for an attraction being discussed.",
    destination: null,
    enabled: false,
  }),
  yesim: Object.freeze({
    key: "yesim",
    provider: "Yesim",
    url: "",
    label: "Review eSIM options",
    description: "A connectivity option for travellers who need mobile data.",
    destination: null,
    enabled: false,
  }),
  welcomepickups: Object.freeze({
    key: "welcomepickups",
    provider: "Welcome Pickups",
    url: "",
    label: "Review transfer options",
    description: "A contextual transfer option for the route being discussed.",
    destination: null,
    enabled: false,
  }),
  kiwitaxi: Object.freeze({
    key: "kiwitaxi",
    provider: "Kiwitaxi",
    url: "",
    label: "Review transfer options",
    description: "A contextual transfer option for the route being discussed.",
    destination: null,
    enabled: false,
  }),
  radicalstorage: Object.freeze({
    key: "radicalstorage",
    provider: "Radical Storage",
    url: "",
    label: "Review luggage storage options",
    description: "A contextual luggage storage option for the destination being discussed.",
    destination: null,
    enabled: false,
  }),
  airalo: Object.freeze({
    key: "airalo",
    provider: "Airalo",
    url: "",
    label: "Review eSIM options",
    description: "A connectivity option for travellers who need mobile data.",
    destination: null,
    enabled: false,
  }),
  saily: Object.freeze({
    key: "saily",
    provider: "Saily",
    url: "",
    label: "Review eSIM options",
    description: "A connectivity option for travellers who need mobile data.",
    destination: null,
    enabled: false,
  }),
  gocity: Object.freeze({
    key: "gocity",
    provider: "Go City",
    url: "",
    label: "Review attraction pass options",
    description: "A contextual attraction pass option for the destination being discussed.",
    destination: null,
    enabled: false,
  }),
  airhelp: Object.freeze({
    key: "airhelp",
    provider: "AirHelp",
    url: "",
    label: "Review passenger rights support",
    description: "A relevant passenger rights service for the travel issue being discussed.",
    destination: null,
    enabled: false,
  }),
  autoeurope: Object.freeze({
    key: "autoeurope",
    provider: "Auto Europe",
    url: "",
    label: "Compare car rental options",
    description: "A car rental option for routes where driving is relevant.",
    destination: null,
    enabled: false,
  }),
  safetywing: Object.freeze({
    key: "safetywing",
    provider: "SafetyWing",
    url: "",
    label: "Review insurance information",
    description: "A travel insurance option to consider for this type of trip.",
    destination: null,
    enabled: false,
  }),
  discovercars: Object.freeze({
    key: "discovercars",
    provider: "Discover Cars",
    url: "",
    label: "Compare car rental options",
    description: "A car rental option for routes where driving is relevant.",
    destination: null,
    enabled: false,
  }),
  booking: Object.freeze({
    key: "booking",
    provider: "Booking.com",
    url: "",
    label: "Browse accommodation options",
    description: "A relevant accommodation search for the destination being discussed.",
    destination: null,
    enabled: false,
  }),
});

export function isValidAffiliateUrl(value) {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function getAffiliate(key) {
  return affiliateRegistry[key] || null;
}

export function getEnabledAffiliate(key) {
  const entry = getAffiliate(key);
  return entry?.enabled && isValidAffiliateUrl(entry.url) ? entry : null;
}

export function getEnabledAffiliates(keys = []) {
  return keys.map(getEnabledAffiliate).filter(Boolean);
}

export function getArticleAffiliateLink(entries = [], key) {
  const entry = entries.find((candidate) => candidate.key === key);
  if (!entry || !affiliateRegistry[entry.provider] || !isValidAffiliateUrl(entry.url)) {
    return null;
  }
  return String(entry.label || "").trim() ? entry : null;
}

export function getArticleAffiliateWidget(entries = [], key) {
  const entry = entries.find((candidate) => candidate.key === key);
  if (!entry || !affiliateRegistry[entry.provider] || !isValidAffiliateWidgetUrl(entry.scriptSrc)) {
    return null;
  }
  return String(entry.label || "").trim() ? entry : null;
}
