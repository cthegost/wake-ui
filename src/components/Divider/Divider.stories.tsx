import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Divider from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'Ориентация разделителя',
    },
    inset: { control: 'boolean', description: 'Добавить отступы по краям' },
    className: { control: 'text', description: 'Дополнительный CSS класс' },
    style: { control: 'object', description: 'Инлайн стили' },
  },
  args: {
    orientation: 'horizontal',
    inset: false,
  },
};

export default meta;

// --- Истории ---

export const Horizontal: StoryObj<typeof Divider> = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div style={{ width: '200px' }}> {/* Демонстрация в контейнере */} 
      <span>Верх</span>
      <Divider {...args} />
      <span>Низ</span>
    </div>
  )
};

export const HorizontalInset: StoryObj<typeof Divider> = {
  name: 'Horizontal Inset',
  args: {
    orientation: 'horizontal',
    inset: true,
  },
  render: (args) => (
    <div style={{ width: '200px' }}> 
      <span>Верх</span>
      <Divider {...args} />
      <span>Низ</span>
    </div>
  )
};

export const Vertical: StoryObj<typeof Divider> = {
  args: {
    orientation: 'vertical',
    inset: true
  },
  render: (args) => (
    <div style={{ display: 'flex', height: '50px', alignItems: 'center' }}> {/* Демонстрация в контейнере */} 
      <span>Лево</span>
      <Divider {...args} />
      <span>Право</span>
    </div>
  )
};

export const VerticalInset: StoryObj<typeof Divider> = {
  name: 'Vertical Inset',
  args: {
    orientation: 'vertical',
    inset: true,
  },
  render: (args) => (
    <div style={{ display: 'flex', height: '50px', alignItems: 'center' }}> 
      <span>Лево</span>
      <Divider {...args} />
      <span>Право</span>
    </div>
  )
}; 