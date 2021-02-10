// Чистая функция

// Данная функция проверяет полученный параметр на строку
export function capitalize(string) {
    if (typeof string !== 'string') {
        // если это не строка то возвращает пустую строку
        return ''
    }
    // Ну а так мы возвращаем строку где в методе charAt(0)
    // мы получаем в строке первую букву.
    // toUpperCase() делает ее в верхний регистр.
    // slice() мы конкатенируем остальную часть строки из массива
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// При выборе группу элементов она отсчитывает числа между id выбранных элементов
export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1) 
        .fill('')
        .map((_, index) => start + index)
}

// Функция заносить данные в localStorage
export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}
