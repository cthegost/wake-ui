import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { useState, cloneElement, useId, useRef, useEffect, useMemo, useCallback } from 'react';
import { useFloating, autoUpdate, offset, flip, shift, useClick, useDismiss, useRole, useTransitionStyles, useInteractions, FloatingPortal, FloatingFocusManager, size, useListNavigation } from '@floating-ui/react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Button = function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? 'filled' : _b, // Устанавливаем 'filled' как значение по умолчанию
    className = _a.className, // Получаем className из пропсов
    props = __rest(_a, ["children", "variant", "className"]);
    // Формируем классы в зависимости от варианта
    // Пока это будут простые классы, позже мы добавим им стили
    var variantClass = "button--".concat(variant);
    var combinedClassName = [variantClass, className].filter(Boolean).join(' '); // Объединяем классы
    return (jsx("button", __assign({ className: combinedClassName }, props, { children: children })));
};

var Popover = function (_a) {
    var trigger = _a.trigger, children = _a.children, _b = _a.placement, placement = _b === void 0 ? 'bottom' : _b, _c = _a.offsetValue, offsetValue = _c === void 0 ? 10 : _c, _d = _a.transitionDuration, transitionDuration = _d === void 0 ? 150 : _d;
    var _e = useState(false), isOpen = _e[0], setIsOpen = _e[1];
    var _f = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
            offset(offsetValue), // Применяем отступ
            flip(), // Включаем переворот
            shift({ padding: 5 }) // Включаем сдвиг с небольшим отступом от края
        ],
        placement: placement, // Устанавливаем желаемое положение
        whileElementsMounted: autoUpdate, // Автоматически обновляем позицию
    }), refs = _f.refs, floatingStyles = _f.floatingStyles, context = _f.context;
    // Настраиваем интерактивность: открытие по клику, закрытие по клику вне/Esc
    var click = useClick(context);
    var dismiss = useDismiss(context);
    var role = useRole(context); // Для доступности (ARIA атрибуты)
    // Настраиваем анимацию
    var _g = useTransitionStyles(context, {
        duration: transitionDuration,
        initial: {
            opacity: 0,
            transform: 'translateY(10px)',
        },
    }), isMounted = _g.isMounted, transitionStyles = _g.styles;
    // Объединяем все взаимодействия
    var _h = useInteractions([
        click,
        dismiss,
        role,
    ]), getReferenceProps = _h.getReferenceProps, getFloatingProps = _h.getFloatingProps;
    return (jsxs(Fragment, { children: [cloneElement(trigger, getReferenceProps(__assign({ ref: refs.setReference }, trigger.props))), jsx(FloatingPortal, { children: isMounted && (jsx(FloatingFocusManager, { context: context, modal: false, children: jsx("div", __assign({ ref: refs.setFloating, style: floatingStyles }, getFloatingProps(), { children: jsx("div", { className: "popover-content" // <--- Стили фона, тени, паддингов И transition здесь
                            , style: transitionStyles, children: children }) })) })) })] }));
};

var Input = function (_a) {
    var label = _a.label, _b = _a.error, error = _b === void 0 ? null : _b, className = _a.className, // Получаем className для кастомизации
    propId = _a.id, // Получаем id из пропсов, если передан
    _c = _a.labelVariant, // Получаем id из пропсов, если передан
    labelVariant = _c === void 0 ? 'standard' : _c, // Значение по умолчанию - стандартный
    propPlaceholder = _a.placeholder, // Получаем оригинальный плейсхолдер
    props = __rest(_a, ["label", "error", "className", "id", "labelVariant", "placeholder"]) // Остальные стандартные атрибуты input
    ;
    // Генерируем уникальный ID для связи label и input, если ID не передан
    var generatedId = useId();
    var id = propId || generatedId;
    // Формируем классы для контейнера и поля
    var containerClassName = [
        'input-container',
        "input-container--label-".concat(labelVariant), // Класс для варианта лейбла
        error ? 'input-container--error' : '',
    ].filter(Boolean).join(' ');
    var inputClassName = [
        'input-field',
        error ? 'input-field--error' : '',
        className
    ].filter(Boolean).join(' ');
    // Определяем плейсхолдер: пробел для outline с label, иначе оригинальный
    var placeholder = labelVariant === 'outline' && label ? ' ' : propPlaceholder;
    // Стандартный лейбл (над полем)
    var standardLabel = label && labelVariant === 'standard' && (jsx("label", { htmlFor: id, className: "input-label", children: label }));
    // Outline вариант: fieldset содержит input, label (для анимации), legend (для выреза)
    var outlineContent = labelVariant === 'outline' && (jsxs("fieldset", { className: "input-fieldset", "aria-hidden": "true", children: [" ", jsx("legend", { className: "input-legend", children: jsxs("span", { children: [label ? label : '', "\u00A0"] }) }), jsx("input", __assign({ id: id, className: inputClassName, "aria-invalid": error ? true : undefined, "aria-describedby": error ? "".concat(id, "-error") : undefined, placeholder: placeholder }, props)), label && (jsx("label", { htmlFor: id, className: "input-label-floating", children: label }))] }));
    // Обычный инпут для standard варианта
    var standardInput = labelVariant === 'standard' && (jsx("input", __assign({ id: id, className: inputClassName, "aria-invalid": error ? true : undefined, "aria-describedby": error ? "".concat(id, "-error") : undefined, placeholder: placeholder }, props)));
    return (jsxs("div", { className: containerClassName, children: [standardLabel, labelVariant === 'outline' ? outlineContent : standardInput, error && (jsx("p", { id: "".concat(id, "-error"), className: "input-error-message", role: "alert", children: error }))] }));
};

