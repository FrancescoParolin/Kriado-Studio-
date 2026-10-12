import { useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/Button';
import { Section } from '@/components/Section';
import { DATI } from '@/content/dati';
import { directionsUrl, type Location } from '@/content/locations';
import { Link } from '@/i18n/navigation';
import { links } from '@/lib/site';
import { HoursTable } from './HoursTable';
import { ProximasAperturas } from './ProximasAperturas';
import { SedeMapa } from './SedeMapa';
import { Words } from '@/components/motion/Words';
import type { CSSProperties } from 'react';

type Props = {
  location: Location;
  title: string;
  headingId: string;
  /** In home porta alla pagina della sede. */
  showLocationLink?: boolean;
};

/** Distanze da OpenStreetMap, arrotondate ai 50 m (si scrive "a unos"). */
const around = (m: number) => Math.max(50, Math.round(m / 50) * 50);

/** Indirizzo, telefono, orari, mappa e come arrivare. Lo stesso blocco in home e nella pagina della sede. */
export function SedeInfo({ location, title, headingId, showLocationLink = false }: Props) {
  const t = useTranslations();
  const { address } = location;
  return (
    <Section tone="light" labelledBy={headingId}>
      <h2 id={headingId} data-reveal="words" className="display-l">
        <Words text={title} />
      </h2>
      <div className="grid-12 mt-10 gap-y-12 lg:mt-16">
        <div data-reveal="up" className="col-span-12 lg:col-span-5">
          <address className="lead not-italic">
            {address.street}
            <br />
            {address.postalCode} {address.locality}, Mallorca
          </address>
          <p className="mt-4">
            <a href={`tel:${location.phone}`} className="link tabular ui inline-flex min-h-12 items-center">
              {location.phoneDisplay}
            </a>
          </p>
          {/* Su telefono i tre bottoni uno sotto l'altro, a tutta larghezza: niente "2 + 1". */}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:mt-8">
            <ButtonLink href={directionsUrl(location)} tone="light" newTab wrap>
              {t('cta.directions')}
            </ButtonLink>
            <ButtonLink href={`tel:${location.phone}`} tone="light" variant="secondary" wrap>
              {t('cta.call')}
            </ButtonLink>
            <ButtonLink href={links.whatsapp(t('whatsapp.booking'))} tone="light" variant="secondary" newTab wrap>
              WhatsApp
            </ButtonLink>
          </div>
          <div className="mt-12">
            <HoursTable hours={location.hours} />
          </div>
          {showLocationLink ? (
            <p className="ui mt-10">
              <Link href={{ pathname: '/ubicaciones' }} className="link inline-flex min-h-12 items-center">
                {t('home.location.seeLocation')}
              </Link>
            </p>
          ) : null}
        </div>
        <div
          data-reveal="up"
          style={{ '--d': 1 } as CSSProperties}
          className="col-span-12 lg:col-span-7 lg:col-start-6"
        >
          <SedeMapa location={location} />
          <h3 className="wordmark mt-10 text-[1.375rem] lg:mt-12 lg:text-[1.75rem]">{t('location.practical.title')}</h3>
          <dl className="mt-4 divide-y divide-hueso border-y border-hueso">
            {[
              {
                label: t('location.practical.bus'),
                text: t('location.practical.busText', {
                  m: around(DATI.comoLlegar.autobus.metros),
                }),
              },
              {
                label: t('location.practical.parking'),
                // Parcheggio gratuito proprio davanti al locale (metros: 0).
                text:
                  DATI.comoLlegar.aparcamiento.metros === 0
                    ? t(
                        DATI.comoLlegar.aparcamiento.gratuito
                          ? 'location.practical.parkingOppositeFree'
                          : 'location.practical.parkingOpposite',
                      )
                    : t(
                        DATI.comoLlegar.aparcamiento.gratuito
                          ? 'location.practical.parkingFree'
                          : 'location.practical.parkingText',
                        {
                          m: around(DATI.comoLlegar.aparcamiento.metros),
                        },
                      ),
              },
              {
                label: t('location.practical.taxi'),
                text: t('location.practical.taxiText', {
                  m: around(DATI.comoLlegar.taxi.metros),
                }),
              },
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-[8rem_1fr] gap-4 py-4 sm:grid-cols-[10rem_1fr]">
                <dt className="font-semibold">{row.label}</dt>
                <dd>{row.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <ProximasAperturas />
    </Section>
  );
}
