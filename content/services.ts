import type { L10n, PendingNote } from './types';

export type ServiceGroup = 'peluqueria' | 'barberia' | 'estetica';

/** Sezioni dentro un gruppo, nell'ordine in cui si mostrano. Per ora le ha solo l'estetica. */
export const serviceCategories = ['facial', 'depilacion', 'manos', 'masajes'] as const;
export type ServiceCategory = (typeof serviceCategories)[number];

export type Service = {
  /** Identificativo stabile: lo usano i bottoni "Reservar" del listino e il modulo di prenotazione. */
  id: string;
  group: ServiceGroup;
  category?: ServiceCategory;
  name: L10n;
  /** Una riga: cosa include, per chi. Manca dove non sappiamo ancora cosa comprende (rituali). */
  description?: L10n;
  /** Minuti, dal listino Yeasy o dalla cassa del salone; due valori se il servizio esiste in due durate (25 e 50). */
  duration?: number | number[];
  /** Euro, dal listino Yeasy; 'variable' se dipende dal servizio. Si mostra solo se SHOW_PRICES è true. */
  price?: number | 'variable';
  /** Tra i "servicios más populares" della pagina Yeasy. */
  popular?: boolean;
  /** Pacchetto: id dei servizi singoli che contiene, per calcolare quanto si risparmia. */
  bundleOf?: string[];
  pending?: PendingNote;
};

/** I prezzi veri (Yeasy) restano nei dati ma non si mostrano: decisione di Paro del 9 ottobre 2026. Per mostrarli basta mettere true. */
export const SHOW_PRICES = false;

/** Marche con cui lavora il salone, da Carlos (9 ottobre 2026); "L'Oréal Professionnel" come sui flaconi in salone (foto dell'11 ottobre). Five Am (uomo) non si cita: Carlos la sostituirà con una di alta gamma. */
export const brands = ['Kérastase', "L'Oréal Professionnel"];

// Prima la barbería: ha prezzi e durate veri (Yeasy). La peluquería ha i prezzi da confermare. Poi l'estetica (Mayte).
export const serviceGroups: ServiceGroup[] = ['barberia', 'peluqueria', 'estetica'];

