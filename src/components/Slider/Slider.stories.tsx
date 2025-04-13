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
    label: { control: 'text', description: 'Лейбл над/рядом со слайдером' },
    showValue: { control: 'boolean', description: 'Показывать ли текущее значение' },
    orientation: {
        control: { type: 'radio' },
        options: ['horizontal', 'vertical'],
        description: 'Ориентация слайдера',
    },
    className: { control: 'text', description: 'Дополнительный CSS класс' },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    disabled: false,
    label: 'Выберите значение',
    showValue: true,
    orientation: 'horizontal',
  }
};

export default meta;

// --- Истории ---

const SliderWithState: React.FC<React.ComponentProps<typeof Slider>> = (args) => {
    const [currentValue, setCurrentValue] = useState(args.value);

    React.useEffect(() => {
        setCurrentValue(args.value);
    }, [args.value]);

    const handleChange = (newValue: number) => {
        setCurrentValue(newValue);
        args.onChange(newValue);
    };

    return <Slider {...args} value={currentValue} onChange={handleChange} />;
};

export const Horizontal: StoryObj<typeof Slider> = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => <SliderWithState {...args} />,
};

export const Vertical: StoryObj<typeof Slider> = {
    args: {
        orientation: 'vertical',
        label: 'Вертикальный слайдер',
    },
    decorators: [
        (Story) => (
          <div style={{ height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Story />
          </div>
        ),
    ],
    render: (args) => <SliderWithState {...args} />,
};

export const WithSteps: StoryObj<typeof Slider> = {
  args: {
    step: 10,
    showValue: true,
    label: 'Шаг 10',
  },
  render: (args) => <SliderWithState {...args} />,
};

export const Disabled: StoryObj<typeof Slider> = {
    args: {
        disabled: true,
        value: 25,
        label: 'Отключенный',
    },
    render: (args) => <SliderWithState {...args} />,
}; 