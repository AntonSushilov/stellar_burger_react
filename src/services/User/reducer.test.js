import { userReducer } from "./reducer";
import * as types from "./type"

describe('user reducer', () => {
  const initialState = {
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
  }
  const user = {
    "email": "test@yandex.ru",
    "password": "1234"
  }
  const accessToken = "accessToken"
  const refreshToken = "refreshToken"
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(
      initialState
    )
  })


  it('should handle SET_AUTH_CHECKED', () => {
    const action = {
      type: types.SET_AUTH_CHECKED,
      authChecked: true
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      isAuthChecked: true
    })
  })

  it('should handle SET_USER', () => {
    const action = {
      type: types.SET_USER,
      user: user
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      user: user
    })
  })

  it('should handle SET_USER_FAILED', () => {
    const action = {
      type: types.SET_USER_FAILED,
      user: null
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      user: null
    })
  })

  it('should handle REGISTER_USER_REQUEST', () => {
    const action = {
      type: types.REGISTER_USER_REQUEST,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userRequest: true,
      userRegisterSuccess: false,
    })
  })

  it('should handle REGISTER_USER_SUCCESS', () => {
    const action = {
      type: types.REGISTER_USER_SUCCESS,
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userFailed: false,
      userRequest: false,
      isAuthChecked: true,
      userRegisterSuccess: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    })
  })

  it('should handle REGISTER_USER_FAILED', () => {
    const action = {
      type: types.REGISTER_USER_FAILED,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userFailed: true,
      userRequest: false,
    })
  })

  it('should handle LOGIN_USER_REQUEST', () => {
    const action = {
      type: types.LOGIN_USER_REQUEST,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userRequest: true,
    })
  })

  it('should handle LOGIN_USER_SUCCESS', () => {
    const action = {
      type: types.LOGIN_USER_SUCCESS,
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userFailed: false,
      userRequest: false,
      isAuthChecked: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    })
  })

  it('should handle LOGOUT_USER_FAILED', () => {
    const action = {
      type: types.LOGOUT_USER_FAILED,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userFailed: true,
      userRequest: false
    })
  })

  it('should handle LOGOUT_USER_REQUEST', () => {
    const action = {
      type: types.LOGOUT_USER_REQUEST,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userRequest: true
    })
  })

  it('should handle LOGOUT_USER_SUCCESS', () => {
    const action = {
      type: types.LOGOUT_USER_SUCCESS,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userFailed: false,
      userRequest: false,
      isAuthChecked: true,
      userLoginSuccess: false,
      accessToken: null,
      refreshToken: null,
      user: null,
    })
  })

  it('should handle LOGIN_USER_FAILED', () => {
    const action = {
      type: types.LOGIN_USER_FAILED,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userFailed: true,
      userRequest: false
    })
  })

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    const action = {
      type: types.FORGOT_PASSWORD_REQUEST,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userRequest: true
    })
  })

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    const message = "message"
    const action = {
      type: types.FORGOT_PASSWORD_SUCCESS,
      message: message
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userFailed: false,
      message: message,
      userRequest: false,
    })
  })

  it('should handle FORGOT_PASSWORD_FAILED', () => {
    const action = {
      type: types.FORGOT_PASSWORD_FAILED,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userFailed: true,
      userRequest: false,
    })
  })

  it('should handle RESET_PASSWORD_REQUEST', () => {
    const action = {
      type: types.RESET_PASSWORD_REQUEST,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userRequest: true,
      resetPasswordSuccess: false,
    })
  })

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    const message = "message"

    const action = {
      type: types.RESET_PASSWORD_SUCCESS,
      message: message
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userFailed: false,
      message: message,
      userRequest: false,
      resetPasswordSuccess: true,
    })
  })

  it('should handle RESET_PASSWORD_FAILED', () => {

    const action = {
      type: types.RESET_PASSWORD_FAILED,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userFailed: true,
      userRequest: false,
    })
  })

  it('should handle UPDATE_USER_REQUEST', () => {

    const action = {
      type: types.UPDATE_USER_REQUEST,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userRequest: true,
    })
  })
  it('should handle UPDATE_USER_SUCCESS', () => {

    const action = {
      type: types.UPDATE_USER_SUCCESS,
      user: user
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      user: user,
      userFailed: false,
      userRequest: false,
    })
  })

  it('should handle UPDATE_USER_FAILED', () => {

    const action = {
      type: types.UPDATE_USER_FAILED,
    }
    expect(
      userReducer(initialState, action)
    ).toEqual({
      ...initialState,
      userFailed: true,
      userRequest: false,
    })
  })
})