const reviews = [
  'The food was delicious and neatly packed.',
  'Fast response and great portions.',
  'Perfect for trays, chicken, pizza, and quick meals.',
];

export function ReviewsSection() {
  return (
    <section className="section-shell section-block reviews-section" aria-labelledby="reviews-heading">
      <div className="section-heading">
        <p className="eyebrow">Customer reviews</p>
        <h2 id="reviews-heading">Loved by customers</h2>
      </div>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <article className="review-card" key={review}>
            <p>"{review}"</p>
          </article>
        ))}
      </div>
    </section>
  );
}
