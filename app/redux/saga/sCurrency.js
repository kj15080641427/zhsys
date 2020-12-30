import { call, put, all, takeEvery } from "redux-saga/effects";
import * as types from "../type/tCurrency";
import * as req from "../../request";
import { createHashHistory } from "history";
import { message } from "antd";
const hashHistory = createHashHistory();
const code = 200;
const initSelect = {
  current: 1,
  size: 10,
};
/**
 * 登录
 */
function* login({ data }) {
  try {
    const result = yield call(req.loginIn, data);
    if (result.code == code) {
      localStorage.setItem("token", result.data.userToken);
      hashHistory.push("/home/");
      yield put({
        type: types.SET_USER_INFO,
        data: result.data,
      });
    } else {
      message.error("账号或密码错误");
    }
  } catch (error) {
    console.error(error);
  }
}
/**获取数据 */
function* getbaseData({ data }) {
  const { request, key, param = initSelect } = data;
  yield put({
    type: types.STATR_LOADING,
  });
  let res = [];
  try {
    const result = yield call(request, param);
    if (result.code === code) {
      res = result.data;
    } else {
      message.error(result.msg);
    }
  } catch (e) {
    console.log(e);
  }
  yield put({ type: types.END_LOADING });
  yield put({
    type: types.CURRENCY,
    payload: { data: res, key: key },
  });
}
/**
 * 删除数据
 * @param {*} param0
 */
function* delBaseData({ data }) {
  const { request, key, param, query } = data;
  const { id, current, recordLength, size } = param;
  try {
    const result = yield call(request, id);
    if (result.code == code) {
      yield put({
        type: types.GET_BASE,
        data: {
          request: query,
          key: key,
          param: {
            current: recordLength == 1 && current != 1 ? current - 1 : current,
            size: size,
          },
        },
      });
    } else {
      message.error(result.msg);
    }
  } catch (e) {
    console.error(e);
  }
}
/**
 * 新增/修改数据
 * @param {*} param
 */
function* addOrUpdateBaseData({ data }) {
  const { request, key, param, query } = data;
  try {
    const result = yield call(request, param);
    if (result.code == code) {
      yield put({
        type: types.HIDE_MODAL,
      });
      yield put({
        type: types.SET_SHOW_FORM,
        data: false,
      });
      yield put({
        type: types.GET_BASE,
        data: { request: query, key: key, param: { current: 1, size: 10 } },
      });
    } else {
      message.error(result.msg);
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * 根据角色获取权限
 */
function* rolePermission({ data }) {
  yield put({
    type: types.SHOW_R_P_MODAL,
  });
  try {
    let res = [];
    const result = yield call(req.getJurisdiction, {
      roleId: data,
      current: 1,
      size: -1,
    });
    if (result.code == code) {
      // result.data.map((item) => console.log(item, "??"));
      res = result.data?.records
        ? result.data.records.map((item) => item?.id)
        : [];
      yield put({
        type: types.SET_R_P_SELECT_LIST,
        data: res,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

//角色授权
function* setRolePermission({ data }) {
  try {
    let result = yield call(req.setPermission, data);
    if (result.code == code) {
      yield put({
        type: types.HIDE_R_P_MODAL,
        data: false,
      });
      message.info("授权成功");
    } else {
      message.error(result.message);
    }
  } catch (e) {
    console.error(e);
  }
}

//
function* getPurListInfo({ data }) {
  try {
    let result = yield call(req.getLimsUselanapplyListPurItem, data);
    if (result.code == code) {
      console.log(result.data);
    } else {
      message.error(result.message);
    }
  } catch (e) {
    console.error(e);
  }
}

//年度经费
function* getComplexfund({ data }) {
  try {
    let result = yield call(req.getComplexfound, data);
    if (result.code == code) {
      yield put({
        type: types.SET_COMPLEXFUND,
        data: result.data,
      });
    } else {
      message.error(result.message);
    }
  } catch (e) {
    console.error(e);
  }
}
//获取附件
function* getAttachment({ data }) {
  try {
    let result = yield call(req.getAttachment, data);
    if (result.code == code) {
      yield put({
        type: types.SET_ATTACHMENT_BY_ID,
        data: result.data.records,
      });
    } else {
      message.error(result.message);
    }
  } catch (e) {
    console.error(e);
  }
}

//审批流程
function* approvalFlow({ data }) {
  try {
    const { req, param, msg = "审批成功" } = data;
    let result = yield call(req, param);
    if (result.code == code) {
      message.success(msg);
    } else {
      message.error(result.message);
    }
  } catch (e) {
    console.error(e);
  }
}
export default function* currency() {
  yield all([
    takeEvery(types.LOGIN_IN, login),
    takeEvery(types.GET_BASE, getbaseData),
    takeEvery(types.DEL_BASE, delBaseData),
    takeEvery(types.ADD_OR_UPD_BASE, addOrUpdateBaseData),
    takeEvery(types.GET_PERMISSION_DATA_BY_ID, rolePermission),

    takeEvery(types.SET_ROLE_PERMISSION, setRolePermission),
    takeEvery(types.GET_PUR_LIST_INFO, getPurListInfo),

    takeEvery(types.GET_COMPLEXFUND, getComplexfund),
    takeEvery(types.GET_ATTACHMENT_BY_ID, getAttachment),

    takeEvery(types.APPROVAL_FLOW, approvalFlow), //审批流程
  ]);
  // yield all([takeEvery(types.GET_BASE, getbaseData)]);
}
