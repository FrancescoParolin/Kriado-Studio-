import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { buttonClass } from '@/components/Button';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <section
      data-tone="light"
      className="bg-blanco pt-[calc(var(--header-h)+48px)] pb-24 text-negro lg:pt-[calc(var(--header-h)+80px)] lg:pb-32"
    >
      <div className="wrap">
        <h1 className="display-xl max-w-[16ch]">{t('title')}</h1>
        <p className="lead mt-6 max-w-[46ch]">{t('text')}</p>
        <Link href="/" className={buttonClass('light', 'primary', 'mt-10')}>
          {t('home')}
        </Link>
      </div>
    </section>
  );
}