// Peluquería per donne e uomini, con barbería.
// Barbería: listino ufficiale su Yeasy (yeasy.io/commerce/bb7948cd-…, letto l'8 ottobre 2026): nomi, durate e prezzi verificati.
// Peluquería: servizi confermati dalle recensioni Google (mechas, peinado, diagnosi e cura del pelo), descrizioni in bozza.
// [DA_CLIENTE: confermare i servizi di peluquería e le loro descrizioni]
export const services: Service[] = [
  // ---------- Peluquería ----------
  {
    id: 'corte-mujer',
    group: 'peluqueria',
    name: { es: 'Corte de mujer', en: "Women's cut", de: 'Damenhaarschnitt' },
    description: {
      es: 'A medida de tu pelo, de tu rostro y de cómo te peinas cada día.',
      en: 'Tailored to your hair, your face and the way you style it every day.',
      de: 'Abgestimmt auf dein Haar, dein Gesicht und wie du es im Alltag trägst.',
    },
    pending: '[DA_CLIENTE: confermare]',
  },
  {
    id: 'color-mechas',
    group: 'peluqueria',
    name: { es: 'Color y mechas', en: 'Colour and highlights', de: 'Farbe und Strähnchen' },
    description: {
      es: 'Tinte, mechas y reflejos, siempre con un diagnóstico previo del pelo.',
      en: 'All-over colour, highlights and lowlights, always after a hair diagnosis.',
      de: 'Färben, Strähnchen und Reflexe, immer nach einer Haaranalyse.',
    },
    pending: '[DA_CLIENTE: confermare]',
  },
  {
    id: 'peinados',
    group: 'peluqueria',
    name: { es: 'Peinados y recogidos', en: 'Styling and updos', de: 'Styling und Hochsteckfrisuren' },
    description: {
      es: 'Secados, ondas y recogidos, para el día a día o para una celebración.',
      en: 'Blow-dries, waves and updos, for everyday or for a celebration.',
      de: 'Föhnen, Wellen und Hochsteckfrisuren, für den Alltag oder einen besonderen Anlass.',
    },
    pending: '[DA_CLIENTE: confermare]',
  },
  {
    id: 'diagnostico',
    group: 'peluqueria',
    name: { es: 'Diagnóstico capilar', en: 'Hair diagnosis', de: 'Haaranalyse' },
    description: {
      es: 'Valoramos el estado de tu pelo y te decimos qué conviene hacer, y qué no.',
      en: 'We assess the condition of your hair and tell you what to do, and what to avoid.',
      de: 'Wir prüfen den Zustand deines Haars und sagen dir, was ihm guttut und was nicht.',
    },
    pending: '[DA_CLIENTE: confermare]',
  },
  {
    id: 'tratamientos',
    group: 'peluqueria',
    name: { es: 'Tratamientos de cuidado', en: 'Care treatments', de: 'Pflegebehandlungen' },
    description: {
      es: 'Hidratación y reparación para pelo castigado, decolorado o con color.',
      en: 'Moisture and repair for damaged, bleached or coloured hair.',
      de: 'Feuchtigkeit und Reparatur für strapaziertes, blondiertes oder gefärbtes Haar.',
    },
    pending: '[DA_CLIENTE: confermare]',
  },
  {
    id: 'permanente',
    group: 'peluqueria',
    name: { es: 'Permanente', en: 'Perm', de: 'Dauerwelle' },
    description: {
      es: 'Rizo o volumen, adaptado a tu tipo de pelo.',
      en: 'Curl or volume, adapted to your hair type.',
      de: 'Locken oder Volumen, abgestimmt auf deinen Haartyp.',
    },
    pending: '[DA_CLIENTE: confermare]',
  },

  // ---------- Barbería (listino Yeasy) ----------
  {
    id: 'essential',
    popular: true,
    group: 'barberia',
    name: { es: 'Kriado Essential', en: 'Kriado Essential', de: 'Kriado Essential' },
    description: { es: 'Corte de pelo.', en: 'Haircut.', de: 'Haarschnitt.' },
    duration: 30,
    price: 17,
  },
  {
    id: 'signature',
    popular: true,
    bundleOf: ['essential', 'beard'],
    group: 'barberia',
    name: { es: 'Kriado Signature', en: 'Kriado Signature', de: 'Kriado Signature' },
    description: { es: 'Corte, barba y cejas.', en: 'Haircut, beard and brows.', de: 'Haarschnitt, Bart und Augenbrauen.' },
    duration: 45,
    price: 23,
  },
  {
    id: 'ritual',
    group: 'barberia',
    name: { es: 'Kriado Ritual', en: 'Kriado Ritual', de: 'Kriado Ritual' },
    description: { es: 'Corte y lavado.', en: 'Haircut and wash.', de: 'Haarschnitt und Haarwäsche.' },
    duration: 30,
    price: 23,
  },
  {
    id: 'experience',
    group: 'barberia',
    name: { es: 'Kriado Experience', en: 'Kriado Experience', de: 'Kriado Experience' },
    description: {
      es: 'Corte, barba, cejas, lavado y masaje, sin prisas.',
      en: 'Haircut, beard, brows, wash and a massage, with time to spare.',
      de: 'Haarschnitt, Bart, Augenbrauen, Haarwäsche und Massage, ganz ohne Eile.',
    },
    duration: 60,
    price: 50,
  },
  {
    id: 'beard',
    popular: true,
    group: 'barberia',
    name: { es: 'Kriado Beard', en: 'Kriado Beard', de: 'Kriado Beard' },
    description: { es: 'Afeitado y perfilado de barba.', en: 'Beard shave and shaping.', de: 'Rasur und Konturen für den Bart.' },
    duration: 15,
    price: 10,
  },
  {
    id: 'highlight',
    group: 'barberia',
    name: { es: 'Kriado Highlight', en: 'Kriado Highlight', de: 'Kriado Highlight' },
    description: {
      es: 'Mechas a medida. El corte va aparte.',
      en: 'Tailored highlights. Haircut not included.',
      de: 'Strähnchen nach Maß. Haarschnitt nicht inbegriffen.',
    },
    duration: 90,
    price: 35,
  },
  {
    id: 'nuclear',
    group: 'barberia',
    name: { es: 'Kriado Nuclear', en: 'Kriado Nuclear', de: 'Kriado Nuclear' },
    description: {
      es: 'Decoloración a blanco puro. El corte va aparte.',
      en: 'Bleached to pure white. Haircut not included.',
      de: 'Blondierung bis Reinweiß. Haarschnitt nicht inbegriffen.',
    },
    duration: 90,
    price: 60,
  },
  {
    id: 'color',
    group: 'barberia',
    name: { es: 'Kriado Color', en: 'Kriado Color', de: 'Kriado Color' },
    description: {
      es: 'Blanco con toques de color. El corte va aparte.',
      en: 'White with touches of colour. Haircut not included.',
      de: 'Weiß mit Farbakzenten. Haarschnitt nicht inbegriffen.',
    },
    duration: 90,
    price: 70,
  },
  {
    id: 'private',
    group: 'barberia',
    name: { es: 'Kriado Private', en: 'Kriado Private', de: 'Kriado Private' },
    description: {
      es: 'Servicio exclusivo de barbería y peluquería en villas y hoteles de toda la isla, con total discreción. Se reserva con 5 a 7 días de antelación.',
      en: 'An exclusive barbering and hairdressing service at villas and hotels across the island, with complete discretion. Book 5 to 7 days ahead.',
      de: 'Exklusiver Barbier- und Friseurservice in Villen und Hotels auf der ganzen Insel, mit voller Diskretion. Buchung 5 bis 7 Tage im Voraus.',
    },
    duration: 90,
    price: 'variable',
  },

  // ---------- Estética (Mayte) ----------
  // Dalla cassa del salone (foto di Paro, 18 novembre 2026): nomi e durate. Descrizioni di facial e manicura/pedicura
  // da Paro; massaggi descritti dal nome della tecnica; rituali senza descrizione finché Carlos non dice cosa includono.
  // Depilación senza durate (in cassa non ci sono). Massaggi in rosso in cassa, rituali in rosa: qui prima gli uni, poi gli altri.
  {
    id: 'anti-ageing-facial',
    group: 'estetica',
    category: 'facial',
    name: { es: 'Kriado Anti-Ageing Facial Luxury', en: 'Kriado Anti-Ageing Facial Luxury', de: 'Kriado Anti-Ageing Facial Luxury' },
    description: {
      es: 'Tratamiento facial antiedad y antiarrugas.',
      en: 'Anti-ageing, anti-wrinkle facial.',
      de: 'Anti-Aging-Gesichtsbehandlung gegen Falten.',
    },
    duration: 55,
  },
  {
    id: 'deep-facial-cleansing',
    group: 'estetica',
    category: 'facial',
    name: { es: 'Kriado Deep Facial Cleansing', en: 'Kriado Deep Facial Cleansing', de: 'Kriado Deep Facial Cleansing' },
    description: {
      es: 'Limpieza facial profunda: puntos negros, exfoliación e hidratación de la piel.',
      en: 'A deep facial cleanse: blackheads, exfoliation and hydration.',
      de: 'Tiefenreinigung fürs Gesicht: Mitesser, Peeling und Feuchtigkeit.',
    },
    duration: 50,
  },
  {
    id: 'eyebrow-design',
    group: 'estetica',
    category: 'depilacion',
    name: { es: 'Kriado Eyebrow Design', en: 'Kriado Eyebrow Design', de: 'Kriado Eyebrow Design' },
    description: { es: 'Diseño de cejas.', en: 'Eyebrow shaping.', de: 'Augenbrauen in Form.' },
  },
  {
    id: 'lip-detail',
    group: 'estetica',
    category: 'depilacion',
    name: { es: 'Kriado Lip Detail', en: 'Kriado Lip Detail', de: 'Kriado Lip Detail' },
    description: { es: 'Contorno de labios.', en: 'Lip area.', de: 'Lippenbereich.' },
  },
  {
    id: 'underarm',
    group: 'estetica',
    category: 'depilacion',
    name: { es: 'Kriado Underarm', en: 'Kriado Underarm', de: 'Kriado Underarm' },
    description: { es: 'Axilas.', en: 'Underarms.', de: 'Achseln.' },
  },
  {
    id: 'half-arms',
    group: 'estetica',
    category: 'depilacion',
    name: { es: 'Kriado Half Arms', en: 'Kriado Half Arms', de: 'Kriado Half Arms' },
    description: { es: 'Medios brazos.', en: 'Half arms.', de: 'Halbe Arme.' },
  },
  {
    id: 'full-arms',
    group: 'estetica',
    category: 'depilacion',
    name: { es: 'Kriado Full Arms', en: 'Kriado Full Arms', de: 'Kriado Full Arms' },
    description: { es: 'Brazos completos.', en: 'Full arms.', de: 'Ganze Arme.' },
  },
  {
    id: 'half-legs',
    group: 'estetica',
    category: 'depilacion',
    name: { es: 'Kriado Half Legs', en: 'Kriado Half Legs', de: 'Kriado Half Legs' },
    description: { es: 'Medias piernas.', en: 'Half legs.', de: 'Halbe Beine.' },
  },
  {
    id: 'full-legs',
    group: 'estetica',
    category: 'depilacion',
    name: { es: 'Kriado Full Legs', en: 'Kriado Full Legs', de: 'Kriado Full Legs' },
    description: { es: 'Piernas completas.', en: 'Full legs.', de: 'Ganze Beine.' },
  },
  {
    id: 'express-manicure',
    group: 'estetica',
    category: 'manos',
    name: { es: 'Kriado Express Manicure', en: 'Kriado Express Manicure', de: 'Kriado Express Manicure' },
    description: { es: 'Limado y esmaltado.', en: 'Filing and polish.', de: 'Feilen und Lackieren.' },
    duration: 30,
  },
  {
    id: 'express-pedicure',
    group: 'estetica',
    category: 'manos',
    name: { es: 'Kriado Express Pedicure', en: 'Kriado Express Pedicure', de: 'Kriado Express Pedicure' },
    description: { es: 'Limado y esmaltado.', en: 'Filing and polish.', de: 'Feilen und Lackieren.' },
    duration: 30,
  },
  {
    id: 'luxury-manicure',
    group: 'estetica',
    category: 'manos',
    name: { es: 'Kriado Luxury Manicure', en: 'Kriado Luxury Manicure', de: 'Kriado Luxury Manicure' },
    description: {
      es: 'Corte, limado, exfoliación, esmaltado y masaje.',
      en: 'Trim, filing, exfoliation, polish and massage.',
      de: 'Schneiden, Feilen, Peeling, Lackieren und Massage.',
    },
    duration: 50,
  },
  {
    id: 'luxury-pedicure',
    group: 'estetica',
    category: 'manos',
    name: { es: 'Kriado Luxury Pedicure', en: 'Kriado Luxury Pedicure', de: 'Kriado Luxury Pedicure' },
    description: {
      es: 'Corte, limado, exfoliación, esmaltado y masaje.',
      en: 'Trim, filing, exfoliation, polish and massage.',
      de: 'Schneiden, Feilen, Peeling, Lackieren und Massage.',
    },
    duration: 55,
  },
  {
    id: 'deep-relax',
    group: 'estetica',
    category: 'masajes',
    name: { es: 'Kriado Deep Relax', en: 'Kriado Deep Relax', de: 'Kriado Deep Relax' },
    description: { es: 'Masaje relajante.', en: 'Relaxing massage.', de: 'Entspannende Massage.' },
    duration: [25, 50],
  },
  {
    id: 'deep-tissue',
    group: 'estetica',
    category: 'masajes',
    name: { es: 'Kriado Deep Tissue', en: 'Kriado Deep Tissue', de: 'Kriado Deep Tissue' },
    description: {
      es: 'Masaje profundo, con presión firme, para soltar tensiones.',
      en: 'Deep massage with firm pressure to release tension.',
      de: 'Tiefenmassage mit kräftigem Druck gegen Verspannungen.',
    },
    duration: [25, 50],
  },
  {
    id: 'lymphatic',
    group: 'estetica',
    category: 'masajes',
    name: { es: 'Kriado Lymphatic', en: 'Kriado Lymphatic', de: 'Kriado Lymphatic' },
    description: { es: 'Drenaje linfático.', en: 'Lymphatic drainage.', de: 'Lymphdrainage.' },
    duration: [25, 50],
  },
  {
    id: 'sport',
    group: 'estetica',
    category: 'masajes',
    name: { es: 'Kriado Sport', en: 'Kriado Sport', de: 'Kriado Sport' },
    description: {
      es: 'Masaje deportivo, para músculos cargados.',
      en: 'Sports massage for tired muscles.',
      de: 'Sportmassage für beanspruchte Muskeln.',
    },
    duration: [25, 50],
  },
  {
    id: 'reflexology',
    group: 'estetica',
    category: 'masajes',
    name: { es: 'Kriado Reflexology', en: 'Kriado Reflexology', de: 'Kriado Reflexology' },
    description: { es: 'Reflexología podal.', en: 'Foot reflexology.', de: 'Fußreflexzonenmassage.' },
    duration: 40,
    pending: '[DA_CLIENTE: confermare che è reflexología podal]',
  },
  {
    id: 'head-ritual',
    group: 'estetica',
    category: 'masajes',
    name: { es: 'Kriado Head Ritual', en: 'Kriado Head Ritual', de: 'Kriado Head Ritual' },
    duration: 45,
    pending: '[DA_CLIENTE: cosa include]',
  },
  {
    id: 'hawaiian-lomi-lomi',
    group: 'estetica',
    category: 'masajes',
    name: { es: 'Kriado Hawaiian Lomi Lomi', en: 'Kriado Hawaiian Lomi Lomi', de: 'Kriado Hawaiian Lomi Lomi' },
    description: {
      es: 'Masaje hawaiano, con movimientos largos y envolventes.',
      en: 'Hawaiian massage with long, flowing strokes.',
      de: 'Hawaiianische Massage mit langen, fließenden Bewegungen.',
    },
    duration: 50,
  },
  {
    id: 'body-soul-ritual',
    group: 'estetica',
    category: 'masajes',
    name: { es: 'Kriado Body & Soul Ritual', en: 'Kriado Body & Soul Ritual', de: 'Kriado Body & Soul Ritual' },
    duration: 50,
    pending: '[DA_CLIENTE: cosa include]',
  },
  {
    id: 'full-moon-ritual',
    group: 'estetica',
    category: 'masajes',
    name: { es: 'Kriado Full Moon Ritual', en: 'Kriado Full Moon Ritual', de: 'Kriado Full Moon Ritual' },
    duration: 50,
    pending: '[DA_CLIENTE: cosa include]',
  },
  {
    id: 'mallorca-essence-ritual',
    group: 'estetica',
    category: 'masajes',
    name: { es: 'Kriado Mallorca Essence Ritual', en: 'Kriado Mallorca Essence Ritual', de: 'Kriado Mallorca Essence Ritual' },
    duration: 50,
    pending: '[DA_CLIENTE: cosa include]',
  },
  {
    id: 'indian-essence-ritual',
    group: 'estetica',
    category: 'masajes',
    name: { es: 'Kriado Indian Essence Ritual', en: 'Kriado Indian Essence Ritual', de: 'Kriado Indian Essence Ritual' },
    duration: 70,
    pending: '[DA_CLIENTE: cosa include]',
  },
];

/** Quanto si risparmia con un pacchetto rispetto ai servizi singoli (solo se tutti i prezzi sono noti). */
export function bundleSaving(service: Service): number | null {
  if (!service.bundleOf || typeof service.price !== 'number') return null;
  let sum = 0;
  for (const id of service.bundleOf) {
    const part = services.find((s) => s.id === id);
    if (!part || typeof part.price !== 'number') return null;
    sum += part.price;
  }
  const saving = sum - service.price;
  return saving > 0 ? saving : null;
}
