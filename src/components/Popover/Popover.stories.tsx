import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Popover from './Popover';
import Button from '../Button/Button'; // Используем нашу кнопку как триггер

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered', // Центрируем триггер
  },
  tags: ['autodocs'],
  argTypes: {
    trigger: { control: false }, // Триггер задается в истории, не через Controls
    children: { control: 'text' }, // Контент поповера можно менять
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Позиция поповера относительно триггера',
    },
    offsetValue: {
      control: { type: 'number' },
      description: 'Отступ от триггера (в пикселях)',
    },
    transitionDuration: {
        control: { type: 'number' },
        description: 'Длительность анимации появления/исчезновения (в мс)',
    }
  },
  args: { // Значения по умолчанию для всех историй
    placement: 'bottom',
    offsetValue: 10,
    children: 'Это контент поповера!',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовая история
export const Default: Story = {
  args: {
    // В качестве триггера передаем компонент Button
    trigger: <Button>Нажми меня</Button>,
  },
};

// История с другим положением
export const TopPlacement: Story = {
  args: {
    trigger: <Button variant="outline">Popover сверху</Button>,
    placement: 'top',
    children: 'Я появляюсь сверху :)',
  },
};

// История с другим контентом
export const CustomContent: Story = {
  args: {
    trigger: <Button variant="text">Сложный контент</Button>,
    placement: 'right',
    children: (
      <div>
        <h4>Заголовок</h4>
        <p>Какой-то текст и <a href="#">ссылка</a>.</p>
        <Button>Кнопка внутри</Button>
      </div>
    ),
  },
};

// Пример с обычным текстом как триггером
export const TextTrigger: Story = {
    args: {
      trigger: <span style={{ borderBottom: '1px dashed blue', cursor: 'pointer' }}>Наведи или кликни</span>,
      placement: 'bottom',
      children: 'Поповер для простого текста.',
    },
}; 