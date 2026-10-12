// Quattro glifi in tutto il sito: WhatsApp, menu, chiudi, link esterno. Disegnati qui, nessuna libreria di icone.

type GlyphProps = { className?: string };

export function WhatsAppGlyph({ className = 'size-6' }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        d="M12 2.75a9.25 9.25 0 0 0-8.02 13.86L2.75 21.25l4.75-1.2A9.25 9.25 0 1 0 12 2.75Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M9.03 7.6c.27-.27.72-.24.95.07l1 1.43c.2.28.17.66-.07.9l-.62.62a6.2 6.2 0 0 0 3.09 3.09l.62-.62a.7.7 0 0 1 .9-.07l1.43 1c.31.23.34.68.07.95l-.63.63c-.58.58-1.45.79-2.23.5a8.3 8.3 0 0 1-5.04-5.04c-.29-.78-.08-1.65.5-2.23l.03-.23Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MenuGlyph({ className = 'size-6' }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M3 8.5h18M3 15.5h18" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function CloseGlyph({ className = 'size-6' }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

/** Freccia ↗ per i link che aprono un altro sito (es. "Reservar" verso Yeasy). */
export function ExternalGlyph({ className = 'size-3' }: GlyphProps) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true" focusable="false">
      <path d="M3.5 2.5h6v6M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
