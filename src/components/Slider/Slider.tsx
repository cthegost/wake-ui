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
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null); // Один ref
  const rangeRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (val: number) => Math.round(((val - min) / (max - min)) * 100),
    [min, max]
  );

  // Синхронизация с внешним value
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  // Обновление выделенного диапазона
  useEffect(() => {
    const percent = getPercent(currentValue);
    if (rangeRef.current) {
      rangeRef.current.style.left = `0%`; // Всегда от начала
      rangeRef.current.style.width = `${percent}%`; // До текущего значения
    }
    // Обновляем позицию ползунка в CSS для лучшей синхронизации (необязательно, т.к. input сам двигается)
    // if (inputRef.current) {
    //   inputRef.current.style.setProperty('--thumb-percent', `${percent}%`);
    // }
  }, [currentValue, getPercent]);

  // Вызов onChange при отпускании
  const triggerOnChange = () => {
     if (inputRef.current) {
         onChange(+inputRef.current.value); // Передаем актуальное значение input
     }
  };

  // Обновление внутреннего состояния при движении
   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(+event.target.value);
     // Можно добавить проп для real-time onChange здесь, если нужно
     // onChange(+event.target.value);
  };


  const containerClassName = [
      'slider-container', // Обновляем классы
      disabled ? 'slider--disabled' : '',
      className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassName}>
       {label && <label className="slider-label">{label}</label>}
      <div className="slider"> {/* Обновляем классы */}
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
          className="slider__thumb" // Один ползунок
          disabled={disabled}
        />

        <div className="slider__track-container"> {/* Обновляем классы */}
          <div className="slider__track" />
          <div ref={rangeRef} className="slider__range" />
          {/* Добавляем деления, если step задан */}
           {step && (max - min) / step <= 20 && // Показываем деления, если их не слишком много
              Array.from({ length: (max - min) / step + 1 }).map((_, i) => {
                const tickValue = min + i * step;
                const percent = getPercent(tickValue);
                // Не показываем деления для min и max, т.к. они на краях
                if (tickValue === min || tickValue === max) return null; 
                return (
                  <div
                    key={i}
                    className="slider__tick"
                    style={{ left: `${percent}%` }}
                  />
                );
            })}
        </div>
      </div>
       {showValue && ( // Переименовал
         <div className="slider-value"> {/* Обновляем классы */}
           <span>{currentValue}</span>
         </div>
       )}
    </div>
  );
};

export default Slider; // Экспортируем Slider 