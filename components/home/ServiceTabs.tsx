'use client';

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

type Tab = { id: string; label: string; count: string };

/**
 * Schede Barbería / Peluquería / Estética del listino: si vede un gruppo alla volta (su telefono la lista si accorcia).
 * Tablist accessibile: frecce sinistra/destra, Home/End, focus sulla scheda attiva.
 * Su telefono la barra è larga quanto la colonna e ogni scheda prende lo spazio del suo nome, senza il numero:
 * con tre schede a 18px ("Hairdressing" in inglese) le pillole affiancate non ci stanno su una riga.
 */
export function ServiceTabs({ label, tabs, panels }: { label: string; tabs: Tab[]; panels: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (i: number) => {
    setActive(i);
    refs.current[i]?.focus();
  };
  const onKeyDown = (e: KeyboardEvent) => {
    const last = tabs.length - 1;
    if (e.key === 'ArrowRight') select(active === last ? 0 : active + 1);
    else if (e.key === 'ArrowLeft') select(active === 0 ? last : active - 1);
    else if (e.key === 'Home') select(0);
    else if (e.key === 'End') select(last);
    else return;
    e.preventDefault();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="mt-8 flex w-full flex-wrap gap-1 rounded-full border border-negro p-1 sm:inline-flex sm:w-auto sm:max-w-full lg:mt-12"
      >
        {tabs.map((tab, i) => {
          const selected = active === i;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`servicios-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`servicios-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`ui inline-flex min-h-12 flex-auto items-baseline justify-center gap-2 rounded-full px-1.5 py-3 transition-opacity duration-200 active:opacity-70 sm:flex-none sm:px-5 ${
                selected ? 'bg-negro text-blanco' : 'text-negro hover:underline hover:underline-offset-4'
              }`}
            >
              {tab.label}
              <span className="hidden font-normal opacity-70 sm:inline">{tab.count}</span>
            </button>
          );
        })}
      </div>
      {panels.map((panel, i) => (
        <div
          key={tabs[i]?.id ?? i}
          role="tabpanel"
          id={`servicios-panel-${tabs[i]?.id}`}
          aria-labelledby={`servicios-tab-${tabs[i]?.id}`}
          hidden={active !== i}
          className="anim-fade-in mt-8 lg:mt-12"
        >
          {panel}
        </div>
      ))}
    </>
  );
}
