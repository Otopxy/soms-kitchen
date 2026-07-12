export function AnnouncementCard() {
  return (
    <section className="announcement section-shell" aria-labelledby="anniversary-announcement-title">
      <div className="announcement-card">
        <div className="announcement-card__accent" aria-hidden="true" />
        <div className="announcement-card__content">
          <p className="announcement-card__kicker">May 2026 customer thank-you</p>
          <h2 id="anniversary-announcement-title">Celebrating 5 Years! 🎉</h2>
          <p>
            To our incredible customers and supporters: thank you for five amazing years of dining with us and
            fueling our passion. We are deeply grateful for your loyalty and look forward to serving you for many
            more years to come! As a thank you, we are adding a free souvenir gift to every order throughout May
            2026.
          </p>
          <p className="announcement-card__signature">
            - Susan Akinola, <strong>Head Chef, Som's Kitchen.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
