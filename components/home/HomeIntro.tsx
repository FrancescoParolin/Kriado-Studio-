import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/Button';
import { OpenStatus } from '@/components/OpenStatus';
import { DATI } from '@/content/dati';
import { rating } from '@/content/reviews';
import type { Locale } from '@/i18n/routing';
import { bookingHref } from '@/lib/booking-href';
import { links } from '@/lib/site';
import { Words } from '@/components/motion/Words';
import type { CSSProperties } from 'react';

/**
 * Primo fotogramma della home, sul nero accanto (desktop) o sotto (mobile) alla facciata:
 * nome, cosa fa e dove, aperto adesso o no, e le due azioni.
 */
export function HomeIntro() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const format = useFormatter();
  const value = format.number(rating.value, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <div className="flex flex-col">
      <h1 data-reveal="words" className="display-rec text-blanco">
        <Words text={DATI.nombre} />
      </h1>
      <p data-reveal="up" style={{ '--d': 2 } as CSSProperties} className="mt-4 max-w-[40ch] lg:mt-6">
        {t('home.hero.lede')}
      </p>
      <div data-reveal="up" style={{ '--d': 3 } as CSSProperties} className="mt-4 flex flex-col gap-2 lg:mt-6">
        <OpenStatus className="text-blanco" />
        <p className="ui">
          {t.rich('home.hero.rating', {
            rating: value,
            count: rating.count,
            num: (chunks) => <span className="wordmark text-oro">{chunks}</span>,
          })}
        </p>
      </div>
      {/* Su telefono e tablet le due azioni sono nella barra fissa in basso, nella stessa schermata. */}
      <div data-reveal="up" style={{ '--d': 4 } as CSSProperties} className="mt-8 hidden flex-wrap gap-2 lg:flex">
        <ButtonLink href={bookingHref(locale)} tone="dark">
          {t('cta.book')}
        </ButtonLink>
        <ButtonLink href={links.tel} tone="dark" variant="secondary">
          {t('cta.call')}
        </ButtonLink>
      </div>
    </div>
  );
}
