import axios from 'axios';
// import router from '../router/index';
// import store from '../store';

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
