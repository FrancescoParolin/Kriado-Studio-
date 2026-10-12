/**
 * Marchio di Kriado Studio (triangolo con "KB", file da Carlos del 10 ottobre 2026).
 * È una maschera: prende il colore del testo intorno (oro sul nero, nero sul bianco). Decorativo: il nome è sempre scritto accanto.
 */
export function LogoMark({ className = 'h-7 w-9' }: { className?: string }) {
  return <span aria-hidden="true" className={`logo-mark inline-block shrink-0 ${className}`} />;
}
