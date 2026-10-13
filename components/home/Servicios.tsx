import Image from 'next/image';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/Button';
import { ExternalGlyph } from '@/components/Glyphs';
import { Section } from '@/components/Section';
import { DATI } from '@/content/dati';
import { gallery } from '@/content/gallery';
import {
  SHOW_PRICES,
  brands,
  bundleSaving,
  serviceGroups,
  services,
  type Service,
  type ServiceGroup,
} from '@/content/services';
import type { Locale } from '@/i18n/routing';
import { resolveImage } from '@/lib/images';
import { links } from '@/lib/site';
import { BookServiceButton } from './BookServiceButton';
import { ServiceTabs } from './ServiceTabs';

const bookClass =
  'ui inline-flex min-h-12 items-center whitespace-nowrap underline decoration-1 underline-offset-4 hover:decoration-2';

/** Foto di lavoro vere per ogni gruppo (10 ottobre 2026): rituale con asciugamano e colore su capelli lunghi. */
const GROUP_PHOTO: Record<ServiceGroup, string> = {
  barberia: '/images/galeria/trabajo-02.jpg',
  peluqueria: '/images/galeria/trabajo-01.jpg',
};

/** Kriado Private ha una scheda tutta sua sotto la carta della barbería. */
const PRIVATE_ID = 'private';

/** Prezzo della riga; null se i prezzi sono nascosti (SHOW_PRICES) o mancano. */
function usePrice(service: Service) {
  const t = useTranslations('home.services');
  const format = useFormatter();
  if (!SHOW_PRICES || service.price === undefined) return null;
  if (service.price === 'variable') return t('variable');
  return format.number(service.price, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

/** "Reservar" di riga: la barbería va dritta su Yeasy (nuova scheda: freccia ↗), la peluquería al modulo WhatsApp. */
function Book({ service, locale }: { service: Service; locale: Locale }) {
  const t = useTranslations();
  const name = service.name[locale];
  if (service.group === 'barberia') {
    return (
      <a
        href={links.yeasy}
        target="_blank"
        rel="noopener"
        aria-label={`${t('home.services.bookOnYeasy', { service: name })} ${t('cta.newTab')}`}
        className={`${bookClass} gap-1`}
      >
        {t('booking.book')}
        <ExternalGlyph className="size-3 shrink-0" />
      </a>
    );
  }
  return <BookServiceButton id={service.id} name={name} />;
}

/** Una voce: a sinistra nome (con "Más pedido") e descrizione, a destra durata e "Reservar". */
function Row({ service, locale }: { service: Service; locale: Locale }) {
  const t = useTranslations('home.services');
  const format = useFormatter();
  const price = usePrice(service);
  const saving = SHOW_PRICES ? bundleSaving(service) : null;
  const duration = service.duration ? t('minutes', { minutes: service.duration }) : null;

  return (
    <li
      data-reveal="up"
      className={`relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-6 py-5 lg:py-6 ${
        saving ? 'before:absolute before:inset-y-5 before:-left-4 before:w-0.5 before:bg-negro' : ''
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-lg leading-snug font-semibold lg:text-[1.375rem]">{service.name[locale]}</p>
          {service.popular ? (
            <span className="ui bg-negro px-2 py-1 leading-none text-blanco">{t('popularTag')}</span>
          ) : null}
        </div>
        <p className="mt-1 text-gris">
          {service.description[locale]}
          {saving ? (
            <span className="font-semibold text-negro">
              {' '}
              {t('saving', {
                amount: format.number(saving, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
              })}
            </span>
          ) : null}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        {duration ? (
          <span className="tabular rounded-full border border-hueso px-3 py-1 leading-none whitespace-nowrap text-gris">
            {duration}
          </span>
        ) : null}
        {price ? <span className="tabular font-semibold whitespace-nowrap">{price}</span> : null}
        <Book service={service} locale={locale} />
      </div>
    </li>
  );
}

/** Kriado Private: villas e hotel di tutta l'isola, 5–7 giorni di anticipo (da Carlos). */
function PrivateCard({ service, locale }: { service: Service; locale: Locale }) {
  const t = useTranslations();
  return (
    <div data-reveal="up" data-tone="dark" className="mt-8 bg-negro p-6 text-hueso lg:p-8">
      <p className="quote text-blanco">{service.name[locale]}</p>
      {/* Testo della marca (lo stesso di Quiénes somos): la descrizione breve con i giorni è già nella riga in oro. */}
      <p className="prose-airy mt-3">{t('about.private.text')}</p>
      <p className="ui mt-4 text-oro">
        {t('home.services.privateMeta', {
          from: DATI.private.antelacionDias[0],
          to: DATI.private.antelacionDias[1],
        })}
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <ButtonLink href={links.yeasy} tone="dark" newTab wrap>
          {t('booking.onlineButton')}
        </ButtonLink>
        <ButtonLink href={links.whatsapp(t('whatsapp.private'))} tone="dark" variant="secondary" newTab wrap>
          {t('home.services.privateAsk')}
        </ButtonLink>
      </div>
    </div>
  );
}

/** Un gruppo: foto di lavoro (fissa accanto alla lista su desktop) con nome e intro, poi le voci. */
function GroupPanel({ group, locale }: { group: ServiceGroup; locale: Locale }) {
  const t = useTranslations('home.services');
  const list = services.filter((s) => s.group === group);
  const rows = list.filter((s) => s.id !== PRIVATE_ID);
  const privateService = list.find((s) => s.id === PRIVATE_ID);
  const photo = gallery.find((g) => g.src === GROUP_PHOTO[group]);

  return (
    <div className="grid-12 gap-y-8 lg:items-start">
      <figure className="col-span-12 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:col-span-5">
        {photo ? (
          <div data-reveal="img" className="relative aspect-[3/2] overflow-hidden bg-hueso lg:aspect-[4/5]">
            <Image
              src={resolveImage(photo.src)}
              fill
              alt={photo.alt[locale]}
              sizes="(min-width: 1440px) 520px, (min-width: 1024px) 40vw, 100vw"
              quality={70}
              className="object-cover"
            />
          </div>
        ) : null}
        <figcaption className="mt-6">
          <h3 className="quote">{t(`groups.${group}`)}</h3>
          <p className="prose-airy mt-3">{t(`groupIntro.${group}`)}</p>
        </figcaption>
      </figure>
      <div className="col-span-12 lg:col-span-7">
        <ul className="divide-y divide-hueso border-y border-hueso">
          {rows.map((s) => (
            <Row key={s.id} service={s} locale={locale} />
          ))}
        </ul>
        {privateService ? <PrivateCard service={privateService} locale={locale} /> : null}
      </div>
    </div>
  );
}

export function Servicios() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const format = useFormatter();
  const groups = serviceGroups.filter((g) => services.some((s) => s.group === g));

  return (
    <Section tone="light" labelledBy="servicios-titulo">
      {/* Titolo "Corte, color y barba" tolto dalla vista (Paro, 11 ottobre 2026): resta per i lettori di schermo e come àncora. */}
      <h2 id="servicios-titulo" className="sr-only">
        {t('home.services.title')}
      </h2>
      <ServiceTabs
        label={t('home.services.tabsLabel')}
        tabs={groups.map((g) => ({
          id: g,
          label: t(`home.services.groups.${g}`),
          count: String(services.filter((s) => s.group === g).length),
        }))}
        panels={groups.map((g) => (
          <GroupPanel key={g} group={g} locale={locale} />
        ))}
      />
      <p className="mt-10 lg:mt-12">
        {t('home.services.brands', { brands: format.list(brands, { type: 'conjunction' }) })}
      </p>
    </Section>
  );
}
