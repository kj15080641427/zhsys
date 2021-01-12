import * as types from "../type/tFormitems";

const initState = {
  flowNode: [],
  purpList: [], //购置清单
};

const formItems = (state = initState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case types.SET_MODEL_SELECT:
      //saga在put时在payload对象中传入key作为store的key值	payload: { data: data,key:'baseSite' }
      newState[action.payload.key] = action.payload.data;
      break;
    case types.CHANGE_SEARCH_INPUT:
      newState = { ...newState, searchInput: action.data };
      break;
    case types.SET_FLOW:
      newState = { ...newState, flowNode: action.data.records[0] };
      break;
    case types.SET_MODEL_RECORDS:
      newState = { ...newState, modelRecords: action.data };
      break;
    case types.SET_PURP_LIST:
      newState = { ...newState, purpList: action.data };
      break;
    default:
      return newState;
  }
  return newState;
};
export default formItems;
