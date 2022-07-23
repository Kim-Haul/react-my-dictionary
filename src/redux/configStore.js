// import { createStore, combineReducers } from "redux";
// import cardReducer from "./modules/cardReducer";

// const rootReducer = combineReducers({ cardReducer });
// const store = createStore(rootReducer);

// export default store;

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import cardReducer from "./modules/cardReducer";
import thunk from "redux-thunk";

const middlewares = [thunk];
const rootReducer = combineReducers({ cardReducer });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
