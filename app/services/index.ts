import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { ApiResponse } from "../schemas/api";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENTVAR,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: any) => void;
  config: CustomAxiosRequestConfig;
}[] = [];

let sessionExpiredToastShown = false;

const processQueue = (error: any, tokenRefreshed = false) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else if (tokenRefreshed) {
      resolve(api(config));
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const error = err as AxiosError;
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!error.response) {
      if (!sessionExpiredToastShown) {
        toast.error("Network error. Redirecting...");
        sessionExpiredToastShown = true;
      }
      setTimeout(() => (window.location.href = "/"), 2000);
      return Promise.reject(error);
    }

    const data = error.response.data as { error?: string };

    if (error.response.status === 401 && data?.error === "User is banned") {
      toast.error("You have been banned. Please contact CC members.");
      setTimeout(() => (window.location.href = "/"), 2000);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        await axios.post<ApiResponse>(
          `${process.env.NEXT_PUBLIC_CLIENTVAR}/refreshToken`,
          {},
          { withCredentials: true }
        );
        isRefreshing = false;
        processQueue(null, true);
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, false);

        if (!sessionExpiredToastShown) {
          toast.error("Session expired. Please login again.");
          sessionExpiredToastShown = true;
        }

        setTimeout(() => (window.location.href = "/"), 2000);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
