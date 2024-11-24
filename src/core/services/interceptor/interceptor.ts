import axios from "axios";
import toast from "react-hot-toast";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status >= 400 && error?.response?.status < 500) {
      toast.error("خطایی رخ داد. دوباره امتحان کنید.");
    }
    return Promise.reject(error);
  }
);

export default http;
