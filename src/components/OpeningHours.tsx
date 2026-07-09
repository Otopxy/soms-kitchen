import type { BusinessConfig } from '../config/business';
import { OpeningStatus } from './OpeningStatus';

type OpeningHoursProps = {
  business: BusinessConfig;
};

export function OpeningHours({ business }: OpeningHoursProps) {
  return (
    <section className="section-shell section-block hours-section" id="hours" aria-labelledby="hours-heading">
      <div className="section-heading">
        <p className="eyebrow">Opening hours</p>
        <h2 id="hours-heading">When Som's Kitchen is open</h2>
        <OpeningStatus />
      </div>

      <div className="hours-list">
        {business.openingHours.map((entry) => (
          <div className="hours-row" key={entry.day}>
            <strong>{entry.day}</strong>
            <span>{entry.display}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
