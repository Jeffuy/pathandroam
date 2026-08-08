import Image from "next/image";
import { getEditorialImage } from "../data/editorial-images";
import ImageCaption from "./ImageCaption";

const localImagePattern = /<p><img src="(\/images\/[^"]+)" alt="([^"]*)"><\/p>\n?/g;

function decodeAttribute(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

export default function MarkdownContent({ html, className = "" }) {
  const blocks = [];
  let cursor = 0;

  for (const match of html.matchAll(localImagePattern)) {
    if (match.index > cursor) {
      blocks.push({ type: "html", value: html.slice(cursor, match.index) });
    }
    blocks.push({
      type: "image",
      src: decodeAttribute(match[1]),
      alt: decodeAttribute(match[2]),
    });
    cursor = match.index + match[0].length;
  }

  if (!blocks.length) {
    return (
      <div
        className={`markdown-content ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  if (cursor < html.length) {
    blocks.push({ type: "html", value: html.slice(cursor) });
  }

  return (
    <div className={`markdown-content ${className}`.trim()}>
      {blocks.map((block, index) =>
        block.type === "image" ? (() => {
          const details = getEditorialImage(block.src);

          return (
            <figure className="article-inline-image" key={`${block.src}-${index}`}>
              <div className="article-inline-image__media">
                <Image
                  src={block.src}
                  alt={details?.alt || block.alt}
                  fill
                  sizes="(min-width: 64rem) 42rem, (min-width: 40rem) calc(100vw - 8rem), calc(100vw - 2rem)"
                />
              </div>
              <ImageCaption as="figcaption" details={details} />
            </figure>
          );
        })() : (
          <div
            className="markdown-content__segment"
            dangerouslySetInnerHTML={{ __html: block.value }}
            key={`content-${index}`}
          />
        ),
      )}
    </div>
  );
}
