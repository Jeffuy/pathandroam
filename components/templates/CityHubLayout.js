import Image from "next/image";
import { getEditorialImage } from "../../data/editorial-images";
import Breadcrumbs from "../Breadcrumbs";
import ImageCaption from "../ImageCaption";
import PracticalInfoBlock from "../PracticalInfoBlock";
import RelatedArticles from "../RelatedArticles";

export default function CityHubLayout({ city, children }) {
  const heroDetails = getEditorialImage(city.heroImage);

  return (
    <main id="main-content" className="hub-template city-template" tabIndex={-1}>
      <div className="page-width template-breadcrumbs"><Breadcrumbs items={city.breadcrumbs} /></div>
      <header className="city-hero">
        <div className="city-hero__image">
          <Image
            src={city.heroImage}
            alt={city.heroAlt}
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <ImageCaption details={heroDetails} illustrative={city.heroIllustrative} />
        <div className="city-hero__copy page-width">
          <p className="eyebrow eyebrow--light">City guide</p>
          <h1>{city.name}</h1>
          <p>{city.introduction}</p>
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
