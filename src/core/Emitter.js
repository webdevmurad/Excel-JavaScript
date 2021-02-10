export class Emitter {
    constructor() {
        // Создаем объект слушателей
        this.listeners = {}
    }

    // Уведомляем слушателей
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            // Проверяем, если это не массив то выйдет ошибка
            return false
        }
        // Перебираем массив
        this.listeners[event].forEach(listener => {
            // Выбранная ячейка и передача ей объекта выбранной ячейки
            listener(...args)
        })
        return true
    }

    // Подписываемся на уведомления
    subscribe(event, fn) {
        // Получаем в параметрах event и получаем функцию
        this.listeners[event] = this.listeners[event] || []
        // В объект this.listeners помещаем event в качестве ключа
        this.listeners[event].push(fn)
        // И push() функций в массив, и в качестве значения в объекте
        return () => {
            // Мы фильтруем объект получаем, значения и проверяем есть ли он или нет.
            // Мы тут избавляемся от подписки
            this.listeners[event] = 
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

// const emitter = new Emitter()

// emitter.subscribe('Murad', data => console.log('Sub:', data))

// emitter.emit('Murad', 25)