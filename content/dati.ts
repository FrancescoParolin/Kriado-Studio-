/**
 * DATI — tutti i dati dell'attività in un punto solo.
 * Si cambiano qui e il sito si aggiorna ovunque (header, footer, sede, contatti, dati per Google).
 * Mai inventare: ciò che manca resta `null` ed è elencato in DA_CHIEDERE_A_CARLOS.md.
 * Fonti: scheda Google (8 ottobre 2026), Yeasy, OpenStreetMap, foto del locale.
 */
export const DATI = {
  nombre: 'Kriado Studio',
  /** Nome sulla scheda Google. Su Yeasy e sulla banderola: "Kriado Barber Studio". */
  nombreGoogle: 'Kriado Studio Barbería & Peluquería',
  /** Nome con cui firma (il nome legale è in `legal.razonSocial`). */
  titular: 'Carlos Kriado',
  /** Anno di apertura di Kriado Studio (Carlos, 9 ottobre 2026). Carlos: barbería dal 2020, professionista dal 2022. */
  fundacion: 2026,
  /** Percorso di Carlos (da lui, 9 ottobre 2026). */
  trayectoria: { inicio: 2020, profesional: 2022 },
  /**
   * Prossime aperture: quante sono. I nomi delle città non stanno nel sito (Carlos non vuole che si sappiano):
   * si vedono parole finte sfocate. I nomi veri sono solo nelle note di progetto.
   */
  proximasAperturas: 3,
  /** Kriado Private: servizio esclusivo di barbería e peluquería solo in villas e hotel, tutta l'isola, 5–7 giorni di anticipo; per sportivi, imprenditori, clienti di alto profilo. Nessun nome nei testi (lo fanno Carlos e Pau). */
  private: { antelacionDias: [5, 7] as const },
  /** Citato nelle recensioni Google come estilista. */
  equipo: ['Carlos', 'Pau'],

  direccion: {
    calle: 'Carrer Leonor Servera 7', // confermato da Paro il 9 ottobre 2026 (su Yeasy c'è scritto 9: da correggere lì)
    cp: '07590',
    localidad: 'Cala Ratjada',
    municipio: 'Capdepera',
    region: 'Illes Balears',
    pais: 'ES',
  },
  geo: { lat: 39.7090106, lng: 3.4570203 },

  telefono: '+34616085194',
  telefonoVisible: '+34 616 08 51 94',
  /** Stesso numero del telefono. */
  whatsapp: '+34616085194',
  email: 'kriadobarberstudio@gmail.com' as string | null, // da Carlos, 9 ottobre 2026
  instagram: 'kriadostudio',

  /** Sistema di prenotazione vero: Yeasy (link usato dalla scheda Google). */
  reservaOnline: 'https://cut.yeasyapp.com/IMailP',

  google: {
    url: 'https://maps.google.com/?cid=5679890337260928682',
    valoracion: 4.9,
    resenas: 36,
    cincoEstrellas: 34,
    /** [DA_CLIENTE] Link "Pedir reseñas" del Perfil de Empresa (g.page/r/…/review): apre direttamente il modulo. Finché manca si usa la scheda. */
    resenaUrl: null as string | null,
  },

  /** Orari dalla scheda Google. Formato 24h, ora di Madrid. */
  horario: {
    monday: [{ opens: '10:00', closes: '19:00' }],
    tuesday: [{ opens: '10:00', closes: '19:00' }],
    wednesday: [{ opens: '10:00', closes: '19:00' }],
    thursday: [{ opens: '10:00', closes: '19:00' }],
    friday: [{ opens: '10:00', closes: '19:00' }],
    saturday: [{ opens: '10:00', closes: '19:00' }],
    sunday: [],
  } as Record<
    'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday',
    Array<{ opens: string; closes: string }>
  >,

  /** Come arrivare: bus e taxi da OpenStreetMap (ottobre 2026); parcheggio confermato da Paro (9 ottobre 2026). */
  comoLlegar: {
    autobus: { parada: 'Magallanes', metros: 54 },
    /** `metros: 0` = davanti al locale. */
    aparcamiento: { lugar: 'enfrente del local', metros: 0, gratuito: true },
    taxi: { metros: 300 },
  },

  /** Dominio definitivo (comprato da Carlos su Namecheap il 13 ottobre 2026): rende il sito indicizzabile. */
  dominio: 'https://kriadostudio.com' as string | null,
  /** Da Carlos (9 ottobre 2026). Come domicilio si usa l'indirizzo del salone (scelta di Paro, 13 ottobre 2026). */
  legal: {
    razonSocial: 'Juan Carlos García Criado' as string | null,
    nif: '47564064H' as string | null,
    domicilioFiscal: 'Carrer Leonor Servera 7, 07590 Cala Ratjada, Illes Balears' as string | null,
  },
} as const;
