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
      className={`relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-32 ${className}`}
    >
      {children}
    </motion.section>
  );
}
