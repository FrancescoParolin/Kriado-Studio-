import { cache } from 'react';
import { DATI } from '@/content/dati';
import { hoursFromHorario, mainLocation, type Location } from '@/content/locations';
import { reviews as staticReviews } from '@/content/reviews';
import { WEEK, type Day, type Horario } from './hours';

/**
 * Orari, voto e recensioni presi dalla scheda Google (Places API New), aggiornati da soli ogni 6 ore.
 * Serve GOOGLE_PLACES_API_KEY_KRIADO nelle variabili d'ambiente di Netlify (non segreta: le build partono dalla CLI).
 * Senza chiave, o se Google non risponde, il sito usa i dati scritti in DATI e in content/reviews.ts: non si rompe niente.
 * La chiave resta sul server: questo file non va mai importato da un componente client.
 */

const REVALIDATE = 6 * 60 * 60;
const API = 'https://places.googleapis.com/v1';

export type LiveReview = {
  text: string;
  /** Lingua in cui il cliente l'ha scritta (codice Google: es, en, de, it…). */
  lang: string;
  /** "Nome I.", come per le recensioni scritte a mano. */
  author: string;
  stars: number;
  /** Link alla recensione o al profilo dell'autore su Google. */
  url?: string;
};

export type Live = {
  source: 'google' | 'static';
  /** Orario normale della settimana. */
  horario: Horario;
  /** Questi 7 giorni, con le chiusure e gli orari speciali messi da Carlos su Google: serve ad "Abierto / Cerrado". */
  semana: Horario;
  /** fiveStars si conosce solo dal conteggio letto a mano: se il numero di recensioni cambia diventa null. */
  rating: { value: number; count: number; fiveStars: number | null };
  reviews: LiveReview[];
};

type GoogleTime = { day?: number; hour?: number; minute?: number };
type GooglePeriod = { open?: GoogleTime; close?: GoogleTime };
type GoogleReview = {
  rating?: number;
  originalText?: { text?: string; languageCode?: string };
  text?: { text?: string; languageCode?: string };
  authorAttribution?: { displayName?: string; uri?: string };
  googleMapsUri?: string;
};
type GooglePlace = {
  googleMapsUri?: string;
  rating?: number;
  userRatingCount?: number;
  regularOpeningHours?: { periods?: GooglePeriod[] };
  currentOpeningHours?: { periods?: GooglePeriod[] };
  reviews?: GoogleReview[];
};

const STATIC: Live = {
  source: 'static',
  horario: DATI.horario,
  semana: DATI.horario,
  rating: { value: DATI.google.valoracion, count: DATI.google.resenas, fiveStars: DATI.google.cincoEstrellas },
  reviews: staticReviews.map((r) => ({ text: r.text, lang: r.lang, author: r.author, stars: r.stars ?? 5 })),
};

/** Google numera i giorni da domenica (0) a sabato (6). */
const GOOGLE_DAYS: Day[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const hhmm = (t: GoogleTime) => `${String(t.hour ?? 0).padStart(2, '0')}:${String(t.minute ?? 0).padStart(2, '0')}`;

/** Fasce di Google → orario del sito. null se non c'è nemmeno un giorno aperto (dato sospetto: meglio quello scritto a mano). */
export function horarioFromPeriods(periods: GooglePeriod[] | undefined): Horario | null {
  if (!periods?.length) return null;
  const out = Object.fromEntries(WEEK.map((d) => [d, [] as Array<{ opens: string; closes: string }>])) as Record<
    Day,
    Array<{ opens: string; closes: string }>
  >;
  // Aperto sempre: Google manda una sola fascia che apre domenica alle 00:00 e non chiude.
  if (periods.length === 1 && periods[0]?.open && !periods[0].close) {
    for (const d of WEEK) out[d].push({ opens: '00:00', closes: '24:00' });
    return out;
  }
  for (const p of periods) {
    if (!p.open || p.open.day === undefined) continue;
    const day = GOOGLE_DAYS[p.open.day];
    if (!day) continue;
    // Una fascia che passa la mezzanotte si chiude a fine giornata: al salone non succede, ma non deve rompere niente.
    const closes = p.close && p.close.day === p.open.day ? hhmm(p.close) : '24:00';
    out[day].push({ opens: hhmm(p.open), closes });
  }
  for (const d of WEEK) out[d].sort((a, b) => a.opens.localeCompare(b.opens));
  return WEEK.some((d) => out[d].length) ? out : null;
}

const capitalize = (w: string) => w.charAt(0).toLocaleUpperCase('es') + w.slice(1);

/** "maría magdalena hidalgo sánchez" → "María S.": nome e iniziale del cognome, con la maiuscola. */
export function shortName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '';
  const first = capitalize(parts[0]!);
  return parts.length < 2 ? first : `${first} ${parts[parts.length - 1]!.charAt(0).toLocaleUpperCase('es')}.`;
}

