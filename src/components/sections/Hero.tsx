import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

function scramble(el: HTMLElement, finalText: string, duration = 1200) {
  const len = finalText.length;
  let frame = 0;
  const totalFrames = Math.round(duration / 40);
  const interval = setInterval(() => {
    let display = '';
    for (let i = 0; i < len; i++) {
      const progress = frame / totalFrames;
      const revealAt = i / len;
      if (progress > revealAt + 0.1) {
        display += finalText[i];
      } else {
        display += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    el.textContent = display;
    frame++;
    if (frame > totalFrames) {
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, 40);
}

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const decoRef = useRef<HTMLDivElement>(null);

  // Text scramble on "Khitab" — fires after curtain lifts
  useEffect(() => {
    if (prefersReduced) return;
    const el = document.getElementById('scramble-target');
    if (!el) return;
    const t = setTimeout(() => scramble(el, 'Khitab'), 900);
    return () => clearTimeout(t);
  }, [prefersReduced]);

  // Parallax deco "A" on scroll
  useEffect(() => {
    const deco = decoRef.current;
    if (!deco || prefersReduced) return;
    const onScroll = () => {
      deco.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [prefersReduced]);

  return (
    <section
      id="hero"
      style={{
        minHeight: 'calc(100vh - 80px)',
        padding: '0 60px 80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Hero section"
    >
      {/* Parallax decorative "A" */}
      <div
        ref={decoRef}
        className="parallax-deco"
        aria-hidden="true"
        style={{
          right: '-80px',
          bottom: '-80px',
          opacity: 0.06,
          fontSize: '40vw',
          color: 'var(--accent)',
        }}
      >
        A
      </div>

      {/* Eyebrow */}
      <p className="hero-eyebrow">Frontend Engineer · Los Angeles</p>

      {/* Giant name with clip-path reveal */}
      <h1 className="hero-name">
        <span className="line">
          <span id="scramble-target">Khitab</span>
        </span>
        <span className="line">
          <span>Anand</span>
        </span>
      </h1>

      {/* Bottom row: description + CTAs */}
      <div className="hero-bottom">
        <p className="hero-desc">
          Building high-performance, immersive digital products at the intersection
          of engineering precision and design intuition.
        </p>
        <div className="hero-cta">
          <a href="#proj-section" className="btn-magnetic btn-filled">
            <span className="btn-label">View Work</span>
          </a>
          <a href="#contact-wrap" className="btn-magnetic btn-outline">
            <span className="btn-label">Contact</span>
          </a>
        </div>
      </div>

      {/* Scroll bug */}
      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-bug" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
