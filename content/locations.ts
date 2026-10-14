import { DATI } from './dati';
import type { L10n, PendingNote } from './types';

export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type DayHours =
  | { day: Weekday; closed: true }
  | { day: Weekday; closed?: false; ranges: Array<{ opens: string; closes: string }> }
  | { day: Weekday; pending: PendingNote };

export type RecorridoFrame = {
  /** Base del nome file, senza suffisso: si aggiungono -h.jpg e -v.jpg. */
  file: string;
  caption: L10n;
  alt: L10n;
  /** Punto di fuoco per object-position, separato per foto orizzontale e verticale. */
  focus?: { h?: string; v?: string };
};

export type LocationImage = {
  src: string;
  width: number;
  height: number;
  alt: L10n;
};

export type Location = {
  slug: string;
  name: string;
  city: string;
  address: {
    street: string;
    postalCode: string;
    locality: string;
    region: string;
    country: 'ES';
  };
  /** E.164, usato per tel: e wa.me */
  phone: string;
  phoneDisplay: string;
  /** Coordinate della scheda Google, per i dati strutturati. */
  geo?: { lat: number; lng: number };
  /** Mappa statica centrata sulla sede (scripts/mapa.mjs): il segnaposto sta al centro dell'immagine. */
  map?: { src: string; width: number; height: number };
  hours: DayHours[];
  recorrido: RecorridoFrame[];
  gallery: LocationImage[];
  ogImage: string;
};

const WEEK: Weekday[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

/** Orari presi da DATI: un giorno senza fasce è chiuso. */
const hoursFromDati: DayHours[] = WEEK.map((day) =>
  DATI.horario[day].length ? { day, ranges: [...DATI.horario[day]] } : { day, closed: true as const },
);

export const locations: Location[] = [
  {
    slug: 'cala-ratjada',
    name: 'Kriado Studio Cala Ratjada',
    city: 'Cala Ratjada',
    address: {
      street: DATI.direccion.calle,
      postalCode: DATI.direccion.cp,
      locality: DATI.direccion.localidad,
      region: DATI.direccion.region,
      country: DATI.direccion.pais,
    },
    phone: DATI.telefono,
    phoneDisplay: DATI.telefonoVisible,
    geo: DATI.geo,
    map: { src: '/images/sede/mapa-cala-ratjada.jpg', width: 1400, height: 1050 },
    hours: hoursFromDati,
    // Foto vere (8 ottobre 2026), preparate con scripts/procesa-fotos.mjs dagli originali dell'iPhone.
    recorrido: [
      {
        file: '/images/recorrido/cala-ratjada-01-fachada',
        caption: { es: 'La fachada', en: 'The shopfront', de: 'Die Fassade' },
        alt: {
          es: 'Fachada de Kriado Studio en Carrer Leonor Servera 7, Cala Ratjada, con la banderola negra de Kriado Barber Studio',
          en: 'Kriado Studio shopfront on Carrer Leonor Servera 7, Cala Ratjada, with the black Kriado Barber Studio banner',
          de: 'Fassade von Kriado Studio in der Carrer Leonor Servera 7, Cala Ratjada, mit dem schwarzen Banner von Kriado Barber Studio',
        },
        // Desktop: la finestra a porta mostra la parte sinistra, dove c'è la banderola. Mobile: la banda inquadra logo e scritta.
        focus: { h: '8% 50%', v: '50% 42%' },
      },
      {
        file: '/images/recorrido/cala-ratjada-02-pasillo',
        caption: { es: 'El pasillo', en: 'The hallway', de: 'Der Flur' },
        alt: {
          es: 'El pasillo con el mostrador de recepción, estanterías iluminadas y lámparas colgantes',
          en: 'The hallway, with the reception desk, lit shelves and pendant lights',
          de: 'Der Flur mit Empfangstheke, beleuchteten Regalen und Hängeleuchten',
        },
      },
      {
        file: '/images/recorrido/cala-ratjada-03-adentro',
        caption: { es: 'Más adentro', en: 'Further in', de: 'Weiter drinnen' },
        alt: {
          es: 'Estanterías blancas iluminadas con productos para el pelo y una planta, al fondo del local',
          en: 'Lit white shelves with hair products and a plant, further inside the studio',
          de: 'Beleuchtete weiße Regale mit Haarprodukten und eine Pflanze, weiter hinten im Studio',
        },
      },
      {
        file: '/images/recorrido/cala-ratjada-04-salon',
        caption: { es: 'El salón', en: 'The salon', de: 'Der Salon' },
        alt: {
          es: 'El salón: sillones de corte frente a una pared de espejos con luz integrada',
          en: 'The salon: styling chairs facing a wall of mirrors with built-in lights',
          de: 'Der Salon: Frisierstühle vor einer Spiegelwand mit eingebautem Licht',
        },
      },
    ],
    /**
     * "El local": quattro foto verticali della stessa forma, così su telefono fanno una griglia 2×2 ordinata.
     * 14 ottobre 2026 (Paro): via la poltrona tagliata e gli scaffali scuri; dentro sala d'attesa intera e zona lavaggio,
     * specchi nella versione verticale.
     */
    gallery: [
      {
        src: '/images/galeria/salon-01.jpg',
        width: 1080,
        height: 1350,
        alt: {
          es: 'La pared de espejos iluminados del salón, con los sillones de corte',
          en: "The salon's wall of lit mirrors, with the styling chairs",
          de: 'Die beleuchtete Spiegelwand des Salons mit den Frisierstühlen',
        },
      },
      {
        src: '/images/galeria/espera-01.jpg',
        width: 1080,
        height: 1350,
        alt: {
          es: 'La sala de espera, con sofá y sillón blancos capitoné',
          en: 'The waiting area, with a white buttoned sofa and armchair',
          de: 'Der Wartebereich mit weißem Chesterfield-Sofa und Sessel',
        },
      },
      {
        src: '/images/sede/sede-cala-ratjada-02.jpg',
        width: 1080,
        height: 1350,
        alt: {
          es: 'La banderola de Kriado Barber Studio en la fachada',
          en: 'The Kriado Barber Studio banner on the shopfront',
          de: 'Das Banner von Kriado Barber Studio an der Fassade',
        },
      },
      {
        src: '/images/galeria/lavado-01.jpg',
        width: 1080,
        height: 1350,
        alt: {
          es: 'La zona de lavado, con los lavacabezas blancos y la marca Kérastase en la pared',
          en: 'The wash area, with white basins and the Kérastase sign on the wall',
          de: 'Der Waschbereich mit weißen Waschbecken und dem Kérastase-Schriftzug an der Wand',
        },
      },
    ],
    ogImage: '/images/og/og-cala-ratjada.jpg',
  },
  // [DA_CLIENTE: confermare se esiste la sede di Palma] Quando arriva l'indirizzo si aggiunge qui un secondo oggetto.
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export const mainLocation = locations[0]!;

export function directionsUrl(location: Location): string {
  const { street, postalCode, locality } = location.address;
  const destination = `Kriado Studio, ${street}, ${postalCode} ${locality}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}
