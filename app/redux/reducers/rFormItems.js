import * as types from "../type/tFormitems";

const initState = {
  flowNode: [],
};

const formItems = (state = initState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case types.CHANGE_SEARCH_INPUT:
      newState = { ...newState, searchInput: action.data };
      break;
    case types.SET_FLOW:
      newState = { ...newState, flowNode: action.data.records[0] };
      break;
    default:
      return newState;
  }
  return newState;
};
export default formItems;
