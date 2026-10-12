'use client';

import { useSyncExternalStore } from 'react';

// Servizio scelto da un bottone "Reservar" del listino: il modulo di prenotazione lo preseleziona.
let selected: { id: string; at: number } | null = null;
const listeners = new Set<() => void>();

export function chooseService(id: string) {
  selected = { id, at: Date.now() };
  listeners.forEach((l) => l());
  const target = document.getElementById('reservar');
  if (target) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Si porta al centro dello schermo il menu del servizio, così chi tocca vede subito la scelta fatta.
    const field = document.getElementById('reserva-servicio') ?? target;
    field.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    // Il focus va sul menu del servizio, così chi usa la tastiera prosegue da lì.
    window.setTimeout(() => document.getElementById('reserva-servicio')?.focus({ preventScroll: true }), reduce ? 0 : 500);
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useChosenService() {
  return useSyncExternalStore(
    subscribe,
    () => selected,
    () => null,
  );
}
