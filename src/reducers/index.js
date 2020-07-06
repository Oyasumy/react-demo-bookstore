import { combineReducers } from "redux";
import stateBook from "./books";
import cart from "./cart";
const myReducer=combineReducers({
    stateBook,cartList:cart
});
export default myReducer;