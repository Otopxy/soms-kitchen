import type { BusinessConfig } from '../config/business';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { OpeningStatus } from './OpeningStatus';

type HeroProps = {
  business: BusinessConfig;
};

export function Hero({ business }: HeroProps) {
  const whatsappUrl = buildWhatsAppUrl(
    business.whatsappPhoneNumber,
    "Hello Som's Kitchen, I would like to make an enquiry.",
  );

  return (
    <section className="hero section-shell" id="top">
      <div className="hero__content">
        <OpeningStatus />
        <div className="hero__logo-wrap">
          <img src={business.logo} alt="Som's Kitchen logo" className="hero__logo" />
        </div>
        <p className="eyebrow">{business.location}</p>
        <h1>Delicious & Affordable Meals in Ede, Osun.</h1>
        <p className="hero__lead">Fresh meals, trays, pizza, chicken & more from Som's Kitchen.</p>
        <p className="hero__subtext">Build your order online and send it directly to Som's Kitchen on WhatsApp.</p>
        <p className="hero__meta">Home deliveries - Office deliveries - Bulk & party orders</p>

        <div className="hero__actions">
          <a className="button button--primary" href="#menu">
            Order Now
          </a>
          <a className="button button--secondary" href="#catering">
            Plan Party Food
          </a>
          <a className="button button--ghost" href={whatsappUrl} target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </a>
          <a className="button button--link" href={business.instagramUrl} target="_blank" rel="noreferrer">
            View Instagram
          </a>
        </div>
      </div>

      <div className="hero__panel" aria-label="Som's Kitchen order highlights">
        <div className="hero-card hero-card--summary">
          <div className="hero-card__item">
            <span>Today</span>
            <strong>Meals, trays & drinks</strong>
            <p>Pick your items and send one clean order message.</p>
          </div>
          <div className="hero-card__item">
            <span>Catering</span>
            <strong>Party food made simple</strong>
            <p>Discuss events, office meals, hospitality and bulk requests on WhatsApp.</p>
          </div>
          <div className="hero-card__item hero-card__item--payment">
            <span>Checkout</span>
            <strong>Easy Payment</strong>
            <p>Payment is easily finalized on WhatsApp after availability, final price and delivery fee are confirmed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
