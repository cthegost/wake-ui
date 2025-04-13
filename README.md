# Wake-UI - Ваша библиотека UI компонентов

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
import { 
  Button, 
  Input, 
  Popover, 
  Switch, 
  Avatar, 
  Checkbox, 
  Select, 
  Slider, 
  Modal, 
  Loader,
  SelectOption // Импортируем тип для Select
} from 'wake-ui';

function App() {
  // Состояния для новых компонентов
  const [inputValue, setInputValue] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectValue, setSelectValue] = useState<string | number | null>(null);
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectOptions: SelectOption[] = [
    { value: 'opt1', label: 'Опция 1' },
    { value: 'opt2', label: 'Опция 2' },
    { value: 'opt3', label: 'Опция 3' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
      <h1>Примеры использования WUI</h1>

      {/* Button */} 
      <div>
        <Button variant="filled" onClick={() => alert('Клик!')}>Filled</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="text">Text</Button>
        <Button variant="filled" loading>Loading...</Button>
        <Button variant="filled" disabled>Disabled</Button>
      </div>

      {/* Input */} 
      <Input
        label="Имя пользователя"
        labelVariant="outline"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите имя"
        style={{ maxWidth: '300px' }}
      />

      {/* Popover (требует @floating-ui/react) */} 
      <Popover
         placement="bottom-start"
         trigger={<Button>Открыть Popover</Button>}
       >
         <div>Содержимое поповера!</div>
       </Popover>

      {/* Switch */} 
       <Switch 
         label="Включить настройку" 
         checked={isSwitchOn} 
         onChange={(e) => setIsSwitchOn(e.target.checked)} 
       />

      {/* Avatar */} 
       <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
         <Avatar src="https://via.placeholder.com/40" alt="User Avatar" size={40} />
         <Avatar name="Anton Havkin" size={40} />
         <Avatar size={40} /> {/* Без src и name */} 
       </div>

      {/* Checkbox */} 
      <Checkbox 
        label="Согласен с условиями" 
        checked={isChecked} 
        onChange={(e) => setIsChecked(e.target.checked)} 
      />

      {/* Select (требует @floating-ui/react) */} 
      <Select 
        label="Выберите опцию"
        options={selectOptions} 
        value={selectValue} 
        onChange={setSelectValue} 
        placeholder="Не выбрано"
        style={{ maxWidth: '300px' }}
      />

       {/* Slider */} 
       <Slider 
         label="Уровень громкости"
         min={0} 
         max={100} 
         value={sliderValue} 
         onChange={setSliderValue} 
         showValue 
         style={{ maxWidth: '300px' }}
       />

      {/* Modal */} 
      <div>
        <Button onClick={() => setIsModalOpen(true)}>Открыть модальное окно</Button>
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Заголовок модалки"
        >
          <p>Это содержимое модального окна.</p>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>Закрыть</Button>
        </Modal>
      </div>

      {/* Loader */} 
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Loader size={16} />
        <Loader size={32} />
        <Loader size="3rem" />
        <span>Загрузка...</span>
      </div>

    </div>
  );
}

export default App;

```

## Доступные компоненты

*   **Button**: Кнопки с вариантами `filled`, `outline`, `text`. Поддерживает состояние `disabled` и `loading`.
*   **Input**: Поле ввода с поддержкой `label`, `error`, `placeholder` и вариантами лейбла (`standard`, `outline`).
*   **Popover**: Всплывающее окно, привязанное к элементу-триггеру.
*   **Switch**: Переключатель (вкл/выкл) с возможностью добавления текстового лейбла.
*   **Avatar**: Компонент для отображения аватаров пользователей или изображений по умолчанию.
*   **Checkbox**: Флажок (чекбокс) с поддержкой неопределенного состояния (`indeterminate`).
*   **Select**: Выпадающий список для выбора одного значения из предложенных опций.
*   **Slider**: Ползунок для выбора числового значения в заданном диапазоне. Поддерживает горизонтальную и вертикальную ориентацию (`orientation`).
*   **Modal**: Модальное окно для отображения контента поверх основного интерфейса.
*   **Loader**: CSS-спиннер для индикации загрузки. Размер задается через проп `size` (число в px или строка).

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