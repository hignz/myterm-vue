import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const http = axios.create({
  baseURL: 'https://itsligo-utils.herokuapp.com/api',
  adapter: cacheAdapterEnhancer(axios.defaults.adapter)
});

export default http;
