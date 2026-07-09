import type { OpeningDay } from '../config/business';

export type OpeningStatus = {
  isOpen: boolean;
  label: 'Open now' | 'Closed now' | 'Closed today';
  detail: string;
  day: string;
};

const LAGOS_TIME_ZONE = 'Africa/Lagos';

function getLagosParts(now: Date) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: LAGOS_TIME_ZONE,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  const parts = formatter.formatToParts(now);
  const part = (type: string) => parts.find((entry) => entry.type === type)?.value ?? '';

  return {
    day: part('weekday'),
    hour: Number(part('hour')),
    minute: Number(part('minute')),
  };
}

function timeToMinutes(time: string): number {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}

function formatTimeLabel(time: string): string {
  const [hourText, minuteText] = time.split(':');
  const hour = Number(hourText);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minuteText} ${suffix}`;
}

export function getOpeningStatus(openingHours: OpeningDay[], now = new Date()): OpeningStatus {
  const { day, hour, minute } = getLagosParts(now);
  const today = openingHours.find((entry) => entry.day === day);

  if (!today || !today.opens || !today.closes) {
    return {
      isOpen: false,
      label: 'Closed today',
      detail: "Som's Kitchen may respond during opening hours.",
      day,
    };
  }

  const currentMinutes = hour * 60 + minute;
  const openMinutes = timeToMinutes(today.opens);
  const closeMinutes = timeToMinutes(today.closes);
  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  if (isOpen) {
    return {
      isOpen: true,
      label: 'Open now',
      detail: `Closes at ${formatTimeLabel(today.closes)} today`,
      day,
    };
  }

  return {
    isOpen: false,
    label: 'Closed now',
    detail:
      currentMinutes < openMinutes
        ? `Opens at ${formatTimeLabel(today.opens)} today. Som's Kitchen may respond during opening hours.`
        : "Som's Kitchen may respond during opening hours.",
    day,
  };
}
