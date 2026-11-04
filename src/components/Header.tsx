'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { nav, site, whatsappHref } from '@/lib/site';
import { WhatsAppIcon } from './icons';
import s from './Header.module.css';

const KEY = 'scr-announce';

/**
 * Session storage read through useSyncExternalStore rather than an effect:
 * the server snapshot is always `false`, so the markup React renders on the
 * server matches the first client render and there is no hydration mismatch.
 */
const dismissStore = {
  listeners: new Set<() => void>(),
  subscribe(cb: () => void) {
    dismissStore.listeners.add(cb);
    return () => dismissStore.listeners.delete(cb);
  },
  isDismissed() {
    try {
      return sessionStorage.getItem(KEY) === 'off';
    } catch {
      return false; // private mode
    }
  },
  dismiss() {
    try {
      sessionStorage.setItem(KEY, 'off');
    } catch {
      /* ignore */
    }
    dismissStore.listeners.forEach((l) => l());
  },
};

export function AnnounceBar() {
  const dismissed = useSyncExternalStore(
    dismissStore.subscribe,
    dismissStore.isDismissed,
    () => false,
  );

  if (!site.announcement || dismissed) return null;

  return (
    <div className={s.announce}>
      <p>{site.announcement.text}</p>
      <a href={site.announcement.ctaHref}>{site.announcement.ctaLabel}</a>
      <button
        type="button"
        className={s.announceX}
        aria-label="Dismiss announcement"
        onClick={dismissStore.dismiss}
      >
        &times;
      </button>
    </div>
  );
}

export function Header() {
  const [stuck, setStuck] = useState(false);
  const [menu, setMenu] = useState(false);
  const [here, setHere] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Scroll spy. Clears above the first section so nothing stays lit at the top.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) if (en.isIntersecting) setHere(en.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    targets.forEach((t) => io.observe(t));

    const onScroll = () => {
      if (window.scrollY < targets[0].offsetTop - window.innerHeight * 0.5) setHere(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className={`${s.head} ${stuck ? s.stuck : ''}`}>
      <div className={s.inner}>
        <a className={s.brand} href="#top">
          <Image src="/img/mark.webp" alt="" width={885} height={773} priority />
          <span className={s.brandName}>
            Saima&rsquo;s<em>Couture Room</em>
          </span>
        </a>

        <nav
          id="primary-nav"
          className={`${s.nav} ${menu ? s.navOpen : ''}`}
          aria-label="Primary"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('a')) setMenu(false);
          }}
        >
          {nav.map((n) => (
            <a key={n.href} href={n.href} className={here === n.href.slice(1) ? s.isHere : undefined}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className={s.end}>
          <a
            className={`btn btn--gold ${s.cta}`}
            href={whatsappHref()}
            target="_blank"
            rel="noopener"
          >
            <WhatsAppIcon size={15} />
            WhatsApp
          </a>
          <button
            type="button"
            className={s.burger}
            aria-expanded={menu}
            aria-controls="primary-nav"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            data-open={menu || undefined}
            onClick={() => setMenu((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
