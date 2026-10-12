import type { ReactNode } from 'react';

type Props = {
  tone: 'light' | 'dark';
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

/** Banda: nero dove parlano le foto, bianco dove parlano le informazioni. */
export function Section({ tone, id, labelledBy, className = '', children }: Props) {
  const colors = tone === 'dark' ? 'bg-negro text-hueso' : 'bg-blanco text-negro';
  return (
    <section
      id={id}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={`band ${colors} ${className}`.trim()}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}

/**
 * Dato mancante da Carlos. Al pubblico non si mostra (l'elenco è in DA_CHIEDERE_A_CARLOS.md);
 * con NEXT_PUBLIC_SHOW_PENDING=1 riappare, grigio e tratteggiato, per le revisioni interne.
 */
export function Pending({ children, className = '' }: { children: ReactNode; className?: string }) {
  if (process.env.NEXT_PUBLIC_SHOW_PENDING !== '1') return null;
  return (
    <span
      data-pending
      className={`text-gris underline decoration-dashed decoration-1 underline-offset-4 ${className}`.trim()}
    >
      {children}
    </span>
  );
}
