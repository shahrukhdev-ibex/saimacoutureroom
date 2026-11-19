'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { lookbook, bySlug, productImage, PRODUCT_W, PRODUCT_H } from '@/lib/products';
import { Chevron } from './icons';
import s from './Lookbook.module.css';

const shots = lookbook.map(({ slug, view }) => {
  const p = bySlug(slug)!;
  return { src: productImage(slug, view), alt: p.alt[view] ?? p.name, name: p.name };
});

export function Lookbook() {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const startX = useRef<number | null>(null);

  const show = useCallback((n: number) => setOpen(((n % shots.length) + shots.length) % shots.length), []);

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(open - 1);
      else if (e.key === 'ArrowRight') show(open + 1);
      else if (e.key === 'Tab') {
        // keep focus inside the dialog
        const f = dialog.current?.querySelectorAll<HTMLElement>('button');
        if (!f?.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close, show]);

  const current = open === null ? null : shots[open];

  return (
    <section className={s.look} id="lookbook">
      <div className="sec-head">
        <div>
          <h2 className="sec-h">Lookbook</h2>
          <p className="sec-sub">
            The 2026 edit, photographed in the garden and the courtyard. Select any image to open it
            larger.
          </p>
        </div>
      </div>

      <div className={s.grid}>
        {shots.map((sh, i) => (
          <button
            key={sh.src}
            type="button"
            className={s.item}
            onClick={(e) => {
              lastFocus.current = e.currentTarget;
              show(i);
            }}
          >
            <Image
              src={sh.src}
              alt={sh.alt}
              width={PRODUCT_W}
              height={PRODUCT_H}
              sizes="(max-width:560px) 92vw, (max-width:820px) 46vw, 23vw"
            />
          </button>
        ))}
      </div>

      {current && (
        <div
          className={s.lb}
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={`Lookbook — ${current.name}`}
          onClick={(e) => e.target === e.currentTarget && close()}
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            startX.current = null;
            if (Math.abs(dx) > 50) show(open! + (dx < 0 ? 1 : -1));
          }}
        >
          <button type="button" className={s.x} aria-label="Close" onClick={close} autoFocus>
            &times;
          </button>
          <button
            type="button"
            className={`${s.nav} ${s.navP}`}
            aria-label="Previous image"
            onClick={() => show(open! - 1)}
          >
            <Chevron dir="left" size={26} />
          </button>
          <Image
            className={s.img}
            src={current.src}
            alt={current.alt}
            width={PRODUCT_W}
            height={PRODUCT_H}
            sizes="90vw"
            quality={85}
            priority
          />
          <button
            type="button"
            className={`${s.nav} ${s.navN}`}
            aria-label="Next image"
            onClick={() => show(open! + 1)}
          >
            <Chevron dir="right" size={26} />
          </button>
          <p className={s.cap}>{current.alt}</p>
        </div>
      )}
    </section>
  );
}
