import { useLocale, useTranslations } from 'next-intl';
import { directionsUrl, mainLocation } from '@/content/locations';
import type { Locale } from '@/i18n/routing';
import { bookingHref } from '@/lib/booking-href';
import { links } from '@/lib/site';

/** Barra fissa su telefono e tablet: prenotare, chiamare, arrivare. Un tap, col pollice. */
export function MobileBar() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const cell =
    'ui flex h-16 items-center justify-center px-2 text-center decoration-1 underline-offset-4 transition-opacity duration-200 hover:underline active:opacity-70 focus-visible:outline-offset-[-4px]';
  return (
    // Filo superiore come ombra: la barra resta alta 64px esatti, come --bar-h.
    <nav
      aria-label={t('bar.label')}
      data-tone="dark"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 bg-negro shadow-[0_-1px_0_0_var(--color-gris)] pb-[env(safe-area-inset-bottom)] text-blanco lg:hidden"
    >
      <a href={bookingHref(locale)} className={`${cell} bg-blanco text-negro`}>
        {t('bar.book')}
      </a>
      <a href={links.tel} className={`${cell} border-l border-gris`}>
        {t('bar.call')}
      </a>
      <a href={directionsUrl(mainLocation)} target="_blank" rel="noopener" className={`${cell} border-l border-gris`}>
        {t('bar.directions')}
        <span className="sr-only"> {t('cta.newTab')}</span>
      </a>
    </nav>
  );
}
