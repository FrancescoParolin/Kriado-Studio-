import { useLocale, useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/Button';
import { directionsUrl, type Location } from '@/content/locations';
import type { Locale } from '@/i18n/routing';
import { bookingHref } from '@/lib/booking-href';
import { links } from '@/lib/site';

/** Primo fotogramma della pagina sede: nome, indirizzo, prenotazione e indicazioni. */
export function SedeIntro({ location }: { location: Location }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  return (
    <div className="flex flex-col">
      <h1 className="display-rec text-blanco">
        Kriado Studio
        <br />
        {location.city}
      </h1>
      <p className="mt-4 max-w-[40ch] lg:mt-6">
        {t('locations.lede', {
          street: location.address.street.replace(/ /g, '\u00a0'),
          postalCode: location.address.postalCode,
          city: location.city,
        })}
      </p>
      {/* Su telefono e tablet Reservar, Llamar e Cómo llegar sono nella barra fissa. */}
      <div className="mt-8 hidden flex-wrap gap-2 lg:flex">
        <ButtonLink href={bookingHref(locale)} tone="dark">
          {t('cta.book')}
        </ButtonLink>
        <ButtonLink href={directionsUrl(location)} tone="dark" variant="secondary" newTab>
          {t('cta.directions')}
        </ButtonLink>
      </div>
    </div>
  );
}
