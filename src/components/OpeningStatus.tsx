import { business } from '../config/business';
import { getOpeningStatus } from '../utils/openingHours';

export function OpeningStatus() {
  const status = getOpeningStatus(business.openingHours);

  return (
    <div className={`opening-status ${status.isOpen ? 'opening-status--open' : 'opening-status--closed'}`}>
      <span className="opening-status__dot" aria-hidden="true" />
      <span className="opening-status__label">{status.label}</span>
      <span className="opening-status__detail">{status.detail}</span>
    </div>
  );
}
