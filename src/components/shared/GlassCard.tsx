import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`glass transition-all duration-300 ${
        hover
          ? 'hover:border-purple-500/30 hover:shadow-[0_0_24px_rgba(124,58,237,0.15)]'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
