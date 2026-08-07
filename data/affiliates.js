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
  airalo: Object.freeze({
    key: "airalo",
    provider: "Airalo",
    url: "",
    label: "Review eSIM options",
    description: "A connectivity option for travellers who need mobile data.",
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

function hasSafeUrl(value) {
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
  return entry?.enabled && hasSafeUrl(entry.url) ? entry : null;
}

export function getEnabledAffiliates(keys = []) {
  return keys.map(getEnabledAffiliate).filter(Boolean);
}
