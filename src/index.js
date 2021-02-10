import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {CreateStore} from '@/core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {storage} from '@/core/utils'
import {initialState} from '@/redux/initialState'
import './scss/index.scss'

// Создаём глобальное хранилище
// Передаётся ряд редьюсеров и начальное состояние
const store = new CreateStore(rootReducer, initialState)

// Метод для redux. Он подписывается на обновления компонентов.
// С localstorage получаем состояние по ключу
store.subscribe(state => {
    storage("excel-state", state)
    console.log('App State: ', state)
})

// Создаётся Таблица и передаётся главный id и массив его компонентов
const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})


excel.render()