import { combineReducers } from "redux";
// import userinfo from './userinfo';
import currency from "./rCurrency";
import formItems from "./rFormItems";

export default combineReducers({
  currency,
  formItems,
});
