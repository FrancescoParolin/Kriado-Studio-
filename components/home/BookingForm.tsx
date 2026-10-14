'use client';

import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { buttonClass } from '@/components/Button';
import { useChosenService } from '@/lib/booking';
import { madridNow, nextOpenDays, TIMEZONE } from '@/lib/hours';

export type ServiceOption = { id: string; label: string; group: string };

type Slot = 'morning' | 'midday' | 'afternoon';
const SLOTS: Array<{ id: Slot; ends: number }> = [
  { id: 'morning', ends: 13 * 60 },
  { id: 'midday', ends: 16 * 60 },
  { id: 'afternoon', ends: 19 * 60 },
];
type Field = 'service' | 'day' | 'slot' | 'name';

const fieldClass = (invalid: boolean) =>
  `mt-2 block h-12 w-full rounded-[var(--r-field)] border border-negro bg-blanco px-4 font-normal text-negro ${
    invalid ? 'shadow-[inset_0_0_0_2px_#000]' : ''
  }`;

const FIELD_IDS: Record<Field, string> = {
  service: 'reserva-servicio',
  day: 'reserva-dia',
  slot: 'reserva-franja',
  name: 'reserva-nombre',
};

/**
 * Prenotazione via WhatsApp senza attriti: servizio, giorno, fascia e nome diventano un messaggio pronto.
 * Nessun dato passa dal sito: si apre WhatsApp con il testo già scritto.
 */
