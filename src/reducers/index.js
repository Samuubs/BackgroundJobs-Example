import { combineReducers } from "redux";

import UserReducer from "./userReducer";
import { reducer as offline } from "redux-offline-queue";

const rootReducer =  combineReducers({
    UserReducer,
    offline
});

export default rootReducer;
