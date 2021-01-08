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
