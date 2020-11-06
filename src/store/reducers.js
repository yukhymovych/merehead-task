import { combineReducers } from "redux";
import { usersReducer } from "./users/reducers";

export default combineReducers({
   users: usersReducer,
});