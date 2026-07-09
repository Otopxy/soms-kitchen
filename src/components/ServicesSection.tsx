const services = [
  {
    title: 'Home Deliveries',
    description: "Order meals from Som's Kitchen and confirm delivery details on WhatsApp.",
  },
  {
    title: 'Office Deliveries',
    description: 'Convenient meals for work, meetings, lunch breaks, and office orders.',
  },
  {
    title: 'Bulk & Party Orders',
    description: 'Food trays, platters, and larger orders for birthdays, events, family gatherings, and celebrations.',
  },
  {
    title: 'Hospitality Catering',
    description: "Som's Kitchen can support your guests with quality meals for parties, meetings, and special occasions.",
  },
];

export function ServicesSection() {
  return (
    <section className="section-shell section-block" aria-labelledby="services-heading">
      <div className="section-heading">
        <p className="eyebrow">Services</p>
        <h2 id="services-heading">Meals for everyday orders and special plans</h2>
      </div>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <span aria-hidden="true" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
