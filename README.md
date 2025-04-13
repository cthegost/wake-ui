# WUI - Ваша библиотека UI компонентов

[![npm version](https://badge.fury.io/js/wui.svg)](https://badge.fury.io/js/wake-ui)

Простая и расширяемая библиотека UI компонентов, созданная с использованием React и TypeScript.

## Установка

```bash
npm install wake-ui
# или
yarn add wake-ui
```

Вам также необходимо установить `react` и `react-dom` в вашем проекте, так как они являются `peerDependencies`.

```bash
npm install react react-dom
# или
yarn add react react-dom
```

Если вы используете компоненты, требующие `@floating-ui/react` (например, `Popover`), установите и его:
```bash
npm install @floating-ui/react
# или
yarn add @floating-ui/react
```


## Использование

Сначала импортируйте необходимые CSS стили в корневом файле вашего приложения (например, `index.js` или `App.js`):

```javascript
import 'wake-ui/dist/styles.css';
```

Затем импортируйте и используйте компоненты:

```jsx
import React, { useState } from 'react';
import { Button, Input, Popover } from 'wake-ui';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div>
      <h1>Пример использования WUI</h1>

      <Button variant="filled" onClick={() => alert('Клик!')}>
        Закрашенная кнопка
      </Button>

      <Button variant="outline">
        Контурная кнопка
      </Button>

      <Input
        label="Имя пользователя"
        labelVariant="outline"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите имя"
      />

       <Popover
         placement="bottom"
         trigger={<Button variant="text">Открыть Popover</Button>}
       >
         <div>Содержимое поповера!</div>
       </Popover>

    </div>
  );
}

export default App;

```

## Доступные компоненты

*   **Button**: Кнопки с вариантами `filled`, `outline`, `text`.
*   **Input**: Поле ввода с поддержкой `label`, `error`, `placeholder` и вариантами лейбла (`standard`, `outline`).
*   **Popover**: Всплывающее окно, привязанное к элементу-триггеру.
*   **Switch**: Переключатель (вкл/выкл) с возможностью добавления текстового лейбла.
*   **Avatar**: Компонент для отображения аватаров пользователей или изображений по умолчанию.
*   **Checkbox**: Флажок (чекбокс) с поддержкой неопределенного состояния (`indeterminate`).
*   **Select**: Выпадающий список для выбора одного значения из предложенных опций.
*   **Slider**: Ползунок для выбора числового значения в заданном диапазоне.

## Локальная разработка (Storybook)

Для просмотра и разработки компонентов в изолированной среде используется Storybook.

1.  Клонируйте репозиторий (если еще не сделали).
2.  Установите зависимости: `npm install`.
3.  Запустите Storybook: `npm run storybook`.

Откройте `http://localhost:6006` в вашем браузере.

## Вклад

Инструкции по внесению вклада будут добавлены позже.

## Лицензия

ISC