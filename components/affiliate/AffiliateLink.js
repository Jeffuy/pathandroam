import { getArticleAffiliateLink, getEnabledAffiliate } from "../../data/affiliates";

export default function AffiliateLink({ affiliateKey, articleAffiliate, children, className, ariaLabel }) {
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
    >
      {children || entry.label}
    </a>
  );
}
