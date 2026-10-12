import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { BarberShopJsonLd } from '@/components/BarberShopJsonLd';
import { Carlos } from '@/components/home/Carlos';
import { GaleriaPreview } from '@/components/home/GaleriaPreview';
import { HomeIntro } from '@/components/home/HomeIntro';
import { Opiniones } from '@/components/home/Opiniones';
import { Presentacion } from '@/components/home/Presentacion';
import { Productos } from '@/components/home/Productos';
import { Reserva } from '@/components/home/Reserva';
import { Servicios } from '@/components/home/Servicios';
import { RecorridoSection } from '@/components/recorrido/RecorridoSection';
import { SedeInfo } from '@/components/sede/SedeInfo';
import { mainLocation } from '@/content/locations';
import { products } from '@/content/products';
import { routing } from '@/i18n/routing';
import { absoluteUrl, pageMetadata } from '@/lib/metadata';
import { Ribbon } from '@/components/motion/Ribbon';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'meta' });
  return pageMetadata({
    locale,
    href: '/',
    title: { absolute: t('homeTitle') },
    description: t('homeDescription'),
    image: mainLocation.ogImage,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <BarberShopJsonLd location={mainLocation} url={absoluteUrl(locale, '/')} locale={locale} />
      <RecorridoSection location={mainLocation} locale={locale} intro={<HomeIntro />} label={t('recorrido.label')} />
      <Presentacion />
      <Servicios />
      <Reserva />
      {/* Prodotti rimandati: la sezione torna da sola appena c'è un prodotto senza `pending`. */}
      {products.some((p) => !p.pending) ? <Productos /> : null}
      {/* Nastro di parole che scorre di lato con lo scroll: passaggio dal bianco della prenotazione al nero della galleria. */}
      <Ribbon items={t.raw('home.ribbon') as string[]} />
      <GaleriaPreview />
      <Carlos />
      <Opiniones />
      <SedeInfo location={mainLocation} title={t('home.location.title')} headingId="donde-titulo" showLocationLink />
    </>
  );
}
