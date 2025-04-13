import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Alert, { AlertProps } from './Alert';
import { AlertProvider, useAlert } from './AlertProvider'; // Импортируем AlertProvider и хук

export default {
  title: 'Components/Alert',
  component: Alert,
  decorators: [ // Добавляем декоратор для AlertProvider
    (Story) => (
      <AlertProvider>
        <Story />
      </AlertProvider>
    ),
  ],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'danger'],
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    isClosable: {
      control: 'boolean',
    },
    onClose: { action: 'closed' }, // Для отслеживания события закрытия
  },
  parameters: {
    docs: {
      description: {
        component: 'Компонент Alert отображает короткие важные сообщения для пользователя.',
      },
    },
  },
} as Meta<typeof Alert>;

// Базовый шаблон для Alert
const Template: StoryFn<AlertProps> = (args) => <Alert {...args} />;

// --- Истории для одиночного Alert ---

export const Info = Template.bind({});
Info.args = {
  id: 'info-alert',
  status: 'info',
  title: 'Информация',
  description: 'Это информационное сообщение.',
  isClosable: true,
};
Info.parameters = {
  docs: {
    description: {
      story: 'Пример информационного уведомления.',
    },
  },
};


export const Success = Template.bind({});
Success.args = {
  id: 'success-alert',
  status: 'success',
  title: 'Успех!',
  description: 'Операция прошла успешно.',
  isClosable: true,
};
Success.parameters = {
    docs: {
        description: {
        story: 'Пример уведомления об успехе.',
        },
    },
};

export const Warning = Template.bind({});
Warning.args = {
  id: 'warning-alert',
  status: 'warning',
  title: 'Предупреждение',
  description: 'Что-то требует вашего внимания.',
  isClosable: true,
};
Warning.parameters = {
    docs: {
        description: {
        story: 'Пример предупреждающего уведомления.',
        },
    },
};

export const Danger = Template.bind({});
Danger.args = {
  id: 'danger-alert',
  status: 'danger',
  title: 'Ошибка!',
  description: 'Произошла ошибка при выполнении операции.',
  isClosable: true,
};
Danger.parameters = {
    docs: {
        description: {
        story: 'Пример уведомления об ошибке.',
        },
    },
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  id: 'no-title-alert',
  status: 'info',
  description: 'Это сообщение без заголовка.',
  isClosable: true,
};
WithoutTitle.parameters = {
    docs: {
        description: {
        story: 'Пример уведомления без заголовка.',
        },
    },
};

export const NotClosable = Template.bind({});
NotClosable.args = {
  id: 'not-closable-alert',
  status: 'info',
  title: 'Постоянное сообщение',
  description: 'Это уведомление нельзя закрыть.',
  isClosable: false,
};
NotClosable.parameters = {
    docs: {
        description: {
        story: 'Пример уведомления, которое нельзя закрыть.',
        },
    },
};

// --- История для демонстрации AlertProvider ---

const AlertTriggerComponent: React.FC = () => {
  const { showAlert } = useAlert();

  const triggerAlert = (status: AlertProps['status']) => {
    showAlert({
      status: status,
      description: `Это тестовое уведомление типа ${status}. Оно исчезнет через 5 секунд.`,
      duration: 5000,
    });
  };

  return (
    <div>
      <p>Нажмите кнопки ниже, чтобы показать уведомления с помощью AlertProvider:</p>
      <button onClick={() => triggerAlert('success')} style={{ marginRight: '8px' }}>Показать Success</button>
      <button onClick={() => triggerAlert('info')} style={{ marginRight: '8px' }}>Показать Info</button>
      <button onClick={() => triggerAlert('warning')} style={{ marginRight: '8px' }}>Показать Warning</button>
      <button onClick={() => triggerAlert('danger')}>Показать Danger</button>
    </div>
  );
};

export const ProviderExample: StoryFn = () => <AlertTriggerComponent />;
ProviderExample.storyName = 'AlertProvider Usage';
ProviderExample.parameters = {
    docs: {
        description: {
        story: 'Пример использования `AlertProvider` для динамического добавления и удаления уведомлений. Уведомления автоматически исчезают через 5 секунд.',
        },
    },
}; 