class Dom {
    constructor(selector) {
        // Тут мы проверяем, если мы получаем string, то получаем его в DOM, 
        // если нет, то просто возвращаем.
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        // Получаем html вёрстку
        if (typeof html === 'string') {
            // Если она строка то мы вставляем его в dom-элемент
            this.$el.innerHTML = html
            return this
        }
        // Свойство outerHTML содержит HTML элемента целиком. Это как innerHTML плюс сам элемент.
        return this.$el.outerHTML.trim()
    }

    text(text) {
        // Тут получаем строку и проверяем ее условием.
        if (typeof text === 'string') {
            // Если она строка, то получаем текстовое содержимое которое передаёт пользователь через textContent
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            // Проверяем если наименование тэга равно input
            // То мы возвращаем value и удаляются пробельные символы trim()
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
        // Мы возвращаем строчное значение без пробелов пустых
    }

    append(node) {
        // Получаем node главных элементов

        // Если получаем true, то отрисовываем элемент
        if (node instanceof Dom) {
            node = node.$el
        }

        // Prototype представляет объект прототипа object
        // Проверяем есть ли у него метод append
        if (Element.prototype.append) {
            this.$el.append(node)
            // Добавляем html вёрстку
        } else {
            this.$el.appendChild(node)
        }
    }

    // focus() метод фокуса на указанном элементе.
    focus() {
        this.$el.focus()
        return this
    }

    addClass(className) {
        // Получаем активный класс
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        // Удаление активного класса
        this.$el.classList.remove(className)
        return this
    }

    // Получаем resize кнопку, для изменения размеры
    closest(selector) {
        return $(this.$el.closest(selector))
    }

    // Получаем его размер
    getCoords() {
        return this.$el.getBoundingClientRect()
        // getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport
    }

    // Получаем data-атрибуты ативной ячейки
    get data() {
        return this.$el.dataset
    }
    // Получаем селектор с id ативной ячейки
    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    // Получаем весь столбец изменяемого столбца
    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    // Тут мы передаём нужные параметры и получаем обработчик событий
    on(eventType, callback) {
        // Передаём eventType(там у нас и input и keydown и т.д.), и также передаём
        // И саму функцию callback
        this.$el.addEventListener(eventType, callback)
        // И устанавливаем обработчик событий
    }

    // Тут мы передаём нужные параметры и избавляемся от обработчика событий
    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    // Получаем объект стилей которых правит пользовать при изменений столбцов и строк 
    css(styles = {}) {
        Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
    }

    // Получаем координаты id по столбу и строке
    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

}

// Передаём вёрстку в класс Dom для его получения
export function $(selector) {
    return new Dom(selector)
}

// Создаём dom-элемент
$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}