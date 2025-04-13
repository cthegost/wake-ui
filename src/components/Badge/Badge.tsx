import React from 'react';
import './Badge.css';

type BadgeVariant = 'filled' | 'outline';
type BadgeColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  className?: string;
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'filled',
  colorScheme = 'primary',
  className,
  style,
}) => {
  const badgeClassName = [
    'badge',
    `badge--${variant}`,
    `badge--color-${colorScheme}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClassName} style={style}>
      {children}
    </span>
  );
};

export default Badge; 