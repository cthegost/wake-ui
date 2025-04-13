import React, { useId } from 'react';
import './Input.css'; // Импортируем стили

// Расширяем стандартные атрибуты input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;       // Необязательный лейбл
  error?: string | null; // Сообщение об ошибке
  labelVariant?: 'standard' | 'outline'; // Вариант позиционирования лейбла
  placeholder?: string; // Добавляем оригинальный плейсхолдер
  // Можно добавить другие кастомные пропсы при необходимости, например, иконку
}

const Input: React.FC<InputProps> = ({
  label,
  error = null,
  className, // Получаем className для кастомизации
  id: propId, // Получаем id из пропсов, если передан
  labelVariant = 'standard', // Значение по умолчанию - стандартный
  placeholder: propPlaceholder, // Получаем оригинальный плейсхолдер
  ...props   // Остальные стандартные атрибуты input
}) => {
  // Генерируем уникальный ID для связи label и input, если ID не передан
  const generatedId = useId();
  const id = propId || generatedId;

  // Формируем классы для контейнера и поля
  const containerClassName = [
      'input-container',
      `input-container--label-${labelVariant}`, // Класс для варианта лейбла
      error ? 'input-container--error' : '',
  ].filter(Boolean).join(' ');

  const inputClassName = [
    'input-field',
    error ? 'input-field--error' : '',
    className
  ].filter(Boolean).join(' ');

  // Определяем плейсхолдер: пробел для outline с label, иначе оригинальный
  const placeholder = labelVariant === 'outline' && label ? ' ' : propPlaceholder;

  // Стандартный лейбл (над полем)
  const standardLabel = label && labelVariant === 'standard' && (
    <label htmlFor={id} className="input-label">
      {label}
    </label>
  );

  // Outline вариант: fieldset содержит input, label (для анимации), legend (для выреза)
  const outlineContent = labelVariant === 'outline' && (
    <fieldset className="input-fieldset" aria-hidden="true"> {/* aria-hidden на fieldset, т.к. он декоративный */}
      {/* Легенда для создания выреза, невидима */}
      <legend className="input-legend">
        {/* Текст нужен, чтобы legend имел ширину */}
        <span>{label ? label : ''}&nbsp;</span>
      </legend>
       <input
        id={id}
        className={inputClassName}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder={placeholder} // Используем вычисленный плейсхолдер
        {...props}
      />
      {/* Плавающий лейбл */}
      {label && (
          <label htmlFor={id} className="input-label-floating">
            {label}
          </label>
        )}
    </fieldset>
  );

   // Обычный инпут для standard варианта
  const standardInput = labelVariant === 'standard' && (
      <input
          id={id}
          className={inputClassName}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder={placeholder} // Используем вычисленный плейсхолдер
          {...props}
        />
  );

  return (
    <div className={containerClassName}>
      {standardLabel}
      {/* Выбираем, что рендерить: outline структуру или standard input */}
      {labelVariant === 'outline' ? outlineContent : standardInput}
      {/* Сообщение об ошибке */}
      {error && (
        <p id={`${id}-error`} className="input-error-message" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input; 