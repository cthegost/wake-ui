import React from 'react';
import './Switch.css';
interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
}
declare const Switch: React.FC<SwitchProps>;
export default Switch;
