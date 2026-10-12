'use client';

import { useTranslations, useFormatter } from 'next-intl';
import { useState, type FormEvent } from 'react';
import { buttonClass } from '@/components/Button';
import { Link } from '@/i18n/navigation';

type Field = 'name' | 'message';
const IDS: Record<Field, string> = { name: 'contacto-nombre', message: 'contacto-mensaje' };

const field = (invalid: boolean) =>
  `mt-2 block w-full border border-negro bg-blanco px-4 font-normal text-negro ${invalid ? 'shadow-[inset_0_0_0_2px_#000]' : ''}`;

/**
 * "Escríbenos": nome e messaggio diventano un messaggio WhatsApp già scritto, come la prenotazione in home.
 * Niente passa dal sito (né Netlify né altri): arriva a Carlos dove risponde davvero.
 */
export function ContactForm({ whatsapp }: { whatsapp: string }) {
  const t = useTranslations('contact');
  const format = useFormatter();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [missing, setMissing] = useState<Field[]>([]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const gaps: Field[] = [];
    if (!name.trim()) gaps.push('name');
    if (!message.trim()) gaps.push('message');
    setMissing(gaps);
    if (gaps.length) {
      const el = document.getElementById(IDS[gaps[0] as Field]);
      if (el) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        el.focus({ preventScroll: true });
      }
      return;
    }
    const text = t('waMessage', { name: name.trim(), message: message.trim() });
    window.open(`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }

  const clear = (f: Field) => setMissing((m) => m.filter((x) => x !== f));
  const invalid = (f: Field) =>
    missing.includes(f) ? { 'aria-invalid': true as const, 'aria-describedby': `${IDS[f]}-error` } : {};
  const errorLine = (f: Field) =>
    missing.includes(f) ? (
      <p id={`${IDS[f]}-error`} className="mt-2 flex items-start gap-2 font-semibold">
        <span aria-hidden="true" className="mt-[0.45em] inline-block size-2 shrink-0 bg-current" />
        {t(`errors.${f}`)}
      </p>
    ) : null;

  const privacyLink = (chunks: React.ReactNode) => (
    <Link href="/politica-de-privacidad" className="link">
      {chunks}
    </Link>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <label className="ui block">
          {t('name')}
          <input
            id={IDS.name}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clear('name');
            }}
            autoComplete="name"
            {...invalid('name')}
            className={`${field(missing.includes('name'))} h-12`}
          />
        </label>
        {errorLine('name')}
      </div>

      <div>
        <label className="ui block">
          {t('message')}
          <textarea
            id={IDS.message}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              clear('message');
            }}
            rows={5}
            {...invalid('message')}
            className={`${field(missing.includes('message'))} py-4 leading-[1.55]`}
          />
        </label>
        {errorLine('message')}
      </div>

      <div aria-live="polite" className="empty:-mt-6">
        {missing.length ? (
          <p className="ui">
            {t('missing', {
              fields: format.list(
                missing.map((f) => t(`fields.${f}`)),
                { type: 'conjunction' },
              ),
            })}
          </p>
        ) : null}
      </div>

      <div>
        <button type="submit" className={buttonClass('light', 'primary', '', true)}>
          {t('send')}
        </button>
      </div>

      <p className="text-gris">{t.rich('note', { link: privacyLink })}</p>
    </form>
  );
}
