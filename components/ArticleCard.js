import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }) {
  const content = (
    <>
      <div className="article-card__image">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
        />
        <span className="image-note">Illustrative image</span>
      </div>
      <div className="article-card__body">
        <p className="story-label">{article.label}</p>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
      </div>
    </>
  );

  return article.href ? (
    <Link className="article-card" href={article.href}>
      {content}
    </Link>
  ) : (
    <article className="article-card">{content}</article>
  );
}
