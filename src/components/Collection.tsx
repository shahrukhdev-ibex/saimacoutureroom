'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { products, productImage, PRODUCT_W, PRODUCT_H, type Product } from '@/lib/products';
import { whatsappHref } from '@/lib/site';
import { Chevron } from './icons';
import s from './Collection.module.css';

function Card({ p }: { p: Product }) {
  const [back, setBack] = useState(false);

  return (
    <li className={`${s.card} ${back ? s.isBack : ''}`} style={{ ['--tint' as string]: p.tint }}>
      <div className={s.ph}>
        <Image
          className={s.front}
          src={productImage(p.slug, 'front')}
          alt={p.alt.front}
          width={PRODUCT_W}
          height={PRODUCT_H}
          sizes="(max-width:700px) 78vw, 320px"
        />
        {p.alt.back && (
          <>
            <Image
              className={s.back}
              src={productImage(p.slug, 'back')}
              alt={p.alt.back}
              width={PRODUCT_W}
              height={PRODUCT_H}
              sizes="(max-width:700px) 78vw, 320px"
            />
            <button
              type="button"
              className={s.turn}
              aria-pressed={back}
              onClick={() => setBack((v) => !v)}
            >
              {back ? 'See the front' : 'Turn around'}
            </button>
          </>
        )}
      </div>

      <div className={s.txt}>
        <h3>{p.name}</h3>
        <p>{p.blurb}</p>
        <a
          className="link-u"
          href={whatsappHref(`I'd like to ask about ${p.name}`)}
          target="_blank"
          rel="noopener"
        >
          Enquire
        </a>
      </div>
    </li>
  );
}

export function Collection() {
  const rail = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [sync]);

  const scroll = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 18 : 320;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * step * 2, behavior: smooth ? 'smooth' : 'auto' });
  };

  // Drag-to-scroll with a mouse. Touch already works natively.
  const drag = useRef({ down: false, x: 0, left: 0, moved: 0 });

  return (
    <section className={s.coll} id="collection">
      <div className={`sec-head ${s.head}`}>
        <div>
          <h2 className="sec-h">The collection</h2>
          <p className="sec-sub">
            Seventeen pieces in the current edit. Every one can be re-made in another colour, length or
            weight of work.
          </p>
        </div>
        <div className={s.ctl}>
          <button
            type="button"
            className={s.railBtn}
            onClick={() => scroll(-1)}
            disabled={atStart}
            aria-label="Scroll collection left"
          >
            <Chevron dir="left" size={18} />
          </button>
          <button
            type="button"
            className={s.railBtn}
            onClick={() => scroll(1)}
            disabled={atEnd}
            aria-label="Scroll collection right"
          >
            <Chevron dir="right" size={18} />
          </button>
        </div>
      </div>

      <ul
        className={s.rail}
        ref={rail}
        onScroll={sync}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse' || !rail.current) return;
          drag.current = { down: true, x: e.clientX, left: rail.current.scrollLeft, moved: 0 };
          rail.current.style.cursor = 'grabbing';
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d.down || !rail.current) return;
          const dx = e.clientX - d.x;
          d.moved = Math.max(d.moved, Math.abs(dx));
          rail.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => {
          drag.current.down = false;
          if (rail.current) rail.current.style.cursor = '';
        }}
        onPointerLeave={() => {
          drag.current.down = false;
          if (rail.current) rail.current.style.cursor = '';
        }}
        // swallow the click that ends a drag so it doesn't open a link
        onClickCapture={(e) => {
          if (drag.current.moved > 6) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = 0;
          }
        }}
      >
        {products.map((p) => (
          <Card key={p.slug} p={p} />
        ))}
      </ul>

      <p className={s.hint}>Swipe or drag through the edit. Turn any piece around to see the back.</p>
    </section>
  );
}
