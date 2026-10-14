import Image from 'next/image';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { ButtonLink } from '@/components/Button';
import { Section } from '@/components/Section';
import { products } from '@/content/products';
import type { Locale } from '@/i18n/routing';
import { resolveImage } from '@/lib/images';
import { links } from '@/lib/site';

/** Scaffale: tutti i prodotti, griglia piena, nessun carosello, un solo bottone per la sezione. */
export function Productos() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const format = useFormatter();

  return (
    <Section tone="light" labelledBy="productos-titulo">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-8">
          <h2 id="productos-titulo" className="display-l">
            {t('home.products.title')}
          </h2>
          <p className="mt-4 max-w-[52ch] lg:mt-6">{t('home.products.text')}</p>
        </div>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-x-[var(--gutter)] gap-y-10 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 lg:gap-y-12">
        {products.map((p, i) => (
          <li key={`${p.name}-${i}`}>
            <Image
              src={resolveImage(p.image.src)}
              width={p.image.width}
              height={p.image.height}
              alt={p.image.alt[locale]}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              quality={70}
              className="soft aspect-square w-full object-cover"
            />
            <p className="mt-4">
              <span className="font-semibold">{p.name}</span> <span className="text-gris">{p.brand}</span>
            </p>
            <p className="text-gris">{p.description[locale]}</p>
            {p.price !== undefined ? (
              <p className="tabular mt-2 font-semibold">
                {format.number(p.price, { style: 'currency', currency: 'EUR' })}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="mt-10 lg:mt-12">
        <ButtonLink href={links.whatsapp(t('whatsapp.product'))} tone="light" newTab>
          {t('cta.askWhatsapp')}
        </ButtonLink>
      </div>
    </Section>
  );
}
