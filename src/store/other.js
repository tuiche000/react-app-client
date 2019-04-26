import { SET_NOT_LAYOUT } from '../actions';

export default function (state = {
  notLayout: false
}, action) {
  switch (action.type) {
    // 保存是否需要显示Layout组建
    case SET_NOT_LAYOUT:
      if (state.notLayout === action.value) {
        return state;
      }
      return {
        ...state,
        notLayout: action.value
      };
    default:
      return state;
  }
}