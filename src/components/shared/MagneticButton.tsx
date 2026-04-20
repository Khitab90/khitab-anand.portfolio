import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
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
  target,
  rel,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const prefersReduced = useReducedMotion();
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    btnRef.current.style.transform = `translate(${dx * 0.25}px, ${dy * 0.3}px)`;
  };

  const onMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transition = 'transform .5s cubic-bezier(0.16,1,0.3,1)';
    btnRef.current.style.transform  = '';
    setTimeout(() => {
      if (btnRef.current) btnRef.current.style.transition = '';
    }, 500);
  };

  const variantClass = variant === 'primary' ? 'btn-filled' : 'btn-outline';
  const cls = `btn-magnetic ${variantClass} ${className}`;

  if (href) {
    return (
      <a
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <span className="btn-label">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      className={cls}
      aria-label={ariaLabel}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <span className="btn-label">{children}</span>
    </button>
  );
}
