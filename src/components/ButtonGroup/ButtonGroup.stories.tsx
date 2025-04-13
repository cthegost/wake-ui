import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ButtonGroup from './ButtonGroup';
import Button from '../Button/Button'; // Импортируем Button для примеров

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false, description: 'Дочерние элементы (кнопки)' },
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'Ориентация группы',
    },
    className: { control: 'text', description: 'Дополнительный CSS класс' },
    style: { control: 'object', description: 'Инлайн стили' },
  },
  args: {
    orientation: 'horizontal',
  },
};

export default meta;

// --- Истории ---

export const HorizontalFilled: StoryObj<typeof ButtonGroup> = {
  name: 'Horizontal - Filled',
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="filled">Лево</Button>
      <Button variant="filled">Центр</Button>
      <Button variant="filled">Право</Button>
    </ButtonGroup>
  ),
};

export const HorizontalOutline: StoryObj<typeof ButtonGroup> = {
  name: 'Horizontal - Outline',
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Лево</Button>
      <Button variant="outline">Центр</Button>
      <Button variant="outline">Право</Button>
    </ButtonGroup>
  ),
};

export const HorizontalText: StoryObj<typeof ButtonGroup> = {
    name: 'Horizontal - Text',
    args: {
        orientation: 'horizontal',
    },
    render: (args) => (
        <ButtonGroup {...args}>
            <Button variant="text">Один</Button>
            <Button variant="text">Два</Button>
            <Button variant="text">Три</Button>
        </ButtonGroup>
    ),
};

export const VerticalFilled: StoryObj<typeof ButtonGroup> = {
  name: 'Vertical - Filled',
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="filled">Верх</Button>
      <Button variant="filled">Центр</Button>
      <Button variant="filled">Низ</Button>
    </ButtonGroup>
  ),
};

export const VerticalOutline: StoryObj<typeof ButtonGroup> = {
    name: 'Vertical - Outline',
    args: {
        orientation: 'vertical',
    },
    render: (args) => (
        <ButtonGroup {...args}>
            <Button variant="outline">Верх</Button>
            <Button variant="outline">Центр</Button>
            <Button variant="outline">Низ</Button>
        </ButtonGroup>
    ),
}; 