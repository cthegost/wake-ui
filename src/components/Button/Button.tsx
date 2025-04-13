import React from 'react';
import './Button.css'; // Импортируем стили
import Loader from '../Loader/Loader'; // <-- Импортируем Loader

// Определяем возможные варианты кнопки
type ButtonVariant = 'filled' | 'outline' | 'text';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant; // Добавляем необязательный проп variant
  loading?: boolean; // <-- Добавляем проп loading
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'filled', // Устанавливаем 'filled' как значение по умолчанию
  className, // Получаем className из пропсов
  loading = false, // <-- Значение по умолчанию для loading
  disabled, // Получаем disabled из пропсов
  ...props 
}) => {
  // Если loading=true, кнопка должна быть disabled
  const isDisabled = loading || disabled;

  // Формируем классы в зависимости от варианта и состояния загрузки
  const variantClass = `button--${variant}`;
  const loadingClass = loading ? 'button--loading' : ''; // <-- Класс для loading
  const combinedClassName = [
      'button', // Добавим базовый класс для общих стилей
      variantClass, 
      loadingClass, 
      className
  ].filter(Boolean).join(' '); // Объединяем классы

  // Определяем размер лоадера в зависимости от размера кнопки (упрощенно)
  // Можно добавить проп buttonSize в будущем для более точного контроля
  const loaderSize = 16; // Примерный размер для стандартной кнопки

  return (
    // Используем isDisabled
    <button className={combinedClassName} disabled={isDisabled} {...props}>
      {/* Контейнер для центрирования лоадера */} 
      {loading && (
        <span className="button__loader-container">
          <Loader size={loaderSize} />
        </span>
      )}
      {/* Обертка для контента, чтобы скрыть его при загрузке */} 
      <span className="button__content">{children}</span>
    </button>
  );
};

export default Button; 