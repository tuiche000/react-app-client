export const SET_FOLIDAY_TOKEN = 'folidayToken';
export const SET_USER_INFO = 'userInfo';
export const SET_NOT_LAYOUT = 'notLayout';
export const SET_IS_INSIDE_APP = 'isInsideApp';

// 保存token
export function setFolidayToken(string) {
  return {
    type: SET_FOLIDAY_TOKEN,
    value: string
  };
}

// 保存用户信息
export function setUserInfo(json) {
  return {
    type: SET_USER_INFO,
    value: json
  };
}

// 设置是否需要显示Layout
export function setNotLayout(boolean) {
  return {
    type: SET_NOT_LAYOUT,
    value: boolean
  };
}

// 设置是否在APP内
export function setIsInsideApp(boolean) {
  return {
    type: SET_IS_INSIDE_APP,
    value: boolean
  };
}
