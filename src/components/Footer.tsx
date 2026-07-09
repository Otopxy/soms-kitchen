import type { BusinessConfig } from '../config/business';
import { buildWhatsAppUrl } from '../utils/whatsapp';

type FooterProps = {
  business: BusinessConfig;
};

export function Footer({ business }: FooterProps) {
  const whatsappUrl = buildWhatsAppUrl(
    business.whatsappPhoneNumber,
    "Hello Som's Kitchen, I would like to make an enquiry.",
  );
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="section-shell site-footer__inner">
        <a className="brand-lockup" href="#top" aria-label="Som's Kitchen home">
          <img src={business.logo} alt="Som's Kitchen logo" className="brand-lockup__logo" />
          <span>
            <strong>{business.name}</strong>
            <small>{business.tagline}</small>
          </span>
        </a>
        <p>&copy; {currentYear} Som's Kitchen. All rights reserved.</p>
        <div className="footer-links">
          <a href={business.instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={business.facebookUrl} target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
