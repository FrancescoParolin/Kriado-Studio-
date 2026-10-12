import { getImageProps } from 'next/image';
import type { CSSProperties } from 'react';
import type { RecorridoFrame } from '@/content/locations';
import type { Locale } from '@/i18n/routing';
import { resolveImage } from '@/lib/images';

const H = { width: 1600, height: 1067 };
const V = { width: 1080, height: 1920 };

type Props = {
  frame: RecorridoFrame;
  locale: Locale;
  /** Solo il primo fotogramma: è l'immagine più grande del primo schermo. */
  first?: boolean;
  className?: string;
};

/**
 * Foto orizzontale su schermi orizzontali, verticale su quelli verticali.
 * Un solo <picture>: il browser scarica solo la versione che usa.
 */
export function RecorridoPicture({ frame, locale, first = false, className = 'rec-img' }: Props) {
  const common = {
    alt: frame.alt[locale],
    sizes: '100vw',
    quality: 70,
    ...(first ? { fetchPriority: 'high' as const, loading: 'eager' as const } : { loading: 'lazy' as const }),
  };

  const {
    props: { srcSet: horizontal },
  } = getImageProps({ ...common, ...H, src: resolveImage(`${frame.file}-h.jpg`) });
  const {
    props: { srcSet: vertical, ...img },
  } = getImageProps({ ...common, ...V, src: resolveImage(`${frame.file}-v.jpg`) });

  const style = {
    '--focus-h': frame.focus?.h ?? '50% 50%',
    '--focus-v': frame.focus?.v ?? '50% 50%',
  } as CSSProperties;

  return (
    <picture>
      <source media="(orientation: landscape)" srcSet={horizontal} sizes="100vw" />
      <img {...img} srcSet={vertical} className={className} style={style} />
    </picture>
  );
}
