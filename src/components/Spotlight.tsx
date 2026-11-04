'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { bySlug, productImage, spotlightSlug, PRODUCT_W, PRODUCT_H } from '@/lib/products';
import { whatsappHref } from '@/lib/site';
import s from './Spotlight.module.css';

const piece = bySlug(spotlightSlug)!;

export function Spotlight() {
  const el = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(50);
  const dragging = useRef(false);
  const nudged = useRef(false);

  const fromEvent = (clientX: number) => {
    const r = el.current?.getBoundingClientRect();
    if (!r) return;
    setX(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  // One discoverability nudge the first time it scrolls into view.
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || nudged.current) return;
        nudged.current = true;
        io.disconnect();
        let t0: number | null = null;
        const tick = (t: number) => {
          if (t0 === null) t0 = t;
          const p = Math.min(1, (t - t0) / 1500);
          const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
          setX(50 + Math.sin(e * Math.PI * 2) * 26);
          if (p < 1) requestAnimationFrame(tick);
          else setX(50);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.55 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const d = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowLeft') setX((v) => Math.max(0, v - d));
    else if (e.key === 'ArrowRight') setX((v) => Math.min(100, v + d));
    else if (e.key === 'Home') setX(0);
    else if (e.key === 'End') setX(100);
    else return;
    e.preventDefault();
  };

  const valueText =
    x < 8
      ? 'Showing the back'
      : x > 92
        ? 'Showing the front'
        : `${Math.round(x)}% front, ${Math.round(100 - x)}% back`;

  return (
    <section className={s.spot} id="spotlight">
      <div className={s.copy}>
        <h2 className="h-display">
          The back is not
          <br />
          the afterthought.
        </h2>
        <p>
          On most of these pieces the heaviest work sits where you will never see it in a mirror
          &mdash; the shoulder line, the lattice panel, the fall of the pallu. Drag the handle and
          turn <em>{piece.name}</em> around.
        </p>
        <a
          className="btn btn--gold"
          href={whatsappHref(`I'd like to ask about ${piece.name}`)}
          target="_blank"
          rel="noopener"
        >
          Ask about this piece
        </a>
      </div>

      <div
        className={s.reveal}
        ref={el}
        tabIndex={0}
        role="slider"
        aria-label={`Reveal the front or back of ${piece.name}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(x)}
        aria-valuetext={valueText}
        style={{ ['--x' as string]: `${x}%` }}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          fromEvent(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && fromEvent(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Image
          className={s.base}
          src={productImage(piece.slug, 'back')}
          alt={piece.alt.back}
          width={PRODUCT_W}
          height={PRODUCT_H}
          sizes="(max-width:900px) 92vw, 46vw"
          quality={85}
        />
        <div className={s.top}>
          <Image
            src={productImage(piece.slug, 'front')}
            alt={piece.alt.front}
            width={PRODUCT_W}
            height={PRODUCT_H}
            sizes="(max-width:900px) 92vw, 46vw"
            quality={85}
          />
        </div>
        <span className={s.bar} aria-hidden="true">
          <i />
        </span>
        <span className={`${s.tag} ${s.tagL}`} aria-hidden="true">
          Front
        </span>
        <span className={`${s.tag} ${s.tagR}`} aria-hidden="true">
          Back
        </span>
      </div>
    </section>
  );
}
