import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from './table.resize'
import {shouldResize, isCell, matrix, nextSelector} from './table.function'
import {TableSelection} from './TableSelection'
import * as actions from '@/redux/actions'
import {$} from '@core/dom'

// Наследуемся от ExcelComponent
export class Table extends ExcelComponent {
    // Наименования класса у компонента
    static className = 'excel__table'

    constructor($root, options) {
        // В root получаем объект с div и классом
        super($root, {
            // Мы в объект добавляем новую инфу и применяем spread-оператор
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    // Данная функция возрвращает нам нашу верстку
    toHTML() {
        // Передаёт нам первым параметром 20 (количество строк) и вторым параметром наше состояние
        // createTable находится в @table/table.template
        return createTable(20, this.store.getState())
    }


    prepare() {
        // Создаём класс выбранной ячейки
        this.selection = new TableSelection()
    }


    init() {
        // Ключевое слово super используется для вызова функций, принадлежащих родителю объекта
        super.init()

        // Находим самый первый элемент
        const $cell = this.$root.find('[data-id="0:0"]')
        // И передаём ее в функию выбранной ячейки
        this.selectCell($cell)

        // Передаём найменование события 
        this.$on('formula:input', text => {
            // Получаем строку из formula:input
            // Получаем dom-элемент откуда получаем строку
            this.selection.current.text(text)
            // Передаём полученный текст
            this.updateTextInStore(text)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
        // this.$subscribe(state => {
        //     console.log("TableState", state)
        // })
    }

    selectCell($cell) {
        // Здесь мы принимаем первую ячейку и передаём ее как выбранную, где она будет получать класс активности
        this.selection.select($cell)

        // Передаём наименование event и выбранный селект
        this.$emit('table:select', $cell)
    }

    // Тут у нас идёт асинхронный запрос на изменение размера таблицы
    async resizeTable(event) {
        // try инструкции для выполнения
        try {
            // Получаем данные из промиса.
            const data = await resizeHandler(this.$root, event)
            // Передача action с потоками данных происходит через вызов метода dispatch() в хранилище
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            // В случае если не получим
            console.warn("Error", console.log(e.message))
        }
    }

    // Получаем данные перемещения и размера
    onMousedown(event) {
        // shouldResize находится в table.function
        if (shouldResize(event)) {
            // Передаём в промис
            this.resizeTable(event)
            // Если мы выбрали ячейку
        } else if (isCell(event)) {
            const $target = $(event.target)
            // Получаем dom-элемент выбранной ячейки
            if (event.ctrlKey) {
                // Тут мы с зажатой ctrl можем сделать группу активных ячеек
                const cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                // Получаем группу dom-элементов которые мы выбрали

                // И передаём группу выбранных элементов в массив выбранных элементов
                this.selection.selectGroup(cells)
            } else {
                // Если выбранна не группа элементов, передаём одну выбранную
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        // Тут у нас массив кнопок, с помощью которой мы можем выбирать активную ячейку
        const keys = [
            'Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'
        ]
        const {key} = event;
        // С деструктуризацией мы вытаскиваем у event ключ от нажатой кнопки
        
        // Метод includes() определяет, содержит ли массив определённый элемент, возвращая в зависимости от этого true или false
        // Мы сравниваем значения массива и ключ нажатой кнопки и нажата ли кнопка shift
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            // Получаем id выбранной ячейки
            const $next = this.$root.find(nextSelector(key, id))
            // Получаем dom-элемент активной ячейки
            // И передаём ее
            this.selectCell($next)
        }
    }

    updateTextInStore(value) {
        // Передача action с потоками данных происходит через вызов метода dispatch() в хранилище
        this.$dispatch(actions.changeText({
            // Передаём id и value через action
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        // Получаем введенную строку и передаём строку
        this.updateTextInStore($(event.target).text())
    }
}
