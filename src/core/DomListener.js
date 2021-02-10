import {capitalize} from "@core/utils"

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            // Проверка на false
            throw new Error(`No $root provided for DomListener`)
        }
        // Получаем в объектах dom-элемент с классом
        this.$root = $root
        // Получаем массив событий
        this.listeners = listeners
    }

    initDOMListeners() {
        // console.log(this.listeners, this.$root)
        // В this.listeners мы получаем перебираем слушателей к примеру "mousedown" и т.д.
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            // Мы обращаемся к методу getMethodName и изменяем полученные параметры.
            if (!this[method]) {
                // Если нет такого метода, то выдаст ошибку.
                const name = this.name || ''
                throw new Error(`Method ${this[method]}, ${name}`)
            }
            this[method] = this[method].bind(this)
            // Для методов мы через bind(устанавливаем контекст вызова)

            // Мы передаём в функцию on(), она находится в @core/dom
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        // Перебираем слушатели 
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            // Получаем методы

            // Мы передаём в функцию off(), она находится в @core/dom
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    // Тут получаем наименования слушателя и добавляем on 
    // чтобы js понимал какие методы нам нужны.
    return 'on' + capitalize(eventName)
    // Тут применяем метод capitalize из @core/utils и передаём наименование слушателя
}