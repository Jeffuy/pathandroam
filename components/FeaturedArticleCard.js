import Image from "next/image";
import Link from "next/link";
import { getEditorialImage } from "../data/editorial-images";
import ImageCaption from "./ImageCaption";

export default function FeaturedArticleCard({ article }) {
  const imageDetails = getEditorialImage(article.image);

  return (
    <article className="featured-article">
      <div className="featured-article__image">
        <Image
          src={article.image}
          alt={imageDetails?.alt || article.imageAlt}
          fill
          sizes="(min-width: 900px) 56vw, 100vw"
        />
        <ImageCaption details={imageDetails} illustrative={article.imageIllustrative} />
      </div>
      <div className="featured-article__body">
        <p className="story-label">{article.label}</p>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        {article.href && (
          <Link className="text-link" href={article.href}>
            Read guide <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
    </article>
  );
}
