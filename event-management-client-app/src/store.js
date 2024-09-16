import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//--
import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./slices/events";

const reducer = {
  events: eventReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});
//--

/*
const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
*/
export default store;
