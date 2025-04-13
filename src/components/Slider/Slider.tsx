import React, { useState, useCallback, useEffect, useRef } from 'react';
import './Slider.css'; // Импортируем Slider.css

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number; // Теперь просто число
  onChange: (newValue: number) => void; // Принимает число
  disabled?: boolean;
  label?: string;
  showValue?: boolean; // Переименовал showValues
  className?: string;
  orientation?: 'horizontal' | 'vertical'; // <-- Добавляем ориентацию
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  disabled = false,
  label,
  showValue = false, // Переименовал
  className,
  orientation = 'horizontal', // <-- Значение по умолчанию
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null); // Ref для контейнера дорожки

  // Callback для получения размера контейнера дорожки
  const getTrackSize = useCallback(() => {
      if (!trackContainerRef.current) return 0;
      return orientation === 'vertical'
        ? trackContainerRef.current.offsetHeight
        : trackContainerRef.current.offsetWidth;
  }, [orientation]);

  // Callback для получения процента
  const getPercent = useCallback(
    (val: number) => {
        const range = max - min;
        if (range === 0) return 0;
        return Math.round(((val - min) / range) * 100);
    },
    [min, max]
  );

  // Синхронизация с внешним value
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  // Обновление выделенного диапазона (теперь учитывает ориентацию)
  useEffect(() => {
    const percent = getPercent(currentValue);
    if (rangeRef.current) {
      if (orientation === 'vertical') {
        rangeRef.current.style.bottom = `0%`;
        rangeRef.current.style.height = `${percent}%`;
        rangeRef.current.style.left = '0'; // Сброс горизонтальных стилей
        rangeRef.current.style.width = '100%';
      } else {
        rangeRef.current.style.left = `0%`;
        rangeRef.current.style.width = `${percent}%`;
        rangeRef.current.style.bottom = '0'; // Сброс вертикальных стилей
        rangeRef.current.style.height = '100%';
      }
    }
  }, [currentValue, getPercent, orientation]);

  // Вызов onChange при отпускании
  const triggerOnChange = () => {
     if (inputRef.current) {
         onChange(+inputRef.current.value);
     }
  };

  // Обновление внутреннего состояния при движении
   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(+event.target.value);
  };


  const containerClassName = [
      'slider-container',
      `slider-container--${orientation}`,
      disabled ? 'slider--disabled' : '',
      className,
  ].filter(Boolean).join(' ');

  const sliderClassName = [
      'slider',
      `slider--${orientation}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassName}>
       {label && <label className="slider-label">{label}</label>}
      <div className={sliderClassName}> {/* Добавляем класс ориентации */}
        <input
          type="range"
          ref={inputRef}
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleInputChange}
          onMouseUp={triggerOnChange}
          onTouchEnd={triggerOnChange}
          className="slider__thumb"
          disabled={disabled}
          // Используем data-атрибут вместо нестандартного orient
          data-orient={orientation}
        />

        <div ref={trackContainerRef} className="slider__track-container"> {/* Добавляем ref */}
          <div className="slider__track" />
          <div ref={rangeRef} className="slider__range" />
          {/* Обновляем позиционирование делений */}
           {step && (max - min) / step <= 20 &&
              Array.from({ length: (max - min) / step + 1 }).map((_, i) => {
                const tickValue = min + i * step;
                const percent = getPercent(tickValue);
                if (tickValue === min || tickValue === max) return null;
                const style = orientation === 'vertical'
                    ? { bottom: `${percent}%` }
                    : { left: `${percent}%` };
                return (
                  <div
                    key={i}
                    className="slider__tick"
                    style={style}
                  />
                );
            })}
        </div>
      </div>
      {/* Возвращаем рендеринг значения сюда, после div.slider */}
      {showValue && (
          <div className="slider-value">
            <span>{currentValue}</span>
          </div>
      )}
    </div>
  );
};

export default Slider; 