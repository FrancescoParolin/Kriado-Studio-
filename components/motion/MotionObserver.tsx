'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

const INTRO_MS = 1750;

/**
 * Fa entrare testi e foto con `data-reveal` quando arrivano nello schermo (una volta sola).
 * Al primo render nel browser mette `data-motion` su <html>: da lì il CSS li nasconde finché non entrano.
 * Quello che è già nello schermo resta visibile così com'è, tranne sotto l'apertura, dove entra quando il nome si sfuoca.
 */
export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const introOn = root.dataset.intro === 'on';
    const pending = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));

    if (!root.dataset.motion) {
      if (!introOn) {
        const h = window.innerHeight;
        pending.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < h && r.bottom > 0) el.classList.add('is-in');
        });
      }
      root.dataset.motion = 'on';
      if (introOn) window.setTimeout(() => (root.dataset.intro = 'done'), INTRO_MS);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    // Due frame: lo stato nascosto deve essere disegnato prima, altrimenti la transizione non parte.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
