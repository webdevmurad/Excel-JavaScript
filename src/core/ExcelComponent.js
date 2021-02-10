import {DomListener} from '@core/DomListener'

// Наследуемся от DomListener
export class ExcelComponent extends DomListener {
    // В constructor мы храним $root где хранится объекты с div и его классами. 
    // Создаем пустой массив options где мы помещаем слушателей и store.
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        // Получаем наименование div
        this.emitter = options.emitter
        // Получаем слушателей
        this.unsubscribers = []
        // Масссив отписок от слушания
        this.store = options.store
        // Также получаем store
        this.storeSub = null
        this.prepare()
    }

    // Настраиваем наш компонент до init
    prepare() {}

    // Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    // Уведомляем слушателей про событие event
    // Получаем наименование event и ...args (где получаем выбранную ячейку)
    $emit(event, ...args) {
        // Передаём эти параметры в другую функцию
        // emit() находится в @core/Emitter
        this.emitter.emit(event, ...args)
    }

    // Подписываемся на событие event
    // Передаём event и методы
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        // Получаем в переменную функцию subscribe
        this.unsubscribers.push(unsub)
        // Тут push() функций в массив unsubscribers
    }

    // Передача action с потоками данных происходит через вызов метода dispatch() в хранилище
    $dispatch(action) {
        this.store.dispatch(action)
    }

    // Метод для redux. Он подписывается на обновления компонентов.
    // метод subscribe в @core/Emitter
    $subscribe(fn) {
        this.storeSub = this.store.subscribe(fn)
    }

    // Инициализируем компонент
    // Добавляем DOM слушателей
    init() {
        this.initDOMListeners()
    }

    // Удаляем компонент
    // Чистим слушатели
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
        this.storeSub.unsubscribers()
    }
} 