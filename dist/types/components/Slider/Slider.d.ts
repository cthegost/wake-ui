import React from 'react';
import './Slider.css';
interface SliderProps {
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (newValue: number) => void;
    disabled?: boolean;
    label?: string;
    showValue?: boolean;
    className?: string;
}
declare const Slider: React.FC<SliderProps>;
export default Slider;
