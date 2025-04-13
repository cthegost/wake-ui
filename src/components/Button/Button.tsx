import React from 'react';
import './Button.css'; // Импортируем стили

// Определяем возможные варианты кнопки
type ButtonVariant = 'filled' | 'outline' | 'text';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant; // Добавляем необязательный проп variant
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'filled', // Устанавливаем 'filled' как значение по умолчанию
  className, // Получаем className из пропсов
  ...props 
}) => {
  // Формируем классы в зависимости от варианта
  // Пока это будут простые классы, позже мы добавим им стили
  const variantClass = `button--${variant}`; 
  const combinedClassName = [variantClass, className].filter(Boolean).join(' '); // Объединяем классы

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button; 