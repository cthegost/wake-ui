import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';
import RadioGroup from './RadioGroup';

// --- Meta для RadioGroup --- 
const metaRadioGroup: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Общий лейбл для группы' },
    options: { control: 'object', description: 'Массив опций {label, value, disabled?}' },
    value: { control: 'text', description: 'Выбранное значение (value из options)' },
    onChange: { action: 'changed', description: 'Callback при изменении значения' },
    name: { control: 'text', description: 'Атрибут name для всех radio в группе' },
    disabled: { control: 'boolean', description: 'Отключить всю группу' },
    layout: {
        control: { type: 'radio' },
        options: ['vertical', 'horizontal'],
        description: 'Расположение опций',
    },
    className: { control: 'text', description: 'Дополнительный CSS класс для контейнера группы' },
  },
  args: {
    name: 'radio-group-example',
    label: 'Выберите опцию',
    options: [
      { label: 'Опция 1', value: 'opt1' },
      { label: 'Опция 2', value: 'opt2' },
      { label: 'Опция 3 (отключена)', value: 'opt3', disabled: true },
      { label: 'Опция 4', value: 'opt4' },
    ],
    value: 'opt1', // Значение по умолчанию для примера
    disabled: false,
    layout: 'vertical',
  },
};

export default metaRadioGroup; // Экспортируем мету для RadioGroup по умолчанию

// --- Истории для RadioGroup --- 

export const DefaultGroup: StoryObj<typeof RadioGroup> = {
  name: 'RadioGroup - Default',
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState<string | number | null>(args.value);
    // Обновляем состояние при изменении args.value из Controls
    React.useEffect(() => {
        setSelectedValue(args.value);
    }, [args.value]);

    const handleChange = (newValue: string | number) => {
        setSelectedValue(newValue);
        args.onChange(newValue); // Вызываем action
    };
    return <RadioGroup {...args} value={selectedValue} onChange={handleChange} />;
  },
};

export const HorizontalGroup: StoryObj<typeof RadioGroup> = {
    name: 'RadioGroup - Horizontal',
    args: {
        layout: 'horizontal',
        label: 'Горизонтальная группа',
        value: 'opt2',
    },
    render: (args) => {
        const [selectedValue, setSelectedValue] = useState<string | number | null>(args.value);
        React.useEffect(() => { setSelectedValue(args.value); }, [args.value]);
        const handleChange = (newValue: string | number) => {
            setSelectedValue(newValue);
            args.onChange(newValue);
        };
        return <RadioGroup {...args} value={selectedValue} onChange={handleChange} />;
    },
};

export const DisabledGroup: StoryObj<typeof RadioGroup> = {
    name: 'RadioGroup - Disabled',
    args: {
        disabled: true,
        label: 'Отключенная группа',
        value: 'opt1',
    },
    render: (args) => {
        // Здесь не нужно локальное состояние, т.к. группа отключена
        return <RadioGroup {...args} />;
    },
};

// --- Meta и Истории для отдельного Radio --- 

// Можно создать отдельную мету и истории для Radio, если есть 
// специфические кейсы, не покрываемые RadioGroup.
// Например:
const metaRadio: Meta<typeof Radio> = {
  title: 'Components/Radio', // Отдельная категория для Radio
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: {
    label: 'Отдельная Radio кнопка',
    name: 'single-radio',
    value: 'single',
    checked: false,
    disabled: false,
  },
};

// Отдельный экспорт меты для Radio, если нужно отображать в Storybook отдельно
// export default metaRadio; // Можете раскомментировать, если хотите Radio как главную страницу

export const SingleRadio: StoryObj<typeof Radio> = {
    name: 'Radio - Single', // Имя для отображения в сайдбаре
    // Привязываем историю к metaRadio
    parameters: { ...metaRadio }, // Наследуем параметры и argTypes из metaRadio
    render: (args) => {
        // Контролируем состояние checked внутри истории
        const [isChecked, setIsChecked] = useState(args.checked);
        // Синхронизируем с Controls
        React.useEffect(() => { setIsChecked(args.checked); }, [args.checked]);
        
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setIsChecked(event.target.checked);
            args.onChange?.(event); // Вызываем action, если он есть
        };
        
        return <Radio {...args} checked={isChecked} onChange={handleChange} />;
    },
}; 