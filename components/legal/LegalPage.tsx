import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { legal, type LegalKey } from '@/content/legal';
import { mainLocation } from '@/content/locations';
import { routing, type Pathname } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { PendingText } from './PendingText';

type Props = { params: Promise<{ locale: string }> };

const HREF: Record<LegalKey, Pathname> = {
  aviso: '/aviso-legal',
  privacidad: '/politica-de-privacidad',
  cookies: '/politica-de-cookies',
};

export function legalMetadata(key: LegalKey) {
  return async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) return {};
    const doc = legal[key][locale];
    return pageMetadata({
      locale,
      href: HREF[key] as Exclude<Pathname, '/ubicaciones/[slug]'>,
      title: doc.title,
      description: doc.description,
      image: mainLocation.ogImage,
    });
  };
}

export function legalPage(key: LegalKey) {
  return async function LegalPage({ params }: Props) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();
    setRequestLocale(locale);
    const doc = legal[key][locale];
    return (
      <section
        data-tone="light"
        aria-labelledby="legal-h1"
        className="bg-blanco pt-[calc(var(--header-h)+48px)] pb-16 text-negro lg:pt-[calc(var(--header-h)+80px)] lg:pb-24"
      >
        <div className="wrap grid-12">
          <div className="col-span-12 lg:col-span-8">
            {/* "Datenschutzerklärung" a 375px non ci sta: in tedesco si va a capo con il trattino. */}
            <h1 id="legal-h1" className="display-xl hyphens-auto">
              {doc.title}
            </h1>
            {doc.sections.map((s) => (
              <div key={s.heading} className="mt-10 max-w-[65ch] lg:mt-12">
                <h2 className="text-[1.375rem] leading-tight font-semibold">{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="mt-4">
                    <PendingText text={p} locale={locale} />
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
}
