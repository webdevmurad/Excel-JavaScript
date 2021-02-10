export class TableSelection {
    // Наименования класса у компонента (актуальная, выбранная пользователем) 
    static className = 'selected'

    constructor() {
        this.group = []
        // Переменная в которую заносится текущий, выбранный пользователем dom-элемент
        this.current = null
    }

    select($el) {
        // Выбранный элемент передаётся в $el

        // Чистим массив перед выбором ячейки
        this.clear()
        // focus() метод фокуса на указанном элементе. Мы передаём к нему дополнительный класс со своими стилями.
        $el.focus().addClass(TableSelection.className)
        // Заносим его в group массив
        this.group.push($el)
        // Мы заносим выбранный элемент в переменную
        this.current = $el
    }

    // Чистит массив от активного класса
    clear() {
        this.group.forEach(el => el.removeClass(TableSelection.className))
        this.group = []
    }

    // Группа выбранных ячеек
    selectGroup(groups = []) {
        // Чистим массив перед выбором ячейки
        this.clear()
        // Выбранная группа элементов
        this.group = groups
        // Перебираем массив выбранных элементов и даём им все классы активных ячеек
        this.group.map(el => el.addClass(TableSelection.className))
    }
    
}