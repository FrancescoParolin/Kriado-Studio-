import type { Img } from './types';

export type GalleryCategory = 'cortes' | 'barba' | 'color' | 'studio';

export type GalleryItem = Img & {
  category: GalleryCategory;
  /** Punto di fuoco nel taglio 4:5 della griglia (object-position), se il centro non va bene. */
  focus?: string;
};

export const galleryCategories: GalleryCategory[] = ['cortes', 'barba', 'color', 'studio'];

// [DA_CLIENTE] Foto dei lavori: 10–15 tagli, barbe e colori, nitide, senza filtri, con consenso di chi è riconoscibile.
// Si aggiungono qui sotto, in `work`, una per riga, con categoria e alt nelle tre lingue. Esempio:
// { src: '/images/galeria/corte-01.jpg', width: 1080, height: 1350, category: 'cortes',
//   alt: { es: 'Corte de mujer a media melena con flequillo', en: '…', de: '…' } },
// Con almeno 4 foto di lavori la home mostra "Trabajos recientes"; prima mostra le foto del locale ("El studio").
const work: GalleryItem[] = [
  // Foto di Paro, 11 ottobre 2026: Pau taglia capelli bagnati, con il logo in vetrina (la cliente è di spalle).
  {
    src: '/images/galeria/trabajo-04.jpg',
    width: 1080,
    height: 1350,
    category: 'cortes',
    alt: {
      es: 'Pau corta el pelo a una clienta en Kriado Studio, con el logo en el escaparate',
      en: "Pau cutting a client's hair at Kriado Studio, with the logo on the window",
      de: 'Pau schneidet einer Kundin im Kriado Studio die Haare, im Schaufenster das Logo',
    },
  },
  // Da Carlos, 10 ottobre 2026: colore con riflessi caldi su capelli lunghi, di spalle (nessun volto).
  {
    src: '/images/galeria/trabajo-01.jpg',
    width: 1080,
    height: 1350,
    category: 'color',
    alt: {
      es: 'Melena larga con color castaño y reflejos cobrizos, ondas suaves, hecha en Kriado Studio',
      en: 'Long brunette hair with copper highlights and soft waves, done at Kriado Studio',
      de: 'Lange brünette Haare mit kupferfarbenen Reflexen und sanften Wellen, gemacht im Kriado Studio',
    },
  },
  // Da Paro/Carlos, 10 ottobre 2026: rituale di barbería con asciugamano caldo (il cliente non si riconosce).
  {
    src: '/images/galeria/trabajo-02.jpg',
    width: 1080,
    height: 1350,
    category: 'barba',
    alt: {
      es: 'Carlos Kriado durante un ritual de barbería con toalla caliente en Kriado Studio',
      en: 'Carlos Kriado during a barber ritual with a hot towel at Kriado Studio',
      de: 'Carlos Kriado bei einem Barbier-Ritual mit heißem Handtuch im Kriado Studio',
    },
  },
  // Da Paro/Carlos, 10 ottobre 2026: capelli lisci castani con scalature e frangia aperta.
  {
    src: '/images/galeria/trabajo-03.jpg',
    width: 1080,
    height: 1350,
    category: 'cortes',
    alt: {
      es: 'Melena lisa castaña con capas y flequillo abierto, recién hecha en Kriado Studio',
      en: 'Straight brunette hair with long layers and curtain bangs, freshly done at Kriado Studio',
      de: 'Glatte brünette Haare mit Stufen und offenem Pony, frisch gemacht im Kriado Studio',
    },
  },
  // Pau sistema le sopracciglia a un cliente (foto del 10 ottobre 2026; ok di Paro per cliente e mantella).
  {
    src: '/images/equipo/kriado-trabajo.jpg',
    width: 1080,
    height: 1350,
    category: 'barba',
    alt: {
      es: 'Pau arregla las cejas a un cliente en Kriado Studio',
      en: "Pau shaping a client's eyebrows at Kriado Studio",
      de: 'Pau formt im Kriado Studio die Augenbrauen eines Kunden',
    },
  },
];

/**
 * Foto vere del locale (8 ottobre 2026), preparate da scripts/procesa-fotos.mjs. Le prime 4 vanno in home.
 * Fuori di proposito: la banderola (è già nell'hero), mantelle buttate sulle poltrone, la porta "Beauty".
 */
