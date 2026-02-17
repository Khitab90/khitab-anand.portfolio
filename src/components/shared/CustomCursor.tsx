import { useEffect, useRef } from 'react';
import { useCursor } from '../../hooks/useCursor';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const { cursor, ringRef, dotRef } = useCursor();
  const ringElRef = useRef<HTMLDivElement>(null);
  const dotElRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReduced) return;

    const animate = () => {
      if (ringElRef.current) {
        ringElRef.current.style.transform = `translate(${ringRef.current.x - 20}px, ${ringRef.current.y - 20}px)`;
      }
      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate(${dotRef.current.x - 4}px, ${dotRef.current.y - 4}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReduced, ringRef, dotRef]);

  if (prefersReduced) return null;

  return (
    <>
      {/* Ring */}
      <div
        ref={ringElRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10 rounded-full border-2 will-change-transform transition-[width,height,border-color,opacity] duration-200"
        style={{
          borderColor: cursor.isHovering ? '#a855f7' : 'rgba(167,139,250,0.6)',
          opacity: cursor.isVisible ? 1 : 0,
          width: cursor.isHovering ? '48px' : '40px',
          height: cursor.isHovering ? '48px' : '40px',
          boxShadow: cursor.isHovering ? '0 0 12px rgba(168,85,247,0.5)' : 'none',
        }}
      />
      {/* Dot */}
      <div
        ref={dotElRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full will-change-transform transition-[opacity,background-color] duration-150"
        style={{
          background: cursor.isHovering ? '#a855f7' : 'rgba(167,139,250,0.9)',
          opacity: cursor.isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
