import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Pending, Section } from '@/components/Section';
import { brandPhoto, carlosPhoto, salonPhoto } from '@/content/team';
import { Link } from '@/i18n/navigation';
import { hasRealImage, resolveImage } from '@/lib/images';
import { Words } from '@/components/motion/Words';

/**
 * "Esto es Kriado": la marca prima di tutto (richiesta di Carlos tramite Paro, 9 ottobre 2026), Carlos come fondatore.
 * Foto: la sua appena c'è, intanto il lavatesta del salone.
 */
export function Carlos() {
  const t = useTranslations();
  // Foto: Carlos al lavoro se c'è, poi la foto di lavoro del salone, infine il lavatesta.
  const hasCarlos = hasRealImage(carlosPhoto.src);
  const hasWork = hasRealImage(brandPhoto.src);
  const photo = hasCarlos ? carlosPhoto : hasWork ? brandPhoto : salonPhoto;
  const alt = hasCarlos ? t('about.photoAlt') : hasWork ? t('home.carlos.workAlt') : t('home.carlos.photoAlt');
  return (
    <Section tone="light" labelledBy="carlos-titulo">
      <div className="grid-12 gap-y-8 lg:items-center">
        <div className="col-span-12 sm:col-span-8 lg:col-span-5">
          <div data-reveal="img" className="soft relative aspect-[4/5] overflow-hidden bg-hueso">
            <Image
              src={resolveImage(photo.src)}
              fill
              alt={alt}
              sizes="(min-width: 1440px) 520px, (min-width: 1024px) 40vw, (min-width: 640px) 66vw, 100vw"
              quality={70}
              className="object-cover"
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <h2 id="carlos-titulo" data-reveal="words" className="display-l">
            <Words text={t('home.carlos.title')} />
          </h2>
          {/* Testo alleggerito: capolettera, frase in grassetto che spezza, paragrafi ariosi. */}
          <p data-reveal="up" className="prose-airy drop-cap mt-8 lg:mt-10">
            {t('home.carlos.p1')}
          </p>
          <p data-reveal="words" className="quote mt-8">
            <Words text={t('home.carlos.statement')} />
          </p>
          <p data-reveal="up" className="prose-airy mt-6">
            {t('home.carlos.p2')}
          </p>
          <Pending className="mt-4 block">{t('home.carlos.pending')}</Pending>
          <p className="ui mt-6">
            <Link href="/quienes-somos" className="link inline-flex min-h-12 items-center">
              {t('home.carlos.more')}
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