var Switch = function (_a) {
    var label = _a.label, className = _a.className, // Пользовательские классы для внешнего контейнера
    propId = _a.id, checked = _a.checked, disabled = _a.disabled, props = __rest(_a, ["label", "className", "id", "checked", "disabled"]) // Остальные атрибуты (value, name, onChange и т.д.)
    ;
    var generatedId = useId();
    var id = propId || generatedId;
    var containerClassName = [
        'switch-container',
        disabled ? 'switch-container--disabled' : '',
        className,
    ].filter(Boolean).join(' ');
    return (jsxs("div", { className: containerClassName, children: [jsx("input", __assign({ type: "checkbox", id: id, className: "switch-input", checked: checked, disabled: disabled, role: "switch" // Улучшает доступность
                , "aria-checked": checked }, props)), jsx("label", { htmlFor: id, className: "switch-label", children: jsx("span", { className: "switch-track", children: jsx("span", { className: "switch-thumb" }) }) }), label && (jsx("label", { htmlFor: id, className: "switch-text-label", children: label }))] }));
};

// Функция для получения инициалов из имени
var getInitials = function (name) {
    if (!name)
        return '';
    var names = name.trim().split(' ');
    if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};
// --- Добавляем генерацию цвета --- 
var stringToColor = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
    }
    // Генерируем цвет в формате HSL для лучшего распределения
    var h = hash % 360;
    // Ограничиваем насыщенность и светлоту для получения пастельных тонов
    var s = 60 + (hash % 10); // 60-70%
    var l = 75 + (hash % 10); // 75-85%
    return "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
};
// ----------------------------------
var Avatar = function (_a) {
    var _b = _a.src, src = _b === void 0 ? null : _b, _c = _a.alt, alt = _c === void 0 ? 'Avatar' : _c, _d = _a.name, name = _d === void 0 ? '' : _d, _e = _a.size, size = _e === void 0 ? 'medium' : _e, _f = _a.shape, shape = _f === void 0 ? 'circle' : _f, className = _a.className, // Пользовательские классы
    style = _a.style, // Пользовательские стили
    props = __rest(_a, ["src", "alt", "name", "size", "shape", "className", "style"]) // Остальные div атрибуты
    ;
    var _g = React.useState(false), imgError = _g[0], setImgError = _g[1]; // Состояние ошибки загрузки изображения
    // --- Генерируем цвет фона, если показываем инициалы --- 
    var backgroundColor = !src && name ? stringToColor(name) : undefined;
    // -------------------------------------------------------
    // Определяем, что отображать: изображение, инициалы или плейсхолдер
    var content;
    var showImage = src && !imgError;
    var showInitials = !showImage && name;
    if (showImage) {
        content = (jsx("img", { src: src, alt: alt, className: "avatar-image", onError: function () { return setImgError(true); } }));
    }
    else if (showInitials) {
        content = (jsx("span", { className: "avatar-initials", "aria-label": alt, children: getInitials(name) }));
    }
    else {
        // Плейсхолдер (можно вставить SVG иконку пользователя)
        content = (jsx("span", { className: "avatar-placeholder", "aria-label": alt, children: jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: jsx("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" }) }) }));
    }
    var avatarClassName = [
        'avatar-container',
        "avatar--".concat(size),
        "avatar--".concat(shape),
        className,
    ].filter(Boolean).join(' ');
    // --- Объединяем переданные стили со сгенерированным фоном --- 
    var combinedStyle = __assign(__assign({}, style), { backgroundColor: backgroundColor || (style === null || style === void 0 ? void 0 : style.backgroundColor) });
    // ------------------------------------------------------------
    return (jsx("div", __assign({ className: avatarClassName, style: combinedStyle }, props, { children: content })));
};

