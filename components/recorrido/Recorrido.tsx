'use client';

import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';

export type RecorridoFrameView = {
  picture: ReactNode;
  /** Foto per la versione a movimento ridotto (caricata solo se serve). */
  stillPicture: ReactNode;
  caption: string;
};

type Props = {
  frames: RecorridoFrameView[];
  /** Testo del primo fotogramma: titolo, indirizzo, bottoni. Sta sul nero, mai sulla foto. */
  intro: ReactNode;
  label: string;
};

// Linea del tempo dello scroll (0 = inizio del recorrido, 1 = fine).
// Il testo sparisce prima che la finestra cominci ad aprirsi, così non finisce mai sopra la foto.
const INTRO_OUT: [number, number] = [0.01, 0.07];
const WINDOW_OPEN: [number, number] = [0.07, 0.3];
const FADES_FROM = 0.22;
const FADES_TO = 0.92;

/** Intervallo [inizio, fine] della dissolvenza dal fotogramma i al successivo. */
function fadeRange(i: number, transitions: number): [number, number] {
  const slot = (FADES_TO - FADES_FROM) / transitions;
  const start = FADES_FROM + slot * i;
  return [start + slot * 0.2, start + slot * 0.8];
}

/** Quando il fotogramma i è in scena: serve per la scala lenta da 1 a 1.04. */
function lifeRange(i: number, transitions: number): [number, number] {
  const from = i === 0 ? 0 : fadeRange(i - 1, transitions)[0];
  const to = i === transitions ? 1 : fadeRange(i, transitions)[1];
  return [from, to];
}

// I valori dello scroll vanno direttamente negli stili, senza re-render di React.
type Apply = (el: HTMLElement, v: number) => void;
const setOpacity: Apply = (el, v) => {
  el.style.opacity = String(v);
};
const setScale: Apply = (el, v) => {
  el.style.transform = `scale(${v})`;
};
const setOpen: Apply = (el, v) => {
  el.style.setProperty('--open', String(v));
};
const setLift: Apply = (el, v) => {
  el.style.transform = `translateY(${v}px)`;
};

function useBind(ref: RefObject<HTMLElement | null>, value: MotionValue<number>, apply: Apply) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    apply(el, value.get());
    return value.on('change', (v) => apply(el, v));
  }, [ref, value, apply]);
}

/** Opacità di un elemento che entra con la dissolvenza precedente ed esce con la successiva. */
function useCrossfade(progress: MotionValue<number>, index: number, total: number, edge: (r: [number, number]) => [number, number]) {
  const transitions = Math.max(total - 1, 1);
  const input: number[] = [];
  const output: number[] = [];
  if (index > 0) {
    input.push(...edge(fadeRange(index - 1, transitions)));
    output.push(0, 1);
  } else {
    input.push(0);
    output.push(1);
  }
  if (index < total - 1) {
    input.push(...edge(fadeRange(index, transitions)));
    output.push(1, 0);
  } else {
    input.push(1);
    output.push(1);
  }
  return useTransform(progress, input, output);
}

const whole = (r: [number, number]) => r;

function Frame({
  index,
  total,
  progress,
  show,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  /** Le foto dopo la prima entrano solo quando la pagina ha finito di caricare: non rubano banda alla facciata. */
  show: boolean;
  children: ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const opacity = useCrossfade(progress, index, total, whole);
  const scale = useTransform(progress, lifeRange(index, Math.max(total - 1, 1)), [1, 1.04]);
  useBind(outer, opacity, setOpacity);
  useBind(inner, scale, setScale);

  return (
    <div
      ref={outer}
      className={index === 0 ? 'rec-frame rec-frame--first' : 'rec-frame'}
      style={{ opacity: index === 0 ? 1 : 0 }}
    >
      <div ref={inner} className="absolute inset-0">
        {show ? children : null}
      </div>
    </div>
  );
}

export function Recorrido({ frames, intro, label }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const introOpacity = useTransform(scrollYProgress, INTRO_OUT, [1, 0]);
  const introY = useTransform(scrollYProgress, INTRO_OUT, [0, -24]);
  const open = useTransform(scrollYProgress, WINDOW_OPEN, [0, 1]);

  useBind(stageRef, open, setOpen);
  useBind(introRef, introOpacity, setOpacity);
  useBind(introRef, introY, setLift);

  // L'altezza del testo decide dove si chiude la finestra su mobile.
  useEffect(() => {
    const stage = stageRef.current;
    const introEl = introRef.current;
    if (!stage || !introEl) return;
    const update = () => stage.style.setProperty('--intro-h', `${introEl.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(introEl);
    return () => ro.disconnect();
  }, []);

  // Fotogrammi 2…n: si montano dopo il load della pagina, o al primo scroll se arriva prima.
  const [restReady, setRestReady] = useState(false);
  useEffect(() => {
    if (restReady) return;
    const ready = () => setRestReady(true);
    const onLoad = () => window.setTimeout(ready, 200);
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });
    window.addEventListener('scroll', ready, { once: true, passive: true });
    return () => {
      window.removeEventListener('load', onLoad);
      window.removeEventListener('scroll', ready);
    };
  }, [restReady]);

  const total = frames.length;

  return (
    <div data-tone="dark" className="bg-negro text-hueso" aria-label={label} role="region">
      <div ref={trackRef} data-header-dark className="rec-track" style={{ height: `${total * 100}vh` }}>
        <div ref={stageRef} className="rec-stage">
          <div className="rec-frames">
            {frames.map((frame, i) => (
              <Frame key={i} index={i} total={total} progress={scrollYProgress} show={i === 0 || restReady}>
                {frame.picture}
              </Frame>
            ))}
          </div>

          <div ref={introRef} className="rec-intro">
            <div className="wrap grid-12 pt-4 pb-6 lg:py-8">
              <div className="col-span-12 lg:col-span-6">{intro}</div>
            </div>
          </div>

        </div>
      </div>

      {/* Movimento ridotto: le altre foto in fila (senza didascalie, come nel recorrido: parla la foto, il nome è nell'alt). */}
      <div className="rec-static">
        {frames.slice(1).map((frame, i) => (
          <figure key={i} className="pb-8">
            <div className="soft relative aspect-[9/16] w-full overflow-hidden landscape:aspect-[3/2]">
              {frame.stillPicture}
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
