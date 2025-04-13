import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RichTextEditor, { RichTextEditorProps } from './RichTextEditor';

export default {
  title: 'Components/RichTextEditor',
  component: RichTextEditor,
  argTypes: {
    initialContent: {
      control: 'text',
      description: 'Начальное HTML содержимое редактора',
    },
    editable: {
      control: 'boolean',
      description: 'Включен ли режим редактирования',
      defaultValue: true,
    },
    placeholder: {
        control: 'text',
        description: 'Текст плейсхолдера',
        defaultValue: 'Начните вводить текст...',
    },
    onChange: { action: 'changed', description: 'Событие изменения контента (возвращает HTML)' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Компонент Rich Text Editor на базе TipTap.',
      },
    },
  },
} as Meta<typeof RichTextEditor>;

const Template: StoryFn<RichTextEditorProps> = (args) => {
  // Оставляем локальное состояние, чтобы контролировать initialContent из controls
  const [initialContentForEditor, setInitialContentForEditor] = useState(args.initialContent || '');

  // Обновляем начальное состояние, ТОЛЬКО когда меняется initialContent из controls Storybook
  React.useEffect(() => {
    setInitialContentForEditor(args.initialContent || '');
  }, [args.initialContent]);

  const handleChange = (newContent: string) => {
    // НЕ обновляем локальное состояние здесь при каждом изменении в редакторе
    // setContent(newContent); 
    
    // Просто вызываем action для лога в Storybook (все еще может тормозить с base64)
    args.onChange?.(newContent); 
  };

  // Передаем в редактор только начальное значение из controls
  // и наш обработчик onChange для логгирования.
  // Редактор сам управляет своим внутренним состоянием.
  return <RichTextEditor {...args} initialContent={initialContentForEditor} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  initialContent: `
    <h1>Заголовок первого уровня</h1>
    <p style="text-align: center">Параграф, выровненный <strong>по центру</strong>.</p>
    <h2>Заголовок второго уровня</h2>
    <ul>
      <li>Маркированный список 1</li>
      <li>Маркированный список 2</li>
    </ul>
    <h3>Заголовок третьего уровня</h3>
    <ol>
      <li>Нумерованный список 1</li>
      <li>Нумерованный список 2</li>
    </ol>
    <blockquote>Это цитата. Она немного отступает слева.</blockquote>
    <p style="text-align: right">Параграф, <em>выровненный</em> по правому краю.</p>
    <img src="https://via.placeholder.com/150" alt="Placeholder Image">
    <p>Попробуйте вставить картинку из буфера обмена!</p>
  `,
  editable: true,
  placeholder: 'Введите ваш текст здесь...'
};
Default.parameters = {
    docs: {
        description: {
        story: 'Расширенный пример редактора с заголовками, списками, цитатой, выравниванием и изображением.',
        },
    },
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  initialContent: '<h1>Заголовок</h1><p>Этот контент нельзя редактировать.</p><ul><li>Пункт 1</li><li>Пункт 2</li></ul>',
  editable: false, // Отключаем редактирование
};
ReadOnly.parameters = {
    docs: {
        description: {
        story: 'Пример редактора в режиме только для чтения.',
        },
    },
};

export const EmptyWithPlaceholder = Template.bind({});
EmptyWithPlaceholder.args = {
  initialContent: '',
  editable: true,
  placeholder: 'Здесь появится ваш замечательный текст...',
};
EmptyWithPlaceholder.parameters = {
    docs: {
        description: {
        story: 'Пример пустого редактора с пользовательским плейсхолдером.',
        },
    },
};

export const WithCustomControls = Template.bind({});
WithCustomControls.args = {
  initialContent: '<p>Нажмите на кастомную кнопку!</p>',
  editable: true,
  placeholder: 'Введите текст...',
  renderCustomControls: (editor) => (
    <>
      {/* Пример кастомного разделителя */}
      <div style={{ borderLeft: '1px solid #ccc', height: '1.25em', margin: '0 0.25rem' }} /> 
      {/* Пример кастомной кнопки */}
      <button 
        onClick={() => editor.chain().focus().insertContent('[КАСТОМНЫЙ ТЕКСТ]').run()}
        title="Вставить кастомный текст"
        style={{ fontStyle: 'italic'}} // Просто для примера
      >
        Кастом
      </button>
    </>
  ),
};
WithCustomControls.parameters = {
    docs: {
        description: {
        story: 'Пример редактора с добавлением кастомных контролов через проп `renderCustomControls`.',
        },
    },
}; 