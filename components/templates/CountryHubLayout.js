import Image from "next/image";
import Breadcrumbs from "../Breadcrumbs";
import RelatedArticles from "../RelatedArticles";

export default function CountryHubLayout({ country, children }) {
  return (
    <main id="main-content" className="hub-template">
      <div className="page-width template-breadcrumbs"><Breadcrumbs items={country.breadcrumbs} /></div>
      <header className="hub-hero page-width">
        <div className="hub-hero__copy">
          <p className="eyebrow">Country guide{country.draft ? " · Draft preview" : ""}</p>
          <h1>{country.name}</h1>
          <p>{country.introduction}</p>
          {(country.draft || country.noindex) && <span className="draft-pill">Draft · Noindex</span>}
        </div>
        <div className="hub-hero__image">
          <Image src={country.heroImage} alt={country.heroAlt} fill sizes="(min-width: 768px) 55vw, 100vw" loading="eager" />
          <span className="image-note">Illustrative image</span>
        </div>
      </header>
      <div className="hub-template__body page-width">{children}</div>
      <div className="page-width"><RelatedArticles articles={country.relatedArticles} /></div>
    </main>
  );
}
