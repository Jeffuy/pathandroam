import { affiliateProviderName, getArticleAffiliateLink, getEnabledAffiliate } from "../../data/affiliates";
import AffiliateDisclosure from "./AffiliateDisclosure";
import AffiliateLink from "./AffiliateLink";

export default function AffiliateCard({
  affiliateKey,
  articleAffiliate,
  title,
  description,
  eyebrow = "Planning option",
  showDisclosure = true,
  placement = "unknown",
  compact = false,
  position,
}) {
  const entry = articleAffiliate
    ? getArticleAffiliateLink([articleAffiliate], articleAffiliate.key)
    : getEnabledAffiliate(affiliateKey);
  if (!entry) return null;

  return (
    <aside className={`affiliate-card${compact ? " affiliate-card--compact" : ""}`}>
      {showDisclosure && <AffiliateDisclosure compact />}
      <p className="story-label">{eyebrow}</p>
      <h2>{title || entry.label}</h2>
      <p>{description || entry.description || affiliateProviderName(entry)}</p>
      <AffiliateLink affiliateKey={affiliateKey} articleAffiliate={articleAffiliate} className="text-link" placement={placement} position={position}>
        {entry.label} <span aria-hidden="true">↗</span>
      </AffiliateLink>
    </aside>
  );
}
