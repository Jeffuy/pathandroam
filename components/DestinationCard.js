import Image from "next/image";
import Link from "next/link";

export default function DestinationCard({ destination }) {
  const content = (
    <>
      <div className="destination-card__image">
        <Image
          src={destination.image}
          alt={`Illustrative travel image placeholder for ${destination.name}`}
          fill
          sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 75vw"
        />
        {!destination.active && (
          <span className="destination-card__status">Coming soon</span>
        )}
      </div>
      <div className="destination-card__meta">
        <h3>{destination.name}</h3>
        <span aria-hidden="true">{destination.active ? "↗" : "—"}</span>
      </div>
    </>
  );

  return destination.active ? (
    <Link className="destination-card" href={destination.href}>
      {content}
    </Link>
  ) : (
    <article className="destination-card destination-card--pending">
      {content}
    </article>
  );
}
