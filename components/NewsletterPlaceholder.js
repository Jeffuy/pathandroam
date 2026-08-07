export default function NewsletterPlaceholder() {
  return (
    <section className="newsletter page-width" id="newsletter" aria-labelledby="newsletter-title">
      <p className="eyebrow">Notes for the road</p>
      <div className="newsletter__layout">
        <div>
          <h2 id="newsletter-title">A thoughtful trip starts here.</h2>
          <p>
            Occasional planning notes, new destinations and practical ideas.
            The Path &amp; Roam newsletter is coming soon.
          </p>
        </div>
        <div className="newsletter__placeholder" aria-label="Newsletter signup coming soon">
          <span>Email newsletter</span>
          <strong>Coming soon</strong>
        </div>
      </div>
    </section>
  );
}
