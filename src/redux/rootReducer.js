import {TABLE_RESIZE, CHANGE_TEXT} from "./types"

// Pure Function
export function rootReducer(state, action) {
    // Получем состояние и action
    let prevState
    let field
    // Тут логика redux, по полученному типу action мы понимаем с чем взаимодействует пользователь
    switch (action.type) {
        // Изменения строк либо столбца (размер)
        case TABLE_RESIZE: 
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            prevState = state[field] || {}
            prevState[action.data.id] = action.data.value
            return {...state, [field]: prevState} // id, value
        // Изменение текста
        case CHANGE_TEXT:
            prevState = state["dataState"] || {}
            prevState[action.data.id] = action.data.value
            return {...state, currentText: action.data.value, dataState: prevState}
        default: return state
    }
}