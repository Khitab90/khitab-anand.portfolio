import { useEffect, useRef, useState } from 'react';

export interface CursorState {
  isHovering: boolean;
  isVisible: boolean;
}

export function useCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    isHovering: false,
    isVisible: false,
  });
  // Refs for live x/y used in the RAF loop — avoids setState on every mousemove frame
  const dotRef = useRef<{ x: number; y: number }>({ x: -200, y: -200 });
  const ringRef = useRef<{ x: number; y: number }>({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      dotRef.current = { x: e.clientX, y: e.clientY };
      // Flip visible on first move only — avoids a re-render every frame
      setCursor((prev) => (prev.isVisible ? prev : { ...prev, isVisible: true }));
    };

    // Only hide when the mouse genuinely exits the browser viewport
    // (relatedTarget === null means the pointer left the window entirely)
    const onDocumentLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        setCursor((prev) => ({ ...prev, isVisible: false }));
      }
    };

    const onDocumentEnter = () => {
      setCursor((prev) => ({ ...prev, isVisible: true }));
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // canvas/iframe don't have closest(), guard with optional chaining
      const isInteractive =
        target.closest?.('a') ||
        target.closest?.('button') ||
        target.closest?.('[data-cursor="link"]') ||
        target.closest?.('[data-cursor="button"]');
      const next = !!isInteractive;
      setCursor((prev) => (prev.isHovering === next ? prev : { ...prev, isHovering: next }));
    };

    // Smooth ring interpolation runs entirely in RAF — no React state
    const animateRing = () => {
      ringRef.current.x += (dotRef.current.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (dotRef.current.y - ringRef.current.y) * 0.12;
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onDocumentLeave);
    document.addEventListener('mouseenter', onDocumentEnter);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onDocumentLeave);
      document.removeEventListener('mouseenter', onDocumentEnter);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { cursor, ringRef, dotRef };
}
