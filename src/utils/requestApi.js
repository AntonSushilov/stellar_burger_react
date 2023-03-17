const API_URL = "https://norma.nomoreparties.space/api";
function checkResponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const requestApi = (url, options) => {
  return fetch(API_URL + url, options).then(checkResponse).then(data => { if (data?.success) return data; return Promise.reject(data) })
}