import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/auth";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["Authorization"] = getToken("token");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const registerUser = (userDetails) =>
  axios.post(REST_API_BASE_URL + "/register", userDetails);

export const login = (userDetails) =>
  axios.post(REST_API_BASE_URL + "/login", userDetails);

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (usernameOrEmail) => {
  sessionStorage.setItem("authenticatedUser", usernameOrEmail);
};

export const isUserLoggedIn = () => {
  const usernameOrEmail = sessionStorage.getItem("authenticatedUser");
  return usernameOrEmail !== null;
};

export const getLoggedInUser = () => {
  return sessionStorage.getItem("authenticatedUser");
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};
