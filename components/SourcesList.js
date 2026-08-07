export default function SourcesList({ sources }) {
  if (!sources?.length) return null;

  return (
    <section className="sources-list" id="sources" aria-labelledby="sources-title">
      <p className="story-label">Research</p>
      <h2 id="sources-title">Sources</h2>
      <ol>
        {sources.map((source) => (
          <li key={source.label}>
            {source.url ? (
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            ) : (
              source.label
            )}
            {source.note && <span>{source.note}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
