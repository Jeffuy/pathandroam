import Link from "next/link";

export default function CommercialGuideLinks({
  articles,
  title = "More trips and booking guides",
  eyebrow = "Plan the next step",
  id = "commercial-guides",
  placement = "commercial_guides",
}) {
  if (!articles?.length) return null;
  return (
    <section className="commercial-guides" aria-labelledby={`${id}-title`} id={id}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${id}-title`}>{title}</h2>
      <div className="commercial-guides__grid">
        {articles.slice(0, 4).map((article, index) => (
          <article key={article.href}>
            <Link
              className="commercial-guides__card-link"
              data-commercial-guide="true"
              data-destination-path={article.href}
              data-commercial-placement={placement}
              data-card-position={index + 1}
              data-guide-label={article.label}
              href={article.href}
            >
              <span className="story-label">{article.label}</span>
              <span className="commercial-guides__title">{article.title}</span>
              {article.description && <span className="commercial-guides__description">{article.description}</span>}
              <span className="commercial-guides__action">Read and compare options <span aria-hidden="true">→</span></span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
