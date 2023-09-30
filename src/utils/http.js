import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const http = axios.create({
  baseURL: 'https://myterm-api.onrender.com/v1',
  adapter: cacheAdapterEnhancer(axios.defaults.adapter),
});

export default http;
