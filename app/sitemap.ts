import type { MetadataRoute } from 'next';
import { locations } from '@/content/locations';
import { routing } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/metadata';

type Href = Parameters<typeof absoluteUrl>[1];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Href[] = [
    '/',
    '/galeria',
    '/quienes-somos',
    '/ubicaciones',
    '/contacto',
    '/aviso-legal',
    '/politica-de-privacidad',
    '/politica-de-cookies',
  ];
  // Con più sedi ogni sede ha la sua pagina; con una sola vive su /ubicaciones.
  if (locations.length > 1) {
    for (const l of locations) pages.push({ pathname: '/ubicaciones/[slug]', params: { slug: l.slug } });
  }

  return pages.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, href),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, href)])),
      },
    })),
  );
}
