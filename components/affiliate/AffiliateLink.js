import { getEnabledAffiliate } from "../../data/affiliates";

export default function AffiliateLink({ affiliateKey, children, className, ariaLabel }) {
  const entry = getEnabledAffiliate(affiliateKey);
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
