import Link from "next/link";

export default function CommercialGuideLinks({
  articles,
  title = "More trips and booking guides",
  eyebrow = "Plan the next step",
  id = "commercial-guides",
}) {
  if (!articles?.length) return null;
  return (
    <section className="commercial-guides" aria-labelledby={`${id}-title`} id={id}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${id}-title`}>{title}</h2>
      <div className="commercial-guides__grid">
        {articles.slice(0, 4).map((article) => (
          <article key={article.href}>
            <p className="story-label">{article.label}</p>
            <h3><Link href={article.href}>{article.title}</Link></h3>
            {article.description && <p>{article.description}</p>}
            <Link className="commercial-guides__link" href={article.href}>Read and compare options <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </div>
    </section>
  );
}
