import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string; // Дополнительный класс для кастомизации
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
}) => {
  // Создаем или находим div для портала
  const modalRoot = document.getElementById('modal-root') || (() => {
    const div = document.createElement('div');
    div.id = 'modal-root';
    document.body.appendChild(div);
    return div;
  })();

  // Обработчик нажатия Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Блокируем скролл фона при открытом модальном окне
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = ''; // Возвращаем скролл
    }

    // Очистка при размонтировании или закрытии
    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Убедимся, что скролл разблокирован, если это последнее открытое модальное окно
      // (Простая проверка, может потребоваться более сложная логика для вложенных модалок)
      if (!document.querySelector('.modal-overlay')) {
          document.body.style.overflow = '';
      }
    };
  }, [isOpen, onClose]);


  if (!isOpen) {
    return null;
  }

  // Рендерим модальное окно с помощью портала
  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={onClose} // Закрытие по клику на оверлей
      role="presentation" // Добавляем роль для доступности
    >
      <div
        className={`modal-content ${className || ''}`.trim()}
        onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри окна
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Кнопка закрытия */}
        <button className="modal-close-button" onClick={onClose} aria-label="Закрыть окно">
          &times; {/* Простой крестик */}
        </button>

        {/* Заголовок */}
        {title && <h2 id="modal-title" className="modal-title">{title}</h2>}

        {/* Содержимое */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    modalRoot // Рендерим в #modal-root
  );
};

export default Modal; 