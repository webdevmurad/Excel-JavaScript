import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

// Наследуемся от ExcelComponent
export class Formula extends ExcelComponent {
    // Наименования класса у компонента
    static className = 'excel__formula'

    constructor($root, options) {
        // В root получаем объект с div и классом.
        super($root, {
            // Мы в объект добавляем новую инфу и применяем spread-оператор
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    // Данная функция возрвращает нам нашу верстку
    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `
    }

    init() {
        // Ключевое слово super используется для вызова функций, принадлежащих родителю объекта
        super.init()

        this.$formula = this.$root.find('#formula')
        // find() возвращает нам значение первого найденного в массиве элемента.
        
        this.$on('table:select', $cell => {
            // $cell , это выбранная ячейка которая выбрана либо по умолчанию, 
            // либо пользователем.

            // Метод text прописан в @core/dom
            // Передаём туда в параметрах выбранную ячейку
            this.$formula.text($cell.text())
        })
        // Передаем в первом параметре строку в качестве event(выбранная ячейка)
        // 

        // this.$on('table:change', $cell => {
        //     this.$formula.text($cell.text())
        // })
        
        // Добавляем слушателя. Он будет каждый раз вызыватся когда action отправлен и некоторая часть дерева могла измениться
        this.$subscribe(state => {
            // Здесь мы следим, что вводит пользователь
            this.$formula.text(state.currentText)
        })
    }

    onInput(event) {
        // Получаем input и передаем наименование event и ее значение
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        // Получаем значение покнопочно
        const keys = ['Enter', 'Tab']
        // Переменная с массивом наименования кнопки
     
        // includes() возвращает массив строковых элементов, соответствующих именам
        // перечисляемых свойств, найденных непостредственно в самом объекте
        if (keys.includes(event.key)) {
            // preventDefault() отменяет действие события по умолчанию
            event.preventDefault()
            // Отправляем event наименование
            this.$emit('formula:done')
        }
    }
}