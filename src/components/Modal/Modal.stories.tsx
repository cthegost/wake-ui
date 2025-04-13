import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import Button from '../Button/Button'; // Импортируем Button для триггера

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    // Модальное окно рендерится через портал, поэтому layout: 'centered'
    // не повлияет на его позицию, но оставим для консистентности.
    layout: 'centered',
    // Отключаем бэкграунды, т.к. есть оверлей
    backgrounds: { disable: true },
    // Добавляем div#modal-root, куда будет рендериться модалка
    docs: {
      story: {
         inline: false, // Рендерить историю в iframe
         iframeHeight: 400, // Высота iframe
         prepare: async ({ canvasElement }) => {
            let root = canvasElement.ownerDocument.getElementById('modal-root');
            if (!root) {
              root = canvasElement.ownerDocument.createElement('div');
              root.id = 'modal-root';
              canvasElement.ownerDocument.body.appendChild(root);
            }
         },
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean', description: 'Открыто ли модальное окно' },
    onClose: { action: 'closed', description: 'Callback при закрытии окна' },
    title: { control: 'text', description: 'Заголовок модального окна' },
    children: { control: 'text', description: 'Содержимое модального окна' },
    className: { control: 'text', description: 'Дополнительный CSS класс' },
  },
  args: { // Значения по умолчанию
    isOpen: false, // По умолчанию закрыто в Controls
    title: 'Заголовок окна',
    children: 'Это содержимое модального окна. Вы можете добавить сюда любой React узел.'
  },
};

export default meta;

// --- Пример использования в истории ---

export const Default: StoryObj<typeof Modal> = {
  render: (args) => {
    // Используем локальное состояние для управления открытием/закрытием в примере
    const [isModalOpen, setIsModalOpen] = useState(args.isOpen);

    // Функция для закрытия, которая также вызывает action из argTypes
    const handleClose = () => {
        setIsModalOpen(false);
        args.onClose(); // Вызываем пропс onClose для Storybook actions
    };

    return (
      <>
        {/* Кнопка для открытия модального окна */}
        <Button variant="filled" onClick={() => setIsModalOpen(true)}>
          Открыть модальное окно
        </Button>

        {/* Сам компонент модального окна */}
        <Modal
          {...args} // Передаем все аргументы из Storybook Controls
          isOpen={isModalOpen} // Управляем состоянием локально
          onClose={handleClose} // Передаем нашу функцию закрытия
        >
          {/* Передаем children из аргументов */}
          {args.children}
        </Modal>
      </>
    );
  },
  args: {
    // Переопределяем isOpen для начального состояния в Canvas
    // В Controls оно будет управляться отдельно
    isOpen: false, // Начнем с закрытого состояния в отображаемом примере
  }
};

export const LongContent: StoryObj<typeof Modal> = {
    render: (args) => {
        const [isModalOpen, setIsModalOpen] = useState(args.isOpen);
        const handleClose = () => {
            setIsModalOpen(false);
            args.onClose();
        };
        return (
          <>
            <Button variant="filled" onClick={() => setIsModalOpen(true)}>
              Открыть окно с длинным контентом
            </Button>
            <Modal {...args} isOpen={isModalOpen} onClose={handleClose}>
              <h2>Длинный заголовок секции</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
              <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
              <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>
              <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
            </Modal>
          </>
        );
    },
    args: {
        isOpen: false,
        title: 'Окно с прокруткой',
    }
};

export const WithoutTitle: StoryObj<typeof Modal> = {
    render: (args) => {
        const [isModalOpen, setIsModalOpen] = useState(args.isOpen);
        const handleClose = () => {
            setIsModalOpen(false);
            args.onClose();
        };
        return (
          <>
            <Button variant="filled" onClick={() => setIsModalOpen(true)}>
              Открыть окно без заголовка
            </Button>
            <Modal {...args} isOpen={isModalOpen} onClose={handleClose}>
               Это контент модального окна без заголовка.
            </Modal>
          </>
        );
    },
    args: {
        isOpen: false,
        title: '', // Пустой заголовок
        children: 'Это контент модального окна без заголовка.'
    }
}; 