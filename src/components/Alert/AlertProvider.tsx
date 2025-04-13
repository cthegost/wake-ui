import React, { createContext, useState, useCallback, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Alert, { AlertProps, AlertStatus } from './Alert';
import './Alert.css'; // Импортируем стили для Alert и контейнера

// Определяем тип для одного уведомления в состоянии
interface AlertState extends Omit<AlertProps, 'onClose'> {
  id: string;
  duration?: number; // Время в мс, через которое алерт закроется автоматически
  isExiting?: boolean; // Флаг для анимации исчезновения
}

// Определяем тип контекста
interface AlertContextType {
  showAlert: (options: Omit<AlertState, 'id' | 'isExiting'> & { id?: string }) => void; // Убираем isExiting из опций
}

// Создаем контекст
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Props для AlertProvider
interface AlertProviderProps {
  children: ReactNode;
  defaultDuration?: number; // Время отображения по умолчанию
  portalContainer?: HTMLElement; // Куда порталить уведомления
  animationDuration?: number; // Длительность анимации исчезновения в мс
}

// Стили для контейнера алертов
const containerStyle: React.CSSProperties = {
  position: 'fixed',
  top: '1rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1050,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '0.75rem',
  width: 'fit-content',
  maxWidth: '90%',
};

// Компонент AlertProvider
export const AlertProvider: React.FC<AlertProviderProps> = ({ 
    children,
    defaultDuration = 5000, // 5 секунд по умолчанию
    portalContainer = document.body, // Порталим в body по умолчанию
    animationDuration = 250 // Обновляем длительность анимации до 250ms
}) => {
  const [alerts, setAlerts] = useState<AlertState[]>([]);
  const timersRef = useRef<Record<string, NodeJS.Timeout>>({});
  const exitTimersRef = useRef<Record<string, NodeJS.Timeout>>({}); // Таймеры для удаления после анимации

  // Функция для удаления алерта (запускает анимацию)
  const removeAlert = useCallback((id: string) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id ? { ...alert, isExiting: true } : alert
      )
    );

    // Очищаем основной таймер автозакрытия, если он был
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }

    // Очищаем предыдущий таймер выхода, если был (на случай быстрого повторного клика)
    if (exitTimersRef.current[id]) {
        clearTimeout(exitTimersRef.current[id]);
    }

    // Устанавливаем таймер для фактического удаления из состояния после анимации
    exitTimersRef.current[id] = setTimeout(() => {
      setAlerts((currentAlerts) => currentAlerts.filter((alert) => alert.id !== id));
      delete exitTimersRef.current[id]; // Удаляем таймер выхода из ref
    }, animationDuration); // Используем обновленную длительность анимации

  }, [animationDuration]);

  // Функция для добавления алерта
  const showAlert = useCallback((options: Omit<AlertState, 'id' | 'isExiting'> & { id?: string }) => {
    const id = options.id || `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const duration = options.duration ?? defaultDuration;
    const newAlert: AlertState = { ...options, id, duration, isExiting: false }; // isExiting: false при добавлении

    setAlerts((currentAlerts) => {
        // Убираем существующий алерт с таким же id, если он есть (чтобы сбросить анимацию/таймеры)
        const filteredAlerts = currentAlerts.filter(a => a.id !== id);
        return [...filteredAlerts, newAlert];
    });

    // Устанавливаем таймер для автоматического закрытия, если duration > 0
    if (duration > 0) {
        // Очищаем предыдущий основной таймер для этого id, если он существует
        if (timersRef.current[id]) {
            clearTimeout(timersRef.current[id]);
        }
        // Очищаем таймер выхода, если он активен для этого ID (предотвращает удаление во время показа)
        if (exitTimersRef.current[id]) {
            clearTimeout(exitTimersRef.current[id]);
            delete exitTimersRef.current[id];
        }

        timersRef.current[id] = setTimeout(() => {
            removeAlert(id); // Вызываем нашу функцию удаления для запуска анимации
        }, duration);
    }
  }, [defaultDuration, removeAlert]);

  // Очистка всех таймеров при размонтировании компонента
  useEffect(() => {
    const autoCloseTimers = timersRef.current;
    const exitTimers = exitTimersRef.current;
    return () => {
      Object.values(autoCloseTimers).forEach(clearTimeout);
      Object.values(exitTimers).forEach(clearTimeout);
    };
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {createPortal(
        <div style={containerStyle}>
          {alerts.map(({ id, isExiting, duration, ...alertProps }) => {
            const alertClassName = [
                'alert',
                alertProps.className, // Добавляем проп className, если он есть
                isExiting ? 'alert--exiting' : '' // Добавляем класс для анимации исчезновения
            ].filter(Boolean).join(' ');
            
            return (
                <Alert
                  key={id}
                  {...alertProps} // Передаем остальные пропсы
                  id={id}
                  className={alertClassName} // Передаем собранные классы
                  onClose={() => removeAlert(id)}
                />
            )
          })}
        </div>,
        portalContainer
      )}
    </AlertContext.Provider>
  );
};

// Хук для удобного использования контекста
export const useAlert = () => {
  const context = React.useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

// Экспортируем типы для удобства использования
export type { AlertState, AlertStatus };
// AlertContext не экспортируем, т.к. есть хук useAlert 