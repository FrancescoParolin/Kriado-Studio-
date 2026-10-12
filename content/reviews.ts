import type { Locale } from '@/i18n/routing';
import { DATI } from './dati';
import type { PendingNote } from './types';

export type Review = {
  /** Testo originale della recensione, non tradotto. Massimo 25 parole o estratto fedele. */
  text: string;
  /** Lingua in cui il cliente l'ha scritta. */
  lang: Locale;
  author: string;
  /** Stelle date su Google, lette sulla scheda. Solo se verificate. */
  stars?: number;
  pending?: PendingNote;
};

// Recensioni vere dalla scheda Google (lette l'8 ottobre 2026, vista pubblica senza login, che ne mostra solo 3).
// Testo originale, non tradotto; estratti fedeli segnati con "…". Del nome si mostra solo nome e iniziale.
// La terza recensione visibile (diagnosi e mechas) era troncata da Google e fuori contesto suonava negativa: esclusa.
// [DA_CLIENTE] Carlos può sceglierne altre dalle 36 (servono accesso a Google o il suo pannello di Business Profile).
export const reviews: Review[] = [
  {
    text: 'Increíble! Pau es un estilista muy profesional. Cambio total con magnífico resultado. Toda mi confianza.',
    lang: 'es',
    author: 'María Magdalena H.',
    stars: 5, // "5 estrellas" sulla scheda Google, verificato il 9 ottobre 2026
  },
  {
    text: 'Me hice un peinado para mi cumpleaños y quedó precioso, me encantó su trabajo…',
    lang: 'es',
    author: 'Lorrayne L.',
    stars: 5, // "5 estrellas" sulla scheda Google, verificato il 9 ottobre 2026
  },
];

/**
 * Estratti che Google mette in evidenza in cima alle recensioni della scheda (8 ottobre 2026).
 * L'autore non è visibile nella vista pubblica: si mostrano come estratti, senza nome. Testo esatto,
 * tagliato con "…" dove Google lo tronca o dove la frase continua.
 */
export const highlights: Array<{ text: string; lang: Locale }> = [
  { text: 'Pau es un encanto y es uno de los mejores peluqueros que me han tratado…', lang: 'es' },
  { text: 'Me dejé aconsejar por él y estoy encantada con el resultado.', lang: 'es' },
  { text: 'Es muy agradable venir a esta peluquería, son muy profesionales y divertidos…', lang: 'es' },
];

// Scheda Google, 8 ottobre 2026: 4,9 su 5, 36 recensioni (34 da cinque stelle, 2 da quattro).
export const rating = {
  value: DATI.google.valoracion,
  count: DATI.google.resenas,
  fiveStars: DATI.google.cincoEstrellas,
};
