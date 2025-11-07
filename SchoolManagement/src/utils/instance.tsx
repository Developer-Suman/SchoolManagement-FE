import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
api.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/Authentication/login")) {
      return config;
    }

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
