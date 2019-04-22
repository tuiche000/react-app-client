import { SET_FOLIDAY_TOKEN } from '../actions';

export default function (state = {
  folidayToken: '',
  tokenList: {},
  userInfo: {},
}, action) {
  switch (action.type) {
    case SET_FOLIDAY_TOKEN:
      localStorage.setItem(SET_FOLIDAY_TOKEN, action.value)
      return {
        ...state,
        folidayToken: action.value
      };
    default:
      return state;
  }
}