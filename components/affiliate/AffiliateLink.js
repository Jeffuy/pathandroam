import { getArticleAffiliateLink, getEnabledAffiliate } from "../../data/affiliates";

export default function AffiliateLink({ affiliateKey, articleAffiliate, children, className, ariaLabel, placement = "unknown" }) {
  const entry = articleAffiliate
    ? getArticleAffiliateLink([articleAffiliate], articleAffiliate.key)
    : getEnabledAffiliate(affiliateKey);
  if (!entry) return null;

  return (
    <a
      className={className}
      href={entry.url}
      target="_blank"
      rel="sponsored nofollow noopener"
      aria-label={ariaLabel}
      data-affiliate-key={entry.key}
      data-affiliate-provider={entry.provider}
      data-affiliate-context={entry.context || entry.destination || "general"}
      data-affiliate-placement={placement}
    >
      {children || entry.label}
    </a>
  );
}
