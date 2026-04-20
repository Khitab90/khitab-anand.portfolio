import type { ReactNode, ElementType } from 'react';

interface GradientTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/** In the new warm design, "accent" text is terracotta italic. */
export default function GradientText({ children, as: Tag = 'span', className = '' }: GradientTextProps) {
  return (
    <Tag
      className={className}
      style={{ color: 'var(--accent)', fontStyle: 'italic' }}
    >
      {children}
    </Tag>
  );
}
