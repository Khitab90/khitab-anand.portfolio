import { useEffect, useRef, useState } from 'react';

export interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isVisible: boolean;
}

export function useCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: -100,
    y: -100,
    isHovering: false,
    isVisible: false,
  });
  const dotRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const ringRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      dotRef.current = { x: e.clientX, y: e.clientY };
      setCursor((prev) => ({ ...prev, x: e.clientX, y: e.clientY, isVisible: true }));
    };

    const onMouseEnter = () => setCursor((prev) => ({ ...prev, isVisible: true }));
    const onMouseLeave = () => setCursor((prev) => ({ ...prev, isVisible: false }));

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="link"]') ||
        target.closest('[data-cursor="button"]');
      setCursor((prev) => ({ ...prev, isHovering: !!isInteractive }));
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver);

    // Smooth ring animation via RAF
    const animateRing = () => {
      ringRef.current.x += (dotRef.current.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (dotRef.current.y - ringRef.current.y) * 0.12;
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { cursor, ringRef, dotRef };
}
