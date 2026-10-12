import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { DATI } from '@/content/dati';
import { ButtonLink, ExternalLink } from '@/components/Button';
import { ContactForm } from '@/components/contacto/ContactForm';
import { HoursTable } from '@/components/sede/HoursTable';
import { mainLocation } from '@/content/locations';
import { routing } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { bookingHref } from '@/lib/booking-href';
import { links, site } from '@/lib/site';
import { Words } from '@/components/motion/Words';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: 'contact' });
  return pageMetadata({
    locale,
    href: '/contacto',
    title: t('metaTitle'),
    description: t('metaDescription'),
    image: mainLocation.ogImage,
  });
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const loc = mainLocation;

  return (
    <section
      data-tone="light"
      aria-labelledby="contact-h1"
      className="bg-blanco pt-[calc(var(--header-h)+48px)] pb-16 text-negro lg:pt-[calc(var(--header-h)+80px)] lg:pb-24"
    >
      <div className="wrap">
        <h1 id="contact-h1" data-reveal="words" className="display-xl">
          <Words text={t('contact.title')} />
        </h1>

        <div className="grid-12 mt-10 gap-y-14 lg:mt-16">
          <div className="col-span-12 lg:col-span-5">
            <address className="lead not-italic">
              {loc.address.street}
              <br />
              {loc.address.postalCode} {loc.address.locality}, Mallorca
            </address>
            <dl className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-6">
              <dt>{t('contact.phone')}</dt>
              <dd>
                <a href={links.tel} className="link tabular ui inline-flex min-h-12 items-center">
                  {loc.phoneDisplay}
                </a>
              </dd>
              <dt>WhatsApp</dt>
              <dd>
                <a
                  href={links.whatsapp(t('whatsapp.booking'))}
                  target="_blank"
                  rel="noopener"
                  className="link tabular ui inline-flex min-h-12 items-center"
                >
                  {loc.phoneDisplay}
                  <span className="sr-only"> {t('cta.newTab')}</span>
                </a>
              </dd>
              {/* L'email compare appena c'è in DATI (DA_CHIEDERE). */}
              {DATI.email ? (
                <>
                  <dt>{t('contact.email')}</dt>
                  <dd>
                    <a href={`mailto:${DATI.email}`} className="link ui inline-flex min-h-12 min-w-0 items-center [overflow-wrap:anywhere]">
                      {DATI.email}
                    </a>
                  </dd>
                </>
              ) : null}
            </dl>
            <div className="mt-12">
              <HoursTable hours={loc.hours} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <h2 className="display-l">{t('contact.formTitle')}</h2>
            <div className="mt-8">
              <ContactForm whatsapp={DATI.whatsapp} />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-24">
          <ButtonLink href={bookingHref(locale)} tone="light">
            {t('cta.book')}
          </ButtonLink>
          <p className="ui">
            {t('contact.elsewhere')}{' '}
            <ExternalLink href={links.instagram} className="inline-flex min-h-12 items-center">
              Instagram @{site.instagramHandle}
            </ExternalLink>
          </p>
        </div>
      </div>
    </section>
  );
}
