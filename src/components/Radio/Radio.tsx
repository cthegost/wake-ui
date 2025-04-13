import React, { useId } from 'react';
import './Radio.css';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
}

const Radio: React.FC<RadioProps> = ({
  label,
  className,
  id: propId,
  disabled,
  checked,
  name,
  value,
  ...props
}) => {
  const generatedId = useId();
  const id = propId || generatedId;

  const containerClassName = [
    'radio-container',
    disabled ? 'radio-container--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassName}>
      <input 
        type="radio"
        id={id}
        className="radio-input"
        disabled={disabled}
        checked={checked}
        name={name}
        value={value}
        {...props}
      />
      <label htmlFor={id} className="radio-label">
        <span className="radio-visual">
          <span className="radio-visual-dot"></span>
        </span>
        {label && <span className="radio-text-label">{label}</span>}
      </label>
    </div>
  );
};

export default Radio; 