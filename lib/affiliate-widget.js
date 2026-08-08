export function isValidAffiliateWidgetUrl(value) {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.origin === "https://tpemd.com" && url.pathname === "/content";
  } catch {
    return false;
  }
}
