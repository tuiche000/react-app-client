export const SET_LOGIN='set_login';

export function setLogin(succ){
  return {
    type: SET_LOGIN,
    value: succ
  };
}
