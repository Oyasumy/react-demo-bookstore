import { combineReducers } from "redux";
import stateBook from "./books";
import cart from "./cart";
import report from "./report";
const myReducer = combineReducers({
  stateBook,
  cartList: cart,
  datatable: report,
});
export default myReducer;
