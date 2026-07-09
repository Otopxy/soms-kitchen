export const WHATSAPP_PHONE_NUMBER = '2349030047568';

export type OpeningDay = {
  day: string;
  opens: string | null;
  closes: string | null;
  display: string;
};

export const business = {
  name: "Som's Kitchen",
  tagline: 'Delicious & Affordable Meals',
  location: 'Ede, Osun, Nigeria',
  address: 'R. A. Adeniji Street, 232104, Ede, Osun, Nigeria',
  displayPhone: '09030047568',
  whatsappPhoneNumber: WHATSAPP_PHONE_NUMBER,
  email: 'susanakinola37@gmail.com',
  instagramHandle: '@somsktchn',
  instagramUrl: 'https://www.instagram.com/somsktchn',
  facebookUrl: 'https://www.facebook.com/share/1BWJm8nv5t/?mibextid=wwXIfr',
  logo: '/images/soms-logo.png',
  openingHours: [
    { day: 'Monday', opens: '09:00', closes: '18:00', display: '9:00 AM - 6:00 PM' },
    { day: 'Tuesday', opens: '09:00', closes: '18:00', display: '9:00 AM - 6:00 PM' },
    { day: 'Wednesday', opens: '09:00', closes: '15:00', display: '9:00 AM - 3:00 PM' },
    { day: 'Thursday', opens: '09:00', closes: '18:00', display: '9:00 AM - 6:00 PM' },
    { day: 'Friday', opens: '09:00', closes: '18:00', display: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', opens: '09:00', closes: '19:00', display: '9:00 AM - 7:00 PM' },
    { day: 'Sunday', opens: null, closes: null, display: 'Closed' },
  ] satisfies OpeningDay[],
};

export type BusinessConfig = typeof business;
