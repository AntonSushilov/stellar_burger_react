import {
  GET_USER,
  SET_USER,
  SET_AUTH_CHECKED,

  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,

  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED
} from './type'

const initialState = {

  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthChecked: false,

  message: null,
  userRequest: false,
  userFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true
      };
    }
    case GET_USER: {
      return {
        ...state,
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.user
      };
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        userRequest: true
      };
    }
    case REGISTER_USER_SUCCESS: {     
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
    case REGISTER_USER_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        userRequest: true
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
    case LOGIN_USER_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        userRequest: true
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        message: action.message,
        userRequest: false
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false
      };
    }
    default: {
      return state;
    }
  }

}