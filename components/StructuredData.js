export default function StructuredData({ data }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!items.length) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(items.length === 1 ? items[0] : items).replaceAll(
          "<",
          "\\u003c",
        ),
      }}
    />
  );
}
