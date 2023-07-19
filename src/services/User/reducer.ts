import { TUserActions } from "./action";
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

type TUserState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  isAuthChecked: boolean;

  message: string | null;
  userRequest: boolean;
  userFailed: boolean;

  userRegisterSuccess: boolean;
  userLoginSuccess: boolean;
  resetPasswordSuccess: boolean;
};

const initialState: TUserState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthChecked: false,

  message: null,
  userRequest: false,
  userFailed: false,

  userRegisterSuccess: false,
  userLoginSuccess: false,
  resetPasswordSuccess: false,
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): TUserState => {
  switch (action.type) {
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.authChecked,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case SET_USER_FAILED: {
      return {
        ...state,
        user: null,
        // err: action.err
      };
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
        userRegisterSuccess: false,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        isAuthChecked: true,
        userRegisterSuccess: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        user: action.user,
      };
    }
    case REGISTER_USER_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        isAuthChecked: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        user: action.user,
      };
    }
    case LOGOUT_USER_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        isAuthChecked: true,
        userLoginSuccess: false,
        accessToken: null,
        refreshToken: null,
        user: null,
      };
    }
    case LOGIN_USER_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        message: action.message,
        userRequest: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        userRequest: true,
        resetPasswordSuccess: false,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        message: action.message,
        userRequest: false,
        resetPasswordSuccess: true,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        userFailed: false,
        userRequest: false,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
