import { useFormatter, useTranslations } from 'next-intl';
import { ButtonLink, ExternalLink } from '@/components/Button';
import { Section } from '@/components/Section';
import { Stars } from '@/components/Stars';
import { highlights, rating, reviews } from '@/content/reviews';
import type { Locale } from '@/i18n/routing';
import { links } from '@/lib/site';
import { Words } from '@/components/motion/Words';
import { CountUp } from '@/components/motion/CountUp';
import type { CSSProperties } from 'react';

const QUOTES: Record<Locale, [string, string]> = {
  es: ['«', '»'],
  en: ['“', '”'],
  de: ['„', '“'],
};

function quoted(text: string, lang: Locale) {
  const [open, close] = QUOTES[lang];
  return `${open}${text}${close}`;
}

/**
 * Banda nera, perché le stelle oro si accendano (oro su nero 7,4:1; su bianco non passerebbe il contrasto).
 * Livelli: il voto con le stelle, una recensione in evidenza in grande, l'altra più piccola, gli estratti di Google.
 * Le stelle sulle singole recensioni ci sono solo dove il voto è stato letto su Google.
 */
export function Opiniones() {
  const t = useTranslations();
  const format = useFormatter();
  const [featured, ...others] = reviews;
  const value = format.number(rating.value, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <Section tone="dark" labelledBy="opiniones-titulo">
      <h2 id="opiniones-titulo" data-reveal="words" className="display-l text-blanco">
        <Words text={t('home.reviews.title')} />
      </h2>

      <div className="grid-12 mt-10 gap-y-12 lg:mt-16">
        {/* Livello 1: il voto, con le cinque stelle */}
        <div data-reveal="up" className="col-span-12 lg:col-span-4">
          <Stars value={rating.value} label={t('home.reviews.starsLabel', { value })} className="size-8 lg:size-10" />
          <p className="mt-4 flex items-baseline gap-4 lg:mt-6 lg:block">
            <CountUp value={rating.value} className="display-num tabular block text-blanco" />
            <span className="lead lg:mt-4 lg:block">{t('home.reviews.outOf')}</span>
          </p>
          <p className="mt-4">
            {t('home.reviews.breakdown', {
              count: rating.count,
              five: rating.fiveStars,
            })}
          </p>
          <p className="ui mt-6">
            <ExternalLink href={links.google} className="inline-flex min-h-12 items-center">
              {t('home.reviews.readAll', { count: rating.count })}
            </ExternalLink>
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          {/* Livello 2: la recensione in evidenza */}
          {featured ? (
            <figure data-reveal="up">
              {featured.stars ? (
                <Stars value={featured.stars} label={t('home.reviews.reviewStars', { stars: featured.stars })} />
              ) : null}
              <blockquote lang={featured.lang} data-reveal="words" className="display-l mt-4 text-blanco">
                <p>
                  <Words text={quoted(featured.text, featured.lang)} />
                </p>
              </blockquote>
              <figcaption className="mt-4">
                <span className="font-semibold text-blanco">{featured.author}</span>
                <span>, {t('home.reviews.source')}</span>
              </figcaption>
            </figure>
          ) : null}

          {/* Livello 3: le altre recensioni */}
          {others.map((r, i) => (
            <figure key={i} data-reveal="up" className="mt-12 border-t border-gris pt-10 lg:mt-14 lg:pt-12">
              {r.stars ? <Stars value={r.stars} label={t('home.reviews.reviewStars', { stars: r.stars })} /> : null}
              <blockquote
                lang={r.lang}
                className="mt-4 text-[1.375rem] leading-[1.1] font-extrabold tracking-[-0.01em] text-blanco [font-variation-settings:'wdth'_125] lg:text-[1.75rem]"
              >
                <p>{quoted(r.text, r.lang)}</p>
              </blockquote>
              <figcaption className="mt-4">
                <span className="font-semibold text-blanco">{r.author}</span>
                <span>, {t('home.reviews.source')}</span>
              </figcaption>
            </figure>
          ))}

          {/* Livello 4: estratti messi in evidenza da Google (senza autore né voto visibili: niente stelle) */}
          {highlights.length ? (
            <ul className="mt-12 grid gap-x-[var(--gutter)] gap-y-8 border-t border-gris pt-10 sm:grid-cols-3 lg:mt-14 lg:pt-12">
              {highlights.map((h, i) => (
                <li key={i} data-reveal="up" style={{ '--d': i } as CSSProperties}>
                  <figure>
                    <blockquote lang={h.lang} className="leading-snug font-semibold text-blanco lg:text-[1.125rem]">
                      <p>{quoted(h.text, h.lang)}</p>
                    </blockquote>
                    <figcaption className="mt-2">{t('home.reviews.source')}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {/* Invito a lasciare una recensione: le recensioni vere sono ciò che fa scegliere un salone. */}
      <div className="grid-12 mt-16 gap-y-6 border-t border-gris pt-8 lg:mt-24 lg:items-end lg:pt-10">
        <div className="col-span-12 lg:col-span-4 lg:col-start-5">
          <h3 className="wordmark text-[1.375rem] text-blanco lg:text-[1.75rem]">{t('home.reviews.inviteTitle')}</h3>
          <p className="mt-2">{t('home.reviews.inviteText')}</p>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:self-end lg:justify-self-end">
          <ButtonLink href={links.googleReview} tone="dark" newTab wrap>
            {t('home.reviews.inviteButton')}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
