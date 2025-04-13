import React, { useId, useRef, useEffect } from 'react';
import './Checkbox.css'; // Импортируем стили

// Расширяем стандартные атрибуты input type="checkbox", добавляем indeterminate
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'indeterminate'> {
  label?: string;         // Необязательный лейбл
  indeterminate?: boolean; // Состояние "неопределенности"
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className, // Пользовательские классы для внешнего контейнера
  id: propId,
  checked,
  disabled,
  indeterminate = false, // По умолчанию false
  ...props // Остальные атрибуты (value, name, onChange и т.д.)
}) => {
  const generatedId = useId();
  const id = propId || generatedId;
  const inputRef = useRef<HTMLInputElement>(null); // Ref для доступа к input элементу

  // Используем useEffect для установки/снятия свойства indeterminate на DOM-элементе
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Добавляем класс для неопределенного состояния
  const containerClassName = [
    'checkbox-container',
    disabled ? 'checkbox-container--disabled' : '',
    indeterminate ? 'checkbox-container--indeterminate' : '', // Класс для indeterminate
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassName}>
      {/* Используем label как обертку для кликабельности */}
      <label htmlFor={id} className="checkbox-label-wrapper">
        {/* Сам input */}
        <input
          ref={inputRef} // Привязываем ref
          type="checkbox"
          id={id}
          className="checkbox-input"
          checked={checked}
          disabled={disabled}
          // Не устанавливаем indeterminate здесь, делаем через ref
          {...props}
        />
        {/* Визуальное представление чекбокса */}
        <span className="checkbox-visual">
            {/* Иконка для checked состояния */}
            <svg className="checkbox-icon checkbox-icon--checked" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M12.707 5.293a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L7 9.586l4.293-4.293a1 1 0 0 1 1.414 0z"/>
            </svg>
            {/* Иконка для indeterminate состояния (минус) */}
             <svg className="checkbox-icon checkbox-icon--indeterminate" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M4 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z"/>
            </svg>
        </span>
        {/* Текстовый лейбл (если есть) */}
        {label && <span className="checkbox-text-label">{label}</span>}
      </label>
    </div>
  );
};

export default Checkbox; // <--- Вот этот экспорт важен! 