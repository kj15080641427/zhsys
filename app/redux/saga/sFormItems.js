import { all, put, takeEvery, call } from "redux-saga/effects";
import * as types from "../type/tFormitems";
import { getFlow } from "../../request/index";
const sucCode = 200;

function* getFlowNode({ data }) {
  try {
    const result = yield call(getFlow, data);
    if (result.code == sucCode) {
      yield put({
        type: types.SET_FLOW,
        data: result.data,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

export default function* formItems() {
  yield all([takeEvery(types.GET_FLOW, getFlowNode)]);
}
