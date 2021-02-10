import {storage} from '@/core/utils'

// Дефолтное состояние
const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    currentText: ''
}

// В этой перемене мы делаем запрос и получаем с localStorage данные, если их там нет, то получаем дефолтное состояние
export const initialState = storage("excel-state") ? storage("excel-state") : defaultState