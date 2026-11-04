'use client';

import { testimonials } from '@/lib/content';
import { useFadeSlider } from '@/lib/useFadeSlider';
import sl from './Slider.module.css';
import s from './Testimonials.module.css';

export function Testimonials() {
  const { index, select, trackProps } = useFadeSlider(testimonials.length, 7000);

  // Deleting every entry in lib/content removes the section entirely.
  if (!testimonials.length) return null;

  return (
    <section className={s.says} aria-labelledby="says-h">
      <h2 className="sec-h sec-h--c" id="says-h">
        In their words
      </h2>

      <div className={`${sl.slider} ${sl.quiet}`}>
        <div className={sl.track} aria-live="polite" {...trackProps}>
          {testimonials.map((t, i) => (
            <blockquote key={t.quote} className={`${sl.say} ${i === index ? sl.sayOn : ''}`}>
              <p>{t.quote}</p>
              <cite>{t.by}</cite>
            </blockquote>
          ))}
        </div>

        <div className={sl.dots} role="tablist" aria-label="Choose a quote">
          {testimonials.map((t, i) => (
            <button
              key={t.quote}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show quote ${i + 1}`}
              onClick={() => select(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
