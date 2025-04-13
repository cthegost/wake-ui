import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import Button from '../Button/Button'; // Для триггера

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false, description: 'Элемент-триггер' },
    label: { control: 'text', description: 'Текст подсказки' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Расположение тултипа',
    },
    delay: { control: 'number', description: 'Задержка появления (в мс)' },
    hasArrow: { control: 'boolean', description: 'Показывать ли стрелку' },
    className: { control: 'text', description: 'Дополнительный CSS класс для тултипа' },
    style: { control: 'object', description: 'Инлайн стили для тултипа' },
  },
  args: { // Значения по умолчанию
    label: 'Это подсказка!',
    placement: 'top',
    delay: 0,
    hasArrow: true,
  },
};

export default meta;

// --- Истории ---

export const Default: StoryObj<typeof Tooltip> = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">Наведи на меня</Button>
    </Tooltip>
  ),
};

export const PlacementBottom: StoryObj<typeof Tooltip> = {
    name: 'Placement Bottom',
    args: {
        placement: 'bottom',
        label: 'Подсказка снизу'
    },
    render: (args) => (
        <Tooltip {...args}>
          <Button variant="outline">Наведи</Button>
        </Tooltip>
    ),
};

export const PlacementLeft: StoryObj<typeof Tooltip> = {
    name: 'Placement Left',
    args: {
        placement: 'left',
        label: 'Подсказка слева'
    },
    render: (args) => (
        <Tooltip {...args}>
          <Button variant="outline">Наведи</Button>
        </Tooltip>
    ),
};

export const PlacementRight: StoryObj<typeof Tooltip> = {
    name: 'Placement Right',
    args: {
        placement: 'right',
        label: 'Подсказка справа'
    },
    render: (args) => (
        <Tooltip {...args}>
          <Button variant="outline">Наведи</Button>
        </Tooltip>
    ),
};

export const WithoutArrow: StoryObj<typeof Tooltip> = {
    name: 'Without Arrow',
    args: {
        hasArrow: false,
        label: 'Подсказка без стрелки'
    },
    render: (args) => (
        <Tooltip {...args}>
          <Button variant="outline">Без стрелки</Button>
        </Tooltip>
    ),
};

export const WithDelay: StoryObj<typeof Tooltip> = {
    name: 'With Delay',
    args: {
        delay: 500, // Задержка 500мс
        label: 'Появляюсь с задержкой'
    },
    render: (args) => (
        <Tooltip {...args}>
          <Button variant="outline">Подержи мышь</Button>
        </Tooltip>
    ),
};

export const OnDisabledButton: StoryObj<typeof Tooltip> = {
    name: 'On Disabled Button',
    args: {
        label: 'Эта кнопка отключена'
    },
    render: (args) => (
        // Чтобы тултип работал на disabled элементе, нужна обертка
        <Tooltip {...args}>
          <span style={{ display: 'inline-block', cursor: 'not-allowed' }}>
             <Button variant="filled" disabled style={{ pointerEvents: 'none' }}>Неактивная кнопка</Button>
          </span>
        </Tooltip>
    ),
}; 