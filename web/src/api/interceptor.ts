import axios, { AxiosInstance, AxiosResponse } from "axios";
import { router } from "../Routes";

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      router.navigate("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
