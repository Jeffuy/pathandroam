import Image from "next/image";
import Link from "next/link";
import CommercialGuideLinks from "../components/CommercialGuideLinks";
import CompactArticleCard from "../components/CompactArticleCard";
import DestinationCard from "../components/DestinationCard";
import FeaturedArticleCard from "../components/FeaturedArticleCard";
import Hero from "../components/Hero";
import { createPageMetadata } from "../lib/seo.js";
import { getAllContent, getContentRoute, isPublishedMonetizedContent, sortCommercialContent } from "../lib/content.js";

export const metadata = createPageMetadata({
  title: "Independent Travel Guides & Trip Planning",
  description: "Independent destination guides, itineraries and transport advice for planning trips with or without a car.",
  pathname: "/",
  image: "/images/destinations/ireland-coast-placeholder.webp",
  imageAlt: "Illustrative green coastal landscape with a winding road",
});

const destinations = [{ name: "Ireland", image: "/images/destinations/ireland-coast-placeholder.webp", active: true, href: "/ireland/" }];

function opportunityLabel(entry) {
  const context = entry.affiliateLinks?.[0]?.context || entry.affiliateWidgets?.[0]?.context || "";
  if (context.includes("tour") || context === "private-day-trip") return "Tour";
  if (context.includes("ticket")) return "Tickets";
  if (context.includes("transfer") || context === "transport") return "Transfer";
  if (context === "accommodation") return "Accommodation";
  return "Booking guide";
}

export default async function Home() {
  const allContent = await getAllContent();
  const monetizedGuides = sortCommercialContent(allContent
    .filter((entry) => entry.contentType === "article" && entry.citySlug === "limerick" && isPublishedMonetizedContent(entry)))
    .slice(0, 4)
    .map((entry) => ({ label: opportunityLabel(entry), title: entry.title, description: entry.description, href: getContentRoute(entry) }));
  const latest = allContent
    .filter((entry) => entry.contentType === "article" && !entry.draft && !entry.noindex)
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)) || a.title.localeCompare(b.title))
    .slice(0, 4)
    .map((entry) => ({ label: entry.city || "Travel guide", title: entry.title, description: entry.description, href: getContentRoute(entry) }));

  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <div className="section page-width home-bookable-guides">
        <CommercialGuideLinks articles={monetizedGuides} eyebrow="Plan & book" title="Trips you can plan from Limerick" id="bookable-guides" placement="home_bookable_guides" />
      </div>
      <section className="section page-width" id="destinations" aria-labelledby="destinations-title">
        <div className="section-heading"><div><p className="eyebrow">Where to go</p><h2 id="destinations-title">Featured destinations</h2></div><p>Start with a place, then use practical guidance to shape the trip.</p></div>
        <div className="destination-grid">{destinations.map((destination) => <DestinationCard destination={destination} key={destination.name} />)}</div>
      </section>
      <section className="section page-width" id="guides" aria-labelledby="guides-title">
        <div className="section-heading section-heading--single"><div><p className="eyebrow">Read with purpose</p><h2 id="guides-title">Featured guide</h2></div></div>
        <FeaturedArticleCard article={{ label: "Limerick", title: "Limerick Without a Car: Complete Visitor Guide", description: "Plan a car-free visit with practical guidance for walking, local buses and Shannon Airport connections.", image: "/images/limerick/river-shannon.webp", imageAlt: "The River Shannon and Thomond Bridge in Limerick", href: "/ireland/limerick/limerick-without-a-car/" }} />
      </section>
      <section className="planning-section" id="planning" aria-labelledby="planning-title">
        <div className="page-width planning-section__layout"><div className="planning-section__intro"><p className="eyebrow eyebrow--light">Plan your trip</p><h2 id="planning-title">Plan the route before you go.</h2></div><ol className="planning-list"><li><span>01</span><div><h3>Choose a place</h3><p>Start with the guides that match your destination.</p></div></li><li><span>02</span><div><h3>Compare the route</h3><p>Check transport, timings and practical trade-offs.</p></div></li><li><span>03</span><div><h3>Book what fits</h3><p>Use contextual options only when they suit your plans.</p></div></li></ol></div>
      </section>
      <section className="section page-width" aria-labelledby="latest-title">
        <div className="section-heading section-heading--single"><div><p className="eyebrow">Recently published</p><h2 id="latest-title">Latest guides</h2></div></div>
        <div className="compact-list">{latest.map((article, index) => <CompactArticleCard article={article} number={index + 1} key={article.title} />)}</div>
      </section>
      <section className="car-free page-width" aria-labelledby="car-free-title">
        <div className="car-free__image"><Image src="/images/articles/rail-journey-placeholder.webp" alt="Illustrative train journey with a map and cup beside the window" fill sizes="(min-width: 768px) 55vw, 100vw" /><span className="image-note">Illustrative image</span></div>
        <div className="car-free__body"><p className="eyebrow">Travel without a car</p><h2 id="car-free-title">Plan the journey without a car.</h2><p>Use buses, trains, ferries and walking routes to connect the places on your trip.</p><Link className="text-link" href="/ireland/limerick/limerick-without-a-car/" data-analytics-cta="read_guide" data-analytics-location="car_free">Read the Limerick guide <span aria-hidden="true">→</span></Link></div>
      </section>
      <section className="about-section page-width" id="about" aria-labelledby="about-title"><p className="about-section__mark" aria-hidden="true">P&amp;R</p><div><p className="eyebrow">About Path &amp; Roam</p><h2 id="about-title">Travel guides built around the details.</h2><p>Independent destination guides, walking itineraries and transport advice focused on the decisions that matter before you go.</p></div></section>
    </main>
  );
}
