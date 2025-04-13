# Wake-UI - Ваша библиотека UI компонентов

[![npm version](https://badge.fury.io/js/wake-ui.svg)](https://badge.fury.io/js/wake-ui)

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
  AlertProvider,
  useAlert,
  SelectOption
} from 'wake-ui';

function App() {
  // Состояния для новых компонентов
  const [inputValue, setInputValue] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectValue, setSelectValue] = useState<string | number | null>(null);
  const [sliderValue, setSliderValue] = useState<number>(50);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Пример использования useAlert
  const { showAlert } = useAlert();

  const handleShowAlert = (status: 'success' | 'info' | 'warning' | 'danger') => {
    showAlert({
      status: status,
      description: `Это пример уведомления типа ${status}.`,
      duration: 4000, // Закроется через 4 секунды
    });
  };

  const selectOptions: SelectOption[] = [
    { value: 'opt1', label: 'Опция 1' },
    { value: 'opt2', label: 'Опция 2' },
    { value: 'opt3', label: 'Опция 3' },
  ];

  return (
    // Оборачиваем приложение в AlertProvider
    <AlertProvider>
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

        {/* Alert Trigger Buttons */} 
        <div>
          <h2>Уведомления (Alerts)</h2>
          <Button variant="filled" color="success" onClick={() => handleShowAlert('success')} style={{ marginRight: '8px' }}>Показать Success</Button>
          <Button variant="filled" color="info" onClick={() => handleShowAlert('info')} style={{ marginRight: '8px' }}>Показать Info</Button>
          <Button variant="filled" color="warning" onClick={() => handleShowAlert('warning')} style={{ marginRight: '8px' }}>Показать Warning</Button>
          <Button variant="filled" color="danger" onClick={() => handleShowAlert('danger')}>Показать Danger</Button>
        </div>

      </div>
    </AlertProvider>
  );
}

export default App;

```

## Доступные компоненты

### Кнопки (Buttons)
*   **Button**: Кнопки с вариантами `filled`, `outline`, `text`. Поддерживает состояние `disabled` и `loading`.
*   **ButtonGroup**: Компонент для визуального объединения нескольких кнопок в группу (горизонтально или вертикально).

### Элементы форм (Form Controls)
*   **Input**: Поле ввода с поддержкой `label`, `error`, `placeholder` и вариантами лейбла (`standard`, `outline`).
*   **Checkbox**: Флажок (чекбокс) с поддержкой неопределенного состояния (`indeterminate`).
*   **RadioGroup**: Группа радиокнопок для выбора одного значения из нескольких. Использует дочерний компонент `Radio`.
*   **Radio**: Отдельная радиокнопка (обычно используется внутри `RadioGroup`).
*   **Select**: Выпадающий список для выбора одного значения из предложенных опций.
*   **Switch**: Переключатель (вкл/выкл) с возможностью добавления текстового лейбла.
*   **Slider**: Ползунок для выбора числового значения в заданном диапазоне. Поддерживает горизонтальную и вертикальную ориентацию (`orientation`).

### Обратная связь и индикаторы (Feedback & Indicators)
*   **Loader**: CSS-спиннер для индикации загрузки. Размер задается через проп `size` (число в px или строка).
*   **Badge**: Небольшой круглый элемент (pill-shaped) для отображения статусов, счетчиков или меток.
*   **Alert**: Компонент для отображения коротких, контекстных сообщений пользователю. 
    *   Поддерживает статусы: `success`, `info`, `warning`, `danger` (влияют на цвет и иконку).
    *   Может содержать `title` (заголовок) и `description` (основной текст).
    *   По умолчанию является закрываемым (`isClosable`), отображает кнопку закрытия. Закрытие можно отключить (`isClosable={false}`).
    *   Внешний вид (цвета, иконки) и анимация появления/исчезновения настроены по умолчанию.
*   **AlertProvider**: Обязательный провайдер контекста для динамического отображения и управления уведомлениями (`Alert`). 
    *   Необходимо обернуть им корневой компонент приложения или ту его часть, где планируется вызывать уведомления.
    *   Предоставляет хук `useAlert`, который возвращает функцию `showAlert`.
    *   `showAlert(options)`: Функция для показа уведомления. Принимает объект с опциями, соответствующими пропам `Alert` (`status`, `title`, `description`, `isClosable`), а также `duration` (в мс) для автоматического закрытия. Если `duration` не указан или `0`, уведомление не закроется автоматически.
    *   Управляет позиционированием (по умолчанию - сверху по центру) и анимацией всех отображаемых уведомлений.

### Оверлеи (Overlays)
*   **Modal**: Модальное окно для отображения контента поверх основного интерфейса.
*   **Popover**: Всплывающее окно, привязанное к элементу-триггеру.
*   **Tooltip**: Небольшая всплывающая подсказка, появляющаяся при наведении/фокусе на элемент. Можно убрать стрелку (`hasArrow`).

### Отображение данных (Data Display)
*   **Avatar**: Компонент для отображения аватаров пользователей или изображений по умолчанию.
*   **Divider**: Визуальный разделитель контента (горизонтальный или вертикальный). Поддерживает вариант с отступами (`inset`).

## Локальная разработка (Storybook)

Для просмотра и разработки компонентов в изолированной среде используется Storybook.

1.  Клонируйте репозиторий (если еще не сделали).
2.  Установите зависимости: `npm install`.
3.  Запустите Storybook: `npm run storybook`.

Откройте `http://localhost:6006` в вашем браузере.

## Вклад

Мы рады любому вкладу в развитие библиотеки Wake-UI!

Если вы хотите внести свой вклад:

1.  **Сообщения об ошибках (Bug Reports):** Если вы нашли ошибку, пожалуйста, создайте [Issue](https://github.com/cthegost/wake-ui/issues) с подробным описанием проблемы, шагами воспроизведения и ожидаемым поведением.
2.  **Предложения по улучшению (Feature Requests):** Есть идеи для новых компонентов или улучшения существующих? Создайте [Issue](https://github.com/cthegost/wake-ui/issues) с описанием вашей идеи.
3.  **Pull Requests:**
    *   Сделайте форк репозитория.
    *   Создайте новую ветку для вашей фичи или исправления (`git checkout -b feature/my-new-feature` или `bugfix/fix-some-bug`).
    *   Внесите изменения и закоммитьте их (`git commit -m 'Add some feature'`).
    *   Отправьте изменения в ваш форк (`git push origin feature/my-new-feature`).
    *   Создайте Pull Request в основной репозиторий.

Пожалуйста, убедитесь, что ваш код соответствует стилю проекта и проходит все проверки (если они настроены).

## Обратная связь и баги

Ваши отзывы очень важны для нас! Если у вас есть предложения, замечания или вы столкнулись с проблемой при использовании Wake-UI, не стесняйтесь сообщать об этом:

*   **GitHub Issues:** [Создать Issue](https://github.com/cthegost/wake-ui/issues).

Мы постараемся оперативно рассмотреть все ваши обращения.

## Лицензия

ISC