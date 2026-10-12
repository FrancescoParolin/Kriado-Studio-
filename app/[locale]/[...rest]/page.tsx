import { notFound } from 'next/navigation';

// Qualsiasi percorso sconosciuto dentro una lingua mostra la 404 localizzata.
export default function CatchAll() {
  notFound();
}
