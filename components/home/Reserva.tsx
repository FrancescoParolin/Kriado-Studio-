import { useLocale, useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/Button';
import { Section } from '@/components/Section';
import { DATI } from '@/content/dati';
import { serviceGroups, services } from '@/content/services';
import type { Locale } from '@/i18n/routing';
import { links } from '@/lib/site';
import { BookingForm } from './BookingForm';
import { Words } from '@/components/motion/Words';
import type { CSSProperties } from 'react';

/** La sezione che fa prenotare: Yeasy con orario esatto, telefono, oppure un messaggio WhatsApp già pronto. */
export function Reserva() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const options = services.map((s) => ({
    id: s.id,
    label: s.name[locale],
    group: s.group,
  }));
  const groups = Object.fromEntries(serviceGroups.map((g) => [g, t(`home.services.groups.${g}`)]));

  return (
    <Section tone="light" id="reservar" labelledBy="reservar-titulo" className="scroll-mt-[var(--header-h)]">
      <div className="grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-5">
          <h2 id="reservar-titulo" data-reveal="words" className="display-l">
            <Words text={t('booking.title')} />
          </h2>
          <p data-reveal="up" className="lead mt-6">
            {t('booking.intro')}
          </p>

          <div data-reveal="up" className="mt-10 border-t border-hueso pt-8">
            <h3 className="wordmark text-[1.375rem] lg:text-[1.75rem]">{t('booking.onlineTitle')}</h3>
            <p className="mt-2 text-gris">{t('booking.onlineText')}</p>
            <div className="mt-6">
              <ButtonLink href={links.yeasy} tone="light" newTab>
                {t('booking.onlineButton')}
              </ButtonLink>
            </div>
          </div>

          <div data-reveal="up" className="mt-10 border-t border-hueso pt-8">
            <h3 className="wordmark text-[1.375rem] lg:text-[1.75rem]">{t('booking.phoneTitle')}</h3>
            <p className="mt-2">
              <a href={links.tel} className="link tabular ui inline-flex min-h-12 items-center">
                {DATI.telefonoVisible}
              </a>
            </p>
          </div>
        </div>

        <div
          data-reveal="up"
          style={{ '--d': 1 } as CSSProperties}
          className="col-span-12 border-t border-hueso pt-8 lg:col-span-6 lg:col-start-7 lg:border-0 lg:pt-0"
        >
          <h3 className="wordmark text-[1.375rem] lg:text-[1.75rem]">{t('booking.waTitle')}</h3>
          <p className="mt-2 mb-8 text-gris">{t('booking.waText')}</p>
          <BookingForm
            options={options}
            groups={groups}
            whatsapp={DATI.whatsapp}
            directMessage={links.whatsapp(t('whatsapp.booking'))}
          />
        </div>
      </div>
    </Section>
  );
}
