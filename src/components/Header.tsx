import type { BusinessConfig } from '../config/business';
import { buildWhatsAppUrl } from '../utils/whatsapp';

type HeaderProps = {
  business: BusinessConfig;
  itemCount: number;
  onOpenCart: () => void;
};

export function Header({ business, itemCount, onOpenCart }: HeaderProps) {
  const whatsappUrl = buildWhatsAppUrl(
    business.whatsappPhoneNumber,
    "Hello Som's Kitchen, I would like to make an enquiry.",
  );

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand-lockup" href="#top" aria-label="Som's Kitchen home">
          <img src={business.logo} alt="Som's Kitchen logo" className="brand-lockup__logo" />
          <span>
            <strong>{business.name}</strong>
            <small>{business.tagline}</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#menu">Menu</a>
          <a href="#catering">Catering</a>
          <a href="#hours">Hours</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <button className="button button--ghost header-cart-button" type="button" onClick={onOpenCart}>
            Cart <span>{itemCount}</span>
          </button>
          <a className="button button--primary header-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