/** Recensioni da mostrare intere: mai tagliate, perché un taglio fuori contesto può suonare negativo. */
const MAX_WORDS = 40;
const wordCount = (text: string) => text.split(' ').length;

/**
 * Tra le (al massimo 5) recensioni che manda Google: solo da 5 stelle, con testo intero entro 40 parole,
 * la più breve per prima (va in grande), al massimo 3.
 */
function pickReviews(list: GoogleReview[] | undefined): LiveReview[] {
  return (list ?? [])
    .filter((r) => r.rating === 5 && r.authorAttribution?.displayName)
    .map((r) => ({
      text: (r.originalText?.text ?? r.text?.text ?? '').replace(/\s+/g, ' ').trim(),
      lang: (r.originalText?.languageCode ?? r.text?.languageCode ?? 'es').slice(0, 2),
      author: shortName(r.authorAttribution!.displayName!),
      stars: 5,
      url: r.googleMapsUri ?? r.authorAttribution?.uri,
    }))
    .filter((r) => r.text && wordCount(r.text) <= MAX_WORDS)
    .sort((a, b) => wordCount(a.text) - wordCount(b.text))
    .slice(0, 3);
}

async function placeId(key: string): Promise<string | null> {
  if (process.env.GOOGLE_PLACE_ID) return process.env.GOOGLE_PLACE_ID;
  // Ricerca "solo ID": la tariffa gratuita di Google. L'ID di un luogo si può conservare, quindi si tiene 30 giorni.
  const res = await fetch(`${API}/places:searchText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'places.id' },
    body: JSON.stringify({
      textQuery: `${DATI.nombreGoogle}, ${DATI.direccion.calle}, ${DATI.direccion.localidad}`,
      locationBias: { circle: { center: { latitude: DATI.geo.lat, longitude: DATI.geo.lng }, radius: 300 } },
    }),
    next: { revalidate: 30 * 24 * 60 * 60 },
  });
  if (!res.ok) throw new Error(`Google searchText ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = (await res.json()) as { places?: Array<{ id?: string }> };
  return data.places?.[0]?.id ?? null;
}

async function load(): Promise<Live> {
  // GOOGLE_PLACES_API_KEY_KRIADO (non segreta, così arriva anche alle build dalla CLI) prima del vecchio nome.
  // Una variabile segreta di Netlify arriva alla CLI mascherata ("****…"): in quel caso si ignora.
  // trim: uno spazio o un a capo copiato insieme alla chiave la renderebbe "non valida" per Google.
  const key = [process.env.GOOGLE_PLACES_API_KEY_KRIADO, process.env.GOOGLE_PLACES_API_KEY]
    .map((k) => k?.trim())
    .find((k) => k && !k.startsWith('*'));
  if (!key) return STATIC;
  try {
    const id = await placeId(key);
    if (!id) throw new Error('Google: scheda non trovata');
    const res = await fetch(`${API}/places/${encodeURIComponent(id)}?languageCode=es&regionCode=ES`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'googleMapsUri,rating,userRatingCount,regularOpeningHours,currentOpeningHours,reviews',
      },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error(`Google place details ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const place = (await res.json()) as GooglePlace;

    // Controllo che sia proprio la scheda di Kriado (stesso cid del link in DATI): una ricerca sbagliata non deve mostrare dati di altri.
    const cid = new URL(DATI.google.url).searchParams.get('cid');
    if (!process.env.GOOGLE_PLACE_ID && cid && place.googleMapsUri && !place.googleMapsUri.includes(cid)) {
      throw new Error(`Google: la scheda trovata non è quella di Kriado (${place.googleMapsUri})`);
    }

    const horario = horarioFromPeriods(place.regularOpeningHours?.periods) ?? STATIC.horario;
    const semana = horarioFromPeriods(place.currentOpeningHours?.periods) ?? horario;
    const count = place.userRatingCount ?? STATIC.rating.count;
    const reviews = pickReviews(place.reviews);
    return {
      source: 'google',
      horario,
      semana,
      rating: {
        value: place.rating ?? STATIC.rating.value,
        count,
        fiveStars: count === DATI.google.resenas ? DATI.google.cincoEstrellas : null,
      },
      reviews: reviews.length ? reviews : STATIC.reviews,
    };
  } catch (error) {
    // Forma della chiave (mai il valore): le chiavi Google iniziano con "AIza" e sono lunghe 39 caratteri.
    console.error(
      `[google] uso i dati scritti a mano (chiave: ${key.length} caratteri, inizia con AIza: ${key.startsWith('AIza')}):`,
      error,
    );
    return STATIC;
  }
}

/** Una sola lettura per richiesta, anche se più componenti la chiedono. */
export const getLive = cache(load);

/** La sede con gli orari della scheda Google (tabella e dati per Google). Vale solo per la sede principale: la scheda è quella. */
export async function withLiveHours(location: Location): Promise<Location> {
  if (location.slug !== mainLocation.slug) return location;
  const live = await getLive();
  return live.source === 'google' ? { ...location, hours: hoursFromHorario(live.horario) } : location;
}
