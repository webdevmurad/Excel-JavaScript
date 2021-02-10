import {ExcelComponent} from '@core/ExcelComponent'

// Наследуемся от ExcelComponent
export class Header extends ExcelComponent {
    // Наименования класса у компонента
    static className = 'excel__header'

    constructor($root, options) {
        // В root получаем объект с div и классом.
        super($root, {
            // Мы в объект добавляем новую инфу и применяем spread-оператор
            name: 'Header',
            ...options
        }) 
    }

    // Данная функция возрвращает нам нашу верстку
    toHTML() {
        return `
            <input type="text" class="input" value="Новая таблица"/>
            <div>
                <div class="button">
                    <i class="material-icons">
                        delete
                    </i>
                </div>
                <div class="button">
                    <i class="material-icons">
                        exit_to_app
                    </i>
                </div>
            </div>
        `
    }

}