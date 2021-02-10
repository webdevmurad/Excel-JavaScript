
const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

// Тут получаем размер столбца
function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px'

}
// Тут получаем размер строки
function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

// Также изменяем размер либо колоны всей, либо всей строки
function toCell(state, row) {
    return function(_, col) {
        const id = `${row}:${col}`
        const width = getWidth(state.colState, col)
        const text = state.dataState[id] || ''
        return `
            <div 
                class="cell" 
                data-col="${col}" 
                data-cell="cell"
                data-id="${id}" 
                contenteditable
                style="width: ${width}"
            >${text}</div>
        `
    }
}

// Тут отрисовывается колоны
function toColumn({col, index, width}) {
    return `
        <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}
// Тут отрисовывается строки
function createRow(index, content, state) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    const height = getHeight(state, index)

    return `
        <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data" data-row="${index}">${content}</div>
        </div>
    `
}

// Тут получаем целый алфавит
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

// Тут передаём размер столбца, которую мы изменяем
function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }
    }
}

// Тут мы отрисовываем таблицу, столбцы и строки
export function createTable(rowsCount, state={}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        // Метод fill() заполняет все элементы массива от начального до конечного индексов одним значением.
        .map(toChar)
        // Перебираю все полученные буквы с алфавита
        .map(withWidthFrom(state))
        // Передаю колонны
        .map(toColumn)
        .join('')
    rows.push(createRow(null, cols, {}))

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, row))
            .join('')
        rows.push(createRow(row + 1, cells, state.rowState))
    }
    return rows.join('')
}

