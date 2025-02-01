import axios from 'axios';
import { setupInterceptors } from './interceptors';

const axiosInstance = axios.create({
  baseURL: 'https://api.altan.ai/galaxia/hook/qtBxC1',
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptors(axiosInstance);

export default axiosInstance;