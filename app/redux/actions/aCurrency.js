import * as types from "../type/tCurrency";
// 登录
export const loginIn = (data) => {
  return {
    type: types.LOGIN_IN,
    data,
  };
};
