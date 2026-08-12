import { Fragment } from "react";
import Image from "next/image";
import {
  getArticleAffiliateLink,
  getArticleAffiliateWidget,
} from "../data/affiliates";
import { getEditorialImage } from "../data/editorial-images";
import AffiliateDisclosure from "./affiliate/AffiliateDisclosure";
import AffiliateLink from "./affiliate/AffiliateLink";
import AffiliateWidget from "./affiliate/AffiliateWidget";
import ImageCaption from "./ImageCaption";

const embeddedBlockPattern = /<p><img src="(\/images\/[^"]+)" alt="([^"]*)"><\/p>\n?|<p>\{\{affiliate-(link|widget):([a-z0-9]+(?:-[a-z0-9]+)*)\}\}<\/p>\n?/g;

function decodeAttribute(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

export default function MarkdownContent({
  html,
  className = "",
  affiliateLinks = [],
  affiliateWidgets = [],
  showAffiliateDisclosure = false,
}) {
  const blocks = [];
  let cursor = 0;

  for (const match of html.matchAll(embeddedBlockPattern)) {
    if (match.index > cursor) {
      blocks.push({ type: "html", value: html.slice(cursor, match.index) });
    }
    if (match[1]) {
      blocks.push({
        type: "image",
        src: decodeAttribute(match[1]),
        alt: decodeAttribute(match[2]),
      });
    } else {
      blocks.push({
        type: "affiliate-" + match[3],
        affiliateKey: match[4],
      });
    }
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

  const resolvedBlocks = blocks.map((block) => {
    if (block.type === "affiliate-link") {
      return {
        ...block,
        entry: getArticleAffiliateLink(affiliateLinks, block.affiliateKey),
      };
    }
    if (block.type === "affiliate-widget") {
      return {
        ...block,
        entry: getArticleAffiliateWidget(affiliateWidgets, block.affiliateKey),
      };
    }
    return block;
  });
  const firstAffiliateIndex = showAffiliateDisclosure
    ? resolvedBlocks.findIndex((block) => block.entry)
    : -1;

  return (
    <div className={`markdown-content ${className}`.trim()}>
      {resolvedBlocks.map((block, index) => {
        let content = null;

        if (block.type === "image") {
          const details = getEditorialImage(block.src);

          content = (
            <figure className="article-inline-image">
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
        } else if (block.type === "affiliate-link" && block.entry) {
          const isCompact = block.entry.context === "accommodation";

          content = (
            <div className={`article-affiliate-cta${isCompact ? " article-affiliate-cta--compact" : ""}`}>
              <p className="article-affiliate-cta__eyebrow">
                {isCompact ? "Stay option" : "Booking option"}
              </p>
              <AffiliateLink articleAffiliate={block.entry} className="article-affiliate-cta__button">
                {block.entry.label} <span aria-hidden="true">↗</span>
              </AffiliateLink>
            </div>
          );
        } else if (block.type === "affiliate-widget" && block.entry) {
          content = (
            <AffiliateWidget
              label={block.entry.label}
              scriptSrc={block.entry.scriptSrc}
            />
          );
        } else if (block.type === "html") {
          content = (
            <div
              className="markdown-content__segment"
              dangerouslySetInnerHTML={{ __html: block.value }}
            />
          );
        }

        if (!content) return null;

        return (
          <Fragment key={`${block.type}-${block.affiliateKey || index}`}>
            {index === firstAffiliateIndex && <AffiliateDisclosure compact />}
            {content}
          </Fragment>
        );
      })}
    </div>
  );
}
