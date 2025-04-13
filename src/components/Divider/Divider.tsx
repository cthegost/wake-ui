import React from 'react';
import './Divider.css';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  inset?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  inset = false,
  className,
  style,
}) => {
  const dividerClassName = [
    'divider',
    `divider--${orientation}`,
    inset ? 'divider--inset' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={dividerClassName} 
      style={style}
      role="separator" 
      aria-orientation={orientation}
    />
  );
};

export default Divider; 