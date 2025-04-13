import './global.css';

export { default as Button } from './components/Button/Button';
export { default as Popover } from './components/Popover/Popover';
export { default as Input } from './components/Input/Input';
export { default as Switch } from './components/Switch/Switch';
export { default as Avatar } from './components/Avatar/Avatar';
export { default as Checkbox } from './components/Checkbox/Checkbox';
export { default as Select } from './components/Select/Select';
export type { SelectOption } from './components/Select/Select';
export { default as Slider } from './components/Slider/Slider';
export { default as Modal } from './components/Modal/Modal';
export { default as Loader } from './components/Loader/Loader';
export { default as Radio } from './components/Radio/Radio';
export { default as RadioGroup } from './components/Radio/RadioGroup';
export { default as ButtonGroup } from './components/ButtonGroup/ButtonGroup';
export { default as Badge } from './components/Badge/Badge';
export { default as Divider } from './components/Divider/Divider';
export { default as Tooltip } from './components/Tooltip/Tooltip';
export { default as Alert } from './components/Alert/Alert';
export type { AlertProps, AlertStatus } from './components/Alert/Alert';
export { AlertProvider, useAlert } from './components/Alert/AlertProvider';
export type { AlertState } from './components/Alert/AlertProvider';
export { default as RichTextEditor } from './components/RichTextEditor/RichTextEditor';
export type { RichTextEditorProps } from './components/RichTextEditor/RichTextEditor';

// Стили
// Если ваши стили собираются отдельно (например, rollup-plugin-postcss извлекает их в styles.css),
// то этот импорт здесь не нужен для сборки, но может быть полезен для автодополнения IDE.
// import './styles/main.css'; // Убедитесь, что путь правильный 