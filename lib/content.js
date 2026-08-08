import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import { createPageMetadata } from "./seo.js";

const contentRoot = path.join(process.cwd(), "content");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isValidSlug(value) {
  return typeof value === "string" && slugPattern.test(value);
}

function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function toDateString(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function normalizeMetadata(data) {
  return {
    title: String(data.title || ""),
    slug: String(data.slug || ""),
    description: String(data.description || ""),
    country: data.country ? String(data.country) : null,
    city: data.city ? String(data.city) : null,
    region: data.region ? String(data.region) : null,
    contentType: String(data.contentType || "article"),
    primaryKeyword: data.primaryKeyword ? String(data.primaryKeyword) : "",
    secondaryKeywords: toArray(data.secondaryKeywords).map(String),
    publishedAt: toDateString(data.publishedAt),
    updatedAt: toDateString(data.updatedAt),
    author: data.author ? String(data.author) : "",
    heroImage: data.heroImage ? String(data.heroImage) : null,
    heroAlt: data.heroAlt ? String(data.heroAlt) : "",
    featured: data.featured === true,
    draft: data.draft !== false,
    noindex: data.noindex !== false,
    affiliateDisclosure: data.affiliateDisclosure === true,
    affiliateKeys: toArray(data.affiliateKeys).map(String),
    relatedSlugs: toArray(data.relatedSlugs).map(String),
    sources: toArray(data.sources).map((source) =>
      typeof source === "string"
        ? { label: source, url: null, note: null }
        : {
            label: String(source.label || ""),
            url: source.url ? String(source.url) : null,
            note: source.note ? String(source.note) : null,
          },
    ),
  };
}

function headingId(value, seen) {
  const base = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";
  const count = seen.get(base) || 0;
  seen.set(base, count + 1);
  return count ? `${base}-${count + 1}` : base;
}

export function renderMarkdown(markdown) {
  const tableOfContents = [];
  const seenHeadings = new Map();
  const renderer = {
    heading(token) {
      const text = this.parser.parseInline(token.tokens);
      const id = headingId(token.text, seenHeadings);
      if (token.depth === 2 || token.depth === 3) {
        tableOfContents.push({ id, label: token.text, depth: token.depth });
      }
      return `<h${token.depth} id="${id}">${text}</h${token.depth}>\n`;
    },
    html(token) {
      return token.text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
    },
  };
  const parser = new Marked({ gfm: true, renderer });

  return {
    html: parser.parse(markdown),
    tableOfContents,
  };
}

async function loadContentFile(relativePath) {
  const absolutePath = path.join(contentRoot, relativePath);

  try {
    const source = await readFile(absolutePath, "utf8");
    const { data, content } = matter(source);
    const metadata = normalizeMetadata(data);
    const rendered = renderMarkdown(content);
    const routeSegments = relativePath.split(/[\\/]/);

    if (!metadata.title || !isValidSlug(metadata.slug)) {
      throw new Error(`Invalid content metadata: ${relativePath}`);
    }

    return {
      ...metadata,
      ...rendered,
      body: content,
      sourcePath: relativePath,
      countrySlug:
        metadata.contentType === "country" ? metadata.slug : routeSegments[1],
      citySlug:
        metadata.contentType === "article" ? routeSegments[2] : metadata.city ? metadata.slug : null,
    };
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

export async function getCountry(country) {
  if (!isValidSlug(country)) return null;
  const entry = await loadContentFile(path.join("countries", `${country}.md`));
  return entry?.contentType === "country" ? entry : null;
}

export async function getCity(country, city) {
  if (!isValidSlug(country) || !isValidSlug(city)) return null;
  const entry = await loadContentFile(path.join("cities", country, `${city}.md`));
  return entry?.contentType === "city" ? entry : null;
}

export async function getArticle(country, city, article) {
  if (![country, city, article].every(isValidSlug)) return null;
  const entry = await loadContentFile(
    path.join("articles", country, city, `${article}.md`),
  );
  return entry?.contentType === "article" ? entry : null;
}

async function listMarkdownFiles(directory, prefix = "") {
  let entries;

  try {
    entries = await readdir(path.join(contentRoot, directory, prefix), {
      withFileTypes: true,
    });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }

  const files = await Promise.all(
    entries.map(async (entry) => {
      const relative = path.join(prefix, entry.name);
      if (entry.isDirectory()) return listMarkdownFiles(directory, relative);
      return entry.isFile() && entry.name.endsWith(".md") ? [relative] : [];
    }),
  );

  return files.flat();
}

export async function getAllContent() {
  const groups = await Promise.all(
    ["countries", "cities", "articles"].map(async (directory) => {
      const files = await listMarkdownFiles(directory);
      return Promise.all(
        files.map((file) =>
          loadContentFile(path.join(/* turbopackIgnore: true */ directory, file)),
        ),
      );
    }),
  );

  return groups.flat().filter(Boolean);
}

export async function getRelatedContent(relatedSlugs) {
  if (!relatedSlugs?.length) return [];
  const entries = await getAllContent();
  return relatedSlugs
    .map((slug) => entries.find((entry) => entry.slug === slug))
    .filter(Boolean);
}

export async function getCountryParams() {
  const entries = await getAllContent();
  return entries
    .filter((entry) => entry.contentType === "country")
    .map((entry) => ({ country: entry.slug }));
}

export async function getCityParams() {
  const entries = await getAllContent();
  return entries
    .filter((entry) => entry.contentType === "city")
    .map((entry) => ({ country: entry.countrySlug, city: entry.citySlug }));
}

export async function getArticleParams() {
  const entries = await getAllContent();
  return entries
    .filter((entry) => entry.contentType === "article")
    .map((entry) => ({
      country: entry.countrySlug,
      city: entry.citySlug,
      article: entry.slug,
    }));
}

export function getContentMetadata(entry) {
  if (!entry) return {};
  return createPageMetadata({
    title: entry.title,
    description: entry.description,
    pathname: getContentRoute(entry),
    image: entry.heroImage,
    imageAlt: entry.heroAlt,
    type: entry.contentType === "article" ? "article" : "website",
    draft: entry.draft,
    noindex: entry.noindex,
  });
}

export function getContentRoute(entry) {
  if (entry.contentType === "country") return `/${entry.slug}`;
  if (entry.contentType === "city") return `/${entry.countrySlug}/${entry.slug}`;
  return `/${entry.countrySlug}/${entry.citySlug}/${entry.slug}`;
}
