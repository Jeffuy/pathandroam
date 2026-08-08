import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__image">
        <Image
          src="/images/destinations/ireland-coast-placeholder.webp"
          alt="Illustrative view of a winding road through a green coastal landscape"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <span className="image-note">Illustrative image</span>
      </div>
      <div className="hero__content page-width">
        <p className="eyebrow eyebrow--light">See more. Plan smarter.</p>
        <h1 id="hero-title">Travel further,<br />plan smarter.</h1>
        <p className="hero__intro">
          Independent travel guides, practical itineraries and clear planning
          advice for journeys that feel like your own.
        </p>
        <a className="text-link text-link--light" href="#destinations">
          Start exploring <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
