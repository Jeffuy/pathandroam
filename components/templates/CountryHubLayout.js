import Image from "next/image";
import Breadcrumbs from "../Breadcrumbs";
import RelatedArticles from "../RelatedArticles";

export default function CountryHubLayout({ country, children }) {
  return (
    <main id="main-content" className="hub-template" tabIndex={-1}>
      <div className="page-width template-breadcrumbs"><Breadcrumbs items={country.breadcrumbs} /></div>
      <header className="hub-hero page-width">
        <div className="hub-hero__copy">
          <p className="eyebrow">Country guide</p>
          <h1>{country.name}</h1>
          <p>{country.introduction}</p>
        </div>
        <div className="hub-hero__image">
          <Image
            src={country.heroImage}
            alt={country.heroAlt}
            fill
            sizes="(min-width: 1320px) 720px, (min-width: 768px) 55vw, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)"
            loading="eager"
            fetchPriority="high"
          />
          <span className="image-note">Illustrative image</span>
        </div>
      </header>
      <div className="hub-template__body page-width">{children}</div>
      <div className="page-width"><RelatedArticles articles={country.relatedArticles} /></div>
    </main>
  );
}
