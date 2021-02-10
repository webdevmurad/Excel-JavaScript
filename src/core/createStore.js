export class CreateStore {
    constructor(rootReducer, initialState = {}) {
        this.state = rootReducer({...initialState}, {type: '__INIT__'});
        this.listeners = [];
        this.rootReducer = rootReducer;
    }
    
    subscribe(fn) {
        this.listeners.push(fn);
        return {
            unsubscribe() {
            this.listeners = this.listeners.filter(l => l !== fn);
        }
        };
    }
    
    dispatch(action) {
        this.state = this.rootReducer(this.state, action);
        this.listeners.forEach(listener => listener(this.state));
    }
    
    // Получаем состояние
    getState() {
        return this.state;
    }
}