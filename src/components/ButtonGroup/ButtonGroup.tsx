import React from 'react';
import './ButtonGroup.css';

interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  className,
  style,
}) => {
  const groupClassName = [
    'button-group',
    `button-group--${orientation}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClassName} style={style} role="group">
      {children}
    </div>
  );
};

export default ButtonGroup; 