export function BookingForm({
  options,
  groups,
  whatsapp,
  directMessage,
}: {
  options: ServiceOption[];
  groups: Record<string, string>;
  whatsapp: string;
  directMessage: string;
}) {
  const t = useTranslations('booking');
  const tc = useTranslations('cta');
  const locale = useLocale();
  const format = useFormatter();
  const chosen = useChosenService();

  const [service, setService] = useState('');
  const [day, setDay] = useState('');
  const [slot, setSlot] = useState<Slot | ''>('');
  const [name, setName] = useState('');
  const [missing, setMissing] = useState<Field[]>([]);
  const [days, setDays] = useState<Array<{ value: string; label: string; inline: string; today: boolean }>>([]);
  const [nowMinutes, setNowMinutes] = useState<number | null>(null);

  // Un "Reservar" del listino sceglie il servizio qui (anche se si ritocca la stessa riga).
  useEffect(() => {
    if (chosen) setService(chosen.id);
  }, [chosen]);

  // I giorni e l'ora dipendono da adesso: si calcolano nel browser, all'ora di Madrid.
  useEffect(() => {
    // I testi inglesi sono in inglese britannico: date "Monday 12 October", non "Monday, October 12".
    const long = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: TIMEZONE,
    });
    setNowMinutes(madridNow().minutes);
    setDays(
      nextOpenDays(14).map(({ date, offset }) => {
        let label = long.format(date);
        if (locale === 'es') label = label.replace(',', '');
        const inline = offset === 0 ? `${t('today')}, ${label}` : offset === 1 ? `${t('tomorrow')}, ${label}` : label;
        return {
          value: date.toISOString().slice(0, 10),
          label,
          inline,
          today: offset === 0,
        };
      }),
    );
  }, [locale, t]);

  const isToday = days.find((d) => d.value === day)?.today ?? false;
  const slotOver = (ends: number) => isToday && nowMinutes !== null && nowMinutes >= ends - 30;

  // Se il giorno scelto è oggi e la fascia è già passata, la scelta si azzera.
  useEffect(() => {
    const current = SLOTS.find((s) => s.id === slot);
    if (current && slotOver(current.ends)) setSlot('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  const serviceLabel = options.find((o) => o.id === service)?.label ?? '';
  const dayLabel = days.find((d) => d.value === day)?.label ?? '';

  const message = useMemo(() => {
    if (!serviceLabel || !dayLabel || !slot || !name.trim()) return '';
    return t('message', {
      service: serviceLabel,
      day: dayLabel,
      slot: t(`slotsShort.${slot}`),
      name: name.trim(),
    });
  }, [serviceLabel, dayLabel, slot, name, t]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const gaps: Field[] = [];
    if (!service) gaps.push('service');
    if (!day) gaps.push('day');
    if (!slot) gaps.push('slot');
    if (!name.trim()) gaps.push('name');
    setMissing(gaps);
    if (gaps.length) {
      // Il primo campo che manca va al centro dello schermo (con la sua riga d'errore) e prende il focus.
      const box = document.getElementById(FIELD_IDS[gaps[0] as Field]);
      if (box) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        box.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        const target =
          box instanceof HTMLFieldSetElement ? box.querySelector<HTMLElement>('input:not(:disabled)') : box;
        target?.focus({ preventScroll: true });
      }
      return;
    }
    if (!message) return;
    window.open(
      `https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener',
    );
  }

  const clear = (f: Field) => setMissing((m) => m.filter((x) => x !== f));
  const errorId = (f: Field) => `${FIELD_IDS[f]}-error`;
  const invalid = (f: Field) =>
    missing.includes(f) ? { 'aria-invalid': true as const, 'aria-describedby': errorId(f) } : {};
  // Riga d'errore sotto il campo: quadratino pieno e testo in grassetto, come lo stato "Abierto".
  const errorLine = (f: Field) =>
    missing.includes(f) ? (
      <p id={errorId(f)} className="mt-2 flex items-start gap-2 font-semibold">
        <span aria-hidden="true" className="mt-[0.45em] inline-block size-2 shrink-0 bg-current" />
        {t(`errors.${f}`)}
      </p>
    ) : null;
  const grouped = Object.entries(groups).map(([g, label]) => ({
    label,
    items: options.filter((o) => o.group === g),
  }));

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div>
        <label className="ui block">
          {t('service')}
          <select
            id="reserva-servicio"
            value={service}
            {...invalid('service')}
            onChange={(e) => {
              setService(e.target.value);
              clear('service');
            }}
            className={fieldClass(missing.includes('service'))}
          >
            <option value="">{t('servicePlaceholder')}</option>
            {grouped.map((g) => (
              <optgroup key={g.label} label={g.label}>
                {g.items.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        {errorLine('service')}
      </div>

      <div>
        <label className="ui block">
          {t('day')}
          <select
            id="reserva-dia"
            value={day}
            {...invalid('day')}
            onChange={(e) => {
              setDay(e.target.value);
              clear('day');
            }}
            className={fieldClass(missing.includes('day'))}
          >
            <option value="">{t('dayPlaceholder')}</option>
            {days.map((d) => (
              <option key={d.value} value={d.value}>
                {d.inline}
              </option>
            ))}
          </select>
        </label>
        {errorLine('day')}
      </div>

      <fieldset id="reserva-franja" {...invalid('slot')}>
        <legend className="ui">{t('slot')}</legend>
        <div className="mt-2 flex flex-col gap-2">
          {SLOTS.map(({ id, ends }) => {
            const over = slotOver(ends);
            const active = slot === id;
            return (
              <label
                key={id}
                className={`flex min-h-12 items-center gap-4 rounded-[var(--r-field)] border px-4 ${
                  over
                    ? 'cursor-not-allowed border-gris text-gris'
                    : active
                      ? 'cursor-pointer border-negro bg-negro text-blanco'
                      : `cursor-pointer border-negro text-negro hover:shadow-[inset_0_0_0_1px_#000] ${
                          missing.includes('slot') ? 'shadow-[inset_0_0_0_2px_#000]' : ''
                        }`
                }`}
              >
                <input
                  type="radio"
                  name="franja"
                  value={id}
                  checked={active}
                  disabled={over}
                  onChange={() => {
                    setSlot(id);
                    clear('slot');
                  }}
                  className="size-4 accent-current"
                />
                <span>
                  {t(`slots.${id}`)}
                  {over ? `, ${t('pastSlot')}` : ''}
                </span>
              </label>
            );
          })}
        </div>
        {errorLine('slot')}
      </fieldset>

      <div>
        <label className="ui block">
          {t('name')}
          <input
            id="reserva-nombre"
            type="text"
            value={name}
            {...invalid('name')}
            onChange={(e) => {
              setName(e.target.value);
              clear('name');
            }}
            autoComplete="given-name"
            className={fieldClass(missing.includes('name'))}
          />
        </label>
        {errorLine('name')}
      </div>

      {message ? (
        <div className="border-l-2 border-negro pl-4">
          <p className="text-gris">{t('preview')}</p>
          <p className="mt-2 whitespace-pre-line">{message}</p>
        </div>
      ) : null}

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

      <div className="flex flex-col items-start gap-4">
        <button type="submit" className={buttonClass('light', 'primary', '', true)}>
          {t('submit')}
        </button>
        <a href={directMessage} target="_blank" rel="noopener" className="link ui inline-flex min-h-12 items-center">
          {t('direct')}
          <span className="sr-only"> {tc('newTab')}</span>
        </a>
      </div>
    </form>
  );
}
