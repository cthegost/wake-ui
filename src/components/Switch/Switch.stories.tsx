import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Текст лейбла рядом с переключателем' },
    checked: { control: 'boolean', description: 'Состояние переключателя (включен/выключен)' },
    disabled: { control: 'boolean', description: 'Отключает переключатель' },
    // onChange обычно управляется состоянием, не через Controls
    // onChange: { action: 'changed', description: 'Событие изменения состояния' }
  },
  args: { // Значения по умолчанию
    label: 'Переключить',
    checked: false,
    disabled: false,
  }
};

export default meta;

// Базовая история с контролируемым состоянием
export const Default: StoryObj<typeof Switch> = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(args.checked || false);
    return (
      <Switch
        {...args}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    );
  },
};

// История для состояния "включено" по умолчанию
export const Checked: StoryObj<typeof Switch> = {
  args: {
    checked: true,
    label: 'Уже включен',
  },
   render: (args) => {
    const [isChecked, setIsChecked] = useState(args.checked || false);
    return (
      <Switch
        {...args}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    );
  },
};


// История без текстового лейбла
export const WithoutLabel: StoryObj<typeof Switch> = {
  args: {
    label: undefined, // Убираем текстовый лейбл
  },
  render: (args) => {
    const [isChecked, setIsChecked] = useState(args.checked || false);
    return (
      <Switch
        {...args}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    );
  },
};

// История для отключенного состояния
export const Disabled: StoryObj<typeof Switch> = {
    args: {
        label: 'Отключен',
        disabled: true,
    },
     render: (args) => {
        // Можно управлять состоянием checked и для disabled
        const [isChecked, setIsChecked] = useState(args.checked || false);
         return (
          <Switch
            {...args}
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)} // onChange все равно нужен для контроля
          />
        );
    },
};

// Отключенный и включенный
export const DisabledChecked: StoryObj<typeof Switch> = {
    args: {
        label: 'Отключен (вкл)',
        checked: true,
        disabled: true,
    },
     render: (args) => {
        const [isChecked, setIsChecked] = useState(args.checked || false);
         return (
          <Switch
            {...args}
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        );
    },
}; 