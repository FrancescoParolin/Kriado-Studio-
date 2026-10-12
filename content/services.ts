import type { L10n, PendingNote } from './types';

export type ServiceGroup = 'peluqueria' | 'barberia';

export type Service = {
  /** Identificativo stabile: lo usano i bottoni "Reservar" del listino e il modulo di prenotazione. */
  id: string;
  group: ServiceGroup;
  name: L10n;
  /** Una riga: cosa include, per chi. */
  description: L10n;
  /** Minuti, dal listino Yeasy. */
  duration?: number;
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

// Prima la barbería: ha prezzi e durate veri (Yeasy). La peluquería ha i prezzi da confermare.
export const serviceGroups: ServiceGroup[] = ['barberia', 'peluqueria'];

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
