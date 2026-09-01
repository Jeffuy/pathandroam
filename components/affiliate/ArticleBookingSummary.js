import AffiliateDisclosure from "./AffiliateDisclosure";
import AffiliateLink from "./AffiliateLink";
import { affiliateContextLabel, affiliateProviderName, selectArticleAffiliates } from "../../data/affiliates";

export default function ArticleBookingSummary({ affiliateLinks }) {
  const options = selectArticleAffiliates(affiliateLinks, 2);
  if (!options.length) return null;

  return (
    <aside className="article-booking-summary" aria-labelledby="booking-summary-title">
      <div>
        <p className="eyebrow">Booking options</p>
        <h2 id="booking-summary-title">Useful options for planning this trip</h2>
        <AffiliateDisclosure compact />
      </div>
      <div className="article-booking-summary__actions">
        {options.map((entry, index) => (
          <div key={entry.key}>
            <p>{affiliateContextLabel(entry.context)} · {affiliateProviderName(entry)}</p>
            <AffiliateLink
              articleAffiliate={entry}
              className={`commercial-button${index ? " commercial-button--secondary" : ""}`}
              placement="article_top"
            >
              {entry.label} <span aria-hidden="true">↗</span>
            </AffiliateLink>
            <small>{index ? "View current booking options" : "Check current availability and terms"}</small>
          </div>
        ))}
      </div>
    </aside>
  );
}
