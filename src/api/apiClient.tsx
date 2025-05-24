// src/api/apiClient.tsx
import axios, { AxiosInstance } from 'axios';

// 1) Create and configure a single axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://crud-ae-tech-interns-vzuj.vercel.app',
  headers: {
    'Content-Type': 'application/json',
    // Add any other common headers here, e.g. authorization
    // 'Authorization': `Bearer ${token}`,
  },
  timeout: 10000, // 10s timeout for all requests
});

// 2) (Optional) Add a response interceptor to handle common errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    // You could inspect error.response.status here
    // and show a toast or redirect on 401, etc.
    return Promise.reject(error);
  }
);

export default apiClient;
