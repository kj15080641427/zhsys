import { all, put, takeEvery, call } from "redux-saga/effects";
import * as types from "../type/tFormitems";
import { getFlow } from "../../request/index";
import { message } from "antd";
import {
  getLimsUselanapplyById,
  getRepairById,
  getMaintianById,
} from "../../request";
const sucCode = 200;
const initSelect = { current: 1, size: -1 };
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

/**获取数据 */
function* getModalSelect({ data }) {
  const { request, key, param = initSelect } = data;
  // yield put({
  //   type: types.STATR_LOADING,
  // });
  let res = [];
  try {
    const result = yield call(request, param);
    if (result.code === sucCode) {
      res = result.data;
    } else {
      message.error(result.msg);
    }
  } catch (e) {
    console.log(e);
  }
  // yield put({ type: types.END_LOADING });
  yield put({
    type: types.SET_MODEL_SELECT,
    payload: { data: res, key: key },
  });
}
//获取购置清单
function* getPurpList({ data }) {
  try {
    const result = yield call(getLimsUselanapplyById, data);
    if (result.code == sucCode) {
      yield put({
        type: types.SET_PURP_LIST,
        data: result.data.limsPurplanapplyitemDOList,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

//获取维修
function* getRepairList({ data }) {
  try {
    const result = yield call(getRepairById, data);
    if (result.code == sucCode) {
      yield put({
        type: types.SET_REPAIR_LIST,
        data: result.data.limsRepairapplyitemDOList,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

//获取养护
function* getMaintianList({ data }) {
  try {
    const result = yield call(getMaintianById, data);
    if (result.code == sucCode) {
      yield put({
        type: types.SET_MAINTIAN_LIST,
        data: result.data.limsRepairmaintainapplyitemList,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

export default function* formItems() {
  yield all([
    takeEvery(types.GET_FLOW, getFlowNode),
    takeEvery(types.GET_MODEL_SELECT, getModalSelect),
    takeEvery(types.GET_PURP_LIST, getPurpList),
    takeEvery(types.GET_REPAIR_LIST, getRepairList),
    takeEvery(types.GET_MAINTIAN_LIST, getMaintianList),
  ]);
}
