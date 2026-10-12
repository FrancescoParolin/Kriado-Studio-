import type { ReactNode } from 'react';
import type { Location } from '@/content/locations';
import type { Locale } from '@/i18n/routing';
import { Recorrido } from './Recorrido';
import { RecorridoPicture } from './RecorridoPicture';

type Props = {
  location: Location;
  locale: Locale;
  intro: ReactNode;
  label: string;
};

export function RecorridoSection({ location, locale, intro, label }: Props) {
  const frames = location.recorrido.map((frame, i) => ({
    picture: <RecorridoPicture frame={frame} locale={locale} first={i === 0} />,
    stillPicture: <RecorridoPicture frame={frame} locale={locale} />,
    caption: frame.caption[locale],
  }));
  return <Recorrido frames={frames} intro={intro} label={label} />;
}
