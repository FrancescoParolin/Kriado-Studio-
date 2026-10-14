import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ExternalLink } from '@/components/Button';
import type { Location } from '@/content/locations';
import { resolveImage } from '@/lib/images';
import { links } from '@/lib/site';

/**
 * Mappa statica (OpenStreetMap, in grigio, salvata nel sito): nessun cookie e nessuna richiesta a terzi.
 * Il segnaposto è un triangolo rovesciato come il logo, con la punta esattamente sul centro dell'immagine.
 */
export function SedeMapa({ location }: { location: Location }) {
  const t = useTranslations();
  if (!location.map) return null;
  return (
    <figure>
      <a
        href={links.google}
        target="_blank"
        rel="noopener"
        aria-label={`${t('location.mapLabel')} ${t('cta.newTab')}`}
        data-reveal="img"
        className="soft relative block aspect-[3/2] overflow-hidden bg-hueso lg:aspect-[4/3]"
      >
        <Image
          src={resolveImage(location.map.src)}
          alt=""
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          quality={80}
          className="object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-full items-end"
        >
          <svg viewBox="0 0 28 24" className="h-6 w-7 drop-shadow-[0_1px_0_#fff]">
            <path d="M1.5 1.5h25L14 22.5z" fill="#000" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </span>
        <span
          aria-hidden="true"
          className="ui absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+32px)] rounded-full bg-negro px-4 py-2 whitespace-nowrap text-blanco sm:ml-6 sm:translate-x-0 sm:-translate-y-[calc(100%+8px)]"
        >
          Kriado Studio
        </span>
      </a>
      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-x-6">
        <span className="ui">
          <ExternalLink href={links.google} className="inline-flex min-h-12 items-center">
            {t('cta.openMaps')}
          </ExternalLink>
        </span>
        <span className="text-gris">
          {t('location.mapCredit')} ©{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener"
            className="link inline-flex min-h-12 items-center"
          >
            OpenStreetMap
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
