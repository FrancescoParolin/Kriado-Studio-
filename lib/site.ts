import { DATI } from '@/content/dati';

const phone = process.env.NEXT_PUBLIC_PHONE || DATI.telefono;
const whatsapp = process.env.NEXT_PUBLIC_PHONE || DATI.whatsapp;
const instagramHandle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || DATI.instagram;

export const site = {
  name: DATI.nombre,
  // [DA_CLIENTE] dominio definitivo
  url: (process.env.NEXT_PUBLIC_SITE_URL || DATI.dominio || 'http://localhost:3000').replace(/\/$/, ''),
  phone,
  instagramHandle,
  yeasyUrl: process.env.NEXT_PUBLIC_YEASY_URL || DATI.reservaOnline,
  googleUrl: process.env.NEXT_PUBLIC_GOOGLE_URL || DATI.google.url,
  /**
   * Indicizzabile solo sul dominio definitivo (DATI.dominio). Le versioni di prova (Vercel, Netlify, locale)
   * dicono a Google di non indicizzarle: dati e testi sono ancora da confermare con Carlos.
   */
  indexable: Boolean(DATI.dominio) || process.env.NEXT_PUBLIC_INDEXABLE === '1',
};

export const links = {
  tel: `tel:${phone}`,
  instagram: `https://instagram.com/${instagramHandle}`,
  yeasy: site.yeasyUrl,
  google: site.googleUrl,
  /** Modulo per lasciare una recensione; finché Carlos non manda il link diretto, la scheda Google. */
  googleReview: DATI.google.resenaUrl ?? site.googleUrl,
  whatsapp(text?: string) {
    const base = `https://wa.me/${whatsapp.replace(/\D/g, '')}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
  },
};
