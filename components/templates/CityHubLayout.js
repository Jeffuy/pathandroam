import Image from "next/image";
import Breadcrumbs from "../Breadcrumbs";
import PracticalInfoBlock from "../PracticalInfoBlock";
import RelatedArticles from "../RelatedArticles";

export default function CityHubLayout({ city, children }) {
  return (
    <main id="main-content" className="hub-template city-template">
      <div className="page-width template-breadcrumbs"><Breadcrumbs items={city.breadcrumbs} /></div>
      <header className="city-hero">
        <div className="city-hero__image">
          <Image src={city.heroImage} alt={city.heroAlt} fill sizes="100vw" loading="eager" />
          <span className="image-note">Illustrative image</span>
        </div>
        <div className="city-hero__copy page-width">
          <p className="eyebrow eyebrow--light">City hub · Draft preview</p>
          <h1>{city.name}</h1>
          <p>{city.introduction}</p>
          <span className="draft-pill draft-pill--light">Draft · Noindex</span>
        </div>
      </header>
      <div className="city-template__content page-width">
        <div className="hub-template__body">{children}</div>
        <PracticalInfoBlock title="Planning snapshot" items={city.practicalInfo} />
      </div>
      <div className="page-width"><RelatedArticles articles={city.relatedArticles} /></div>
    </main>
  );
}
