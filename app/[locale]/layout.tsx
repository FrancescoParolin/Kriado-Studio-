import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MobileBar } from '@/components/MobileBar';
import { Intro, introScript } from '@/components/motion/Intro';
import { MotionObserver } from '@/components/motion/MotionObserver';
import { routing } from '@/i18n/routing';
import { site } from '@/lib/site';
import '../globals.css';

// `subsets` decide solo cosa precaricare: le regole latin-ext restano nel CSS e quel file si scarica
// solo se una pagina usa quei caratteri. Precaricare entrambi costava 84 KB sul primo schermo.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Kriado Studio', template: '%s | Kriado Studio' },
  // Versione di prova finché non c'è il dominio: niente indicizzazione (vedi site.indexable).
  ...(site.indexable ? {} : { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const CLIENT_NAMESPACES = [
  'nav',
  'cta',
  'whatsapp',
  'languages',
  'gallery',
  'contact',
  'location',
  'status',
  'booking',
];

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  // Solo i namespace usati dai componenti client: il resto resta sul server.
  const all = await getMessages();
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.filter((ns) => ns in all).map((ns) => [ns, all[ns]]));

  return (
    // suppressHydrationWarning: lo script in <head> aggiunge data-intro prima di React.
    <html lang={locale} className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <Intro />
        <NextIntlClientProvider messages={clientMessages}>
          <MotionObserver />
          <Header />
          <main id="contenido" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
