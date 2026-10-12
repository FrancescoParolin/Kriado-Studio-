import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Tutto tranne API, file interni di Next/Netlify e file con estensione (immagini, robots, sitemap, form statico).
  matcher: '/((?!api|_next|_vercel|.netlify|.*\\..*).*)',
};
