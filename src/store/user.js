import {SET_LOGIN} from '../actions';

export default function (state={login: false}, action){
  switch(action.type){
    case SET_LOGIN:
    default:
      return state;
  }
}