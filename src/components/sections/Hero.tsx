import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import GradientText from '../shared/GradientText';
import MagneticButton from '../shared/MagneticButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const HeroParticles = lazy(() => import('../particles/HeroParticles'));

const WORDS = ['Software Engineer', 'Frontend Developer', 'React Specialist'];

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayText(WORDS[0]);
      return;
    }

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1600);
      return () => clearTimeout(timeout);
    }

    const speed = isDeleting ? 35 : 80;
    const currentWord = WORDS[wordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.slice(0, charIndex + 1);
        setDisplayText(next);
        if (next === currentWord) {
          setIsPaused(true);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        const next = currentWord.slice(0, charIndex - 1);
        setDisplayText(next);
        if (next === '') {
          setIsDeleting(false);
          setCharIndex(0);
          setWordIndex((w) => (w + 1) % WORDS.length);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, isPaused, wordIndex, prefersReduced]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
      aria-label="Hero section"
    >
      {/* Particles background */}
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      {/* Radial glow */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(124,58,237,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <p className="text-sm font-medium text-violet-400 tracking-[0.2em] uppercase mb-4">
            Welcome to my portfolio
          </p>

          {/* Main heading */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4">
            Hi, I'm{' '}
            <GradientText>Khitab Anand</GradientText>
          </h1>

          {/* Typewriter */}
          <div className="h-12 flex items-center justify-center mb-6" aria-live="polite" aria-atomic="true">
            <span className="text-2xl sm:text-3xl text-gray-300 font-medium">
              {displayText}
              <span
                className="inline-block w-0.5 h-8 ml-1 bg-violet-400 align-middle animate-pulse"
                aria-hidden="true"
              />
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-loose">
            Software Engineer with experience building dynamic web applications —
            passionate about crafting clean, performant UIs and continuous learning.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <MagneticButton href="#projects" variant="primary">
              View My Work <ArrowRight size={16} aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href="https://drive.google.com/file/d/1AENobz5uhY6YvcO6Na_HpOLDhoqkKKnV/view?usp=sharing" variant="outline" target="_blank" rel="noopener noreferrer">
              Download Resume <Download size={16} aria-hidden="true" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500"
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
