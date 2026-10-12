'use client';

import { useEffect, useRef } from 'react';

/**
 * Nastro di testo grande che scorre di lato mentre si scorre la pagina (verso sinistra, o destra con `reverse`).
 * Solo transform, calcolato a ogni frame solo quando il nastro è nello schermo. Decorativo: aria-hidden.
 */
export function Ribbon({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const box = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    const tr = track.current;
    if (!el || !tr) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let visible = false;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      const x = (reverse ? -25 + progress * 20 : -progress * 20).toFixed(3);
      tr.style.transform = `translate3d(${x}%, 0, 0)`;
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      onScroll();
    });
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reverse]);

  // Quattro ripetizioni: il nastro resta pieno anche spostato del 25%.
  const row = [...items, ...items, ...items, ...items];
  return (
    <div ref={box} aria-hidden="true" className="overflow-hidden bg-negro py-10 text-hueso lg:py-16">
      <div ref={track} className="flex w-max gap-[0.4em] whitespace-nowrap will-change-transform display-xl">
        {row.map((item, i) => (
          <span key={i} className={i % 2 ? 'ribbon-outline' : 'text-blanco'}>
            {item}
            <span className="text-oro"> ·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
