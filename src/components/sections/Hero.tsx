import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
const FINAL = 'Khitab';

export default function Hero() {
  const prefersReduced = useReducedMotion();

  // Drive the scramble entirely through React state so React never
  // clobbers the text content during reconciliation.
  const [nameText, setNameText] = useState('');   // '' = invisible (opacity 0)
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setNameText(FINAL);
      setVisible(true);
      return;
    }

    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      setVisible(true); // snap name into view showing random chars immediately

      let frame = 0;
      const totalFrames = Math.round(1600 / 40); // 40 frames @ 40ms

      intervalId = setInterval(() => {
        let display = '';
        for (let i = 0; i < FINAL.length; i++) {
          const progress  = frame / totalFrames;
          const revealAt  = i / FINAL.length;
          display += progress > revealAt + 0.1
            ? FINAL[i]
            : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setNameText(display);
        frame++;
        if (frame > totalFrames) {
          setNameText(FINAL);
          clearInterval(intervalId);
        }
      }, 40);
    }, 2000); // after curtain fully clears (~2100ms)

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
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

      {/* Giant name */}
      <h1 className="hero-name">
        {/* Khitab — scramble is the reveal, no clip-path wipe */}
        <span className="line">
          <span style={{ opacity: visible ? 1 : 0 }}>
            {nameText || FINAL}
          </span>
        </span>
        {/* Anand — clip-path wipe */}
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
