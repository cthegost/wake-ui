import React from 'react';
import './Loader.css';

interface LoaderProps {
  size?: number | string; // Разрешаем число или строку (напр. '2rem')
  className?: string;
  style?: React.CSSProperties; // Добавляем для кастомных стилей
  // Можно добавить color prop в будущем
}

const Loader: React.FC<LoaderProps> = ({
  size = 32, // Дефолтный размер в пикселях
  className,
  style,
}) => {
  // Убираем классы для размеров
  const loaderClassName = [
    'loader-spinner',
    // `loader-spinner--${size}`,
    className
  ].filter(Boolean).join(' ');

  // Готовим инлайн-стили для размера и толщины рамки
  const sizeValue = typeof size === 'number' ? `${size}px` : size;
  // Рассчитываем толщину рамки, например, 1/10 размера, но минимум 2px
  const borderWidthValue = typeof size === 'number'
    ? `${Math.max(2, Math.round(size / 10))}px`
    : `max(2px, ${sizeValue} / 10)`; // Попытка сделать для строк, но может быть неточно

  const inlineStyles: React.CSSProperties = {
    width: sizeValue,
    height: sizeValue,
    borderWidth: borderWidthValue,
    ...style, // Позволяем переопределять или добавлять стили
  };

  return <div className={loaderClassName} style={inlineStyles} role="status" aria-live="polite"></div>;
};

export default Loader; 