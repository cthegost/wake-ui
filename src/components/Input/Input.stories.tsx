import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Текст лейбла над полем' },
    labelVariant: {
        control: 'select',
        options: ['standard', 'outline'],
        description: 'Вариант отображения лейбла'
    },
    error: { control: 'text', description: 'Текст ошибки под полем (null для отсутствия)' },
    disabled: { control: 'boolean', description: 'Отключает поле' },
    placeholder: { control: 'text', description: 'Плейсхолдер внутри поля' },
    type: {
        control: 'select',
        options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
        description: 'Тип поля ввода (HTML input type)'
    },
    // value и onChange обычно управляются состоянием, не через Controls, но можно добавить для дебага
    value: { control: 'text', description: 'Значение поля (контролируемое)' },
    // onChange: { action: 'changed', description: 'Событие изменения значения' }
  },
  args: { // Значения по умолчанию для всех историй
    label: 'Метка поля',
    labelVariant: 'standard',
    placeholder: 'Введите текст...',
    error: null,
    disabled: false,
    type: 'text',
  }
};

export default meta;

// Базовая история с контролируемым состоянием
export const Default: StoryObj<typeof Input> = {
  render: (args) => {
    // Используем useState для демонстрации контролируемого инпута
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

// История без лейбла
export const WithoutLabel: StoryObj<typeof Input> = {
  args: {
    label: undefined, // Убираем лейбл
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

// История с ошибкой
export const WithError: StoryObj<typeof Input> = {
  args: {
    error: 'Это обязательное поле', // Устанавливаем текст ошибки
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};


// История для типа password
export const Password: StoryObj<typeof Input> = {
    args: {
        label: 'Пароль',
        type: 'password',
        placeholder: 'Введите пароль',
    },
    render: (args) => {
        const [value, setValue] = useState('');
        return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
    },
};

// История для отключенного состояния
export const Disabled: StoryObj<typeof Input> = {
    args: {
        label: 'Отключено',
        disabled: true,
        placeholder: 'Нельзя редактировать',
    },
     render: (args) => {
        // Для disabled можно не использовать state
        return <Input {...args} />;
    },
};

// История для Outline варианта
export const OutlineLabel: StoryObj<typeof Input> = {
  args: {
    labelVariant: 'outline',
    label: 'Лейбл в рамке',
    placeholder: undefined, 
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

// История для Outline варианта с ошибкой
export const OutlineWithError: StoryObj<typeof Input> = {
  args: {
    labelVariant: 'outline',
    label: 'Поле с ошибкой',
    placeholder: undefined,
    error: 'Неверное значение',
  },
   render: (args) => {
    const [value, setValue] = useState('some value');
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
}; 