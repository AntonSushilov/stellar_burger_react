import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware  } from "redux";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import App from "./components/App/App";

import reportWebVitals from "./reportWebVitals";
import {rootReducer} from './services/reducers'


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = createStore(rootReducer, applyMiddleware(thunk)); 

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
