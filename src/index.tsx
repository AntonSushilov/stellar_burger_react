import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, ActionCreator, Action } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { Provider } from "react-redux";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import App from "./components/App/App";

import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./services/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { TBurgerIngredientsActions } from "./services/BurgerIngredients/action";
import { TBurgerConstructorActions } from "./services/BurgerConstructor/action";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const middlewareEnhacer = applyMiddleware(thunk);
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions =
  | TBurgerIngredientsActions
  | TBurgerConstructorActions;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;

// const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
