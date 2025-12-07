// src/api/api_admin.js
import axios from "axios";
import { API_URL, getCookie } from "../const/const";

const api_admin = axios.create({
  baseURL: API_URL,
});

// Tự động gắn token mỗi khi gọi API
api_admin.interceptors.request.use((config) => {
  const token = getCookie("S_ADMIN");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api_admin;
