import { DATI } from './dati';
import type { Img } from './types';

export type TeamMember = {
  /** Testi in messages: about.team.<key>.role, .text, .alt */
  key: 'carlos' | 'arturo' | 'mayte' | 'pau';
  name: string;
  image: Omit<Img, 'alt'>;
};

/** Foto grande di Carlos al lavoro per "Quiénes somos". [DA_CLIENTE] */
export const carlosPhoto: Omit<Img, 'alt'> = {
  src: '/images/equipo/carlos.jpg',
  width: 1600,
  height: 1067,
};

/** In home, "El salón de Carlos": finché manca la foto di Carlos, il lavatesta (IMG_0614, 4:5). */
export const salonPhoto: Omit<Img, 'alt'> = {
  src: '/images/equipo/salon-lavacabezas.jpg',
  width: 1080,
  height: 1350,
};

/** Pau al lavoro (sopracciglia a un cliente), foto del 10 ottobre 2026: in "Esto es Kriado". */
export const brandPhoto: Omit<Img, 'alt'> = {
  src: '/images/equipo/kriado-trabajo.jpg',
  width: 1080,
  height: 1350,
};

/** Finché manca la foto di Carlos, "Quiénes somos" apre con il salone vero invece che con un segnaposto. */
export const aboutFallbackPhoto: Omit<Img, 'alt'> = {
  src: '/images/recorrido/cala-ratjada-04-salon-h.jpg',
  width: 1600,
  height: 1067,
};

/**
 * "El equipo" in "Quiénes somos", in quest'ordine (Paro, 9 novembre 2026): Carlos, Arturo (barbero estilista),
 * Mayte (estética: i servizi di estetica non sono ancora nel listino), Pau.
 * Ritratti sul muro bianco del salone, in bianco e nero (luce uniforme tra quattro scatti diversi), 4:5, occhi alla stessa altezza.
 */
export const team: TeamMember[] = [
  { key: 'carlos', name: DATI.titular, image: { src: '/images/equipo/retrato-carlos.jpg', width: 1080, height: 1350 } },
  { key: 'arturo', name: 'Arturo González', image: { src: '/images/equipo/retrato-arturo.jpg', width: 1032, height: 1290 } },
  { key: 'mayte', name: 'Mayte Almada', image: { src: '/images/equipo/retrato-mayte.jpg', width: 784, height: 980 } },
  { key: 'pau', name: 'Pau', image: { src: '/images/equipo/retrato-pau.jpg', width: 1080, height: 1350 } },
];
