import {$} from '@core/dom'
// Получаем класс DOM
import {Emitter} from '@core/Emitter'

export class Excel {
    // В конструкторе мы получаем главный div, где мы будем отрисовывать Excel. 
    constructor(selector, options) {
        // В selector мы получаем #app и отправляем его в класс Dom.
        this.$el = $(selector)
        // В options мы получаем массив наших компонентов header, toolbar, formula, table.
        this.components = options.components || []
        // В options.store мы получаем store.
        this.store = options.store
        // Тут мы объявляем о созданий класса Emitter
        this.emitter = new Emitter()
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        // В $root мы создаем div с классом excel вложенный в #app.
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }
        // Создаем объект componentOptions, где мы заносим слушателей, и создаем store.
        
        // Перебираем массив
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            // Создаем $el, создаем div и даём классы.
            const component = new Component($el, componentOptions)
            // Создаем на каждый компонент классы и в параметрах мы передаём
            // $el (div и его класс)
            // componentOptions (слушатели и store)
            $el.html(component.toHTML()) 
            // Метод html() находится в @core/dom
            // Мы передаем в параметры классы и переводим в html структуру
            $root.append($el)
            // append() мы добавляем набор объектов Node
            // Данный метод хранится в @core/dom
            return component
        })
        // this.component возвращает нам полученный массив.
        return $root
    }

    render() {
        // #app мы применяем метод append с полученным массивом данных компонентов
        this.$el.append(this.getRoot())
        // Мы перебираем массив и начинаем инициализацию компонента
        this.components.forEach(component => component.init());
        
    }
    // Данный метод рендерит нам уже полученную вёрстку.

    // Данная функция удаляет ненужный компонент
    destroy() {
        this.components.forEach(component => component.destroy())
    }
    
}