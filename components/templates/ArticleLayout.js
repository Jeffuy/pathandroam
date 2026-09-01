import Image from "next/image";
import { getEditorialImage } from "../../data/editorial-images";
import AuthorBox from "../AuthorBox";
import AuthorInline from "../AuthorInline";
import Breadcrumbs from "../Breadcrumbs";
import ImageCaption from "../ImageCaption";
import CommercialGuideLinks from "../CommercialGuideLinks";
import PracticalInfoBlock from "../PracticalInfoBlock";
import RelatedArticles from "../RelatedArticles";
import SourcesList from "../SourcesList";
import TableOfContents from "../TableOfContents";
import AffiliateCard from "../affiliate/AffiliateCard";
import ArticleBookingSummary from "../affiliate/ArticleBookingSummary";
import MobileAffiliateBar from "../affiliate/MobileAffiliateBar";
import { affiliateContextLabel, affiliateProviderName, getPrimaryArticleAffiliates } from "../../data/affiliates";

export default function ArticleLayout({ article, children }) {
  const selectedAffiliates = getPrimaryArticleAffiliates(
    article.affiliateLinks,
    article.primaryAffiliateKeys,
    2,
  );
  const primaryAffiliate = selectedAffiliates[0];
  const heroDetails = getEditorialImage(article.heroImage);

  return (
    <main id="main-content" className="article-template" tabIndex={-1}>
      <article>
        <header className="article-header page-width">
          <Breadcrumbs items={article.breadcrumbs} />
          <p className="eyebrow">{article.category} · {article.destination}</p>
          <h1>{article.title}</h1>
          <p className="article-header__subtitle">{article.subtitle}</p>
          <AuthorInline author={article.author} publishedAt={article.publishedAt} updatedAt={article.updatedAt} />
        </header>

        {selectedAffiliates.length > 0 && (
          <div className="page-width article-booking-summary-wrap">
            <ArticleBookingSummary affiliates={selectedAffiliates} />
          </div>
        )}

        <div className="article-hero page-width">
          <Image
            src={article.heroImage}
            alt={article.heroAlt}
            fill
            sizes="(min-width: 1320px) 1280px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)"
          />
          <ImageCaption details={heroDetails} illustrative={article.heroIllustrative} />
        </div>

        <div className="article-shell page-width">
          <aside className="article-rail">
            <TableOfContents items={article.tableOfContents} />
            {primaryAffiliate && (
              <AffiliateCard
                articleAffiliate={primaryAffiliate}
                eyebrow="Booking option"
                description={`${affiliateProviderName(primaryAffiliate)} · ${affiliateContextLabel(primaryAffiliate.context)}`}
                placement="article_rail"
                position={1}
                showDisclosure={false}
                compact
              />
            )}
          </aside>
          <div className="article-main">
            {article.practicalSummary && (
              <PracticalInfoBlock
                title="Quick planning summary"
                titleId="quick-planning-summary-title"
                items={article.practicalSummary}
              />
            )}
            <div className="article-body">{article.html || children}</div>
            {article.monetizationSlots?.map((slot) => (
              <aside className="monetization-slot" key={slot.title}>
                <h2>{slot.title}</h2>
                <p>{slot.description}</p>
              </aside>
            ))}
            {article.practicalInfo?.length > 0 && (
              <PracticalInfoBlock
                items={article.practicalInfo}
                titleId="practical-information-title"
              />
            )}
            <div className="mobile-affiliate-end-sentinel" aria-hidden="true" />
            <CommercialGuideLinks
              articles={article.commercialRelatedArticles}
              title={`More trips you can book from ${article.destination}`}
              id="bookable-next-steps"
              placement="article_commercial_related"
            />
            <SourcesList sources={article.sources} />
          </div>
        </div>
        <div className="page-width article-afterword">
          <RelatedArticles articles={article.relatedArticles} />
          <AuthorBox author={article.author} />
        </div>
      </article>
      <MobileAffiliateBar affiliate={primaryAffiliate} />
    </main>
  );
}
