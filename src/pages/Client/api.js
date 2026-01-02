import axios from 'axios';
import { API_URL, getCookie } from '../const/const';

// Tạo một instance axios tùy chỉnh
const api = axios.create({
  baseURL: API_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Thêm Request Interceptor ---
api.interceptors.request.use(
  (config) => {
    // Lấy Token từ Local Storage
    const token =  getCookie("S_CLIENT");

    // Nếu Token tồn tại, thêm vào Header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;