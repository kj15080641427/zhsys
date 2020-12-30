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

//购置单总金额
export const setTotalPrice = (data) => {
  return {
    type: types.SET_TOTAL_PRICE,
    data,
  };
};

//获取年度经费
export const getComplexfund = (data) => {
  return {
    type: types.GET_COMPLEXFUND,
    data,
  };
};

//设置文件
export const steUselendFile = (data) => {
  return {
    type: types.SET_USELEND_FILE,
    data,
  };
};
//设置图片
export const steUselendImage = (data) => {
  return {
    type: types.SET_USELEND_IMAGE,
    data,
  };
};
//获取附件
export const getAttachmentById = (data) => {
  return {
    type: types.GET_ATTACHMENT_BY_ID,
    data,
  };
};

//归还清单
export const setReturnbackList = (data) => {
  return {
    type: types.SET_RETURN_BACKLIST,
    data,
  };
};
