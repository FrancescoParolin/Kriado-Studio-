import type { Metadata } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { resolveImage } from './images';
import { site } from './site';

type Href = Parameters<typeof getPathname>[0]['href'];

const OG_LOCALE: Record<Locale, string> = { es: 'es_ES', en: 'en_GB', de: 'de_DE' };

/** URL assoluto di una pagina in una lingua. */
export function absoluteUrl(locale: Locale, href: Href) {
  return `${site.url}${getPathname({ locale, href })}`;
}

/** Metadata per pagina e lingua, con hreflang es/en/de e immagine OG 1200×630. */
export function pageMetadata({
  locale,
  href,
  title,
  description,
  image,
}: {
  locale: Locale;
  href: Href;
  title: Metadata['title'];
  description: string;
  image: string;
}): Metadata {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = absoluteUrl(l, href);
  languages['x-default'] = absoluteUrl(routing.defaultLocale, href);
  const url = languages[locale]!;
  const ogTitle = typeof title === 'string' ? title : title && 'absolute' in title ? title.absolute : undefined;

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: site.name,
      locale: OG_LOCALE[locale],
      type: 'website',
      images: [{ url: `${site.url}${resolveImage(image)}`, width: 1200, height: 630 }],
    },
  };
}
