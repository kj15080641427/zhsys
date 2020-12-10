import * as types from "../type/tCurrency";
export default function currency(state = {}, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case types.LOGIN_IN:
      newState = { ...newState, userInfo: action.data };
      break;
    default:
      return state;
  }
  return newState;
}
