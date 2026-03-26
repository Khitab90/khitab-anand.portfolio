import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={`glass transition-all duration-200 ${
        hover
          ? 'hover:border-[rgba(196,192,255,0.2)] hover:shadow-[0_0_32px_rgba(135,129,255,0.08)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
