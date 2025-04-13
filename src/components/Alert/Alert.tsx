import React from 'react';
import './Alert.css';

export type AlertStatus = 'success' | 'info' | 'warning' | 'danger';

// Пропсы для компонента Alert
export interface AlertProps {
  id: string | number; // ID нужен для управления в провайдере
  status?: AlertStatus;
  title?: React.ReactNode;
  description: React.ReactNode;
  isClosable?: boolean;
  onClose?: (id: string | number) => void;
  className?: string;
  style?: React.CSSProperties;
}

// Иконки для статусов (простые SVG или символы)
const StatusIcons: Record<AlertStatus, React.ReactNode> = {
    success: (
        <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg>
    ),
    info: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16">
            <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-2.75a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5H7.5zm1.25 2.5a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5z" clipRule="evenodd"/>
        </svg>
    ),
    warning: (
        <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
    ),
    danger: (
        <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg> // Та же иконка, что и warning, можно заменить
    ),
};

const Alert: React.FC<AlertProps> = ({
  id,
  status = 'info',
  title,
  description,
  isClosable = true,
  onClose,
  className,
  style,
}) => {
  const alertClassName = [
    'alert',
    `alert--${status}`,
    className,
  ].filter(Boolean).join(' ');

  const handleClose = () => {
    onClose?.(id);
  };

  return (
    <div 
        className={alertClassName} 
        style={style} 
        role="alert" 
        aria-live="polite" // Важно для скринридеров
    >
      <span className="alert__icon">{StatusIcons[status]}</span>
      <div className="alert__content">
        {title && <div className="alert__title">{title}</div>}
        <div className="alert__description">{description}</div>
      </div>
      {isClosable && (
        <button 
            className="alert__close-button" 
            onClick={handleClose} 
            aria-label="Закрыть уведомление"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert; 