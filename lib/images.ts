import fs from 'node:fs';
import path from 'node:path';

/**
 * Usa la foto vera se esiste in /public, altrimenti il placeholder con lo stesso nome file
 * in /public/placeholder. Basta copiare le foto vere nella cartella giusta: il codice non cambia.
 */
export function hasRealImage(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), 'public', src));
}

export function resolveImage(src: string): string {
  if (fs.existsSync(path.join(process.cwd(), 'public', src))) return src;
  return `/placeholder/${path.basename(src)}`;
}
