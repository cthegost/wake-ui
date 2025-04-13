import React, { useState, useId, useMemo } from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useListNavigation, // Для навигации по списку клавиатурой
  useInteractions,
  FloatingFocusManager,
  FloatingPortal,
  flip,
  offset, // <--- Импортируем offset
  size as floatingSize, // Переименовываем, чтобы не конфликтовать с AvatarProps
  autoUpdate,
} from '@floating-ui/react';
import './Select.css'; // Импортируем стили

// Тип для опций селекта
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean; // Опционально: отключенная опция
}

interface SelectProps {
  options: SelectOption[];
  value: string | number | null; // Текущее выбранное значение
  onChange: (value: string | number | null) => void; // Функция обратного вызова при выборе
  placeholder?: string;
  label?: string;         // Лейбл над селектом
  disabled?: boolean;
  className?: string;     // Пользовательский класс для контейнера
  // Добавить error?
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  label,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // Индекс активного элемента для навигации

  const listRef = React.useRef<Array<HTMLElement | null>>([]); // Ref'ы для элементов списка

  const generatedId = useId();
  const labelId = label ? `${generatedId}-label` : undefined;
  const listboxId = `${generatedId}-listbox`;

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: 'bottom-start', // Позиционируем снизу от начала
    middleware: [
      offset(4), // <--- Добавляем отступ (например, 4px)
      flip({ padding: 5 }),
      floatingSize({ // Подгоняем ширину списка под ширину кнопки
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
        padding: 5,
      }),
    ],
  });

  // --- Взаимодействия ---
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  // Навигация по списку (стрелки, Enter, Esc)
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true, // Т.к. рендерим не все опции сразу (хотя в нашем случае рендерим все)
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
  ]);

  // Находим лейбл выбранного значения
  const selectedLabel = useMemo(() => {
    return options.find(option => option.value === value)?.label;
  }, [options, value]);

  // Обработчик выбора опции
  const handleSelect = (optionValue: string | number | null) => {
    if (optionValue !== null) {
        onChange(optionValue);
        setIsOpen(false);
    }
  };

  const containerClassName = [
    'select-container',
    disabled ? 'select-container--disabled' : '',
    className,
  ].filter(Boolean).join(' ');


  return (
    <div className={containerClassName}>
       {/* Лейбл над селектом */}
       {label && (
        <label id={labelId} className="select-label">
          {label}
        </label>
      )}
      {/* Кнопка, открывающая список */}
      <button
        ref={refs.setReference}
        className="select-button"
        disabled={disabled}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-autocomplete="none"
        {...getReferenceProps()}
      >
        <span className="select-value">
            {selectedLabel || <span className="select-placeholder">{placeholder}</span>}
        </span>
        <span className="select-arrow" aria-hidden="true">
          {/* Простая SVG стрелка вниз */}
          <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M8 11L3 6h10z"/></svg>
        </span>
      </button>

      {/* Список опций */}
      <FloatingPortal>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className="select-listbox"
              role="listbox"
              id={listboxId}
              aria-labelledby={labelId}
              {...getFloatingProps()}
            >
              {options.map((option, index) => (
                <div
                  key={option.value}
                  ref={(node) => { listRef.current[index] = node; }}
                  role="option"
                  className={`select-option ${activeIndex === index ? 'select-option--active' : ''} ${option.value === value ? 'select-option--selected' : ''} ${option.disabled ? 'select-option--disabled' : ''}`}
                  tabIndex={activeIndex === index ? 0 : -1}
                  aria-selected={activeIndex === index && isOpen || option.value === value}
                  aria-disabled={option.disabled}
                  {...getItemProps({
                    // Обработка клика или Enter на опции
                    onClick: () => !option.disabled && handleSelect(option.value),
                    onKeyDown: (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                           if (!option.disabled) handleSelect(option.value);
                        }
                    },
                  })}
                >
                  {option.label}
                   {/* Можно добавить галочку для выбранной опции */}
                   {option.value === value && (
                       <span className="select-option-checkmark" aria-hidden="true">✓</span>
                   )}
                </div>
              ))}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </div>
  );
};

export default Select; 