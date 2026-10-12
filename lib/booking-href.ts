import { getPathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

/** Tutti i "Reservar cita" portano alla sezione di prenotazione della home (Yeasy per la barbería, WhatsApp per tutto). */
export function bookingHref(locale: Locale) {
  return `${getPathname({ locale, href: '/' })}#reservar`;
}
