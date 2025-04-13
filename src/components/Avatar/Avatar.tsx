import React from 'react';
import './Avatar.css'; // Импортируем стили

type AvatarSize = 'small' | 'medium' | 'large';
type AvatarShape = 'circle' | 'square';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;    // URL изображения
  alt?: string;           // Alt текст для изображения
  name?: string;          // Имя для генерации инициалов
  size?: AvatarSize;      // Размер
  shape?: AvatarShape;    // Форма
}

// Функция для получения инициалов из имени
const getInitials = (name: string): string => {
  if (!name) return '';
  const names = name.trim().split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

// --- Добавляем генерацию цвета --- 
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  // Генерируем цвет в формате HSL для лучшего распределения
  const h = hash % 360;
  // Ограничиваем насыщенность и светлоту для получения пастельных тонов
  const s = 60 + (hash % 10); // 60-70%
  const l = 75 + (hash % 10); // 75-85%
  return `hsl(${h}, ${s}%, ${l}%)`;
};
// ----------------------------------

const Avatar: React.FC<AvatarProps> = ({
  src = null,
  alt = 'Avatar',
  name = '',
  size = 'medium',
  shape = 'circle',
  className, // Пользовательские классы
  style,     // Пользовательские стили
  ...props   // Остальные div атрибуты
}) => {
  const [imgError, setImgError] = React.useState(false); // Состояние ошибки загрузки изображения

  // --- Генерируем цвет фона, если показываем инициалы --- 
  const backgroundColor = !src && name ? stringToColor(name) : undefined;
  // -------------------------------------------------------

  // Определяем, что отображать: изображение, инициалы или плейсхолдер
  let content: React.ReactNode;
  const showImage = src && !imgError;
  const showInitials = !showImage && name;

  if (showImage) {
    content = (
      <img
        src={src}
        alt={alt}
        className="avatar-image"
        onError={() => setImgError(true)} // Устанавливаем ошибку при неудачной загрузке
      />
    );
  } else if (showInitials) {
    content = (
      <span className="avatar-initials" aria-label={alt}>
        {getInitials(name)}
      </span>
    );
  } else {
    // Плейсхолдер (можно вставить SVG иконку пользователя)
    content = (
      <span className="avatar-placeholder" aria-label={alt}>
        {/* Пример SVG иконки пользователя (можно вынести в отдельный компонент Icon) */}
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </span>
    );
  }

  const avatarClassName = [
    'avatar-container',
    `avatar--${size}`,
    `avatar--${shape}`,
    className,
  ].filter(Boolean).join(' ');

  // --- Объединяем переданные стили со сгенерированным фоном --- 
  const combinedStyle = {
    ...style, // Пользовательские стили
    backgroundColor: backgroundColor || style?.backgroundColor, // Применяем сгенерированный фон, если он есть, иначе оставляем пользовательский или дефолтный из CSS
  };
  // ------------------------------------------------------------

  return (
    <div className={avatarClassName} style={combinedStyle} {...props}>
      {content}
    </div>
  );
};

export default Avatar; 