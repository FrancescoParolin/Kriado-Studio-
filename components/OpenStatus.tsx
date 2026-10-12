'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { openState, type OpenState } from '@/lib/hours';

/** "Abierto ahora, cierra a las 19:00" dagli orari veri, aggiornato ogni minuto. Sul server non si sa l'ora: si riserva solo lo spazio. */
export function OpenStatus({ className = '' }: { className?: string }) {
  const t = useTranslations('status');
  const tl = useTranslations('location');
  const locale = useLocale();
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(openState());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!state) return <p className={`ui min-h-[1.2em] ${className}`} aria-hidden="true" />;

  let detail = '';
  if (state.open) detail = t('closesAt', { time: state.closes });
  else if (state.nextDay) {
    const dayName = tl(`days.${state.nextDay}`);
    const day = locale === 'es' ? dayName.toLowerCase() : dayName;
    detail =
      state.inDays === 0
        ? t('opensToday', { time: state.opens })
        : state.inDays === 1
          ? t('opensTomorrow', { time: state.opens })
          : t('opensOn', { day, time: state.opens });
  }

  return (
    <p className={`ui flex min-h-[1.2em] items-start gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className={`mt-[0.4em] inline-block size-2 shrink-0 ${state.open ? 'bg-current' : 'border border-current'}`}
      />
      <span>
        <span className="font-semibold">{state.open ? t('openNow') : t('closedNow')}</span>
        <span className="font-normal">{detail ? `, ${detail}` : ''}</span>
      </span>
    </p>
  );
}
