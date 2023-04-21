import { requestApi } from '../../utils/requestApi'
import { fetchWithRefresh } from '../../utils/requestApi';
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
} from './type'


export function registerUser(email, password, name) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    }),
  };
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST
    });
    requestApi("/auth/register", requestOptions).then(res => {
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
          type: REGISTER_USER_FAILED
        });
      }
    });
  };
}

export function loginUser(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_REQUEST
    });
    requestApi("/auth/login", requestOptions).then(res => {
      if (res && res.success) {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          user: res.user,
        });
      } else {
        dispatch({
          type: LOGIN_USER_FAILED
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
      token: localStorage.getItem('refreshToken')
    }),
  };
  return function (dispatch) {
    dispatch({
      type: LOGOUT_USER_REQUEST
    });
    requestApi(`/auth/logout`, requestOptions).then((res) => {
      if (res && res.success) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({
          type: LOGOUT_USER_SUCCESS
        });
      }
    })
      .catch(err => {
        dispatch({
          type: LOGOUT_USER_FAILED,
          err
        });
      })
  }
}

export function forgotPassword(email) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email }),
  };
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });
    requestApi("/password-reset", requestOptions).then(res => {
      if (res && res.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          message: res.message
        });
      } else {
        dispatch({
          type: FORGOT_PASSWORD_FAILED
        });
      }
    });
  };
}

export function resetPassword(password, token) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
      token: token
    }),
  };
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    fetchWithRefresh("/password-reset/reset", requestOptions).then(res => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          message: res.message
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
      }
    });
  };
}


//получения данных о пользователе
export function getUser() {
  return function (dispatch) {
    dispatch({
      type: SET_AUTH_CHECKED,
      authChecked: false,
    });
    return fetchWithRefresh(`/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken")
      },
    }).then(res => {
      if (res && res.success) {
        dispatch({
          type: SET_USER,
          user: res.user,
        });
      }
    }).catch(err => {
      dispatch({
        type: SET_USER_FAILED,
        err: err
      });
    })
  };
}

export function checkUserAuth() {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: SET_USER,
            user: null
          });
        })
        .finally(() => dispatch({
          type: SET_AUTH_CHECKED,
          authChecked: true
        }));
    } else {
      dispatch({
        type: SET_AUTH_CHECKED,
        authChecked: true
      });
    }
  };
};

//обновление данных о пользователе
export function updateUser(name, email, password) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  };
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    fetchWithRefresh(`/auth/user`, requestOptions).then(res => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        user: res.user,
      });
    })
      .catch(err => {
        dispatch({
          type: UPDATE_USER_FAILED,
          err
        });
      })
  };
}


export function refreshToken(refreshToken) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: refreshToken
    }),
  };
  return function (dispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST
    });
    requestApi("/auth/token", requestOptions).then(res => {
      if (res && res.success) {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        });
      } else {
        dispatch({
          type: REFRESH_TOKEN_FAILED
        });
      }
    });
  };
}



