import * as types from "../type/tCurrency";
const initState = {
  visible: false,
  permissionList: [],
  modalVisible: false,
  showForm: false,
  totalPrice: 0,
  fileList: [],
  imageList: [],
  attachmentList: [],
  returnBackList: [],
  deposiDevice: {},
};
export default function currency(state = initState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case types.LOGIN_IN:
      newState = { ...newState, userInfo: action.data };
      break;
    case types.CURRENCY:
      //saga在put时在payload对象中传入key作为store的key值	payload: { data: data,key:'baseSite' }
      newState[action.payload.key] = action.payload.data;
      // console.log(action,'ACTION')
      break;
    case types.SHOW_MODAL:
      newState = { ...newState, visible: true };
      break;
    case types.HIDE_MODAL:
      newState = { ...newState, visible: false };
      break;

    case types.SET_R_P_SELECT_LIST: // 根据角色获取权限 选中已有权限
      newState = {
        ...newState,
        // modalVisible: true,
        permissionList: action.data,
      };
      break;
    case types.HIDE_R_P_MODAL:
      newState = { ...newState, modalVisible: false, permissionList: [] };
      break;
    case types.SET_SELECT_LIST:
      newState = {
        ...newState,
        permissionList: action.data,
      };
      break;
    case types.SHOW_R_P_MODAL:
      newState.modalVisible = true;
      break;
    case types.SET_SHOW_FORM:
      newState.showForm = action.data;
      break;
    case types.SET_TOTAL_PRICE:
      newState.totalPrice = action.data;
      break;
    case types.SET_COMPLEXFUND:
      newState.complexfund = action.data;
      break;
    case types.SET_USELEND_FILE:
      newState.fileList = action.data;
      break;
    case types.SET_USELEND_IMAGE:
      newState.imageList = action.data;
      break;
    case types.SET_ATTACHMENT_BY_ID:
      newState.attachmentList = action.data;
      break;
    case types.SET_RETURN_BACKLIST:
      newState.returnBackList = action.data;
      break;
    default:
      return state;
  }
  return newState;
}
