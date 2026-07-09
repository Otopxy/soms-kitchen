import type { BusinessConfig } from '../config/business';
import { buildWhatsAppUrl } from '../utils/whatsapp';

type ContactSectionProps = {
  business: BusinessConfig;
};

export function ContactSection({ business }: ContactSectionProps) {
  const whatsappUrl = buildWhatsAppUrl(
    business.whatsappPhoneNumber,
    "Hello Som's Kitchen, I would like to make an enquiry.",
  );

  return (
    <section className="section-shell section-block contact-section" id="contact" aria-labelledby="contact-heading">
      <div className="section-heading">
        <p className="eyebrow">Location & contact</p>
        <h2 id="contact-heading">Reach Som's Kitchen</h2>
        <p>Visit, call, send a message, or follow Som's Kitchen online.</p>
      </div>

      <div className="contact-grid">
        <article className="contact-card">
          <span>Address</span>
          <strong>{business.address}</strong>
        </article>
        <article className="contact-card">
          <span>Phone/WhatsApp</span>
          <a href={`tel:${business.displayPhone}`}>{business.displayPhone}</a>
        </article>
        <article className="contact-card">
          <span>Email</span>
          <a href={`mailto:${business.email}`}>{business.email}</a>
        </article>
        <article className="contact-card">
          <span>Instagram</span>
          <a href={business.instagramUrl} target="_blank" rel="noreferrer">
            {business.instagramHandle}
          </a>
        </article>
        <article className="contact-card">
          <span>Facebook</span>
          <a href={business.facebookUrl} target="_blank" rel="noreferrer">
            Facebook profile
          </a>
        </article>
      </div>

      <a className="button button--primary" href={whatsappUrl} target="_blank" rel="noreferrer">
        Chat on WhatsApp
      </a>
    </section>
  );
}
