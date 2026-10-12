'use client';

import { useTranslations } from 'next-intl';
import { chooseService } from '@/lib/booking';

/** "Reservar" su ogni riga del listino: sceglie il servizio nel modulo e ci porta lì. */
export function BookServiceButton({ id, name }: { id: string; name: string }) {
  const t = useTranslations('booking');
  return (
    <button
      type="button"
      onClick={() => chooseService(id)}
      aria-label={t('bookService', { service: name })}
      className="ui inline-flex min-h-12 items-center underline decoration-1 underline-offset-4 transition-opacity duration-200 hover:decoration-2 active:opacity-60"
    >
      {t('book')}
    </button>
  );
}
