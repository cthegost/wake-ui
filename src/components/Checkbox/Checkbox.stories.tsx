import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Текст лейбла рядом с чекбоксом' },
    checked: { control: 'boolean', description: 'Состояние: отмечен / не отмечен' },
    indeterminate: { control: 'boolean', description: 'Состояние: неопределенное' },
    disabled: { control: 'boolean', description: 'Отключает чекбокс' },
    // onChange: { action: 'changed' },
  },
  args: { // Значения по умолчанию
    label: 'Метка чекбокса',
    checked: false,
    indeterminate: false,
    disabled: false,
  }
};

export default meta;

// --- Базовые истории ---

export const Default: StoryObj<typeof Checkbox> = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(args.checked);
    // Сбрасываем indeterminate при явном клике пользователя
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        // Здесь может быть логика, которая также сбрасывает indeterminate,
        // но в Storybook для простоты оставим управление через args.
    };
    return <Checkbox {...args} checked={isChecked} onChange={handleChange} />;
  },
};

export const Checked: StoryObj<typeof Checkbox> = {
  args: { checked: true, label: 'Уже отмечен' },
  render: (args) => {
    const [isChecked, setIsChecked] = useState(args.checked);
    return <Checkbox {...args} checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />;
  },
};

export const Indeterminate: StoryObj<typeof Checkbox> = {
  args: { indeterminate: true, label: 'Неопределенное состояние' },
   render: (args) => {
    // Для демонстрации indeterminate часто управляют checked и indeterminate извне
    const [isChecked, setIsChecked] = useState(false); // Может быть true или false
    const [isIndeterminate, setIsIndeterminate] = useState(args.indeterminate);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        setIsChecked(newChecked);
        setIsIndeterminate(false); // Сбрасываем indeterminate при клике
    };

    return <Checkbox {...args} label={`Checked: ${isChecked}, Indet: ${isIndeterminate}`} checked={isChecked} indeterminate={isIndeterminate} onChange={handleChange} />;
  },
};

export const Disabled: StoryObj<typeof Checkbox> = {
  args: { disabled: true, label: 'Отключен (не отмечен)' },
  render: (args) => <Checkbox {...args} />, // Можно не использовать state
};

export const DisabledChecked: StoryObj<typeof Checkbox> = {
  args: { disabled: true, checked: true, label: 'Отключен (отмечен)' },
  render: (args) => <Checkbox {...args} />,
};

export const DisabledIndeterminate: StoryObj<typeof Checkbox> = {
  args: { disabled: true, indeterminate: true, label: 'Отключен (неопределен)' },
  render: (args) => <Checkbox {...args} />,
};

// --- Пример использования Indeterminate ---
export const SelectAllExample: StoryObj = {
  name: 'Пример: Выбрать все',
  render: () => {
    const options = ['Яблоко', 'Банан', 'Апельсин'];
    const [selected, setSelected] = useState<string[]>(['Банан']); // Изначально выбран 'Банан'

    const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(e.target.checked ? options : []);
    };

    const handleChildChange = (option: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        
      if (e.target.checked) {
        setSelected([...selected, option]);
      } else {
        setSelected(selected.filter(item => item !== option));
      }
    };

    const isAllSelected = selected.length === options.length;
    const isIndeterminate = selected.length > 0 && selected.length < options.length;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Checkbox
          label="Выбрать все"
          checked={isAllSelected}
          indeterminate={isIndeterminate}
          onChange={handleParentChange}
        />
        <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {options.map(option => (
            <Checkbox
              key={option}
              label={option}
              checked={selected.includes(option)}
              onChange={handleChildChange(option)}
            />
          ))}
        </div>
      </div>
    );
  }
}; 