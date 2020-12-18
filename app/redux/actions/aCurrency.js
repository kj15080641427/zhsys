import * as types from "../type/tCurrency";
// 登录
export const loginIn = (data) => {
  return {
    type: types.LOGIN_IN,
    data,
  };
};

export const getBase = (data) => {
  return {
    type: types.GET_BASE,
    data,
  };
};
// 添加 /修改
export const addOrUpdateBase = (data) => {
  return {
    type: types.ADD_OR_UPD_BASE,
    data,
  };
};
// 删除

export const delBase = (data) => {
  return {
    type: types.DEL_BASE,
    data,
  };
};
export const showModal = () => {
  return {
    type: types.SHOW_MODAL,
  };
};
export const hideModal = () => {
  return {
    type: types.HIDE_MODAL,
  };
};

// 根据角色id查询权限
export const getPermissionDataById = (data) => {
  return {
    type: types.GET_PERMISSION_DATA_BY_ID,
    data,
  };
};

export const hideRPModal = (data) => {
  return {
    type: types.HIDE_R_P_MODAL,
    data,
  };
};

export const setSelectList = (data) => {
  return {
    type: types.SET_SELECT_LIST,
    data,
  };
};

export const setRolePermission = (data) => {
  return {
    type: types.SET_ROLE_PERMISSION,
    data,
  };
};

export const setShowForm = (data) => {
  return {
    type: types.SET_SHOW_FORM,
    data,
  };
};

//审批流程
export const approvalFlow = (data) => {
  return {
    type: types.APPROVAL_FLOW,
    data,
  };
};


export const getPurListInfo = (data) => {
  return {
    type: types.GET_PUR_LIST_INFO,
    data,
  };
};
