import React from 'react';
import './Select.css';
export interface SelectOption {
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
export default Select;
