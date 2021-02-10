import {range} from "@core/utils"

// Тут мы получаем data атрибут того что мы хотим изменить
export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    // Тут мы получаем boolean если мы выбрали ячейку
    return event.target.dataset.cell === 'cell'
}

export function matrix($target, $current) {
    // Получаем dom-элементы в $target и выбранные ячейки $current
    const target = $target.id(true)
    const current = $current.id(true)

    const cols = range(current.col, target.col)
    // Получаем группу выбранных элементов через id у колонок
    const rows = range(current.row, target.row)
    // Получаем группу выбранных элементов через id у строк

    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        // Делаем массив, куда помещаются id колонок и строки которые мы выбрали
        return acc
    }, [])
}

// Получаем ячейку которую выбирает пользователь при нажатий кнопок
export function nextSelector(key, {col, row}) {
    const MIN_VALUE = 0
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break 
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
            break 
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
            break
    }

    return `[data-id="${row}:${col}"]`
}