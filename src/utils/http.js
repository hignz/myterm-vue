import axios from 'axios';

const http = axios.create({
  baseURL: 'https://itsligo-utils.herokuapp.com/api'
});

http.interceptors.request.use(
  config => {
    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default http;
