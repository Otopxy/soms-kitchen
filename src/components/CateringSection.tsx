import type { BusinessConfig } from '../config/business';
import { buildWhatsAppUrl } from '../utils/whatsapp';

type CateringSectionProps = {
  business: BusinessConfig;
};

const cateringMessage = `Hello Som's Kitchen, I would like to discuss catering/party food.

Event type:
Event date:
Number of guests:
Location:
Meals needed:
Budget if available:

Please send me more details.`;

export function CateringSection({ business }: CateringSectionProps) {
  const whatsappUrl = buildWhatsAppUrl(business.whatsappPhoneNumber, cateringMessage);

  return (
    <section className="section-shell section-block catering-section" id="catering" aria-labelledby="catering-heading">
      <div className="catering-section__content">
        <p className="eyebrow">Catering & hospitality</p>
        <h2 id="catering-heading">Planning a party or event?</h2>
        <p>
          Som's Kitchen can handle your party food, hospitality meals, trays, platters, office orders, and bulk food
          requests.
        </p>
        <ul className="check-list">
          <li>Party food</li>
          <li>Event hospitality</li>
          <li>Food trays and platters</li>
          <li>Office deliveries</li>
          <li>Bulk rice, chicken, pizza, snacks, drinks, and more</li>
          <li>Custom orders discussed on WhatsApp</li>
        </ul>
        <a className="button button--primary" href={whatsappUrl} target="_blank" rel="noreferrer">
          Discuss Catering on WhatsApp
        </a>
      </div>
    </section>
  );
}
