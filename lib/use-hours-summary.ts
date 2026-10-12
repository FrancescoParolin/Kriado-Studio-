import { useLocale, useTranslations } from 'next-intl';
import { hoursGroups } from './hours';

/** "Lunes a sábado" e "10:00–19:00" dagli orari in DATI, nella lingua della pagina. */
export function useHoursSummary(): { days: string; time: string } {
  const t = useTranslations();
  const locale = useLocale();
  const groups = hoursGroups();
  const name = (d: string, inner: boolean) => {
    const n = t(`location.days.${d}`);
    return inner && locale === 'es' ? n.toLowerCase() : n;
  };
  const days = groups
    .map((g) => (g.from === g.to ? name(g.from, false) : t('footer.dayRange', { from: name(g.from, false), to: name(g.to, true) })))
    .join(' · ');
  const time = [...new Set(groups.map((g) => g.time))].join(' · ');
  return { days, time };
}
