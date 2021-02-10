import {ExcelComponent} from '@core/ExcelComponent'

// Наследуемся от ExcelComponent
export class Toolbar extends ExcelComponent {
    // Наименования класса у компонента
    static className = 'excel__toolbar'

    constructor($root, options) {
        // В root получаем объект с div и классом.
        super($root, {
            // Мы в объект добавляем новую инфу и применяем spread-оператор
            name: 'Toolbar',
            ...options
        })
    }

    // Данная функция возрвращает нам нашу верстку
    toHTML() {
        return `
        <div class="button">
            <i class="material-icons">
                format_align_left
            </i>
        </div>
        <div class="button">
            <i class="material-icons">
                format_align_center
            </i>
        </div>
        <div class="button">
            <i class="material-icons">
                format_align_right
            </i>
        </div>
        <div class="button">
            <i class="material-icons">
                format_bold
            </i>
        </div>
        <div class="button">
            <i class="material-icons">
                format_italic
            </i>
        </div>
        <div class="button">
            <i class="material-icons">
                format_underline
            </i>
        </div>
        `
    }
}