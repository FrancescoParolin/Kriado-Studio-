import { DATI } from '@/content/dati';
import type { Locale } from '@/i18n/routing';

/** Dati legali che arrivano da Carlos: appena sono in DATI.legal / DATI.email prendono il posto del segnaposto. */
const VALUES: Record<string, string | null> = {
  RAGIONE_SOCIALE: DATI.legal.razonSocial,
  NIF: DATI.legal.nif,
  INDIRIZZO_FISCALE: DATI.legal.domicilioFiscal,
  EMAIL: DATI.email,
};

const LABELS: Record<Locale, Record<string, string>> = {
  es: {
    RAGIONE_SOCIALE: 'razón social',
    NIF: 'NIF',
    INDIRIZZO_FISCALE: 'domicilio fiscal',
    EMAIL: 'email',
  },
  en: {
    RAGIONE_SOCIALE: 'company name',
    NIF: 'tax ID',
    INDIRIZZO_FISCALE: 'registered address',
    EMAIL: 'email',
  },
  de: {
    RAGIONE_SOCIALE: 'Firmenname',
    NIF: 'Steuernummer',
    INDIRIZZO_FISCALE: 'Anschrift',
    EMAIL: 'E-Mail',
  },
};

const PENDING: Record<Locale, string> = {
  es: 'pendiente',
  en: 'to follow',
  de: 'folgt',
};

/** Segnaposto elegante: grigio, tratteggiato, leggibile ("razón social, pendiente"), mai parentesi quadre. */
export function PendingValue({ label, locale }: { label: string; locale: Locale }) {
  return (
    <span data-pending className="text-gris underline decoration-dashed decoration-1 underline-offset-4">
      {label}, {PENDING[locale]}
    </span>
  );
}

/** Testo con segnaposto [CHIAVE] o [DA_CLIENTE: cosa]: i dati veri se ci sono, altrimenti il segnaposto elegante. */
export function PendingText({ text, locale }: { text: string; locale: Locale }) {
  const parts = text.split(/\[(DA_CLIENTE:[^\]]+|[A-Z_]+)\]/);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part;
        if (part.startsWith('DA_CLIENTE:'))
          return <PendingValue key={i} label={part.slice(11).trim()} locale={locale} />;
        const value = VALUES[part];
        return value ?? <PendingValue key={i} label={LABELS[locale][part] ?? part} locale={locale} />;
      })}
    </>
  );
}

/** Ragione sociale per le note brevi (modulo di contatto). */
export function holderName(locale: Locale) {
  return DATI.legal.razonSocial ?? <PendingValue label={LABELS[locale].RAGIONE_SOCIALE!} locale={locale} />;
}
