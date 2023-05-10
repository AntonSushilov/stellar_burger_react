type TReq = {
  success: boolean,
  // message?: string,
  // refreshToken?: string,
  // accessToken?: string
  
}

const API_URL = "https://norma.nomoreparties.space/api";
const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const requestApi = <T extends TReq>(
  url: string,
  options: RequestInit
): Promise<T> => {
  return fetch(API_URL + url, options)
    .then((res) => checkResponse<T>(res))
    .then((data) => {
      if (!data.success){
        throw new Error(`${(data as any).message}`);
      }
      return data
      // if (data?.success) return data;
      // return Promise.reject(data);
      // return Promise.reject(data)
    });
};

export const refreshToken = <T extends TReq>(): Promise<T> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }
  return requestApi<T>(`${API_URL}/auth/token`, options);
};

export const fetchWithRefresh = async <T extends TReq>(url: string, options: RequestInit): Promise<T> => {
  try {
    return await requestApi(API_URL + url, options);
  } catch (err) {
    if ((err as Error).message === "jwt expired") {
      const refreshData = await refreshToken<T>(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", (refreshData as any).refreshToken);
      localStorage.setItem("accessToken", (refreshData as any).accessToken);
      const optionsRefresh = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          authorization: (refreshData as any).accessToken,
        },
      };
      // options = {...options, headers: {...options.headers, authorization: refreshData.accessToken}}
      // options.headers.authorization = refreshData.accessToken;
      return await requestApi(API_URL + url, optionsRefresh); //повторяем запрос
      // return res;
    } else {
      return Promise.reject(err);
    }
  }
};
