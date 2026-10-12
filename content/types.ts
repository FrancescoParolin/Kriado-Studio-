import type { Locale } from '@/i18n/routing';

/** Testo nelle tre lingue del sito. */
export type L10n = Record<Locale, string>;

/** Immagine locale: `src` punta a /images/…; se il file non c'è ancora si usa il placeholder con lo stesso nome. */
export type Img = {
  src: string;
  width: number;
  height: number;
  alt: L10n;
};

/** Segna un dato che deve arrivare da Carlos. Il testo dice cosa manca. */
export type PendingNote = string;
