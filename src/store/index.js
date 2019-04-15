import {createStore, combineReducers} from 'redux';
import user from './user';

export default createStore(combineReducers({
    user
}));