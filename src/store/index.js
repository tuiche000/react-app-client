import { createStore, combineReducers } from 'redux';
import user from './user';

let store = createStore(combineReducers({
    user
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe((...args) => {
    console.log('订阅', args)
})
export default store