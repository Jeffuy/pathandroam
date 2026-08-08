export default function PracticalInfoBlock({
  title = "Practical information",
  items,
  titleId = "practical-info-title",
}) {
  if (!items?.length) return null;

  return (
    <section className="practical-info" aria-labelledby={titleId}>
      <p className="story-label">At a glance</p>
      <h2 id={titleId}>{title}</h2>
      <dl>
        {items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
