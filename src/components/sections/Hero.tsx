import { useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

function scramble(el: HTMLElement, finalText: string, duration = 1600) {
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

  // Text scramble on "Khitab" — initialize to random chars immediately,
  // then resolve to final text when curtain lifts (800ms)
  useEffect(() => {
    const el = document.getElementById('scramble-target') as HTMLElement | null;
    if (!el) return;

    if (prefersReduced) {
      el.textContent = 'Khitab';
      return;
    }

    // Set random chars immediately so "Khitab" is never seen before scramble resolves it
    el.textContent = Array.from({ length: 6 }, () =>
      CHARS[Math.floor(Math.random() * CHARS.length)]
    ).join('');

    // Fire scramble after curtain fully clears the bottom of the viewport (~2100ms)
    // Clip-path also starts at 1.9s, so both reveal simultaneously
    const t = setTimeout(() => scramble(el, 'Khitab', 1600), 2000);
    return () => clearTimeout(t);
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
      {/* Eyebrow */}
      <p className="hero-eyebrow">Software Engineer · Los Angeles</p>

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
          <a href="#exp-section" className="btn-magnetic btn-filled">
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
