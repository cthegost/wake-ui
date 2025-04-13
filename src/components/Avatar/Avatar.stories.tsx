import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: 'URL изображения' },
    alt: { control: 'text', description: 'Alt текст' },
    name: { control: 'text', description: 'Имя для инициалов (если нет src)' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Размер аватара',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Форма аватара',
    },
  },
  args: { // Значения по умолчанию
    size: 'medium',
    shape: 'circle',
    alt: 'Аватар пользователя',
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// История с изображением
export const Image: Story = {
  args: {
    src: 'https://via.placeholder.com/150/007bff/ffffff?text=IMG', // Пример URL
    name: 'Имя Пользователя', // Имя нужно для alt текста, если src не загрузится
  },
};

// История с инициалами
export const Initials: Story = {
  args: {
    src: null, // Убираем src, чтобы показать инициалы
    name: 'Антон Хавкин',
  },
};

// История с одной инициалой
export const SingleInitial: Story = {
  args: {
    src: null,
    name: 'Антон',
  },
};


// История с плейсхолдером (без src и name)
export const Placeholder: Story = {
  args: {
    src: null,
    name: '',
  },
};

// История с ошибкой загрузки изображения (покажет инициалы)
export const ImageError: Story = {
  args: {
    src: 'https://nonexistent-image-url.xyz/image.jpg', // Несуществующий URL
    name: 'Ошибка Загрузки',
  },
};

// Разные размеры
export const Small: Story = { args: { size: 'small', name: 'S' } };
export const Medium: Story = { args: { size: 'medium', name: 'M' } };
export const Large: Story = { args: { size: 'large', name: 'L' } };

// Разные формы
export const Circle: Story = { args: { shape: 'circle', name: 'Круг' } };
export const Square: Story = { args: { shape: 'square', name: 'Квадрат' } };

// Квадратный с изображением
export const SquareImage: Story = {
    args: {
        shape: 'square',
        src: 'https://via.placeholder.com/150/28a745/ffffff?text=Квадрат',
        name: 'Квадратный Аватар'
    }
}; 