const studio: GalleryItem[] = [
  {
    src: '/images/galeria/salon-01.jpg',
    width: 1080,
    height: 1350,
    category: 'studio',
    alt: {
      es: 'La pared de espejos iluminados del salón, con los sillones de corte',
      en: "The salon's wall of lit mirrors, with the styling chairs",
      de: 'Die beleuchtete Spiegelwand des Salons mit den Frisierstühlen',
    },
  },
  {
    src: '/images/galeria/lavado-01.jpg',
    width: 1080,
    height: 1350,
    category: 'studio',
    alt: {
      es: 'La zona de lavado, con los lavacabezas blancos y la marca Kérastase en la pared',
      en: 'The wash area, with white basins and the Kérastase sign on the wall',
      de: 'Der Waschbereich mit weißen Waschbecken und dem Kérastase-Schriftzug an der Wand',
    },
  },
  {
    src: '/images/galeria/espera-01.jpg',
    width: 1080,
    height: 1350,
    category: 'studio',
    alt: {
      es: 'La sala de espera, con sofá y sillón blancos capitoné',
      en: 'The waiting area, with a white buttoned sofa and armchair',
      de: 'Der Wartebereich mit weißem Chesterfield-Sofa und Sessel',
    },
  },
  {
    src: '/images/galeria/beauty-01.jpg',
    width: 1080,
    height: 1350,
    category: 'studio',
    alt: {
      es: 'El rincón del Beauty Salon, con una planta y la estantería iluminada de productos',
      en: 'The Beauty Salon corner, with a plant and the lit product shelf',
      de: 'Die Ecke des Beauty Salons mit Pflanze und beleuchtetem Produktregal',
    },
  },
  {
    src: '/images/galeria/kerastase-02.jpg',
    width: 1080,
    height: 1350,
    category: 'studio',
    alt: {
      es: 'La marca Kérastase en la pared del salón, sobre el expositor de tratamientos',
      en: 'The Kérastase sign on the salon wall, above the treatment display',
      de: 'Der Kérastase-Schriftzug an der Salonwand über dem Behandlungsdisplay',
    },
  },
  {
    src: '/images/galeria/productos-02.jpg',
    width: 1080,
    height: 1350,
    category: 'studio',
    alt: {
      es: 'Estanterías iluminadas con los productos a la venta en el salón',
      en: 'Lit shelves with the products for sale in the salon',
      de: 'Beleuchtete Regale mit den Produkten, die im Salon verkauft werden',
    },
  },
  {
    // La banderola in facciata (refuso "Hairdreesser" lasciato così, scelta di Paro).
    src: '/images/sede/sede-cala-ratjada-02.jpg',
    width: 1080,
    height: 1350,
    category: 'studio',
    alt: {
      es: 'La banderola de Kriado Barber Studio en la fachada',
      en: 'The Kriado Barber Studio banner on the shopfront',
      de: 'Das Banner von Kriado Barber Studio an der Fassade',
    },
  },
];

export const gallery: GalleryItem[] = [...work, ...studio];

/**
 * Foto dei lavori che mancano, con il nome file da usare (verticali 4:5, 1080×1350).
 * Nella griglia compaiono come segnaposto solo con NEXT_PUBLIC_SHOW_PENDING=1; l'elenco è in DA_CHIEDERE_A_CARLOS.md.
 */
export const workPlaceholders: string[] =
  process.env.NEXT_PUBLIC_SHOW_PENDING === '1'
    ? Array.from(
        { length: Math.max(0, 8 - work.length) },
        (_, i) => `galeria/trabajo-${String(work.length + i + 1).padStart(2, '0')}.jpg`,
      )
    : [];

/** Home: solo lavori da 4 in su; con 1–3 lavori prima quelli, poi il locale; senza lavori solo il locale. */
export const homeGalleryMode: 'work' | 'mixed' | 'studio' =
  work.length >= 4 ? 'work' : work.length > 0 ? 'mixed' : 'studio';
/** In home 4 foto (una fila da 1024px, due su telefono); tutte in /galeria. */
export const homeGallery = [...work, ...studio].slice(0, 4);
