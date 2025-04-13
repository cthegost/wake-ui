import React from 'react';
import './Input.css';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | null;
    labelVariant?: 'standard' | 'outline';
    placeholder?: string;
}
declare const Input: React.FC<InputProps>;
export default Input;
