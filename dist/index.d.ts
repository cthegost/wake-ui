import React from 'react';

type ButtonVariant = 'filled' | 'outline' | 'text';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
}
declare const Button: React.FC<ButtonProps>;

interface PopoverProps {
    trigger: React.ReactElement;
    children: React.ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    offsetValue?: number;
    transitionDuration?: number;
}
declare const Popover: React.FC<PopoverProps>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | null;
    labelVariant?: 'standard' | 'outline';
    placeholder?: string;
}
declare const Input: React.FC<InputProps>;

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
}
declare const Switch: React.FC<SwitchProps>;

type AvatarSize = 'small' | 'medium' | 'large';
type AvatarShape = 'circle' | 'square';
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string | null;
    alt?: string;
    name?: string;
    size?: AvatarSize;
    shape?: AvatarShape;
}
declare const Avatar: React.FC<AvatarProps>;

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'indeterminate'> {
    label?: string;
    indeterminate?: boolean;
}
declare const Checkbox: React.FC<CheckboxProps>;

interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}
interface SelectProps {
    options: SelectOption[];
    value: string | number | null;
    onChange: (value: string | number | null) => void;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    className?: string;
}
declare const Select: React.FC<SelectProps>;

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

export { Avatar, Button, Checkbox, Input, Popover, Select, Slider, Switch };
export type { SelectOption };
