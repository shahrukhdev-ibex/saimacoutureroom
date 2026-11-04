'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Cross-fading slider state. Shared by the hero and the testimonials, which
 * behave identically and only differ in what they render.
 *
 * Autoplay pauses on hover, on focus inside, and when the tab is hidden, and
 * never starts at all if the visitor prefers reduced motion.
 */
export function useFadeSlider(count: number, delayMs = 0) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const paused = useRef(false);
  const startX = useRef<number | null>(null);

  const go = useCallback(
    (n: number) => setIndex(((n % count) + count) % count),
    [count],
  );

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  const play = useCallback(() => {
    if (!delayMs || paused.current || timer.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), delayMs);
  }, [count, delayMs]);

  useEffect(() => {
    play();
    const onVis = () => (document.hidden ? stop() : play());
    document.addEventListener('visibilitychange', onVis);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [play, stop]);

  /** Restart the clock after a manual interaction, so the slide doesn't jump. */
  const rest = useCallback(() => {
    stop();
    play();
  }, [play, stop]);

  const pause = useCallback(() => {
    paused.current = true;
    stop();
  }, [stop]);

  const resume = useCallback(() => {
    paused.current = false;
    play();
  }, [play]);

  /** Spread onto the track element for hover-pause and swipe. */
  const trackProps = {
    onMouseEnter: pause,
    onMouseLeave: resume,
    onFocus: pause,
    onPointerDown: (e: React.PointerEvent) => {
      startX.current = e.clientX;
    },
    onPointerUp: (e: React.PointerEvent) => {
      if (startX.current === null) return;
      const dx = e.clientX - startX.current;
      startX.current = null;
      if (Math.abs(dx) > 44) {
        go(index + (dx < 0 ? 1 : -1));
        rest();
      }
    },
  };

  const step = useCallback(
    (dir: number) => {
      go(index + dir);
      rest();
    },
    [go, index, rest],
  );

  const select = useCallback(
    (n: number) => {
      go(n);
      rest();
    },
    [go, rest],
  );

  return { index, step, select, trackProps };
}
