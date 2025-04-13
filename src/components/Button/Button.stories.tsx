import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button'; // Импортируем наш компонент

// Базовая мета-информация о компоненте для Storybook
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Название компонента/группы в интерфейсе Storybook
  component: Button,         // Сам компонент
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // Эта часть позволяет Storybook автоматически генерировать документацию для аргументов (props)
  tags: ['autodocs'],
  // Здесь мы можем описать аргументы компонента
  argTypes: {
    children: { control: 'text', description: 'Содержимое кнопки' },
    variant: {
      control: { type: 'radio' },
      options: ['filled', 'outline', 'text'],
      description: 'Вариант отображения'
    },
    disabled: { control: 'boolean', description: 'Отключает кнопку' },
    loading: { control: 'boolean', description: 'Показывает лоадер и отключает кнопку' },
    onClick: { action: 'clicked', description: 'Callback при клике' },
    // Добавляем className, чтобы можно было передавать доп. классы через Storybook
    className: { control: 'text', description: 'Дополнительные CSS классы' },
  },
  // Устанавливаем значения по умолчанию для всех историй этого компонента
  args: { 
    children: 'Нажми меня',
    variant: 'filled',
    disabled: false,
    loading: false,
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// История для варианта 'filled' (по умолчанию)
export const Filled: Story = {
  args: {
    variant: 'filled',
    children: 'Filled Button',
  },
};

// История для варианта 'outline'
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

// История для варианта 'text'
export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Text Button',
  },
};

// История для отключенной кнопки (можно комбинировать с вариантами)
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button'
  },
};

// Пример отключенной outline кнопки
export const DisabledOutline: Story = {
    args: {
        variant: 'outline',
        disabled: true,
        children: 'Disabled Outline'
    },
};

// Можно добавить больше историй для разных состояний кнопки
// Например, кнопка с другим текстом:
export const AnotherText: Story = {
    args: {
        children: 'Другой текст',
    },
};

// <-- Новая история для состояния загрузки -->
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Загрузка...', // Текст все равно будет скрыт
  },
  // Можно добавить рендер функцию для демонстрации переключения
  // render: (args) => { ... }
};

// Пример для разных вариантов в состоянии загрузки
export const LoadingVariants: Story = {
    name: 'Loading States',
    render: () => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button variant="filled" loading>Processing...</Button>
            <Button variant="outline" loading>Processing...</Button>
            <Button variant="text" loading>Processing...</Button>
        </div>
    )
}; 