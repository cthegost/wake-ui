import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: 'Содержимое бейджа' },
    variant: {
      control: { type: 'radio' },
      options: ['filled', 'outline'],
      description: 'Вариант отображения',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Цветовая схема',
    },
    className: { control: 'text', description: 'Дополнительный CSS класс' },
    style: { control: 'object', description: 'Инлайн стили' },
  },
  args: { // Значения по умолчанию
    children: 'Badge',
    variant: 'filled',
    colorScheme: 'primary',
  },
};

export default meta;

// --- Истории ---

export const Default: StoryObj<typeof Badge> = {
  render: (args) => <Badge {...args} />,
};

// История для демонстрации всех вариантов и цветов
export const AllVariants: StoryObj<typeof Badge> = {
  name: 'All Variants & Colors',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {/* Filled */} 
      <div style={{ display: 'flex', gap: '10px' }}>
        <Badge variant="filled" colorScheme="primary">Primary</Badge>
        <Badge variant="filled" colorScheme="secondary">Secondary</Badge>
        <Badge variant="filled" colorScheme="success">Success</Badge>
        <Badge variant="filled" colorScheme="warning">Warning</Badge>
        <Badge variant="filled" colorScheme="danger">Danger</Badge>
      </div>
      {/* Outline */} 
      <div style={{ display: 'flex', gap: '10px' }}>
         <Badge variant="outline" colorScheme="primary">Primary</Badge>
        <Badge variant="outline" colorScheme="secondary">Secondary</Badge>
        <Badge variant="outline" colorScheme="success">Success</Badge>
        <Badge variant="outline" colorScheme="warning">Warning</Badge>
        <Badge variant="outline" colorScheme="danger">Danger</Badge>
      </div>
    </div>
  ),
};

// Пример с числом
export const WithNumber: StoryObj<typeof Badge> = {
    name: 'With Number',
    args: {
        children: '12',
        colorScheme: 'danger',
        style: { /* Можно добавить стили для круглого бейджа */ }
    }
};

// Пример позиционирования на элементе
export const PositionedOnElement: StoryObj<typeof Badge> = {
  name: 'Positioned on Element',
  render: (args) => (
    // Родительский контейнер для позиционирования
    <div style={{
        position: 'relative',
        display: 'inline-block', // Чтобы контейнер был по размеру контента
        padding: '10px', // Просто для визуального отступа
        border: '1px solid #ccc', // Визуализация контейнера
        borderRadius: '4px'
    }}>
      <span>Элемент</span> {/* Элемент, на котором висит Badge */} 
      
      {/* Сам Badge с абсолютным позиционированием */}
      <Badge 
        {...args} 
        style={{
            position: 'absolute',
            top: 0, // Позиция сверху
            right: 0, // Позиция справа
            transform: 'translate(50%, -50%)', // Сдвигаем для центрирования на углу
            minWidth: '20px', // Сделаем чуть шире для круглого вида с цифрой
            height: '20px', // И той же высоты
            fontSize: '0.7rem', // Можно чуть уменьшить шрифт для цифр
            padding: '0.1em', // Уменьшим padding для компактности
            ...args.style // Позволяем переопределять стили
        }}
      />
    </div>
  ),
  args: {
    children: '3', // Пример с числом
    variant: 'filled',
    colorScheme: 'danger',
  },
}; 