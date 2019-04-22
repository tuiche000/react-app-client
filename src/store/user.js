import { SET_FOLIDAY_TOKEN, SET_USER_INFO } from '../actions';

export default function (state = {
  folidayToken: '',
  tokenList: {},
  userInfo: {},
}, action) {
  switch (action.type) {
    // 保存用户token
    case SET_FOLIDAY_TOKEN:
      localStorage.setItem(SET_FOLIDAY_TOKEN, action.value)
      return {
        ...state,
        folidayToken: action.value
      };
    // 保存用户信息
    case SET_USER_INFO:
      localStorage.setItem(SET_USER_INFO, action.value)
      return {
        ...state,
        userInfo: action.value
      };
    default:
      return state;
  }
}