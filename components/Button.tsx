import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

type Tone = 'light' | 'dark';
type Variant = 'primary' | 'secondary';

const base =
  'inline-flex items-center justify-center gap-2 rounded-[2px] px-6 ui decoration-1 underline-offset-4 hover:underline active:translate-y-px';
const oneLine = 'h-12 whitespace-nowrap';
/** Su telefono a tutta larghezza e su più righe se serve (testi lunghi in DE a 320px). */
const wrapping = 'min-h-12 w-full py-2 text-center sm:w-auto sm:whitespace-nowrap';

const styles: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: 'bg-negro text-blanco',
    secondary: 'border border-negro text-negro',
  },
  dark: {
    primary: 'bg-blanco text-negro',
    secondary: 'border border-hueso text-hueso',
  },
};

export function buttonClass(tone: Tone, variant: Variant = 'primary', extra = '', wrap = false) {
  return `${base} ${wrap ? wrapping : oneLine} ${styles[tone][variant]} ${extra}`.trim();
}

type Props = {
  href: string;
  tone: Tone;
  variant?: Variant;
  /** Apre in una nuova scheda e lo dice agli screen reader. */
  newTab?: boolean;
  /** Testo lungo (es. in tedesco): su telefono a tutta larghezza e su più righe se serve. */
  wrap?: boolean;
  className?: string;
  children: ReactNode;
};

/** Bottone che porta fuori dal sito (Yeasy, WhatsApp, telefono, mappe). */
export function ButtonLink({ href, tone, variant = 'primary', newTab, wrap = false, className, children }: Props) {
  const t = useTranslations('cta');
  return (
    <a
      href={href}
      className={buttonClass(tone, variant, className, wrap)}
      {...(newTab ? { target: '_blank', rel: 'noopener' } : {})}
    >
      {children}
      {newTab ? <span className="sr-only"> {t('newTab')}</span> : null}
    </a>
  );
}

type TextLinkProps = {
  href: string;
  newTab?: boolean;
  className?: string;
  children: ReactNode;
};

/** Link secondario sottolineato verso fuori. Per i link interni si usa Link di next-intl con la classe `link`. */
export function ExternalLink({ href, newTab = true, className = '', children }: TextLinkProps) {
  const t = useTranslations('cta');
  return (
    <a
      href={href}
      className={`link ${className}`.trim()}
      {...(newTab ? { target: '_blank', rel: 'noopener' } : {})}
    >
      {children}
      {newTab ? <span className="sr-only"> {t('newTab')}</span> : null}
    </a>
  );
}
