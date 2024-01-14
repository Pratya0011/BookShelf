import axios from "axios";

let accessToken = localStorage.getItem("accessToken");
let refreshToken = localStorage.getItem("refreshToken");
let id = localStorage.getItem("userId");

const headers = {
  "Content-Type": "application/json",
  access: accessToken,
  refresh: refreshToken,
  id: id,
};

const apiInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: headers,
});

export default apiInstance;
