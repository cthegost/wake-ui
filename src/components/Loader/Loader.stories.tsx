import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number' },
      description: 'Размер лоадера в пикселях',
    },
    className: { control: 'text', description: 'Дополнительный CSS класс' },
    style: { control: 'object', description: 'Инлайн стили' },
  },
  args: {
    size: 32,
  }
};

export default meta;

// --- Истории ---

export const Default: StoryObj<typeof Loader> = {
  render: (args) => <Loader {...args} />,
};

export const CustomSize16: StoryObj<typeof Loader> = {
    name: "Size 16px",
    args: {
        size: 16,
    },
    render: (args) => <Loader {...args} />,
};

export const CustomSize48: StoryObj<typeof Loader> = {
    name: "Size 48px",
    args: {
        size: 48,
    },
    render: (args) => <Loader {...args} />,
};

export const CustomSize64: StoryObj<typeof Loader> = {
    name: "Size 64px",
    args: {
        size: 64,
    },
    render: (args) => <Loader {...args} />,
};

// Пример с текстом рядом
export const WithText: StoryObj<typeof Loader> = {
  name: "With Text (size 16)",
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <Loader {...args} />
      <span>Загрузка данных...</span>
    </div>
  ),
   args: {
        size: 16,
    },
};

// Пример с кастомным цветом через style
export const CustomColor: StoryObj<typeof Loader> = {
    name: "Custom Color (style)",
    args: {
        size: 40,
        style: { borderColor: '#e6007e', borderBottomColor: 'transparent' }
    },
    render: (args) => <Loader {...args} />,
}; 