import { useTranslations } from 'next-intl';
import type { CSSProperties } from 'react';
import { Words } from '@/components/motion/Words';
import { DATI } from '@/content/dati';

/**
 * Parole finte, lunghe più o meno come nomi di città: sfocate, fanno venire voglia di leggere senza svelare nulla.
 * I nomi veri non entrano mai nella pagina (né nel codice né nel testo per i lettori di schermo).
 */
const DECOYS = ["Varenti d'Ol", 'Mostera de Lunarca', 'Belvúria'];

/** "Próximas aperturas": riquadri neri con "Próximamente" in oro e il nome della città sfocato. */
export function ProximasAperturas() {
  const t = useTranslations('home.openings');
  const count = Math.min(DATI.proximasAperturas, DECOYS.length);
  if (!count) return null;
  return (
    <div className="mt-16 border-t border-hueso pt-10 lg:mt-24 lg:pt-12">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:justify-between">
        <h3 data-reveal="words" className="quote">
          <Words text={t('title')} />
        </h3>
        <p data-reveal="up" className="text-gris">
          {t('text')}
        </p>
      </div>
      <ul className="mt-8 grid gap-[var(--gutter)] sm:grid-cols-3">
        {DECOYS.slice(0, count).map((decoy, i) => (
          <li
            key={decoy}
            data-reveal="up"
            data-tone="dark"
            style={{ '--d': i } as CSSProperties}
            className="soft flex min-h-40 flex-col justify-between gap-6 overflow-hidden bg-negro p-6 text-hueso lg:min-h-56 lg:p-8"
          >
            <span className="ui text-oro">{t('soon')}</span>
            <span className="sr-only">{t('secret')}</span>
            <span
              aria-hidden="true"
              className="wordmark pointer-events-none text-[1.75rem] text-blanco blur-[9px] select-none lg:text-[2.1875rem]"
            >
              {decoy}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
