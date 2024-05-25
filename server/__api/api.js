import axios from "axios";

export const getApi = async (url, headers = {}) => {
  try {
    const result = await axios.get(url, {
      headers: headers,
    });
    return {
      status: result.status,
      data: result.data,
    };
  } catch (err) {
    console.log(err);
    const data = err?.response?.data
      ? err?.response?.data
      : "Failed to connect";
    const status = err?.response?.status ? err?.response?.status : 500;
    return { status, data };
  }
};

export const getByIdApi = async (url, id, headers = {}) => {
  try {
    const result = await axios.get(`${url}/${id}`, {
      headers: headers,
    });
    return {
      status: result.status,
      data: result.data,
    };
  } catch (err) {
    const data = err?.response?.data
      ? err?.response?.data
      : "Failed to connect";
    const status = err?.response?.status ? err?.response?.status : 500;
    return { status, data };
  }
};

export const getByParamsApi = async (url, params, headers = {}) => {
  try {
    const result = await axios.get(url, {
      params: params,
      headers: headers,
    });
    return {
      status: result.status,
      data: result.data,
    };
  } catch (err) {
    const data = err?.response?.data
      ? err?.response?.data
      : "Failed to connect";
    const status = err?.response?.status ? err?.response?.status : 500;
    return { status, data };
  }
};
