export const CLINIC = {
  name: 'Dental & Maxillofacial Clinic',
  doctor: 'Dr. Md S T Khan',
  whatsappNumber: '918791785177',
  whatsappDisplay: '+91 87917 85177',
  address: {
    line1: 'Apoorva Hospital And Research Centre Pvt Ltd',
    line2: 'Ballia - Bansdih Rd, Jalalpur Chak, UP',
  },
  // Used for both the embed iframe and the directions deeplink
  mapsQuery: 'Apoorva Hospital And Research Centre Pvt Ltd Ballia',
  hours: {
    // 0 = Sunday ... 6 = Saturday. Times in 24h local.
    weekday: { open: '10:00', close: '17:00' },
    sundayLabel: 'Emergency Only',
    weekdayLabel: 'Mon – Sat · 10:00 AM – 5:00 PM',
  },
};

export const whatsappLink = (prefilledText?: string) => {
  const base = `https://wa.me/${CLINIC.whatsappNumber}`;
  return prefilledText ? `${base}?text=${encodeURIComponent(prefilledText)}` : base;
};

export const mapsDirectionsLink = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CLINIC.mapsQuery)}`;

/**
 * Returns the live open/closed status based on the user's local time.
 * Sunday is "Emergency Only" rather than open or closed.
 */
export const getClinicStatus = (now: Date = new Date()) => {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const toMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const openM  = toMinutes(CLINIC.hours.weekday.open);
  const closeM = toMinutes(CLINIC.hours.weekday.close);

  if (day === 0) {
    return { state: 'emergency' as const, label: 'Sunday · Emergency Only' };
  }
  if (minutes >= openM && minutes < closeM) {
    return { state: 'open' as const, label: 'Open Now · until 5:00 PM' };
  }
  if (minutes < openM) {
    return { state: 'closed' as const, label: 'Closed · Opens 10:00 AM' };
  }
  return { state: 'closed' as const, label: 'Closed · Opens Tomorrow 10:00 AM' };
};
