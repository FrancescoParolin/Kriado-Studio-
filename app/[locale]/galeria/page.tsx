import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { GalleryGrid } from '@/components/galeria/GalleryGrid';
import { gallery, homeGalleryMode, workPlaceholders } from '@/content/gallery';
import { mainLocation } from '@/content/locations';
import { routing } from '@/i18n/routing';
import { resolveImage } from '@/lib/images';
import { pageMetadata } from '@/lib/metadata';
import { bookingHref } from '@/lib/booking-href';
import { links } from '@/lib/site';
import { ButtonLink, ExternalLink } from '@/components/Button';
import { Words } from '@/components/motion/Words';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'gallery' });
  return pageMetadata({
    locale,
    href: '/galeria',
    title: t('metaTitle'),
    // Finché non ci sono foto dei lavori la descrizione parla del locale, non di "trabajos reales".
    description: homeGalleryMode === 'work' ? t('metaDescription') : t('metaDescriptionStudio'),
    image: mainLocation.ogImage,
  });
}

export default async function GaleriaPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'gallery' });
  const tc = await getTranslations({ locale, namespace: 'cta' });

  // Solo le categorie che hanno almeno una foto diventano filtri.
  // Niente filtri (scelta di Paro, 11 ottobre 2026): tutte le foto insieme.
  const items = gallery.map((g) => ({
    src: resolveImage(g.src),
    width: g.width,
    height: g.height,
    alt: g.alt[locale],
    category: g.category,
    focus: g.focus,
  }));

  return (
    <section
      data-tone="dark"
      aria-labelledby="galeria-h1"
      className="bg-negro pt-[calc(var(--header-h)+48px)] pb-16 text-hueso lg:pt-[calc(var(--header-h)+80px)] lg:pb-24"
    >
      <div className="wrap">
        <h1 id="galeria-h1" data-reveal="words" className="display-xl text-blanco">
          <Words text={t('title')} />
        </h1>
        <p className="lead mt-6 max-w-[40ch]">{homeGalleryMode === 'work' ? t('introWork') : t('introStudio')}</p>
        {/* eager: le prime due file stanno nel primo schermo a quasi tutte le misure, si caricano subito. */}
        <GalleryGrid
          items={items}
          categories={[]}
          instagramUrl={links.instagram}
          placeholders={workPlaceholders}
          eager={8}
        />
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-12">
          <ButtonLink href={bookingHref(locale)} tone="dark">
            {tc('book')}
          </ButtonLink>
          <ExternalLink href={links.instagram} className="ui inline-flex min-h-12 items-center">
            {tc('moreInstagram')}
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
