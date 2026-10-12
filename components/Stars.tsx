import type { CSSProperties } from 'react';

/**
 * Stelle del voto Google, in oro (su fondo nero: contrasto 7,4:1). L'ultima si riempie in proporzione (4,9 → 90%).
 * Si usano solo con voti veri: il voto medio della scheda e le recensioni lette su Google come "5 estrellas".
 */
const STAR = 'M12 2.5l2.95 6.2 6.8.82-5.02 4.67 1.32 6.72L12 17.6l-6.05 3.31 1.32-6.72L2.25 9.52l6.8-.82z';

export function Stars({
  value,
  label,
  className = 'size-5',
  tone = 'gold',
}: {
  value: number;
  label: string;
  className?: string;
  /** Oro solo sul nero (contrasto); sul bianco le stelle sono nere. */
  tone?: 'gold' | 'dark';
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-flex items-center gap-1 ${tone === 'gold' ? 'text-oro' : 'text-negro'}`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span
            key={i}
            aria-hidden="true"
            className={`star relative inline-block shrink-0 ${className}`}
            style={{ '--i': i } as CSSProperties}
          >
            <svg viewBox="0 0 24 24" className="absolute inset-0 size-full" focusable="false">
              <path d={STAR} fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 size-full"
              focusable="false"
              style={{ clipPath: `inset(0 ${Math.round((1 - fill) * 100)}% 0 0)` }}
            >
              <path d={STAR} fill="currentColor" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
            </svg>
          </span>
        );
      })}
    </span>
  );
}
