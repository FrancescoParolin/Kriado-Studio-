import type { Metadata } from 'next';
import Image from 'next/image';
import { hasLocale } from 'next-intl';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ButtonLink } from '@/components/Button';
import { Pending, Section } from '@/components/Section';
import { mainLocation } from '@/content/locations';
import { brands } from '@/content/services';
import { gallery, type GalleryItem } from '@/content/gallery';
import { aboutFallbackPhoto, carlosPhoto } from '@/content/team';
import { DATI } from '@/content/dati';
import { highlights } from '@/content/reviews';
import type { CSSProperties } from 'react';
import { routing } from '@/i18n/routing';
import { hasRealImage, resolveImage } from '@/lib/images';
import { pageMetadata } from '@/lib/metadata';
import { bookingHref } from '@/lib/booking-href';
import { links } from '@/lib/site';
import { Words } from '@/components/motion/Words';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'about' });
  return pageMetadata({
    locale,
    href: '/quienes-somos',
    title: t('metaTitle'),
    description: t('metaDescription'),
    image: mainLocation.ogImage,
  });
}

export default async function QuienesSomosPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const format = await getFormatter({ locale });
  // Niente immagini segnaposto: senza la foto di Carlos si usa il salone vero.
  const hasCarlos = hasRealImage(carlosPhoto.src);
  const photo = hasCarlos ? carlosPhoto : aboutFallbackPhoto;
  // Accanto a "Carlos Kriado, fundador." la foto di Carlos al lavoro (10 ottobre 2026); sotto il testo la sala d'attesa.
  const photoB = gallery.find((g) => g.src === '/images/galeria/espera-01.jpg') as GalleryItem;
  // Accanto a "Carlos Kriado, fundador.": Carlos durante il rituale con l'asciugamano caldo.
  const carlosAtWork = gallery.find((g) => g.src === '/images/galeria/trabajo-02.jpg') as GalleryItem;
  const photoA = { src: carlosAtWork.src, alt: carlosAtWork.alt[locale] };
  // Recensione vera su Pau (estratto della scheda Google) per la scheda del team.
  const pauReview = highlights.find((h) => h.text.startsWith('Pau'));

  return (
    <>
      {/* Banda nera: parla la foto di Carlos al lavoro. */}
      <section
        data-tone="dark"
        aria-labelledby="about-h1"
        className="bg-negro pt-[calc(var(--header-h)+48px)] pb-16 text-hueso lg:pt-[calc(var(--header-h)+80px)] lg:pb-24"
      >
        <div className="wrap">
          <h1 id="about-h1" data-reveal="words" className="display-xl text-blanco">
            <Words text={t('about.title')} />
          </h1>
          <Image
            src={resolveImage(photo.src)}
            width={photo.width}
            height={photo.height}
            alt={hasCarlos ? t('about.photoAlt') : t('about.salonAlt')}
            sizes="(min-width: 1440px) 1296px, 90vw"
            quality={80}
            preload
            className="mt-8 h-auto w-full lg:mt-12"
          />
        </div>
      </section>

      {/* Foto e testo sfalsati su due colonne (spunto: millimetrobarber.it): capolettera, frasi in grassetto
          che spezzano il testo, paragrafi ariosi. Su telefono: testo, foto, testo, foto (la colonna sinistra si inverte). */}
      <Section tone="light">
        <div className="grid-12 gap-y-12">
          <div className="order-2 col-span-12 flex flex-col-reverse gap-12 lg:order-1 lg:col-span-5 lg:flex-col">
            <div data-reveal="img" className="relative aspect-[4/5] overflow-hidden bg-hueso">
              <Image
                src={resolveImage(photoA.src)}
                fill
                alt={photoA.alt}
                sizes="(min-width: 1440px) 520px, (min-width: 1024px) 40vw, 100vw"
                quality={70}
                className="object-cover"
              />
            </div>
            <div>
              <p data-reveal="words" className="quote">
                <Words text={t('about.statement2')} />
              </p>
              <p data-reveal="up" className="prose-airy mt-6">
                {t('about.story2')}
              </p>
              <Pending className="mt-4 block">{t('home.carlos.pending')}</Pending>
            </div>
          </div>
          <div className="order-1 col-span-12 flex flex-col gap-12 lg:order-2 lg:col-span-6 lg:col-start-7">
            <div>
              <p data-reveal="up" className="lead">
                {t('about.lead')}
              </p>
              <p data-reveal="words" className="quote mt-8">
                <Words text={t('about.statement1')} />
              </p>
              <p data-reveal="up" className="prose-airy drop-cap mt-6">
                {t('about.story1')}
              </p>
            </div>
            <div data-reveal="img" className="relative aspect-[3/2] overflow-hidden bg-hueso">
              <Image
                src={resolveImage(photoB.src)}
                fill
                alt={photoB.alt[locale]}
                sizes="(min-width: 1440px) 630px, (min-width: 1024px) 45vw, 100vw"
                quality={70}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Storia in tre tappe e i tre valori della marca, su nero: anni in oro (contrasto 7,4:1). Dati da Carlos. */}
      <Section tone="dark" labelledBy="timeline-title">
        <h2 id="timeline-title" data-reveal="words" className="display-l text-blanco">
          <Words text={t('about.timelineTitle')} />
        </h2>
        <ol className="grid-12 mt-10 gap-y-10 lg:mt-16">
          {[
            { year: DATI.trayectoria.inicio, text: t('about.timeline.start') },
            { year: DATI.trayectoria.profesional, text: t('about.timeline.pro') },
            { year: DATI.fundacion, text: t('about.timeline.founded') },
          ].map((step, i) => (
            <li
              key={step.year}
              data-reveal="up"
              style={{ '--d': i } as CSSProperties}
              className="col-span-12 border-t border-gris pt-6 md:col-span-4"
            >
              <p className="wordmark tabular text-[4.3125rem] leading-[0.85] text-oro md:text-[6.6875rem]">
                {step.year}
              </p>
              <p className="prose-airy mt-4 text-blanco">{step.text}</p>
            </li>
          ))}
        </ol>

        <h2 id="values-title" data-reveal="words" className="display-l mt-20 text-blanco lg:mt-28">
          <Words text={t('about.valuesTitle')} />
        </h2>
        <ul className="grid-12 mt-10 gap-y-10 lg:mt-16">
          {(t.raw('about.values') as Array<{ title: string; text: string }>).map((value, i) => (
            <li
              key={value.title}
              data-reveal="up"
              style={{ '--d': i } as CSSProperties}
              className="col-span-12 md:col-span-4"
            >
              <p className="quote text-blanco">{value.title}</p>
              <p className="prose-airy mt-4">{value.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Il team: Carlos e Pau (Pau è citato nelle recensioni). Senza foto di Pau: due schede di solo testo. */}
      <Section tone="light" labelledBy="team-title">
        <h2 id="team-title" data-reveal="words" className="display-l">
          <Words text={t('about.teamTitle')} />
        </h2>
        <div className="grid-12 mt-10 gap-y-12 lg:mt-16">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div data-reveal="img" className="relative mb-6 aspect-[4/5] overflow-hidden bg-hueso">
              <Image
                src={resolveImage('/images/equipo/carlos-retrato.jpg')}
                fill
                alt={t('about.team.carlosAlt')}
                sizes="(min-width: 1440px) 540px, (min-width: 768px) 45vw, 100vw"
                quality={70}
                className="object-cover"
              />
            </div>
            <div data-reveal="up" className="border-t border-negro pt-6">
              <p className="quote">{DATI.titular}</p>
              <p className="ui mt-3 text-gris">{t('about.team.carlosRole')}</p>
              <p className="prose-airy mt-4">{t('about.team.carlosText')}</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-7">
            <div data-reveal="img" className="relative mb-6 aspect-[4/5] overflow-hidden bg-hueso">
              <Image
                src={resolveImage('/images/equipo/pau-equipo.jpg')}
                fill
                alt={t('about.team.pauAlt')}
                sizes="(min-width: 1440px) 540px, (min-width: 768px) 45vw, 100vw"
                quality={70}
                className="object-cover"
              />
            </div>
            <div data-reveal="up" style={{ '--d': 1 } as CSSProperties} className="border-t border-negro pt-6">
              <p className="quote">Pau</p>
              <p className="ui mt-3 text-gris">{t('about.team.pauRole')}</p>
              <p className="prose-airy mt-4">{t('about.team.pauText')}</p>
              {pauReview ? (
                <figure className="mt-6 border-l-2 border-negro pl-4">
                  <blockquote lang={pauReview.lang} className="font-semibold">
                    <p>«{pauReview.text}»</p>
                  </blockquote>
                  <figcaption className="mt-2 text-gris">{t('about.team.reviewSource')}</figcaption>
                </figure>
              ) : null}
            </div>
          </div>
        </div>
      </Section>

      {/* Kriado Private: villas e hotel di tutta l'isola, 5–7 giorni di anticipo (Carlos). */}
      <Section tone="dark" labelledBy="private-title">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <h2 id="private-title" data-reveal="words" className="display-l text-blanco">
              <Words text={t('about.private.title')} />
            </h2>
            <p data-reveal="up" className="lead mt-6">
              {t('about.private.text')}
            </p>
            <div data-reveal="up" className="mt-8">
              <ButtonLink href={links.whatsapp(t('whatsapp.private'))} tone="dark" newTab wrap>
                {t('about.private.cta')}
              </ButtonLink>
            </div>
          </div>
          <dl
            data-reveal="up"
            style={{ '--d': 1 } as CSSProperties}
            className="col-span-12 divide-y divide-gris border-y border-gris lg:col-span-5 lg:col-start-8 lg:self-end"
          >
            {[
              { label: t('about.private.where'), value: t('about.private.whereValue') },
              { label: t('about.private.zone'), value: t('about.private.zoneValue') },
              {
                label: t('about.private.notice'),
                value: t('about.private.noticeValue', {
                  from: DATI.private.antelacionDias[0],
                  to: DATI.private.antelacionDias[1],
                }),
              },
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-[7rem_1fr] gap-4 py-4 sm:grid-cols-[9rem_1fr]">
                <dt className="font-semibold text-blanco">{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="light" labelledBy="how-title">
        <h2 id="how-title" data-reveal="words" className="display-l">
          <Words text={t('about.howTitle')} />
        </h2>
        {/* Cinque punti numerati, uno per riga: si leggono a colpo d'occhio. */}
        <div className="grid-12 mt-8 lg:mt-12">
          <ol className="col-span-12 divide-y divide-hueso border-y border-hueso lg:col-span-9">
            {[
              t('about.how1'),
              t('about.how2'),
              t('about.how3', { brands: format.list(brands, { type: 'conjunction' }) }),
              t('about.how4'),
            ].map((text, i) => (
              <li key={i} data-reveal="up" className="grid grid-cols-[3rem_1fr] gap-4 py-6 lg:grid-cols-[5rem_1fr]">
                <span aria-hidden="true" className="wordmark tabular text-[1.375rem] text-gris lg:text-[1.75rem]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="lead">{text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-10 lg:mt-12">
          <ButtonLink href={bookingHref(locale)} tone="light">
            {t('cta.book')}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
