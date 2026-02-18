import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const reducedVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export default function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={prefersReduced ? reducedVariants : variants}
      className={`relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24 ${className}`}
    >
      {/* Top gradient divider — gives each section a distinct "new page" feel */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.4) 30%, rgba(168,85,247,0.6) 50%, rgba(139,92,246,0.4) 70%, transparent 100%)',
        }}
      />

      {children}
    </motion.section>
  );
}
