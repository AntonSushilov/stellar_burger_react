import { AppDispatch } from "./../../index";
import { requestApi } from "../../utils/requestApi";
import { fetchWithRefresh } from "../../utils/requestApi";
import { IAuthResponse } from "../../utils/types";

import {
  GET_USER,
  SET_USER,
  SET_USER_FAILED,
  SET_AUTH_CHECKED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
} from "./type";

// Типизация экшенов
export interface ISetUserRequestAction {
  readonly type: typeof SET_USER;
  readonly user: any | null;
}
export interface ISetUserFailedAction {
  readonly type: typeof SET_USER_FAILED;
}
export interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly authChecked: boolean;
}
export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: any;
}
export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: any;
}
export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
}

export interface ILogoutUserRequestAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}
export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}
export interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_FAILED;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: any;
}
export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  readonly message: string;
}
export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly message: string;
}
export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IRefreshTokenRequestAction {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccessAction {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
  readonly accessToken: string;
  readonly refreshToken: string;
}
export interface IRefreshTokenFailedAction {
  readonly type: typeof REFRESH_TOKEN_FAILED;
}

export type TUserActions =
  | ISetUserRequestAction
  | ISetUserFailedAction
  | ISetAuthCheckedAction
  | IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginUserRequestAction
  | ILoginUserSuccessAction
  | ILoginUserFailedAction
  | ILogoutUserRequestAction
  | ILogoutUserSuccessAction
  | ILogoutUserFailedAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction
  | IForgotPasswordRequestAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordFailedAction
  | IRefreshTokenRequestAction
  | IRefreshTokenSuccessAction
  | IRefreshTokenFailedAction;

export function registerUser(email: string, password: string, name: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  };
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    requestApi<IAuthResponse>("/auth/register", requestOptions).then((res) => {
      if (res && res.success) {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          user: res.user,
        });
      } else {
        dispatch({
          type: REGISTER_USER_FAILED,
        });
      }
    });
  };
}

export function loginUser(email: string, password: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    requestApi<IAuthResponse>("/auth/login", requestOptions).then((res) => {
      if (res && res.success) {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        console.log("LOGIN_USER_SUCCESS", res);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          user: res.user,
        });
      } else {
        dispatch({
          type: LOGIN_USER_FAILED,
        });
      }
    });
  };
}

//выход
export function logoutUser() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    requestApi(`/auth/logout`, requestOptions)
      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: LOGOUT_USER_SUCCESS,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_USER_FAILED,
          // err
        });
      });
  };
}

export function forgotPassword(email: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email }),
  };
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    requestApi("/password-reset", requestOptions).then((res) => {
      if (res && res.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          message: res.message,
        });
      } else {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      }
    });
  };
}

export function resetPassword(password: string, token: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  };
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    fetchWithRefresh("/password-reset/reset", requestOptions).then((res) => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          message: res.message,
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      }
    });
  };
}

//получения данных о пользователе
export function getUser() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SET_AUTH_CHECKED,
      authChecked: false,
    });
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(localStorage.getItem("accessToken")),
      },
    };
    return fetchWithRefresh(`/auth/user`, requestOptions)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SET_USER,
            user: res.user,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: SET_USER_FAILED,
          // err: err
        });
      });
  };
}

export function checkUserAuth() {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: SET_USER,
            user: null,
          });
        })
        .finally(() =>
          dispatch({
            type: SET_AUTH_CHECKED,
            authChecked: true,
          })
        );
    } else {
      dispatch({
        type: SET_AUTH_CHECKED,
        authChecked: true,
      });
    }
  };
}

//обновление данных о пользователе
export function updateUser(
  name: string,
  email: string,
  password: string | null
) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: String(localStorage.getItem("accessToken")),
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  };
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    fetchWithRefresh(`/auth/user`, requestOptions)
      .then((res) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          user: res.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER_FAILED,
          // err
        });
      });
  };
}

export function refreshToken(refreshToken: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: refreshToken,
    }),
  };
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    requestApi<IAuthResponse>("/auth/token", requestOptions).then((res) => {
      if (res && res.success) {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        });
      } else {
        dispatch({
          type: REFRESH_TOKEN_FAILED,
        });
      }
    });
  };
}
