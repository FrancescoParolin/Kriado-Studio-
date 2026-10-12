import type { Metadata } from 'next';
import Image from 'next/image';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Section } from '@/components/Section';
import { SedePage } from '@/components/sede/SedePage';
import { locations, mainLocation } from '@/content/locations';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { resolveImage } from '@/lib/images';
import { absoluteUrl, pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string }> };

// Con una sede sola, /ubicaciones è la pagina della sede. Con più sedi diventa un indice.
const single = locations.length === 1;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'locations' });
  return pageMetadata({
    locale,
    href: '/ubicaciones',
    title: single
      ? { absolute: t('metaTitle', { city: mainLocation.city, street: mainLocation.address.street }) }
      : t('indexTitle'),
    description: single ? t('metaDescription') : t('indexMetaDescription'),
    image: mainLocation.ogImage,
  });
}

export default async function UbicacionesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  if (single) {
    return <SedePage location={mainLocation} locale={locale} url={absoluteUrl(locale, '/ubicaciones')} />;
  }

  const t = await getTranslations();
  return (
    <Section tone="light" className="pt-[calc(var(--header-h)+64px)] lg:pt-[calc(var(--header-h)+96px)]">
      <h1 className="display-xl">{t('locations.indexTitle')}</h1>
      <ul className="mt-10 flex flex-col gap-12 lg:mt-16">
        {locations.map((loc) => {
          const first = loc.recorrido[0]!;
          return (
            <li key={loc.slug} className="grid-12 gap-y-6">
              <Image
                src={resolveImage(`${first.file}-h.jpg`)}
                width={1600}
                height={1067}
                alt={first.alt[locale]}
                sizes="(min-width: 1024px) 40vw, 100vw"
                quality={70}
                className="col-span-12 h-auto w-full lg:col-span-5"
              />
              <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                <h2 className="display-l">{loc.city}</h2>
                <address className="lead mt-4 not-italic">
                  {loc.address.street}, {loc.address.postalCode} {loc.address.locality}
                </address>
                <p className="ui mt-6">
                  <Link href={{ pathname: '/ubicaciones/[slug]', params: { slug: loc.slug } }} className="link">
                    {t('locations.seeLocation')}
                  </Link>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
