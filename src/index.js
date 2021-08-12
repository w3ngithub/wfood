import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import getReducer from "./redux/reducer/getReducer";
import searchReducer from "./redux/reducer/searchReducer";
import favouriteReducer from "./redux/reducer/favouriteReducer";

const reducers = combineReducers({
  searchReducer,
  getReducer,
  favouriteReducer,
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// console.log(store.getState());
