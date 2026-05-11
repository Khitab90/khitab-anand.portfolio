import { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import { useLenis } from './hooks/useLenis';

// Lazy-load below-the-fold sections
const About          = lazy(() => import('./components/sections/About'));
const Experience     = lazy(() => import('./components/sections/Experience'));
const Certifications = lazy(() => import('./components/sections/Certifications'));
const Projects       = lazy(() => import('./components/sections/Projects'));
const Contact        = lazy(() => import('./components/sections/Contact'));

function SectionFallback() {
  return <div className="min-h-screen" aria-hidden="true" />;
}

export default function App() {
  useLenis();

  // ── Curtain lift ───────────────────────────────────────────
  useEffect(() => {
    const curtain = document.getElementById('curtain');
    if (!curtain) return;
    const t = setTimeout(() => curtain.classList.add('lifted'), 800);
    return () => clearTimeout(t);
  }, []);

  // ── Custom cursor (dot snaps, ring lags) ───────────────────
  useEffect(() => {
    const cDot  = document.getElementById('c-dot');
    const cRing = document.getElementById('c-ring');
    if (!cDot || !cRing) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cDot.style.left = mx + 'px';
      cDot.style.top  = my + 'px';
    };

    const tickRing = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      cRing.style.left = rx + 'px';
      cRing.style.top  = ry + 'px';
      rafId = requestAnimationFrame(tickRing);
    };

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tickRing);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Cursor colour switch on dark Contact section ───────────
  useEffect(() => {
    const cDot  = document.getElementById('c-dot');
    const cRing = document.getElementById('c-ring');
    const dark  = document.getElementById('contact-wrap');
    if (!cDot || !cRing || !dark) return;

    const onEnter = () => { cDot.classList.add('on-dark'); cRing.classList.add('on-dark'); };
    const onLeave = () => { cDot.classList.remove('on-dark'); cRing.classList.remove('on-dark'); };

    dark.addEventListener('mouseenter', onEnter);
    dark.addEventListener('mouseleave', onLeave);
    return () => {
      dark.removeEventListener('mouseenter', onEnter);
      dark.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      {/* Page curtain */}
      <div id="curtain" aria-hidden="true">
        <span className="curtain-logo">Khitab Anand</span>
      </div>
      {/* Custom cursor */}
      <div id="c-dot"  aria-hidden="true" />
      <div id="c-ring" aria-hidden="true" />

      <Navbar />
      <main id="main">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Certifications />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
