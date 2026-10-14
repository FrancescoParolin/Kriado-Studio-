'use client';

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

type Tab = { id: string; label: string; count: string };

/**
 * Schede Barbería / Peluquería del listino: si vede un gruppo alla volta (su telefono la lista si dimezza).
 * Tablist accessibile: frecce sinistra/destra, Home/End, focus sulla scheda attiva.
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
        className="mt-8 inline-flex max-w-full flex-wrap gap-1 rounded-full border border-negro p-1 lg:mt-12"
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
              className={`ui inline-flex min-h-12 items-baseline gap-2 rounded-full px-5 py-3 transition-opacity duration-200 active:opacity-70 ${
                selected ? 'bg-negro text-blanco' : 'text-negro hover:underline hover:underline-offset-4'
              }`}
            >
              {tab.label}
              <span className="font-normal opacity-70">{tab.count}</span>
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
