import type { Img, L10n, PendingNote } from './types';

export type ProductCategory = 'pelo' | 'barba' | 'styling' | 'otros';

export type Product = {
  name: string;
  brand: string;
  description: L10n;
  category: ProductCategory;
  /** Prezzo in euro, solo se Carlos lo vuole mostrare. */
  price?: number;
  image: Img;
  pending?: PendingNote;
};

const pendingDescription: L10n = {
  es: '[DA_CLIENTE: descripción en una línea]',
  en: '[DA_CLIENTE: one-line description]',
  de: '[DA_CLIENTE: Beschreibung in einer Zeile]',
};

// [DA_CLIENTE] Elenco completo dei prodotti in vendita: nome, marca, una riga, prezzo se lo vuole.
// Foto: quadrate, sul bancone o su foglio bianco, stessa luce (BRIEF.md, Appendice A).
export const products: Product[] = Array.from({ length: 8 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    name: `Producto ${i + 1}`,
    brand: '[Marca]',
    description: pendingDescription,
    category: 'otros',
    image: {
      src: `/images/productos/producto-${n}.jpg`,
      width: 1000,
      height: 1000,
      alt: {
        es: 'Foto pendiente del producto',
        en: 'Product photo to come',
        de: 'Produktfoto folgt',
      },
    },
    pending: '[DA_CLIENTE: prodotto]',
  } satisfies Product;
});

/** Il filtro per categoria compare solo oltre questa soglia. */
export const PRODUCT_FILTER_THRESHOLD = 12;
