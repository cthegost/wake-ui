import React from 'react';
import './Checkbox.css';
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'indeterminate'> {
    label?: string;
    indeterminate?: boolean;
}
declare const Checkbox: React.FC<CheckboxProps>;
export default Checkbox;
