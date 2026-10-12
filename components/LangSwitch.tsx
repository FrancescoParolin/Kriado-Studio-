'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import type { ComponentProps } from 'react';

type Href = ComponentProps<typeof Link>['href'];

/** Stessa pagina nelle altre lingue. `codes`: ES EN DE nell'header; `names`: nomi interi nel menu e nel footer. */
export function LangSwitch({ variant, className = '' }: { variant: 'codes' | 'names'; className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations();
  const href = { pathname, params } as unknown as Href;

  return (
    <nav aria-label={t('nav.language')} className={className}>
      <ul className={variant === 'codes' ? 'flex gap-4' : 'flex flex-wrap gap-x-6'}>
        {routing.locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                href={href}
                locale={l}
                lang={l}
                hrefLang={l}
                aria-current={active ? 'true' : undefined}
                aria-label={variant === 'codes' ? t(`languages.${l}`) : undefined}
                className={`ui inline-flex min-h-12 items-center ${active ? 'link' : 'hover:underline underline-offset-4'}`}
              >
                {variant === 'codes' ? l.toUpperCase() : t(`languages.${l}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
