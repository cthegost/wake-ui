import React, { useState, useRef } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingArrow,
  safePolygon,
} from '@floating-ui/react';
import './Tooltip.css';

interface TooltipProps {
  children: React.ReactElement; // Триггер должен быть одним React элементом
  label: React.ReactNode; // Текст подсказки
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number | { open?: number; close?: number };
  hasArrow?: boolean; // <-- Добавляем проп
  className?: string; // Класс для самого тултипа
  style?: React.CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  label,
  placement = 'top',
  delay = 0, // По умолчанию без задержки
  hasArrow = true, // <-- Значение по умолчанию
  className,
  style
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  // Формируем middleware
  const middleware = [
    offset(hasArrow ? 8 : 4), // Уменьшаем offset если нет стрелки
    flip({ padding: 5 }),
    shift({ padding: 5 }),
  ];
  if (hasArrow) {
      // Добавляем arrow middleware только если hasArrow=true
      middleware.push(arrow({ element: arrowRef, padding: 4 }));
  }

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: placement,
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: middleware, // <-- Используем сформированный middleware
  });

  // Настройка задержки
  const hover = useHover(context, {
    move: false, // Не закрывать при движении мыши над триггером
    delay,
    handleClose: safePolygon(), // Позволяет навести на тултип
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const tooltipClassName = [
    'tooltip-content',
    className
  ].filter(Boolean).join(' ');

  // Проверяем, что children - валидный React элемент
  if (!React.isValidElement(children)) {
    console.error("Tooltip children must be a single valid React element.");
    return <>{children}</>; 
  }

  return (
    <>
      {/* Не копируем props из children */} 
      {React.cloneElement(children, getReferenceProps({ ref: refs.setReference }))}
      
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={tooltipClassName}
            {...getFloatingProps()}
          >
            {label}
            {/* Рендерим стрелку только если hasArrow=true */} 
            {hasArrow && <FloatingArrow ref={arrowRef} context={context} className="tooltip-arrow" />}
          </div>
        )}
      </FloatingPortal>
    </>
  );
};

export default Tooltip; 