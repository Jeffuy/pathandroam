import Image from "next/image";
import AuthorBox from "../AuthorBox";
import AuthorInline from "../AuthorInline";
import Breadcrumbs from "../Breadcrumbs";
import NewsletterPlaceholder from "../NewsletterPlaceholder";
import PracticalInfoBlock from "../PracticalInfoBlock";
import RelatedArticles from "../RelatedArticles";
import SourcesList from "../SourcesList";
import TableOfContents from "../TableOfContents";

export default function ArticleLayout({ article, children }) {
  return (
    <main id="main-content" className="article-template">
      <article>
        <header className="article-header page-width">
          <Breadcrumbs items={article.breadcrumbs} />
          <p className="eyebrow">{article.category} · {article.destination} · Draft preview</p>
          <h1>{article.title}</h1>
          <p className="article-header__subtitle">{article.subtitle}</p>
          <AuthorInline author={article.author} publishedAt={article.publishedAt} updatedAt={article.updatedAt} />
        </header>

        <div className="article-hero page-width">
          <Image src={article.heroImage} alt={article.heroAlt} fill sizes="(min-width: 1320px) 1280px, 100vw" loading="eager" />
          <span className="image-note">Illustrative image</span>
        </div>

        <div className="article-shell page-width">
          <aside className="article-rail">
            <TableOfContents items={article.tableOfContents} />
          </aside>
          <div className="article-main">
            {article.affiliateDisclosure && (
              <aside className="affiliate-disclosure-preview">
                <strong>Affiliate disclosure placeholder</strong>
                <p>{article.affiliateDisclosure}</p>
              </aside>
            )}
            {article.practicalSummary && (
              <PracticalInfoBlock title="Quick planning summary" items={article.practicalSummary} />
            )}
            <div className="article-body">{children}</div>
            {article.monetizationSlots?.map((slot) => (
              <aside className="monetization-slot" key={slot.title}>
                <p className="story-label">Contextual recommendation slot</p>
                <h2>{slot.title}</h2>
                <p>{slot.description}</p>
                <span>Disabled in template preview</span>
              </aside>
            ))}
            <PracticalInfoBlock items={article.practicalInfo} />
            <SourcesList sources={article.sources} />
          </div>
        </div>
        <div className="page-width article-afterword">
          <RelatedArticles articles={article.relatedArticles} />
          <AuthorBox author={article.author} />
        </div>
      </article>
      <NewsletterPlaceholder />
    </main>
  );
}
