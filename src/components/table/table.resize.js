import {$} from '@core/dom'

// Функция изменения размера

// Получаем dom-элемент который мы хотим изменить
// Вторым параметром мы получаем событие
export function resizeHandler($root, event) {
    // Создали мы промис чтобы обязательно получить нам то что мы хотим изменить
    return new Promise(resolve => {
        const $resizer = $(event.target)
        // В эту переменную мы получаем элемент, которым мы можем изменить размер столбца или строки
        const $parent = $resizer.closest('[data-type="resizable"]')
        // В этой переменной мы получаем весь dom-элемент который мы хотим изменить
        const coords = $parent.getCoords()
        // Получаем размеры выбранного элемента
        const type = $resizer.data.resize
        // Получаем тип выбранного элемента для изменения
        const sideProp = type === 'col' ? 'right' : 'bottom'
        // В зависимости от того что мы выберем либо col либо row мы получаем строку
        let value

        // Синяя полоска которая становится поверх строки либо столбца во время изменений
        $resizer.css({
            opacity: 1,
            [sideProp]: '-5000px'
        })

        // Пока двигаем мышью она вычисляет изменения
        document.onmousemove = e => {
            // Если выбрана колонка для изменений
            if (type === 'col') {
                const delta = e.pageX - coords.right
                value = coords.width + delta
                // Здесь мы получаем размер его
                $resizer.css({'right': -delta + 'px'})
                // И получаем dom-элемент и присваиваем css-стили
            } else {
                // Если выбрана строка для изменений
                const delta = e.pageY - coords.bottom
                value = coords.height + delta
                // Здесь мы получаем размер его
                $resizer.css({'bottom': -delta + 'px'})
                // И получаем dom-элемент и присваиваем css-стили
            }
        }

        // Когда мы отпускаем кнопку мыши, мы вычисляем последние изменения
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null

            if (type === 'col') {
                $parent.css({'width': value + 'px'})
                $root.findAll(`[data-col="${$parent.data.col}"]`)
                    .forEach(el => el.style.width = value + 'px')
            } else {
                $parent.css({'height': value + 'px'})
            }

            // Тут мы передаём основные данные промиса
            resolve({
                value,
                type,
                id: $parent.data[type]
            })
            // Здесь задаются стили
            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })
        }
    })

}