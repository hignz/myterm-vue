import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const http = axios.create({
  baseURL: 'http://localhost:3000/v1',
  adapter: cacheAdapterEnhancer(axios.defaults.adapter)
});

export default http;
