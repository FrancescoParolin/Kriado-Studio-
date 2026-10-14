import { DATI } from '@/content/dati';

/**
 * Apertura del sito: il nome in nero su bianco, lettera per lettera, poi si sfuoca e lascia il posto alla pagina.
 * Solo markup e CSS (vedi `.intro` in globals.css): parte anche prima che il JavaScript sia caricato.
 * Decorativa: nascosta agli screen reader, che leggono subito la pagina.
 */
export function Intro() {
  let i = 0;
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-inner">
        <span className="logo-mark intro-mark" />
        <p className="intro-name">
          {DATI.nombre.split(' ').map((word, w) => (
            <span key={w} className="inline-block whitespace-nowrap">
              {w > 0 ? ' ' : null}
              {[...word].map((letter) => (
                <span key={i} className="l" style={{ '--i': i++ } as React.CSSProperties}>
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

/**
 * Script in <head>, prima del primo disegno: l'apertura si vede una volta per sessione e mai con il movimento ridotto.
 * data-intro: "on" mentre gira, "off" se va saltata; MotionObserver lo porta a "done" quando è finita.
 * Toglie anche commenti e a capo vuoti dal <head>: Netlify inserisce un commento pubblicitario e React, trovandolo,
 * rifà la pagina (errore #418).
 */
export const introScript = `(function(){var d=document.documentElement;for(var n=document.head.firstChild,x;n;n=x){x=n.nextSibling;if(n.nodeType===8||(n.nodeType===3&&!n.nodeValue.trim()))n.remove()}try{if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('kriado-intro')){d.setAttribute('data-intro','off')}else{sessionStorage.setItem('kriado-intro','1');d.setAttribute('data-intro','on')}}catch(e){d.setAttribute('data-intro','off')}})();`;
