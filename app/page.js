import Image from "next/image";
import ArticleCard from "../components/ArticleCard";
import CompactArticleCard from "../components/CompactArticleCard";
import DestinationCard from "../components/DestinationCard";
import FeaturedArticleCard from "../components/FeaturedArticleCard";
import Hero from "../components/Hero";
import NewsletterPlaceholder from "../components/NewsletterPlaceholder";

const destinationImages = [
  "/images/destinations/ireland-coast-placeholder.png",
  "/images/articles/coastal-town-placeholder.png",
  "/images/articles/rail-journey-placeholder.png",
];

const destinations = [
  { name: "Ireland", image: destinationImages[0], active: true, href: "#guides" },
  { name: "Italy", image: destinationImages[1] },
  { name: "Portugal", image: destinationImages[1] },
  { name: "Scotland", image: destinationImages[0] },
  { name: "Japan", image: destinationImages[2] },
  { name: "Spain", image: destinationImages[1] },
];

const inspiration = [
  {
    label: "The considered journey",
    title: "Follow the shape of a place",
    description:
      "Build a trip around rhythm, connection and time—not a race through a checklist.",
    image: "/images/articles/coastal-town-placeholder.png",
    imageAlt: "Illustrative view down a warm stone lane toward the sea",
  },
  {
    label: "Planning perspective",
    title: "Leave room for the unexpected",
    description:
      "A clear plan can create the space to notice what is already around you.",
    image: "/images/destinations/ireland-coast-placeholder.png",
    imageAlt: "Illustrative coastal landscape with a quiet winding road",
  },
];

const latest = [
  {
    label: "Ireland",
    title: "A calm framework for an Ireland itinerary",
    description: "A research-led planning guide is being prepared.",
  },
  {
    label: "Trip planning",
    title: "How to choose what belongs in a trip",
    description: "An editorial note on priorities, pacing and possibility.",
  },
  {
    label: "Car-free travel",
    title: "Planning a journey around the connections",
    description: "A practical approach to building a route without a car.",
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <Hero />

      <section className="section page-width" id="destinations" aria-labelledby="destinations-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Where to go</p>
            <h2 id="destinations-title">Featured destinations</h2>
          </div>
          <p>
            Start with a place, then make the journey yours. Ireland is our
            first destination; more are on the way.
          </p>
        </div>
        <div className="destination-grid">
          {destinations.map((destination) => (
            <DestinationCard destination={destination} key={destination.name} />
          ))}
        </div>
      </section>

      <section className="planning-section" id="planning" aria-labelledby="planning-title">
        <div className="page-width planning-section__layout">
          <div className="planning-section__intro">
            <p className="eyebrow eyebrow--light">Plan your trip</p>
            <h2 id="planning-title">Good journeys begin with clear choices.</h2>
          </div>
          <ol className="planning-list">
            <li>
              <span>01</span>
              <div><h3>Choose a place</h3><p>Find the destination that fits the journey you want.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><h3>Shape the route</h3><p>Balance possibility with a pace that leaves room to roam.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><h3>Keep it clear</h3><p>Turn the moving parts into one practical, workable plan.</p></div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section page-width" id="guides" aria-labelledby="guides-title">
        <div className="section-heading section-heading--single">
          <div>
            <p className="eyebrow">Read with purpose</p>
            <h2 id="guides-title">Featured guides</h2>
          </div>
        </div>
        <FeaturedArticleCard
          article={{
            label: "Starting with Ireland",
            title: "Ireland, one thoughtful trip at a time",
            description:
              "Research-led destination notes, itinerary frameworks and planning tools are taking shape.",
            image: "/images/destinations/ireland-coast-placeholder.png",
            imageAlt: "Illustrative green landscape on Ireland's Atlantic coast",
          }}
        />
      </section>

      <section className="car-free page-width" aria-labelledby="car-free-title">
        <div className="car-free__image">
          <Image
            src="/images/articles/rail-journey-placeholder.png"
            alt="Illustrative train journey with a map and cup beside the window"
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
          />
          <span className="image-note">Illustrative image</span>
        </div>
        <div className="car-free__body">
          <p className="eyebrow">Travel without a car</p>
          <h2 id="car-free-title">Let the journey be part of the trip.</h2>
          <p>
            Clear guidance for connecting places by train, bus, ferry and foot—without
            treating the route as time lost between stops.
          </p>
          <span className="draft-note">Practical guides in development</span>
        </div>
      </section>

      <section className="section section--tinted" aria-labelledby="inspiration-title">
        <div className="page-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A wider view</p>
              <h2 id="inspiration-title">Editorial inspiration</h2>
            </div>
            <p>Ideas for travelling with more intention and a little less noise.</p>
          </div>
          <div className="article-grid">
            {inspiration.map((article) => (
              <ArticleCard article={article} key={article.title} />
            ))}
          </div>
        </div>
      </section>

      <section className="about-section page-width" id="about" aria-labelledby="about-title">
        <p className="about-section__mark" aria-hidden="true">P&amp;R</p>
        <div>
          <p className="eyebrow">About Path &amp; Roam</p>
          <h2 id="about-title">Independent travel ideas, carefully considered.</h2>
          <p>
            Path &amp; Roam is an editorial travel publication focused on practical
            planning, useful itineraries and the details that make a journey easier
            to understand. We value clarity, curiosity and travel that works in the
            real world—with or without a car.
          </p>
        </div>
      </section>

      <section className="section page-width" aria-labelledby="latest-title">
        <div className="section-heading section-heading--single">
          <div>
            <p className="eyebrow">On the desk</p>
            <h2 id="latest-title">Latest guides</h2>
          </div>
        </div>
        <div className="compact-list">
          {latest.map((article, index) => (
            <CompactArticleCard article={article} number={index + 1} key={article.title} />
          ))}
        </div>
      </section>

      <NewsletterPlaceholder />
    </main>
  );
}
