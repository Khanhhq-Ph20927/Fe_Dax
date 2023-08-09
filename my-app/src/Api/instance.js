import axios from 'axios';
const PORT = "http://localhost:8080/";

export const instance = axios.create({
  baseURL: PORT,
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json'
  }
});

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      //`Bearer ${token}`;
      // config.headers["Content-Type"] = 'application/json';
      // config.headers["Access-Control-Allow-Origin"] = '*';
      // config.headers["Access-Control-Allow-Methods"] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
      // config.headers["Access-Control-Allow-Headers"] = '*';
      return config;
    }
    // check if acctoken localstorage
    //  retun config.header {}
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
