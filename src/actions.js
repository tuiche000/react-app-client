export const SET_FOLIDAY_TOKEN = 'folidayToken';
export const SET_USER_INFO = 'userInfo';
export const SET_NOT_LAYOUT = 'notLayout'

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
