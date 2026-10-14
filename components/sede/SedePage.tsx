import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { BarberShopJsonLd } from '@/components/BarberShopJsonLd';
import { RecorridoSection } from '@/components/recorrido/RecorridoSection';
import { Section } from '@/components/Section';
import type { Location } from '@/content/locations';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { resolveImage } from '@/lib/images';
import { SedeInfo } from './SedeInfo';
import { SedeIntro } from './SedeIntro';

/** La pagina di una sede: recorrido, dati pratici, mini galleria del locale. */
export async function SedePage({ location, locale, url }: { location: Location; locale: Locale; url: string }) {
  const t = await getTranslations({ locale });
  return (
    <>
      <BarberShopJsonLd location={location} url={url} locale={locale} />
      <RecorridoSection
        location={location}
        locale={locale}
        intro={<SedeIntro location={location} />}
        label={t('recorrido.label')}
      />
      <SedeInfo location={location} title={t('locations.infoTitle')} headingId="sede-info-titulo" />
      <Section tone="dark" labelledBy="sede-local-titulo">
        <h2 id="sede-local-titulo" className="display-l text-blanco">
          {t('locations.localTitle')}
        </h2>
        {/* Griglia regolare: tutte le foto 4:5 con gli angoli morbidi (prima colonne a mosaico, disordinate su telefono). */}
        <ul
          className={`mt-8 grid grid-cols-2 gap-[var(--gutter)] lg:mt-12 ${
            location.gallery.length <= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
          }`}
        >
          {location.gallery.map((img) => (
            <li key={img.src} className="soft relative aspect-[4/5] overflow-hidden bg-hueso">
              <Image
                src={resolveImage(img.src)}
                fill
                alt={img.alt[locale]}
                sizes="(min-width: 1024px) 25vw, 50vw"
                quality={70}
                className="object-cover"
              />
            </li>
          ))}
        </ul>
        <p className="ui mt-4 lg:mt-6">
          <Link href="/galeria" className="link inline-flex min-h-12 items-center">
            {t('cta.fullGallery')}
          </Link>
        </p>
      </Section>
    </>
  );
}
