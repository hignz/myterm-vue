import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const http = axios.create({
  baseURL: 'https://myterm.herokuapp.com/api',
  adapter: cacheAdapterEnhancer(axios.defaults.adapter)
});

export default http;
