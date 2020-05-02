import axios from 'axios';

const http = axios.create({
  baseURL: 'https://itsligo-utils.herokuapp.com/api'
});

export default http;
