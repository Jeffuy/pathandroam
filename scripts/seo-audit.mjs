import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

process.env.NEXT_PUBLIC_INDEXING_ENABLED = "true";
process.env.NEXT_PUBLIC_SITE_URL ||= "https://seo-audit.invalid";

const [{ affiliateRegistry }, { getContentRoute }, { default: createSitemap }] =
  await Promise.all([
    import("../data/affiliates.js"),
    import("../lib/content.js"),
    import("../app/sitemap.js"),
  ]);

const contentRoot = path.join(process.cwd(), "content");
const appRoot = path.join(process.cwd(), "app");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const errors = [];

function addError(source, message) {
  errors.push(`${source}: ${message}`);
}

function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function validDate(value) {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
    ? date
    : null;
}

function normalizeRoute(route) {
  if (!route || route === "/") return route || "/";
  return route.replace(/\/+$/, "");
}

function rawFrontmatterValue(source, field) {
  const frontmatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) return null;
  const match = frontmatter[1].match(new RegExp(`^${field}:\\s*(.*?)\\s*$`, "m"));
  if (!match) return null;
  return match[1].replace(/^(["'])(.*)\1$/, "$2");
}

async function listFiles(directory, matches) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listFiles(entryPath, matches);
      return entry.isFile() && matches(entry.name) ? [entryPath] : [];
    }),
  );
  return nested.flat();
}

async function readEntries() {
  const files = await listFiles(contentRoot, (name) => name.endsWith(".md"));
  const entries = [];

  for (const file of files) {
    const sourcePath = path.relative(process.cwd(), file).replaceAll(path.sep, "/");
    try {
      const source = await readFile(file, "utf8");
      const { data } = matter(source);
      const relativeParts = path.relative(contentRoot, file).split(path.sep);
      entries.push({
        ...data,
        sourcePath,
        rawPublishedAt: rawFrontmatterValue(source, "publishedAt"),
        rawUpdatedAt: rawFrontmatterValue(source, "updatedAt"),
        countrySlug:
          data.contentType === "country" ? data.slug : relativeParts[1],
        citySlug:
          data.contentType === "article"
            ? relativeParts[2]
            : data.contentType === "city"
              ? data.slug
              : null,
      });
    } catch (error) {
      addError(sourcePath, `frontmatter could not be parsed (${error.message})`);
    }
  }

  return entries;
}

async function readStaticPages() {
  const files = await listFiles(appRoot, (name) => name === "page.js");
  const pages = [];

  for (const file of files) {
    const relativePath = path.relative(appRoot, file);
    const segments = path.dirname(relativePath).split(path.sep);
    if (segments.some((segment) => segment.startsWith("["))) continue;
    const routeSegments = segments.filter(
      (segment) => segment !== "." && !/^\(.*\)$/.test(segment),
    );
    const route = normalizeRoute(`/${routeSegments.join("/")}`);
    const source = await readFile(file, "utf8");
    pages.push({
      route,
      sourcePath: path.relative(process.cwd(), file).replaceAll(path.sep, "/"),
      noindex: /\bnoindex\s*:\s*true\b/.test(source),
    });
  }

  return pages;
}

const entries = await readEntries();
const staticPages = await readStaticPages();
const slugSources = new Map();
const routeSources = new Map();

for (const page of staticPages) {
  const previousSource = routeSources.get(page.route);
  if (previousSource) {
    addError(page.sourcePath, `duplicate route "${page.route}" (also in ${previousSource})`);
  } else {
    routeSources.set(page.route, page.sourcePath);
  }
}

for (const entry of entries) {
  const source = entry.sourcePath;
  const title = typeof entry.title === "string" ? entry.title.trim() : "";
  const description =
    typeof entry.description === "string" ? entry.description.trim() : "";
  const slug = typeof entry.slug === "string" ? entry.slug.trim() : "";
  const draft = entry.draft !== false;
  const noindex = entry.noindex !== false;

  if (!title) addError(source, "missing title");
  if (!description) addError(source, "missing description");
  if (!slugPattern.test(slug)) addError(source, "missing or invalid slug");
  if (entry.heroImage && !String(entry.heroAlt || "").trim()) {
    addError(source, "missing heroAlt for heroImage");
  }

  const publishedAt = entry.rawPublishedAt
    ? validDate(entry.rawPublishedAt)
    : entry.publishedAt
      ? validDate(entry.publishedAt)
      : null;
  const updatedAt = entry.rawUpdatedAt
    ? validDate(entry.rawUpdatedAt)
    : entry.updatedAt
      ? validDate(entry.updatedAt)
      : null;
  if (entry.rawPublishedAt && !publishedAt) addError(source, "invalid publishedAt date");
  if (entry.rawUpdatedAt && !updatedAt) addError(source, "invalid updatedAt date");
  if (publishedAt && updatedAt && updatedAt < publishedAt) {
    addError(source, "updatedAt is earlier than publishedAt");
  }
  if (draft && !noindex) addError(source, "draft content is indexable");

  if (slug) {
    const previousSource = slugSources.get(slug);
    if (previousSource) {
      addError(source, `duplicate slug "${slug}" (also in ${previousSource})`);
    } else {
      slugSources.set(slug, source);
    }
  }

  try {
    const route = normalizeRoute(getContentRoute(entry));
    entry.auditRoute = route;
    const previousSource = routeSources.get(route);
    if (previousSource) {
      addError(source, `duplicate route "${route}" (also in ${previousSource})`);
    } else {
      routeSources.set(route, source);
    }
  } catch (error) {
    addError(source, `route could not be created (${error.message})`);
  }
}

for (const entry of entries) {
  for (const relatedSlug of toArray(entry.relatedSlugs).map(String)) {
    if (!slugSources.has(relatedSlug)) {
      addError(entry.sourcePath, `broken relatedSlug "${relatedSlug}"`);
    }
  }
  for (const affiliateKey of toArray(entry.affiliateKeys).map(String)) {
    if (!affiliateRegistry[affiliateKey]) {
      addError(entry.sourcePath, `unknown affiliate key "${affiliateKey}"`);
    }
  }
}

for (const [registryKey, affiliate] of Object.entries(affiliateRegistry)) {
  if (affiliate.enabled && !String(affiliate.url || "").trim()) {
    addError(`affiliate:${registryKey}`, "enabled entry is missing a URL");
  }
}

try {
  const sitemapEntries = await createSitemap();
  const sitemapRoutes = new Map();

  for (const sitemapEntry of sitemapEntries) {
    const route = normalizeRoute(new URL(sitemapEntry.url).pathname);
    if (sitemapRoutes.has(route)) {
      addError("sitemap", `duplicate route "${route}"`);
    } else {
      sitemapRoutes.set(route, sitemapEntry.url);
    }
  }

  for (const entry of entries) {
    const draft = entry.draft !== false;
    const noindex = entry.noindex !== false;
    if ((draft || noindex) && sitemapRoutes.has(entry.auditRoute)) {
      addError(entry.sourcePath, "draft/noindex route is included in sitemap");
    }
  }
  for (const page of staticPages) {
    if (page.noindex && sitemapRoutes.has(page.route)) {
      addError(page.sourcePath, "noindex route is included in sitemap");
    }
  }
} catch (error) {
  addError("sitemap", `could not be generated (${error.message})`);
}

if (errors.length) {
  process.stderr.write(
    `SEO audit failed with ${errors.length} error(s):\n${errors.map((error) => `- ${error}`).join("\n")}\n`,
  );
  process.exitCode = 1;
} else {
  process.stdout.write(`SEO audit passed (${entries.length} content files checked).\n`);
}
