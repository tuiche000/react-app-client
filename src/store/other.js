import { SET_NOT_LAYOUT, SET_IS_INSIDE_APP } from '../actions';

export default function (state = {
  notLayout: false,
  isInsideApp: false,
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
    // 设置是否在APP内
    case SET_IS_INSIDE_APP:
      return {
        ...state,
        isInsideApp: action.value
      };
    default:
      return state;
  }
}