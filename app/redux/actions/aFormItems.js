import * as types from "../type/tFormitems";

//搜索框
export const changeSearchInput = (data) => {
  return {
    type: types.CHANGE_SEARCH_INPUT,
    data,
  };
};
//查询流程节点
export const getFlow = (data) => {
  return {
    type: types.GET_FLOW,
    data,
  };
};
//
export const getModalSelect = (data) => {
  return {
    type: types.GET_MODEL_SELECT,
    data,
  };
};

export const setModalRecords = (data) => {
  return {
    type: types.SET_MODEL_RECORDS,
    data,
  };
};
//获取购置清单
export const getPurpList = (data) => {
  return {
    type: types.GET_PURP_LIST,
    data,
  };
};
//获取购置清单
export const setPurpList = (data) => {
  return {
    type: types.SET_PURP_LIST,
    data,
  };
};