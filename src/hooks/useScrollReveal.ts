import { useEffect, type RefObject } from 'react';

/**
 * Observes all [data-wipe] and [data-fade] descendants of containerRef.
 * Adds class "in" when each element enters the viewport, then unobserves it.
 */
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-wipe],[data-fade]'));
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [containerRef]);
}
