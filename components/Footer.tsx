import { useLocale, useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { DATI } from '@/content/dati';
import { directionsUrl, mainLocation } from '@/content/locations';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { bookingHref } from '@/lib/booking-href';
import { useHoursSummary } from '@/lib/use-hours-summary';
import { links, site } from '@/lib/site';
import { ButtonLink, ExternalLink } from './Button';
import { LangSwitch } from './LangSwitch';
import { LogoMark } from './LogoMark';
import { Words } from '@/components/motion/Words';

/** Link del piè di pagina: area di tocco alta 48px anche se il testo è su una riga. */
const TAP = 'inline-flex min-h-12 items-center';

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-3">
      <p className="ui text-blanco">{title}</p>
      <div className="mt-2 flex flex-col">{children}</div>
    </div>
  );
}

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const { address } = mainLocation;
  const hours = useHoursSummary();
  return (
    <footer data-tone="dark" className="band bg-negro text-hueso">
      <div className="wrap">
        {/* Chiusura: l'invito a prenotare, come ultima cosa che si vede. */}
        <div className="grid-12 gap-y-8 border-b border-gris pb-14 lg:pb-20">
          <div className="col-span-12 lg:col-span-7">
            <p data-reveal="words" className="display-xl text-blanco">
              <Words text={t('footer.bookTitle')} />
            </p>
            <p data-reveal="up" className="mt-6 max-w-[44ch]">
              {t('footer.bookText')}
            </p>
          </div>
          <div className="col-span-12 flex flex-col items-start gap-4 lg:col-span-4 lg:col-start-9 lg:justify-end">
            <a
              href={links.tel}
              className="wordmark tabular inline-flex min-h-12 items-center text-[1.75rem] text-blanco lg:text-[2.1875rem]"
            >
              {mainLocation.phoneDisplay}
            </a>
            <div className="mt-2 flex flex-wrap gap-2">
              <ButtonLink href={bookingHref(locale)} tone="dark">
                {t('cta.book')}
              </ButtonLink>
              <ButtonLink href={links.whatsapp(t('whatsapp.booking'))} tone="dark" variant="secondary" newTab>
                {t('cta.whatsapp')}
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="grid-12 gap-y-10 pt-12 lg:pt-16">
          <div className="col-span-12 lg:col-span-3">
            <LogoMark className="h-16 w-20 text-blanco lg:h-20 lg:w-[6.25rem]" />
            <p className="wordmark mt-6 text-[1.75rem] text-oro lg:text-[2.1875rem]">Kriado Studio</p>
            <p className="mt-4">{t('home.hero.title')}</p>
          </div>
          <Column title={t('footer.visit')}>
            <address className="mt-2 not-italic">
              {address.street}
              <br />
              {`${address.postalCode} ${address.locality}`.replace(/ /g, ' ')}
            </address>
            <p className="mt-2">{t('footer.hoursShort', hours)}</p>
            <span className="mt-2 self-start">
              <ExternalLink href={directionsUrl(mainLocation)} className={TAP}>
                {t('cta.directions')}
              </ExternalLink>
            </span>
          </Column>
          <Column title={t('footer.contact')}>
            <a href={links.tel} className={`link tabular self-start ${TAP}`}>
              {mainLocation.phoneDisplay}
            </a>
            <span className="self-start">
              <ExternalLink href={links.whatsapp(t('whatsapp.booking'))} className={TAP}>
                WhatsApp
              </ExternalLink>
            </span>
            {DATI.email ? (
              <a href={`mailto:${DATI.email}`} className={`link self-start [overflow-wrap:anywhere] ${TAP}`}>
                {DATI.email}
              </a>
            ) : null}
            <span className="self-start">
              <ExternalLink href={links.instagram} className={TAP}>
                Instagram @{site.instagramHandle}
              </ExternalLink>
            </span>
            <span className="self-start">
              <ExternalLink href={links.yeasy} className={TAP}>
                {t('footer.yeasy')}
              </ExternalLink>
            </span>
            <span className="self-start">
              <ExternalLink href={links.google} className={TAP}>
                {t('footer.google')}
              </ExternalLink>
            </span>
          </Column>
          <Column title={t('footer.legalTitle')}>
            <nav aria-label={t('footer.legalNav')} className="flex flex-col">
              <Link href="/aviso-legal" className={`link self-start ${TAP}`}>
                {t('footer.legalNotice')}
              </Link>
              <Link href="/politica-de-privacidad" className={`link self-start ${TAP}`}>
                {t('footer.privacy')}
              </Link>
              <Link href="/politica-de-cookies" className={`link self-start ${TAP}`}>
                {t('footer.cookies')}
              </Link>
            </nav>
          </Column>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-gris pt-8 lg:mt-20 lg:flex-row lg:items-center lg:justify-between">
          <p>
            {t('footer.rights', { year: new Date().getFullYear() })}. {t('footer.descriptor')}
          </p>
          <LangSwitch variant="names" />
        </div>
      </div>
    </footer>
  );
}
