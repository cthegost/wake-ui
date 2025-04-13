import React, { useId } from 'react';
import './Switch.css'; // Импортируем стили

// Расширяем стандартные атрибуты input type="checkbox"
interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string; // Необязательный лейбл
}

const Switch: React.FC<SwitchProps> = ({
  label,
  className, // Пользовательские классы для внешнего контейнера
  id: propId,
  checked,
  disabled,
  ...props // Остальные атрибуты (value, name, onChange и т.д.)
}) => {
  const generatedId = useId();
  const id = propId || generatedId;

  const containerClassName = [
    'switch-container',
    disabled ? 'switch-container--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassName}>
      {/* Скрытый оригинальный чекбокс */}
      <input
        type="checkbox"
        id={id}
        className="switch-input"
        checked={checked}
        disabled={disabled}
        role="switch" // Улучшает доступность
        aria-checked={checked}
        {...props}
      />
      {/* Визуальное представление переключателя */}
      <label htmlFor={id} className="switch-label">
        <span className="switch-track">
          <span className="switch-thumb" />
        </span>
      </label>
      {/* Лейбл рядом с переключателем (если есть) */}
      {label && (
        <label htmlFor={id} className="switch-text-label">
          {label}
        </label>
      )}
    </div>
  );
};

export default Switch; 