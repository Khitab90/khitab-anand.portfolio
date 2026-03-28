import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import GradientText from '../shared/GradientText';
import MagneticButton from '../shared/MagneticButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const WORDS = ['React & TypeScript Specialist', 'Frontend Architect', 'Software Engineer'];

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const profileContainerRef = useRef<HTMLDivElement>(null);
  const profileRevealRef = useRef<HTMLImageElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  // Typewriter effect
  useEffect(() => {
    if (prefersReduced) {
      setDisplayText(WORDS[0]);
      return;
    }
    if (isPaused) {
      const timeout = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 1600);
      return () => clearTimeout(timeout);
    }
    const speed = isDeleting ? 35 : 75;
    const currentWord = WORDS[wordIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.slice(0, charIndex + 1);
        setDisplayText(next);
        if (next === currentWord) setIsPaused(true);
        else setCharIndex((c) => c + 1);
      } else {
        const next = currentWord.slice(0, charIndex - 1);
        setDisplayText(next);
        if (next === '') { setIsDeleting(false); setCharIndex(0); setWordIndex((w) => (w + 1) % WORDS.length); }
        else setCharIndex((c) => c - 1);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, isPaused, wordIndex, prefersReduced]);

  // Animate turbulence baseFrequency toward a target value using RAF
  const animateTurbulence = useCallback((targetFreq: number) => {
    if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);

    const step = () => {
      if (!turbulenceRef.current) return;
      const current = parseFloat(
        turbulenceRef.current.getAttribute('baseFrequency') ?? '0.01'
      );
      const diff = targetFreq - current;
      if (Math.abs(diff) < 0.001) {
        turbulenceRef.current.setAttribute('baseFrequency', String(targetFreq));
        return;
      }
      const next = current + diff * 0.12;
      turbulenceRef.current.setAttribute('baseFrequency', String(next));
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  // Dot grid parallax + profile reveal on mousemove
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced) return;

    // Dot grid parallax
    if (gridRef.current) {
      const gridX = (e.clientX / window.innerWidth) * 20;
      const gridY = (e.clientY / window.innerHeight) * 20;
      gridRef.current.style.transform = `translate(${gridX}px, ${gridY}px)`;
    }

    // Profile reveal clip-path
    if (profileContainerRef.current && profileRevealRef.current) {
      const rect = profileContainerRef.current.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      if (relX >= 0 && relX <= rect.width && relY >= 0 && relY <= rect.height) {
        profileRevealRef.current.style.clipPath = `circle(110px at ${relX}px ${relY}px)`;
      }
    }
  }, [prefersReduced]);

  const handleProfileMouseEnter = useCallback(() => {
    if (prefersReduced) return;
    animateTurbulence(0.04);
  }, [prefersReduced, animateTurbulence]);

  const handleProfileMouseLeave = useCallback(() => {
    animateTurbulence(0.01);
    // Let the liquid recede before collapsing clip-path
    setTimeout(() => {
      if (profileRevealRef.current) {
        profileRevealRef.current.style.clipPath = 'circle(0px at 50% 50%)';
      }
    }, 300);
  }, [animateTurbulence]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-label="Hero section"
      onMouseMove={handleMouseMove}
    >
      {/* Hidden SVG filter — liquid/fluid edge distortion */}
      <svg
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="liquid-reveal" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="3"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Dot grid background */}
      <div ref={gridRef} className="dot-grid" aria-hidden="true" />

      {/* Central radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{ background: 'rgba(108,99,255,0.08)', filter: 'blur(120px)' }}
      />

      {/* Content — two-column grid */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-8 w-full grid md:grid-cols-2 gap-20 items-center py-24">

        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center md:text-left"
        >
          {/* Eyebrow */}
          <p className="font-heading text-[#a2e7ff] font-semibold tracking-widest uppercase mb-8 text-sm">
            Frontend Architect
          </p>

          {/* Main heading — large editorial style */}
          <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-10">
            Khitab{' '}
            <GradientText>Anand</GradientText>
          </h1>

          {/* Typewriter subtitle */}
          <div className="h-10 flex items-center justify-center md:justify-start mb-10" aria-live="polite" aria-atomic="true">
            <span className="font-heading text-xl md:text-2xl text-[#c7c4d8] font-medium">
              {displayText}
              <span className="inline-block w-0.5 h-6 ml-1 bg-[#c4c0ff] align-middle animate-pulse" aria-hidden="true" />
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-lg text-[#918fa1] max-w-xl mb-14 leading-relaxed mx-auto md:mx-0">
            3+ years building scalable React applications for enterprise platforms at Walmart Global Tech.
            Engineering software with structural rigour and aesthetic restraint.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            <MagneticButton href="#projects" variant="primary">
              View My Work <ArrowRight size={16} aria-hidden="true" />
            </MagneticButton>
            <MagneticButton
              href="https://drive.google.com/file/d/1AENobz5uhY6YvcO6Na_HpOLDhoqkKKnV/view?usp=sharing"
              variant="outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV <Download size={16} aria-hidden="true" />
            </MagneticButton>
          </div>
        </motion.div>

        {/* Right: profile photo with liquid reveal effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div
            ref={profileContainerRef}
            className="relative overflow-hidden rounded-2xl border border-[rgba(196,192,255,0.15)]"
            style={{ width: '100%', maxWidth: '360px', aspectRatio: '1/1' }}
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            {/* Blurred base image */}
            <img
              src="/assets/profile.png"
              alt=""
              aria-hidden="true"
              className="profile-base"
            />
            {/* Sharp reveal image — follows cursor, liquid edge via SVG filter */}
            <img
              ref={profileRevealRef}
              src="/assets/profile.png"
              alt="Khitab Anand"
              className="profile-reveal"
            />
            {/* Indigo glow overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{ boxShadow: 'inset 0 0 60px rgba(196,192,255,0.05)' }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#464555]"
        animate={prefersReduced ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}
