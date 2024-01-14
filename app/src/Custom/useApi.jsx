import apiInstance from "./AxiosService";

const makeRequest = async (
  method,
  url,
  data = {},
  config = {},
  params = "",
  query = {}
) => {
  try {
    if (params !== "") {
      url += `/${params}`;
    }

    if (!isEmptyObject(query)) {
      url += `?${serialize(query)}`;
    }
    const response = await method(url, data, {
      ...config,
      headers: { ...apiInstance.defaults.headers, ...config.headers },
    });
    const authorizationHeader = response.headers.get("Authorization");
    const accessToken = authorizationHeader
      ? authorizationHeader.split(" ")[1]
      : null;
    accessToken ? localStorage.setItem("accessToken", accessToken) : "";
    return response;
  } catch (error) {
    return error;
  }
};

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function serialize(obj) {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
}

export const get = (url, config = {}, params = "", query = {}) =>
  makeRequest(apiInstance.get, url, null, config, params, query);
export const post = (url, data, config = {}, params = "", query = {}) =>
  makeRequest(apiInstance.post, url, data, config, params, query);
export const put = (url, data, config = {}, params = "", query = {}) =>
  makeRequest(apiInstance.put, url, data, config, params, query);
export const patch = (url, data, config = {}, params = "", query = {}) =>
  makeRequest(apiInstance.patch, url, data, config, params, query);
export const del = (url, config = {}, params = "", query = {}) =>
  makeRequest(apiInstance.delete, url, null, config, params, query);
