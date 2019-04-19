import { SET_FOLIDAY_TOKEN } from '../actions';

export default function (state = {
  folidayToken: '',
  tokenList: {},
  userInfo: {},
}, action) {
  switch (action.type) {
    case SET_FOLIDAY_TOKEN:
    default:
      return state;
  }
}