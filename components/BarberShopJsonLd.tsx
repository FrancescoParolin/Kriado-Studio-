import { DATI } from '@/content/dati';
import type { Location } from '@/content/locations';
import { SHOW_PRICES, services } from '@/content/services';
import type { Locale } from '@/i18n/routing';
import { resolveImage } from '@/lib/images';
import { links, site } from '@/lib/site';

const DAY_URL: Record<string, string> = {
  monday: 'https://schema.org/Monday',
  tuesday: 'https://schema.org/Tuesday',
  wednesday: 'https://schema.org/Wednesday',
  thursday: 'https://schema.org/Thursday',
  friday: 'https://schema.org/Friday',
  saturday: 'https://schema.org/Saturday',
  sunday: 'https://schema.org/Sunday',
};

/** Dati strutturati per sede: peluquería per donne e uomini, con barbería. Nessun aggregateRating: il voto si mostra solo come testo. */
export function BarberShopJsonLd({ location, url, locale }: { location: Location; url: string; locale: Locale }) {
  const openingHoursSpecification = location.hours.flatMap((d) =>
    'ranges' in d && !d.closed
      ? d.ranges.map((r) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: DAY_URL[d.day],
          opens: r.opens,
          closes: r.closes,
        }))
      : [],
  );

  const sameAs = [links.instagram, site.yeasyUrl, site.googleUrl].filter(Boolean);

  // Listino con i prezzi veri (Yeasy). Senza prezzo (peluquería, Kriado Private) il servizio c'è ma senza cifra.
  // I prezzi vanno nei dati per Google solo se sono anche visibili sul sito.
  const prices = SHOW_PRICES ? services.flatMap((s) => (typeof s.price === 'number' ? [s.price] : [])) : [];
  const priceRange = prices.length ? `${Math.min(...prices)}–${Math.max(...prices)} €` : undefined;
  const hasOfferCatalog = {
    '@type': 'OfferCatalog',
    name: DATI.nombre,
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name[locale], description: s.description[locale] },
      ...(SHOW_PRICES && typeof s.price === 'number' ? { price: s.price, priceCurrency: 'EUR' } : {}),
    })),
  };

  const data = {
    '@context': 'https://schema.org',
    // HairSalon è il tipo schema.org giusto (BarberShop non esiste). Stesso @id in home e in /ubicaciones: è un'attività sola.
    '@type': 'HairSalon',
    '@id': `${site.url}/#salon`,
    name: DATI.nombreGoogle,
    alternateName: DATI.nombre,
    url,
    image: `${site.url}${resolveImage(location.ogImage)}`,
    logo: `${site.url}/images/logo/kriado-logo.png`,
    telephone: location.phone,
    ...(DATI.email ? { email: DATI.email } : {}),
    foundingDate: String(DATI.fundacion),
    founder: { '@type': 'Person', name: DATI.titular },
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.street,
      postalCode: location.address.postalCode,
      addressLocality: location.address.locality,
      addressRegion: location.address.region,
      addressCountry: location.address.country,
    },
    ...(location.geo
      ? { geo: { '@type': 'GeoCoordinates', latitude: location.geo.lat, longitude: location.geo.lng } }
      : {}),
    hasMap: links.google,
    ...(priceRange ? { priceRange } : {}),
    currenciesAccepted: 'EUR',
    hasOfferCatalog,
    ...(openingHoursSpecification.length ? { openingHoursSpecification } : {}),
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
