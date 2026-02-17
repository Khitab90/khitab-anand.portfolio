import type { ReactNode } from 'react';
import { useMagneticEffect } from '../../hooks/useMagneticEffect';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  'aria-label'?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  download,
  target,
  rel,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const prefersReduced = useReducedMotion();
  const ref = useMagneticEffect<HTMLDivElement>(prefersReduced ? 0 : 0.35);

  const baseClasses =
    'relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-base tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400';

  const primaryClasses =
    'bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_30px_rgba(124,58,237,0.55)] hover:scale-105';

  const outlineClasses =
    'border border-violet-500/50 text-violet-300 hover:border-violet-400 hover:text-violet-200 hover:bg-violet-500/10 hover:scale-105';

  const classes = `${baseClasses} ${variant === 'primary' ? primaryClasses : outlineClasses} ${className}`;

  const content = href ? (
    <a
      href={href}
      className={classes}
      download={download}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      data-cursor="button"
    >
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={classes} aria-label={ariaLabel} data-cursor="button">
      {children}
    </button>
  );

  return <div ref={ref}>{content}</div>;
}
