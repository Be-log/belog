import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.request.use(
  (config) => {
    const accesstoken = cookies.get('accesstoken');
    const refreshtoken = cookies.get('refreshtoken');

    // * eslint Assignment to property of function parameter 'config' 에러 임시 비활성화 처리
    if (accesstoken && refreshtoken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.authorization = `${accesstoken}`;
      // eslint-disable-next-line no-param-reassign
      config.headers.refreshToken = `${refreshtoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
