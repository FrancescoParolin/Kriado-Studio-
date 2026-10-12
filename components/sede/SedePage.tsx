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
        <ul
          className={`mt-8 columns-2 gap-x-[var(--gutter)] lg:mt-12 ${
            location.gallery.length <= 4 ? 'lg:columns-4' : 'lg:columns-3'
          }`}
        >
          {location.gallery.map((img) => (
            <li key={img.src} className="mb-[var(--gutter)] break-inside-avoid">
              <Image
                src={resolveImage(img.src)}
                width={img.width}
                height={img.height}
                alt={img.alt[locale]}
                sizes="(min-width: 1024px) 33vw, 50vw"
                quality={70}
                className="h-auto w-full"
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
