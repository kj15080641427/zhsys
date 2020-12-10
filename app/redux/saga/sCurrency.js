import { call, put, all, takeEvery } from "redux-saga/effects";
import * as types from "../type/tCurrency";
import * as req from "../../request";
import { createHashHistory } from "history";
const hashHistory = createHashHistory();
const code = 200;
// const initSelect = {
//   current: 1,
//   size: 10,
// };
/**
 * 登录
 */
function* getWater({ data }) {
  try {
    const result = yield call(req.loginIn, data);
    if (result.code == code) {
      localStorage.setItem("token", result.data.userToken);
      hashHistory.push("/home/");
      yield put({
        type: types.SET_USER_INFO,
        data: result.data,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
export default function* currency() {
  yield all([takeEvery(types.LOGIN_IN, getWater)]);
}
