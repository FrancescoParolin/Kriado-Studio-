import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SedePage } from '@/components/sede/SedePage';
import { getLocation, locations } from '@/content/locations';
import { permanentRedirect } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { absoluteUrl, pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => locations.map((l) => ({ locale, slug: l.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const location = getLocation(slug);
  if (!hasLocale(routing.locales, locale) || !location) return {};
  const t = await getTranslations({ locale, namespace: 'locations' });
  return pageMetadata({
    locale,
    href: { pathname: '/ubicaciones/[slug]', params: { slug } },
    title: { absolute: t('metaTitle', { city: location.city, street: location.address.street }) },
    description: t('metaDescription'),
    image: location.ogImage,
  });
}

export default async function SedeSlugPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const location = getLocation(slug);
  if (!location) notFound();
  setRequestLocale(locale);

  // Con una sede sola la pagina vive su /ubicaciones: niente doppioni.
  if (locations.length === 1) permanentRedirect({ href: '/ubicaciones', locale });

  return (
    <SedePage
      location={location}
      locale={locale}
      url={absoluteUrl(locale, { pathname: '/ubicaciones/[slug]', params: { slug } })}
    />
  );
}
