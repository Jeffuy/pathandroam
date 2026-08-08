import Image from "next/image";
import Link from "next/link";
import CompactArticleCard from "../components/CompactArticleCard";
import DestinationCard from "../components/DestinationCard";
import FeaturedArticleCard from "../components/FeaturedArticleCard";
import Hero from "../components/Hero";
import { createPageMetadata } from "../lib/seo.js";

export const metadata = createPageMetadata({
  title: "Independent Travel Guides & Trip Planning",
  description: "Independent destination guides, itineraries and transport advice for planning trips with or without a car.",
  pathname: "/",
  image: "/images/destinations/ireland-coast-placeholder.webp",
  imageAlt: "Illustrative green coastal landscape with a winding road",
});

const destinations = [
  {
    name: "Ireland",
    image: "/images/destinations/ireland-coast-placeholder.webp",
    active: true,
    href: "/ireland/",
  },
];

const latest = [
  {
    label: "Day trip",
    title: "Limerick to the Cliffs of Moher Without a Car: Bus Guide",
    description: "Use Route 51 and Route 350 for a public transport day trip through Ennis.",
    href: "/ireland/limerick/limerick-to-cliffs-of-moher-without-a-car/",
  },
  {
    label: "Airport transport",
    title: "Shannon Airport to Limerick: Bus, Taxi and Transfer Options",
    description: "Compare Route 343, taxis and private transfers for the journey into Limerick.",
    href: "/ireland/limerick/shannon-airport-to-limerick/",
  },
  {
    label: "Limerick",
    title: "One Day in Limerick: The Perfect Walking Itinerary",
    description: "Follow a day on foot through the market, medieval quarter and River Shannon.",
    href: "/ireland/limerick/one-day-itinerary/",
  },
];

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />

      <section className="section page-width" id="destinations" aria-labelledby="destinations-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Where to go</p>
            <h2 id="destinations-title">Featured destinations</h2>
          </div>
          <p>
            Start with a place, then make the journey yours. Explore practical
            guidance for Ireland.
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
            <h2 id="planning-title">Plan the route before you go.</h2>
          </div>
          <ol className="planning-list">
            <li>
              <span>01</span>
              <div><h3>Choose a place</h3><p>Choose a destination and start with the guides that help you plan the trip.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><h3>Shape the route</h3><p>Compare transport, opening times and the stops that fit your day.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><h3>Check the details</h3><p>Bring the useful timings and transport information together before you travel.</p></div>
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
            label: "Limerick",
            title: "Limerick Without a Car: Complete Visitor Guide",
            description:
              "Plan a car-free visit with practical guidance for walking, local buses and Shannon Airport connections.",
            image: "/images/limerick/river-shannon.webp",
            imageAlt: "The River Shannon and Thomond Bridge in Limerick",
            href: "/ireland/limerick/limerick-without-a-car/",
          }}
        />
      </section>

      <section className="car-free page-width" aria-labelledby="car-free-title">
        <div className="car-free__image">
          <Image
            src="/images/articles/rail-journey-placeholder.webp"
            alt="Illustrative train journey with a map and cup beside the window"
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
          />
          <span className="image-note">Illustrative image</span>
        </div>
        <div className="car-free__body">
          <p className="eyebrow">Travel without a car</p>
          <h2 id="car-free-title">Plan the journey without a car.</h2>
          <p>
            Use buses, trains, ferries and walking routes to connect the places on your
            trip without treating transport as an afterthought.
          </p>
          <Link className="text-link" href="/ireland/limerick/limerick-without-a-car/">
            Read the Limerick guide <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <section className="about-section page-width" id="about" aria-labelledby="about-title">
        <p className="about-section__mark" aria-hidden="true">P&amp;R</p>
        <div>
          <p className="eyebrow">About Path &amp; Roam</p>
          <h2 id="about-title">Travel guides built around the details.</h2>
          <p>
            Path &amp; Roam publishes destination guides, walking itineraries and transport
            advice for travellers planning trips with or without a car. Each guide focuses
            on the routes, timings and decisions that matter before you go.
          </p>
        </div>
      </section>

      <section className="section page-width" aria-labelledby="latest-title">
        <div className="section-heading section-heading--single">
          <div>
            <p className="eyebrow">Recently published</p>
            <h2 id="latest-title">Latest guides</h2>
          </div>
        </div>
        <div className="compact-list">
          {latest.map((article, index) => (
            <CompactArticleCard article={article} number={index + 1} key={article.title} />
          ))}
        </div>
      </section>
    </main>
  );
}
