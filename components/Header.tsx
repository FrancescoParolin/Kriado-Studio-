'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import type { Locale, Pathname } from '@/i18n/routing';
import { bookingHref } from '@/lib/booking-href';
import { links, site } from '@/lib/site';
import { mainLocation } from '@/content/locations';
import { buttonClass } from './Button';
import { CloseGlyph, MenuGlyph } from './Glyphs';
import { LangSwitch } from './LangSwitch';
import { LogoMark } from './LogoMark';

type NavHref = Exclude<Pathname, '/ubicaciones/[slug]'>;

const NAV: Array<{ href: NavHref; key: 'home' | 'gallery' | 'about' | 'locations' | 'contact' }> = [
  { href: '/', key: 'home' },
  { href: '/galeria', key: 'gallery' },
  { href: '/quienes-somos', key: 'about' },
  { href: '/ubicaciones', key: 'locations' },
  { href: '/contacto', key: 'contact' },
];

/** Pagine che si aprono con un recorrido: l'header parte trasparente sul nero. */
const RECORRIDO_PATHS: string[] = ['/', '/ubicaciones', '/ubicaciones/[slug]'];

function isActive(pathname: string, href: NavHref) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [dark, setDark] = useState(RECORRIDO_PATHS.includes(pathname));
  const [menuOpen, setMenuOpen] = useState(false);

  // Trasparente solo finché il palco del recorrido riempie lo schermo (l'header sta sul nero);
  // appena il palco comincia a uscire, bianco pieno, così l'header non passa mai sopra una foto.
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const h = headerRef.current?.offsetHeight ?? 64;
      const targets = document.querySelectorAll<HTMLElement>('[data-header-dark]');
      let next = false;
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= h / 2 && r.bottom >= window.innerHeight - 1) next = true;
      });
      setDark(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Menu: <dialog> modale (focus intrappolato ed Esc nativi), pagina sotto bloccata.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) {
      dialog.showModal();
      // Il browser mette il focus sul primo link (il marchio) e su telefono lo evidenzia con un riquadro:
      // lo spostiamo sull'inizio del menu, che non mostra contorni. Con Tab si prosegue dal marchio come prima.
      dialog.querySelector<HTMLElement>('[data-menu-start]')?.focus({ preventScroll: true });
    }
    if (!menuOpen && dialog.open) dialog.close();
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [pathname]);

  const tone = dark ? 'dark' : 'light';
  const locale = useLocale() as Locale;
  const booking = bookingHref(locale);

  return (
    <>
      <a
        href="#contenido"
        className="ui sr-only z-50 bg-blanco p-4 text-negro focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {t('nav.skip')}
      </a>
      {/* Il fondo bianco è uno strato a parte che entra in opacità (200ms); il colore del testo cambia senza transizione. */}
      <header
        ref={headerRef}
        data-tone={tone}
        className={`fixed inset-x-0 top-0 z-40 h-[var(--header-h)] before:absolute before:inset-0 before:-z-10 before:bg-blanco before:transition-opacity before:duration-200 ${
          dark ? 'text-hueso before:opacity-0' : 'text-negro before:opacity-100'
        }`}
      >
        {/* Header minimale (spunto: millimetrobarber.it): marchio a sinistra, a destra solo "Reservar cita" e "Menú".
            Voci, lingue, telefono e Instagram stanno nel menu; su telefono "Reservar" è anche nella barra in basso. */}
        <div className="wrap flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={t('nav.homeLabel')}
            className={`wordmark inline-flex min-h-12 items-center gap-3 whitespace-nowrap text-[1.375rem] ${dark ? 'text-oro' : 'text-negro'}`}
          >
            <LogoMark />
            Kriado Studio
          </Link>

          <div className="flex items-center gap-6">
            <a href={booking} className="link ui hidden min-h-12 items-center md:inline-flex">
              {t('cta.book')}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="menu"
              className="ui -mr-2 flex h-12 items-center gap-2 px-2"
            >
              <MenuGlyph />
              {t('nav.menu')}
            </button>
          </div>
        </div>
      </header>

      <dialog
        id="menu"
        ref={dialogRef}
        aria-label={t('nav.main')}
        onClose={() => setMenuOpen(false)}
        data-tone="light"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-blanco p-0 text-negro backdrop:bg-transparent"
      >
        {menuOpen ? (
          <div data-menu-start tabIndex={-1} className="anim-drop-in flex min-h-full flex-col outline-none">
            <div className="wrap flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <Link
                href="/"
                aria-label={t('nav.homeLabel')}
                className="wordmark inline-flex min-h-12 items-center gap-3 text-[1.375rem]"
              >
                <LogoMark />
                Kriado Studio
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="ui -mr-2 flex h-12 items-center gap-2 px-2"
              >
                <CloseGlyph />
                {t('nav.close')}
              </button>
            </div>

            <div className="wrap flex flex-1 flex-col pt-6 pb-10">
              <nav aria-label={t('nav.main')}>
                <ul className="flex flex-col">
                  {NAV.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={`display-l inline-flex min-h-12 items-center py-2 ${active ? 'link' : ''}`}
                        >
                          {t(`nav.${item.key}`)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <a
                href={booking}
                onClick={() => setMenuOpen(false)}
                className={buttonClass('light', 'primary', 'mt-8 self-start')}
              >
                {t('cta.book')}
              </a>

              <div className="mt-auto flex flex-col pt-12">
                <a href={links.tel} className="link ui tabular inline-flex min-h-12 items-center self-start">
                  {mainLocation.phoneDisplay}
                </a>
                <a
                  href={links.instagram}
                  target="_blank"
                  rel="noopener"
                  className="link ui inline-flex min-h-12 items-center self-start"
                >
                  Instagram @{site.instagramHandle}
                  <span className="sr-only"> {t('cta.newTab')}</span>
                </a>
                <LangSwitch variant="names" className="pt-4" />
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
