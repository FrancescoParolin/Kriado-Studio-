import { Fragment, type CSSProperties } from 'react';

/** Divide un titolo in parole, ognuna dentro una maschera: con `data-reveal="words"` sul titolo salgono una dopo l'altra. */
export function Words({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="w">
            <span style={{ '--i': i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}
