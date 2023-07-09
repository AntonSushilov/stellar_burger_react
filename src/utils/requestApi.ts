import { IResponse, IAuthResponse } from "./types";

const API_URL = "https://norma.nomoreparties.space/api";
const checkResponse = <T>(res: Response): Promise<T> => {
  console.log(res);

  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const requestApi = <T extends IResponse>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return fetch(API_URL + url, options)
    .then((res) => {
      console.log("res_tyt",res);

      return checkResponse<T>(res);
    })
    .then((data) => {
      if (!data.success) {
        return Promise.reject(`${data.message}`);
      }
      return data;
    });
};

export const refreshToken = (): Promise<IAuthResponse> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
  return requestApi<IAuthResponse>(`${API_URL}/auth/token`, options);
};

export const fetchWithRefresh = async <T extends IResponse>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const responce = await requestApi<T>(url, options);
    console.log("responce_tyt", responce)
    return responce
  } catch (err) {
    if ((err as { message: string }).message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);

      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }

      return await requestApi<T>(url, options); //повторяем запрос
    } else {
      return Promise.reject(err);
    }
  }
};
