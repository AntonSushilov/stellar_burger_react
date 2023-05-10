const API_URL = "https://norma.nomoreparties.space/api";
const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const requestApi = (url: string, options: RequestInit) => {
  return fetch(API_URL + url, options).then(checkResponse).then(data => { if (data?.success) return data; return Promise.reject(data) })
}

export const refreshToken = () => {
  return fetch(`${API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(API_URL + url, options);
    return await checkResponse(res);
  } catch (err) {
    if ((err as Error).message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      const optionsRefresh = {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: refreshData.accessToken,
        }
      }
      // options = {...options, headers: {...options.headers, authorization: refreshData.accessToken}}
      // options.headers.authorization = refreshData.accessToken;
      const res = await fetch(API_URL + url, optionsRefresh); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};