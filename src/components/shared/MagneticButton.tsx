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
    'relative inline-flex items-center gap-3 px-10 py-5 rounded-lg font-bold text-base tracking-tight transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4c0ff]';

  const primaryClasses =
    'bg-gradient-to-r from-[#c4c0ff] to-[#8781ff] text-[#100069] hover:shadow-[0_0_30px_rgba(196,192,255,0.3)] hover:scale-105';

  const outlineClasses =
    'border border-[rgba(70,69,85,0.6)] text-[#e4e1e9] hover:border-[rgba(196,192,255,0.4)] hover:text-[#c4c0ff] hover:bg-[rgba(196,192,255,0.05)] hover:scale-105';

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
