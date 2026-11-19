'use client';

import Image from 'next/image';
import { heroSlides, bySlug, PRODUCT_W, PRODUCT_H } from '@/lib/products';
import { whatsappHref } from '@/lib/site';
import { useFadeSlider } from '@/lib/useFadeSlider';
import { Chevron } from './icons';
import s from './Hero.module.css';
import sl from './Slider.module.css';

const slides = heroSlides.flatMap((s) => {
  const piece = bySlug(s.slug);
  return piece ? [{ ...s, piece }] : [];
});

/** One dot per piece: the index of the first slide in each run of the same piece. */
const pieceStarts = slides.flatMap((s, i) => (i === 0 || slides[i - 1].slug !== s.slug ? [i] : []));

/** Which piece (dot) a slide belongs to. */
const pieceOf = (slide: number) => {
  let g = 0;
  for (let k = 0; k < pieceStarts.length; k++) if (pieceStarts[k] <= slide) g = k;
  return g;
};

const FACTS = [
  { t: '6–9 weeks', d: 'on a heavily worked piece' },
  { t: 'Cut to measure', d: 'never off a size chart' },
  { t: 'Ships worldwide', d: 'insured and tracked' },
];

export function Hero() {
  const { index, step, select, trackProps } = useFadeSlider(slides.length, 1200);

  return (
    <section className={s.hero} aria-label="Introduction">
      <div className={s.glow} aria-hidden="true" />

      <div className={s.copy}>
        <p className="kicker">The 2026 edit</p>
        <h1>
          Formal&nbsp;&amp; <span className={s.nobr}>semi-formal</span>{' '}
          <span className={s.nobr}>hand-embroidered</span> occasion wear, made one piece at a time.
        </h1>
        <p className={s.sub}>
          Saima&rsquo;s Couture Room is a unique atelier for formal dresses, saris, shararas and
          gowns. Zardozi, dori and cutwork, laid on chiffon and raw silk, cut to your measurements
          and finished entirely by hand.
        </p>

        <div className={s.acts}>
          <a className="btn btn--gold btn--lg" href="#collection">
            See the collection
          </a>
          <a className="btn btn--ghost btn--lg" href={whatsappHref()} target="_blank" rel="noopener">
            Ask about a piece
          </a>
        </div>

        <dl className={s.facts}>
          {FACTS.map((f) => (
            <div key={f.t}>
              <dt>{f.t}</dt>
              <dd>{f.d}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={s.stage}>
        <div className={sl.slider}>
          <div className={sl.track} role="group" aria-label="Featured pieces" aria-live="polite" {...trackProps}>
            {slides.map(({ src, alt, piece: p }, i) => (
              <figure
                key={src}
                className={`${sl.slide} ${i === index ? sl.on : ''}`}
                style={{ backgroundColor: p.tint }}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={PRODUCT_W}
                  height={PRODUCT_H}
                  sizes="(max-width:900px) 88vw, 40vw"
                  priority={i === 0}
                  quality={85}
                />
                <figcaption>
                  <b>{p.name}</b>
                  <span>{p.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            type="button"
            className={`${sl.nav} ${sl.prev}`}
            onClick={() => step(-1)}
            aria-label="Previous piece"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            className={`${sl.nav} ${sl.next}`}
            onClick={() => step(1)}
            aria-label="Next piece"
          >
            <Chevron dir="right" />
          </button>

          <div className={sl.dots} role="tablist" aria-label="Choose a piece">
            {pieceStarts.map((start, g) => (
              <button
                key={slides[start].slug}
                type="button"
                role="tab"
                aria-selected={g === pieceOf(index)}
                aria-label={`Show ${slides[start].piece.name}`}
                onClick={() => select(start)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
