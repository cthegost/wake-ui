import React from 'react';
import './Button.css';
type ButtonVariant = 'filled' | 'outline' | 'text';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
