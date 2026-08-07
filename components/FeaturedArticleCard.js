import Image from "next/image";

export default function FeaturedArticleCard({ article }) {
  return (
    <article className="featured-article">
      <div className="featured-article__image">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(min-width: 900px) 56vw, 100vw"
        />
        <span className="image-note">Illustrative image</span>
      </div>
      <div className="featured-article__body">
        <p className="story-label">{article.label}</p>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <span className="draft-note">Guide in development</span>
      </div>
    </article>
  );
}
