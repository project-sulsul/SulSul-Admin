import axios from "axios";

const sulApi = axios.create({
  baseURL: 'https://sulsul.link',
  // baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

sulApi.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem("auth");
    return config;
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default sulApi;