import { useFormatter, useLocale, useTranslations } from 'next-intl';
import type { CSSProperties } from 'react';
import { ButtonLink } from '@/components/Button';
import { Words } from '@/components/motion/Words';
import { OpenStatus } from '@/components/OpenStatus';
import { Pending, Section } from '@/components/Section';
import { Stars } from '@/components/Stars';
import { rating } from '@/content/reviews';
import type { Locale } from '@/i18n/routing';
import { bookingHref } from '@/lib/booking-href';
import { useHoursSummary } from '@/lib/use-hours-summary';

/**
 * Apertura dopo l'hero: la frase della casa in grande e centrata (seconda metà in contorno),
 * poi il testo e tre dati vivi (stelle, aperto adesso, Kriado Private).
 */
export function Presentacion() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const format = useFormatter();
  const hours = useHoursSummary();
  const value = format.number(rating.value, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <Section tone="light" labelledBy="presentacion-titulo">
      <h2 id="presentacion-titulo" className="display-xl text-center">
        <span data-reveal="words" className="block">
          <Words text={t('home.intro.statementA')} />
        </span>
        <span data-reveal="words" className="statement-outline block">
          <Words text={t('home.intro.statementB')} />
        </span>
      </h2>

      <div className="grid-12 mt-12 gap-y-10 lg:mt-20">
        <div className="col-span-12 lg:col-span-6">
          <p data-reveal="up" className="lead">
            {t('home.intro.text')}
          </p>
          <Pending className="mt-4 block">{t('home.intro.pending')}</Pending>
          <div
            data-reveal="up"
            style={{ '--d': 1 } as CSSProperties}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <ButtonLink href={bookingHref(locale)} tone="light">
              {t('cta.book')}
            </ButtonLink>
            <a href="#servicios-titulo" className="link ui inline-flex min-h-12 items-center">
              {t('home.intro.seeMenu')}
            </a>
          </div>
        </div>

        <dl className="col-span-12 divide-y divide-hueso border-y border-hueso lg:col-span-5 lg:col-start-8">
          <div data-reveal="up" className="grid gap-2 py-5">
            <dt className="sr-only">Google</dt>
            <dd className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="wordmark tabular text-[1.75rem] lg:text-[2.1875rem]">{value}</span>
              <Stars
                value={rating.value}
                label={t('home.reviews.starsLabel', { value })}
                tone="dark"
                className="size-5 lg:size-6"
              />
            </dd>
            <dd className="text-gris">{t('home.intro.ratingFact', { count: rating.count })}</dd>
          </div>
          <div data-reveal="up" style={{ '--d': 1 } as CSSProperties} className="grid gap-2 py-5">
            <dt className="sr-only">{t('location.hours')}</dt>
            <dd>
              <OpenStatus className="text-[1.375rem] lg:text-[1.75rem]" />
            </dd>
            <dd className="text-gris">{t('home.intro.hoursFact', hours)}</dd>
          </div>
          <div data-reveal="up" style={{ '--d': 2 } as CSSProperties} className="grid gap-2 py-5">
            <dt className="sr-only">Kriado Private</dt>
            <dd className="wordmark text-[1.75rem] lg:text-[2.1875rem]">Kriado Private</dd>
            <dd className="text-gris">{t('home.intro.privateFact')}</dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
