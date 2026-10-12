'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { CloseGlyph } from '@/components/Glyphs';
import type { GalleryCategory } from '@/content/gallery';

export type GalleryViewItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
  category: GalleryCategory;
  /** Punto di fuoco nel taglio 4:5 (object-position). */
  focus?: string;
};

type Filter = 'all' | GalleryCategory;

/**
 * Griglia 4:5 (il formato di Instagram) con apertura a schermo intero.
 * `placeholders`: nomi file suggeriti per le foto che mancano; si vedono solo nelle revisioni interne.
 */
export function GalleryGrid({
  items,
  categories,
  instagramUrl,
  placeholders = [],
  className = 'mt-6 lg:mt-8',
  eager = 0,
}: {
  items: GalleryViewItem[];
  categories: GalleryCategory[];
  instagramUrl: string;
  placeholders?: string[];
  className?: string;
  /** Quante foto caricare subito (pagina Galleria: la prima fila è nel primo schermo). Le altre sono differite. */
  eager?: number;
}) {
  const t = useTranslations('gallery');
  const tc = useTranslations('cta');
  const [filter, setFilter] = useState<Filter>('all');
  const [current, setCurrent] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);

  const shown = filter === 'all' ? items : items.filter((i) => i.category === filter);
  const filters: Filter[] = ['all', ...categories];

  // Lightbox: <dialog> modale, Esc e focus nativi; frecce per scorrere.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current !== null && !dialog.open) dialog.showModal();
    if (current === null && dialog.open) dialog.close();
  }, [current]);

  const go = (step: number) => setCurrent((c) => (c === null ? c : (c + step + shown.length) % shown.length));

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
  };

  const item = current !== null ? shown[current] : undefined;

  return (
    <>
      {/* Filtri solo se c'è davvero più di una categoria da scegliere. */}
      {categories.length > 1 ? (
        <div role="group" aria-label={t('filterLabel')} className="mt-8 flex flex-wrap gap-x-4 lg:mt-10 lg:gap-x-6">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`ui h-12 underline-offset-4 ${filter === f ? 'link' : 'hover:underline'}`}
            >
              {t(`filters.${f}`)}
            </button>
          ))}
        </div>
      ) : null}

      {shown.length === 0 ? (
        <p className="mt-8 max-w-[52ch]">
          {t('empty')}{' '}
          <a href={instagramUrl} target="_blank" rel="noopener" className="link">
            Instagram
            <span className="sr-only"> {tc('newTab')}</span>
          </a>
        </p>
      ) : (
        <ul
          key={filter}
          className={`anim-fade-in grid grid-cols-2 gap-[var(--gutter)] md:grid-cols-3 lg:grid-cols-4 ${className}`}
        >
          {shown.map((img, i) => (
            <li key={img.src} data-reveal="up" style={{ '--d': i % 4 } as CSSProperties}>
              <button
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={t('open', { alt: img.alt })}
                className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-negro"
              >
                <Image
                  src={img.src}
                  fill
                  alt=""
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  quality={70}
                  loading={i < eager ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 && eager > 0 ? 'high' : undefined}
                  style={{ objectPosition: img.focus ?? '50% 50%' }}
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] group-active:scale-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </button>
            </li>
          ))}
          {filter === 'all'
            ? placeholders.map((file) => (
                <li key={file} data-pending>
                  <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 border border-dashed border-gris p-4 text-center">
                    <span className="text-gris">{t('placeholder')}</span>
                    <span className="ui tabular break-all">{file}</span>
                  </div>
                </li>
              ))
            : null}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        aria-label={t('dialog')}
        onClose={() => setCurrent(null)}
        onKeyDown={onKeyDown}
        data-tone="dark"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-negro p-0 text-hueso backdrop:bg-negro"
      >
        {item && current !== null ? (
          <div className="flex h-full flex-col">
            <div className="wrap flex h-[var(--header-h)] shrink-0 items-center justify-between">
              <p className="ui tabular" aria-live="polite">
                {t('counter', { current: current + 1, total: shown.length })}
              </p>
              <button
                type="button"
                autoFocus
                onClick={() => setCurrent(null)}
                className="ui -mr-2 flex h-12 items-center gap-2 px-2"
              >
                <CloseGlyph />
                {t('close')}
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-[var(--pad)]"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              <figure key={item.src} className="anim-fade-in flex h-full w-full flex-col items-center justify-center">
                <Image
                  src={item.src}
                  width={item.width}
                  height={item.height}
                  alt={item.alt}
                  sizes="100vw"
                  quality={80}
                  loading="eager"
                  className="h-auto max-h-[calc(100svh-var(--header-h)-120px)] w-auto max-w-full object-contain"
                  draggable={false}
                />
                <figcaption className="mt-4 text-center">{item.alt}</figcaption>
              </figure>
            </div>

            <div className="wrap flex h-16 shrink-0 items-center justify-between">
              <button type="button" onClick={() => go(-1)} className="ui h-12 underline-offset-4 hover:underline">
                {t('prev')}
              </button>
              <button type="button" onClick={() => go(1)} className="ui h-12 underline-offset-4 hover:underline">
                {t('next')}
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