var Checkbox = function (_a) {
    var label = _a.label, className = _a.className, // Пользовательские классы для внешнего контейнера
    propId = _a.id, checked = _a.checked, disabled = _a.disabled, _b = _a.indeterminate, indeterminate = _b === void 0 ? false : _b, // По умолчанию false
    props = __rest(_a, ["label", "className", "id", "checked", "disabled", "indeterminate"]) // Остальные атрибуты (value, name, onChange и т.д.)
    ;
    var generatedId = useId();
    var id = propId || generatedId;
    var inputRef = useRef(null); // Ref для доступа к input элементу
    // Используем useEffect для установки/снятия свойства indeterminate на DOM-элементе
    useEffect(function () {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate]);
    // Добавляем класс для неопределенного состояния
    var containerClassName = [
        'checkbox-container',
        disabled ? 'checkbox-container--disabled' : '',
        indeterminate ? 'checkbox-container--indeterminate' : '', // Класс для indeterminate
        className,
    ].filter(Boolean).join(' ');
    return (jsx("div", { className: containerClassName, children: jsxs("label", { htmlFor: id, className: "checkbox-label-wrapper", children: [jsx("input", __assign({ ref: inputRef, type: "checkbox", id: id, className: "checkbox-input", checked: checked, disabled: disabled }, props)), jsxs("span", { className: "checkbox-visual", children: [jsx("svg", { className: "checkbox-icon checkbox-icon--checked", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": "true", children: jsx("path", { d: "M12.707 5.293a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L7 9.586l4.293-4.293a1 1 0 0 1 1.414 0z" }) }), jsx("svg", { className: "checkbox-icon checkbox-icon--indeterminate", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": "true", children: jsx("path", { d: "M4 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z" }) })] }), label && jsx("span", { className: "checkbox-text-label", children: label })] }) }));
};

var Select = function (_a) {
    var options = _a.options, value = _a.value, onChange = _a.onChange, _b = _a.placeholder, placeholder = _b === void 0 ? 'Выберите...' : _b, label = _a.label, _c = _a.disabled, disabled = _c === void 0 ? false : _c, className = _a.className;
    var _d = useState(false), isOpen = _d[0], setIsOpen = _d[1];
    var _e = useState(null), activeIndex = _e[0], setActiveIndex = _e[1]; // Индекс активного элемента для навигации
    var listRef = React.useRef([]); // Ref'ы для элементов списка
    var generatedId = useId();
    var labelId = label ? "".concat(generatedId, "-label") : undefined;
    var listboxId = "".concat(generatedId, "-listbox");
    var _f = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        whileElementsMounted: autoUpdate,
        placement: 'bottom-start', // Позиционируем снизу от начала
        middleware: [
            offset(4), // <--- Добавляем отступ (например, 4px)
            flip({ padding: 5 }),
            size({
                apply: function (_a) {
                    var rects = _a.rects, elements = _a.elements;
                    Object.assign(elements.floating.style, {
                        width: "".concat(rects.reference.width, "px"),
                    });
                },
                padding: 5,
            }),
        ],
    }), refs = _f.refs, floatingStyles = _f.floatingStyles, context = _f.context;
    // --- Взаимодействия ---
    var click = useClick(context);
    var dismiss = useDismiss(context);
    var role = useRole(context, { role: 'listbox' });
    // Навигация по списку (стрелки, Enter, Esc)
    var listNavigation = useListNavigation(context, {
        listRef: listRef,
        activeIndex: activeIndex,
        onNavigate: setActiveIndex,
        virtual: true, // Т.к. рендерим не все опции сразу (хотя в нашем случае рендерим все)
        loop: true,
    });
    var _g = useInteractions([
        click,
        dismiss,
        role,
        listNavigation,
    ]), getReferenceProps = _g.getReferenceProps, getFloatingProps = _g.getFloatingProps, getItemProps = _g.getItemProps;
    // Находим лейбл выбранного значения
    var selectedLabel = useMemo(function () {
        var _a;
        return (_a = options.find(function (option) { return option.value === value; })) === null || _a === void 0 ? void 0 : _a.label;
    }, [options, value]);
    // Обработчик выбора опции
    var handleSelect = function (optionValue) {
        if (optionValue !== null) {
            onChange(optionValue);
            setIsOpen(false);
        }
    };
    var containerClassName = [
        'select-container',
        disabled ? 'select-container--disabled' : '',
        className,
    ].filter(Boolean).join(' ');
    return (jsxs("div", { className: containerClassName, children: [label && (jsx("label", { id: labelId, className: "select-label", children: label })), jsxs("button", __assign({ ref: refs.setReference, className: "select-button", disabled: disabled, "aria-labelledby": labelId, "aria-haspopup": "listbox", "aria-expanded": isOpen, "aria-autocomplete": "none" }, getReferenceProps(), { children: [jsx("span", { className: "select-value", children: selectedLabel || jsx("span", { className: "select-placeholder", children: placeholder }) }), jsx("span", { className: "select-arrow", "aria-hidden": "true", children: jsx("svg", { viewBox: "0 0 16 16", fill: "currentColor", width: "12", height: "12", children: jsx("path", { d: "M8 11L3 6h10z" }) }) })] })), jsx(FloatingPortal, { children: isOpen && (jsx(FloatingFocusManager, { context: context, modal: false, children: jsx("div", __assign({ ref: refs.setFloating, style: floatingStyles, className: "select-listbox", role: "listbox", id: listboxId, "aria-labelledby": labelId }, getFloatingProps(), { children: options.map(function (option, index) { return (jsxs("div", __assign({ ref: function (node) { listRef.current[index] = node; }, role: "option", className: "select-option ".concat(activeIndex === index ? 'select-option--active' : '', " ").concat(option.value === value ? 'select-option--selected' : '', " ").concat(option.disabled ? 'select-option--disabled' : ''), tabIndex: activeIndex === index ? 0 : -1, "aria-selected": activeIndex === index && isOpen || option.value === value, "aria-disabled": option.disabled }, getItemProps({
                            // Обработка клика или Enter на опции
                            onClick: function () { return !option.disabled && handleSelect(option.value); },
                            onKeyDown: function (event) {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    if (!option.disabled)
                                        handleSelect(option.value);
                                }
                            },
                        }), { children: [option.label, option.value === value && (jsx("span", { className: "select-option-checkmark", "aria-hidden": "true", children: "\u2713" }))] }), option.value)); }) })) })) })] }));
};

