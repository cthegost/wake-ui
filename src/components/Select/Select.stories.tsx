import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Select, { SelectOption } from './Select'; // Импортируем тип опции

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object', description: 'Массив опций [{value, label, disabled?}]' },
    value: { control: 'text', description: 'Выбранное значение (value опции)' },
    onChange: { action: 'changed', description: 'Callback при изменении значения' },
    placeholder: { control: 'text', description: 'Текст, когда ничего не выбрано' },
    label: { control: 'text', description: 'Лейбл над селектом' },
    disabled: { control: 'boolean', description: 'Отключает селект' },
  },
};

export default meta;

// Пример опций
const defaultOptions: SelectOption[] = [
  { value: 'option1', label: 'Опция 1' },
  { value: 'option2', label: 'Опция 2 (длинный текст, чтобы проверить переполнение)' },
  { value: 'option3', label: 'Опция 3' },
  { value: 'option4', label: 'Опция 4 (отключена)', disabled: true },
  { value: 5, label: 'Опция 5 (числовое значение)' },
];


// Базовая история с контролируемым состоянием
export const Default: StoryObj<typeof Select> = {
  args: {
    options: defaultOptions,
    placeholder: 'Выберите фрукт',
    label: 'Фрукты',
  },
  render: (args) => {
    const [currentValue, setCurrentValue] = useState<string | number | null>(null); // Начальное значение null
    return (
      <Select
        {...args}
        value={currentValue}
        onChange={(newValue) => setCurrentValue(newValue)}
      />
    );
  },
};

// История с предвыбранным значением
export const WithValue: StoryObj<typeof Select> = {
  args: {
    options: defaultOptions,
    label: 'Фрукты',
    value: 'option2', // Предвыбрана Опция 2
  },
   render: (args) => {
    const [currentValue, setCurrentValue] = useState<string | number | null>(args.value);
    return (
      <Select
        {...args}
        value={currentValue}
        onChange={(newValue) => setCurrentValue(newValue)}
      />
    );
  },
};

// История без лейбла и плейсхолдера
export const Minimal: StoryObj<typeof Select> = {
  args: {
    options: defaultOptions.slice(0, 2), // Только первые две опции
    label: undefined,
    placeholder: undefined,
  },
   render: (args) => {
    const [currentValue, setCurrentValue] = useState<string | number | null>(defaultOptions[0].value); // Выберем первую опцию
    return (
      <Select
        {...args}
        value={currentValue}
        onChange={(newValue) => setCurrentValue(newValue)}
      />
    );
  },
};


// История с отключенным состоянием
export const Disabled: StoryObj<typeof Select> = {
    args: {
        options: defaultOptions,
        label: 'Отключенный селект',
        value: 'option1',
        disabled: true,
    },
     render: (args) => {
        // Для disabled можно не использовать state, если не нужно менять значение
        return <Select {...args} />;
    },
}; 