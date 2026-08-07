export default function PracticalInfoBlock({ title = "Practical information", items }) {
  if (!items?.length) return null;

  return (
    <section className="practical-info" aria-labelledby="practical-info-title">
      <p className="story-label">At a glance</p>
      <h2 id="practical-info-title">{title}</h2>
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
