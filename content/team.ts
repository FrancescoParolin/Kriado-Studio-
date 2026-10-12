import type { Img, L10n } from './types';

export type TeamMember = {
  name: string;
  role: L10n;
  image: Img;
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

// [DA_CLIENTE] Il team, se c'è: nome, ruolo, foto. Finché è vuoto la pagina mostra un segnaposto.
export const team: TeamMember[] = [];
