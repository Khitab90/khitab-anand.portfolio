import { useEffect, useRef, useCallback } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function About() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const lastXRef    = useRef<number | null>(null);
  const lastYRef    = useRef<number | null>(null);
  const isHovRef    = useRef(false);
  const refillRAF   = useRef<number | null>(null);

  useScrollReveal(sectionRef);

  // ── Canvas helpers ──────────────────────────────────────────
  const fillCover = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#CBAF94';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const resizeCanvas = useCallback(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const rect = wrap.getBoundingClientRect();
    const dpr  = window.devicePixelRatio || 1;
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width  = rect.width  + 'px';
    canvas.style.height = rect.height + 'px';
    fillCover();
  }, [fillCover]);

  const eraseBrush = useCallback((x: number, y: number, radius: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const cx  = x * dpr, cy = y * dpr, r = radius * dpr;

    ctx.globalCompositeOperation = 'destination-out';
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0,    'rgba(0,0,0,1)');
    grad.addColorStop(0.45, 'rgba(0,0,0,0.95)');
    grad.addColorStop(0.75, 'rgba(0,0,0,0.5)');
    grad.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Fill between last and current point for smooth stroke
    const lx = lastXRef.current, ly = lastYRef.current;
    if (lx !== null && ly !== null) {
      const dist  = Math.hypot(x - lx, y - ly);
      const steps = Math.max(1, Math.floor(dist / 8));
      for (let i = 1; i < steps; i++) {
        const t  = i / steps;
        const ix = (lx + (x - lx) * t) * dpr;
        const iy = (ly + (y - ly) * t) * dpr;
        const ig = ctx.createRadialGradient(ix, iy, 0, ix, iy, r * 0.8);
        ig.addColorStop(0,   'rgba(0,0,0,0.8)');
        ig.addColorStop(0.6, 'rgba(0,0,0,0.35)');
        ig.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(ix, iy, r * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = ig;
        ctx.fill();
      }
    }
    lastXRef.current = x;
    lastYRef.current = y;
  }, []);

  // ── Mount / resize ──────────────────────────────────────────
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // ── Mouse interactions ──────────────────────────────────────
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const BASE_RADIUS = 55;

    const onMove = (e: MouseEvent) => {
      if (refillRAF.current) { cancelAnimationFrame(refillRAF.current); refillRAF.current = null; }
      const rect  = wrap.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const lx    = lastXRef.current, ly = lastYRef.current;
      const speed  = lx !== null && ly !== null ? Math.hypot(x - lx, y - ly) : 0;
      const radius = BASE_RADIUS + Math.min(speed * 0.6, 30);
      eraseBrush(x, y, radius);
    };

    const onEnter = () => {
      isHovRef.current = true;
      if (refillRAF.current) { cancelAnimationFrame(refillRAF.current); refillRAF.current = null; }
    };

    const onLeave = () => {
      isHovRef.current  = false;
      lastXRef.current  = null;
      lastYRef.current  = null;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dur   = 900;
      const start = performance.now();
      const refill = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = `rgba(203,175,148,${0.055})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (t < 1 && !isHovRef.current) {
          refillRAF.current = requestAnimationFrame(refill);
        } else if (!isHovRef.current) {
          fillCover();
        }
      };
      refillRAF.current = requestAnimationFrame(refill);
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseenter', onEnter);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseenter', onEnter);
      wrap.removeEventListener('mouseleave', onLeave);
      if (refillRAF.current) cancelAnimationFrame(refillRAF.current);
    };
  }, [eraseBrush, fillCover]);

  return (
    <div id="about-section" ref={sectionRef}>
      {/* Hidden SVG filter for liquid-edge canvas effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="liquid-edge" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.035 0.028" numOctaves={4} seed={6} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={18} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="section">
        <div id="about">

          {/* LEFT: Canvas paint-brush reveal */}
          <div className="photo-col" data-fade>
            <div className="photo-reveal-wrap" ref={wrapRef}>
              {/* Bottom layer: real photo */}
              <div className="photo-reveal-bottom">
                <img src="/assets/profile.png" alt="Khitab Anand" />
              </div>
              {/* Top layer: warm cover canvas — erases on mousemove */}
              <canvas ref={canvasRef} id="paintCanvas" />
              <span className="photo-hint">Hover to reveal ↗</span>
            </div>
            <p className="photo-caption">— Khitab Anand, Los Angeles</p>
          </div>

          {/* RIGHT: Bio */}
          <div className="about-content">
            <p className="sec-label" data-wipe>About</p>
            <h2 className="about-title" data-fade style={{ transitionDelay: '.1s' }}>
              Engineering with<br />
              <em>purpose &amp; precision.</em>
            </h2>
            <p className="about-body" data-fade style={{ transitionDelay: '.2s' }}>
              Senior Frontend Engineer dedicated to crafting immersive digital experiences.
              My approach blends the logic of robust engineering with the intuition of high-end design.
              At Walmart Global Tech, I built high-performance enterprise systems serving millions of users.
            </p>
            <div className="tags" data-fade style={{ transitionDelay: '.3s' }}>
              <span className="tag accent">Los Angeles, CA</span>
              <span className="tag accent">Open to Roles</span>
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">JavaScript</span>
              <span className="tag">Node.js</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
