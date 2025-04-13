import React, { useState, cloneElement } from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStyles,
  FloatingFocusManager,
  FloatingPortal, // Для рендера в портале (вне основного DOM-дерева)
  offset,       // Для отступа от триггера
  flip,         // Для автоматического переворота при нехватке места
  shift,        // Для сдвига при нехватке места
  autoUpdate,   // Для обновления позиции при скролле/ресайзе
} from '@floating-ui/react';
import './Popover.css'; // Импортируем стили

interface PopoverProps {
  trigger: React.ReactElement; // Элемент, который будет открывать поповер (например, кнопка)
  children: React.ReactNode;   // Контент самого поповера
  placement?: 'top' | 'bottom' | 'left' | 'right'; // Позиция (по умолчанию 'bottom')
  offsetValue?: number; // Величина отступа (по умолчанию 10)
  transitionDuration?: number; // Добавим проп для настройки длительности
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  placement = 'bottom',
  offsetValue = 10,
  transitionDuration = 150, // Значение по умолчанию 150мс
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
        offset(offsetValue), // Применяем отступ
        flip(),             // Включаем переворот
        shift({ padding: 5 }) // Включаем сдвиг с небольшим отступом от края
    ],
    placement: placement,   // Устанавливаем желаемое положение
    whileElementsMounted: autoUpdate, // Автоматически обновляем позицию
  });

  // Настраиваем интерактивность: открытие по клику, закрытие по клику вне/Esc
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context); // Для доступности (ARIA атрибуты)

  // Настраиваем анимацию
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: transitionDuration,
    initial: {
      opacity: 0,
      transform: 'translateY(10px)',
    },
  });

  // Объединяем все взаимодействия
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      {/* Клонируем триггер */}
      {/* @ts-ignore */}
      {cloneElement(trigger, getReferenceProps({ ref: refs.setReference, ...trigger.props }))}

      <FloatingPortal>
        {isMounted && (
          <FloatingFocusManager context={context} modal={false}>
            {/* Внешний div ТОЛЬКО для позиционирования */}
            <div
              ref={refs.setFloating}
              style={floatingStyles} // <--- Только стили позиционирования
              {...getFloatingProps()} // Для обработчиков (например, dismiss)
            >
              {/* Внутренний div для ВИЗУАЛА и АНИМАЦИИ */}
              <div
                  className="popover-content" // <--- Стили фона, тени, паддингов И transition здесь
                  style={transitionStyles}    // <--- Стили анимации (opacity, transform) здесь
              >
                {children}
              </div>
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};

export default Popover; 