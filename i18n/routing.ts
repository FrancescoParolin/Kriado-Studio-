import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en', 'de'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/galeria': { es: '/galeria', en: '/gallery', de: '/galerie' },
    '/quienes-somos': { es: '/quienes-somos', en: '/about', de: '/ueber-uns' },
    '/ubicaciones': { es: '/ubicaciones', en: '/locations', de: '/standorte' },
    '/ubicaciones/[slug]': {
      es: '/ubicaciones/[slug]',
      en: '/locations/[slug]',
      de: '/standorte/[slug]',
    },
    '/contacto': { es: '/contacto', en: '/contact', de: '/kontakt' },
    '/aviso-legal': { es: '/aviso-legal', en: '/legal-notice', de: '/impressum' },
    '/politica-de-privacidad': {
      es: '/politica-de-privacidad',
      en: '/privacy-policy',
      de: '/datenschutz',
    },
    '/politica-de-cookies': {
      es: '/politica-de-cookies',
      en: '/cookie-policy',
      de: '/cookie-richtlinie',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
