import React from 'react';
import './Popover.css';
interface PopoverProps {
    trigger: React.ReactElement;
    children: React.ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    offsetValue?: number;
    transitionDuration?: number;
}
declare const Popover: React.FC<PopoverProps>;
export default Popover;
