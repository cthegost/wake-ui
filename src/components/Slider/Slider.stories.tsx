import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Slider from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number', description: 'Минимальное значение' },
    max: { control: 'number', description: 'Максимальное значение' },
    step: { control: 'number', description: 'Шаг изменения значения' },
    value: { control: 'number', description: 'Текущее значение' },
    onChange: { action: 'changed', description: 'Callback при изменении значения' },
    disabled: { control: 'boolean', description: 'Отключает слайдер' },
    label: { control: 'text', description: 'Лейбл над слайдером' },
    showValue: { control: 'boolean', description: 'Показывать ли текущее значение' },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    disabled: false,
    label: 'Выберите значение',
    showValue: true,
  }
};

export default meta;

// --- Истории ---

export const Default: StoryObj<typeof Slider> = {
  render: (args) => {
    const [currentValue, setCurrentValue] = useState<number>(args.value);
    return (
      <Slider
        {...args}
        value={currentValue}
        onChange={(newValue) => setCurrentValue(newValue)}
      />
    );
  },
};

export const WithSteps: StoryObj<typeof Slider> = {
  args: {
    min: 0,
    max: 10,
    step: 2,
    value: 4,
    label: 'Слайдер с шагом 2',
    showValue: true,
  },
  render: (args) => {
    const [currentValue, setCurrentValue] = useState<number>(args.value);
    return (
      <Slider
        {...args}
        value={currentValue}
        onChange={(newValue) => setCurrentValue(newValue)}
      />
    );
  },
};


export const WithoutValue: StoryObj<typeof Slider> = {
  args: {
    ...Default.args,
    label: 'Слайдер без значения',
    showValue: false,
  },
  render: (args) => {
    const [currentValue, setCurrentValue] = useState<number>(args.value);
    return (
      <Slider
        {...args}
        value={currentValue}
        onChange={(newValue) => setCurrentValue(newValue)}
      />
    );
  },
};


export const Disabled: StoryObj<typeof Slider> = {
    args: {
        ...Default.args,
        label: 'Отключенный слайдер',
        value: 30,
        disabled: true,
    },
     render: (args) => {
        return <Slider {...args} />;
    },
}; 