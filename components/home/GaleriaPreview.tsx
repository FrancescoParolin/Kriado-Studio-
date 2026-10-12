import { useLocale, useTranslations } from 'next-intl';
import { ExternalLink } from '@/components/Button';
import { GalleryGrid } from '@/components/galeria/GalleryGrid';
import { Section } from '@/components/Section';
import { homeGallery, homeGalleryMode, workPlaceholders } from '@/content/gallery';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { resolveImage } from '@/lib/images';
import { links } from '@/lib/site';
import { Words } from '@/components/motion/Words';

/** Galleria in home: griglia 4:5, ogni foto si apre a schermo intero. */
export function GaleriaPreview() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const items = homeGallery.map((g) => ({
    src: resolveImage(g.src),
    width: g.width,
    height: g.height,
    alt: g.alt[locale],
    category: g.category,
    focus: g.focus,
  }));
  return (
    <Section tone="dark" labelledBy="galeria-titulo">
      <h2 id="galeria-titulo" data-reveal="words" className="display-l text-blanco">
        <Words
          text={t(
            homeGalleryMode === 'work'
              ? 'home.gallery.title'
              : homeGalleryMode === 'mixed'
                ? 'home.gallery.titleMixed'
                : 'home.gallery.titleStudio',
          )}
        />
      </h2>
      <GalleryGrid
        items={items}
        categories={[]}
        instagramUrl={links.instagram}
        placeholders={homeGalleryMode === 'work' ? [] : workPlaceholders.slice(0, 4)}
        className="mt-8 lg:mt-12"
      />
      <p className="ui mt-6 flex flex-wrap gap-x-8 gap-y-2 lg:mt-8">
        <Link href="/galeria" className="link inline-flex min-h-12 items-center">
          {t('cta.fullGallery')}
        </Link>
        <ExternalLink href={links.instagram} className="inline-flex min-h-12 items-center">
          {t('cta.moreInstagram')}
        </ExternalLink>
      </p>
    </Section>
  );
}
