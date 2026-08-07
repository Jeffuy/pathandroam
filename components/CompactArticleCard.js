export default function CompactArticleCard({ article, number }) {
  return (
    <article className="compact-article">
      <span className="compact-article__number" aria-hidden="true">
        {String(number).padStart(2, "0")}
      </span>
      <div>
        <p className="story-label">{article.label}</p>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
      </div>
      <span className="draft-note">In development</span>
    </article>
  );
}
