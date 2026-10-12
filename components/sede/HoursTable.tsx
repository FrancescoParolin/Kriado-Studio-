'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Pending } from '@/components/Section';
import type { DayHours, Weekday } from '@/content/locations';

/** Giorno della settimana a Cala Ratjada, calcolato nel browser (sul server non si sa quando verrà letto). */
function useToday(): Weekday | null {
  const [today, setToday] = useState<Weekday | null>(null);
  useEffect(() => {
    const day = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      timeZone: 'Europe/Madrid',
    })
      .format(new Date())
      .toLowerCase() as Weekday;
    setToday(day);
  }, []);
  return today;
}

export function HoursTable({ hours }: { hours: DayHours[] }) {
  const t = useTranslations('location');
  const today = useToday();
  return (
    <table className="w-full max-w-[28rem] border-collapse">
      <caption className="ui pb-4 text-left">{t('hours')}</caption>
      <tbody className="tabular">
        {hours.map((d) => {
          const isToday = d.day === today;
          return (
            <tr key={d.day}>
              <th scope="row" className={`py-2 pr-6 text-left ${isToday ? 'font-semibold' : 'font-normal'}`}>
                {t(`days.${d.day}`)}
                {isToday ? <span className="ml-2 font-normal text-gris">{t('today')}</span> : null}
              </th>
              <td className={`py-2 text-left ${isToday ? 'font-semibold' : ''}`}>
                {'pending' in d ? (
                  <Pending>{d.pending}</Pending>
                ) : d.closed ? (
                  <span className={isToday ? undefined : 'text-gris'}>{t('closed')}</span>
                ) : (
                  d.ranges.map((r) => `${r.opens}–${r.closes}`).join(', ')
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
