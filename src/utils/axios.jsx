import axios from "axios";
import { HOST_API } from "../config-global";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (401 === error.response.status) {
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("permissions");
      window.location = "/";
    } else if (403 === error.response.status) {
      // Menampilkan pesan dengan React Hot Toast
      toast.error("Anda tidak memiliki izin untuk mengakses halaman ini", {
        position: "top-center",
        duration: 4000,
      });
      // Atau, arahkan ke halaman tertentu
      window.location = "/Forbidden";
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: "/api/login",
    logout: "/api/logout",
  },
};
