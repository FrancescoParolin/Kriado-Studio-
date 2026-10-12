import { DATI } from '@/content/dati';

export type Day = keyof typeof DATI.horario;
export const WEEK: Day[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const TZ = 'Europe/Madrid';
const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
};

/** Giorno della settimana e minuti dalla mezzanotte, all'ora di Cala Ratjada. */
export function madridNow(date = new Date()): { day: Day; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  return { day: get('weekday').toLowerCase() as Day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export type OpenState =
  | { open: true; closes: string }
  | { open: false; nextDay: Day; inDays: number; opens: string }
  | { open: false; nextDay?: undefined };

/** Aperto adesso? Se no, quando riapre. Calcolato dagli orari in DATI. */
export function openState(date = new Date()): OpenState {
  const { day, minutes } = madridNow(date);
  const current = DATI.horario[day].find((r) => minutes >= toMinutes(r.opens) && minutes < toMinutes(r.closes));
  if (current) return { open: true, closes: current.closes };
  const start = WEEK.indexOf(day);
  for (let i = 0; i < 7; i++) {
    const d = WEEK[(start + i) % 7]!;
    const next = DATI.horario[d].find((r) => i > 0 || toMinutes(r.opens) > minutes);
    if (next) return { open: false, nextDay: d, inDays: i, opens: next.opens };
  }
  return { open: false };
}

/** Prossimi giorni in cui si può prenotare (oggi solo se manca almeno un'ora alla chiusura). */
export function nextOpenDays(count: number, date = new Date()): Array<{ date: Date; day: Day; offset: number }> {
  const out: Array<{ date: Date; day: Day; offset: number }> = [];
  const { minutes } = madridNow(date);
  for (let offset = 0; out.length < count && offset < 31; offset++) {
    const d = new Date(date.getTime() + offset * 24 * 60 * 60 * 1000);
    const { day } = madridNow(d);
    const ranges = DATI.horario[day];
    if (!ranges.length) continue;
    if (offset === 0) {
      const last = Math.max(...ranges.map((r) => toMinutes(r.closes)));
      if (minutes > last - 60) continue;
    }
    out.push({ date: d, day, offset });
  }
  return out;
}

export const TIMEZONE = TZ;

/** Giorni consecutivi con lo stesso orario, per i riassunti ("Lunes a sábado, 10:00–19:00"). I giorni chiusi restano fuori. */
export function hoursGroups(): Array<{ from: Day; to: Day; time: string }> {
  const groups: Array<{ from: Day; to: Day; time: string }> = [];
  for (const day of WEEK) {
    const ranges = DATI.horario[day];
    if (!ranges.length) continue;
    const time = ranges.map((r) => `${r.opens}–${r.closes}`).join(', ');
    const last = groups[groups.length - 1];
    if (last && last.time === time && WEEK.indexOf(last.to) === WEEK.indexOf(day) - 1) last.to = day;
    else groups.push({ from: day, to: day, time });
  }
  return groups;
}