var Slider = function (_a) {
    var min = _a.min, max = _a.max, _b = _a.step, step = _b === void 0 ? 1 : _b, value = _a.value, onChange = _a.onChange, _c = _a.disabled, disabled = _c === void 0 ? false : _c, label = _a.label, _d = _a.showValue, showValue = _d === void 0 ? false : _d, // Переименовал
    className = _a.className;
    var _e = useState(value), currentValue = _e[0], setCurrentValue = _e[1];
    var inputRef = useRef(null); // Один ref
    var rangeRef = useRef(null);
    var getPercent = useCallback(function (val) { return Math.round(((val - min) / (max - min)) * 100); }, [min, max]);
    // Синхронизация с внешним value
    useEffect(function () {
        setCurrentValue(value);
    }, [value]);
    // Обновление выделенного диапазона
    useEffect(function () {
        var percent = getPercent(currentValue);
        if (rangeRef.current) {
            rangeRef.current.style.left = "0%"; // Всегда от начала
            rangeRef.current.style.width = "".concat(percent, "%"); // До текущего значения
        }
        // Обновляем позицию ползунка в CSS для лучшей синхронизации (необязательно, т.к. input сам двигается)
        // if (inputRef.current) {
        //   inputRef.current.style.setProperty('--thumb-percent', `${percent}%`);
        // }
    }, [currentValue, getPercent]);
    // Вызов onChange при отпускании
    var triggerOnChange = function () {
        if (inputRef.current) {
            onChange(+inputRef.current.value); // Передаем актуальное значение input
        }
    };
    // Обновление внутреннего состояния при движении
    var handleInputChange = function (event) {
        setCurrentValue(+event.target.value);
        // Можно добавить проп для real-time onChange здесь, если нужно
        // onChange(+event.target.value);
    };
    var containerClassName = [
        'slider-container', // Обновляем классы
        disabled ? 'slider--disabled' : '',
        className,
    ].filter(Boolean).join(' ');
    return (jsxs("div", { className: containerClassName, children: [label && jsx("label", { className: "slider-label", children: label }), jsxs("div", { className: "slider", children: [" ", jsx("input", { type: "range", ref: inputRef, min: min, max: max, step: step, value: currentValue, onChange: handleInputChange, onMouseUp: triggerOnChange, onTouchEnd: triggerOnChange, className: "slider__thumb" // Один ползунок
                        , disabled: disabled }), jsxs("div", { className: "slider__track-container", children: [" ", jsx("div", { className: "slider__track" }), jsx("div", { ref: rangeRef, className: "slider__range" }), step && (max - min) / step <= 20 && // Показываем деления, если их не слишком много
                                Array.from({ length: (max - min) / step + 1 }).map(function (_, i) {
                                    var tickValue = min + i * step;
                                    var percent = getPercent(tickValue);
                                    // Не показываем деления для min и max, т.к. они на краях
                                    if (tickValue === min || tickValue === max)
                                        return null;
                                    return (jsx("div", { className: "slider__tick", style: { left: "".concat(percent, "%") } }, i));
                                })] })] }), showValue && ( // Переименовал
            jsxs("div", { className: "slider-value", children: [" ", jsx("span", { children: currentValue })] }))] }));
};

export { Avatar, Button, Checkbox, Input, Popover, Select, Slider, Switch };
//# sourceMappingURL=index.esm.js.map
