import React from 'react';
import Radio from './Radio';
import './Radio.css'; // Используем тот же CSS файл

interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string | number | null; // Выбранное значение
  onChange: (value: string | number) => void;
  name: string; // Атрибут name обязателен для группы радиокнопок
  label?: string; // Общий лейбл для группы
  disabled?: boolean; // Отключить всю группу
  layout?: 'horizontal' | 'vertical';
  className?: string; // Дополнительный класс для контейнера группы
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  disabled = false,
  layout = 'vertical',
  className,
}) => {

  const groupClassName = [
      'radio-group-container',
      `radio-group--${layout}`,
      disabled ? 'radio-group--disabled' : '',
      className,
  ].filter(Boolean).join(' ');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      // Преобразуем к числу, если исходное значение было числом
      const originalOption = options.find(opt => String(opt.value) === newValue);
      onChange(originalOption && typeof originalOption.value === 'number' ? Number(newValue) : newValue);
  };

  return (
    <div className={groupClassName} role="radiogroup" aria-labelledby={label ? `${name}-group-label` : undefined}>
      {label && <label id={`${name}-group-label`} className="radio-group-label">{label}</label>}
      <div className="radio-group-options">
          {options.map((option) => (
            <Radio
              key={option.value}
              label={option.label}
              value={option.value}
              name={name}
              checked={value === option.value}
              disabled={disabled || option.disabled}
              onChange={handleRadioChange}
            />
          ))}
       </div>
    </div>
  );
};

export default RadioGroup; 