import Link from "next/link";

export default function RelatedArticles({ articles }) {
  if (!articles?.length) return null;

  return (
    <section className="related-articles" aria-labelledby="related-title">
      <div>
        <p className="story-label">Keep planning</p>
        <h2 id="related-title">Related articles</h2>
      </div>
      <div className="related-articles__grid">
        {articles.map((article, index) => (
          <article key={article.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{article.label}</p>
            <h3>{article.title}</h3>
            {article.href && <Link href={article.href}>Read guide <span aria-hidden="true">→</span></Link>}
          </article>
        ))}
      </div>
    </section>
  );
}
