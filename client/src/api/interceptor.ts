import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

// * create instance
export const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// * request interceptor
api.interceptors.request.use((config: AxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = 'token' || 'getSomething'

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    },
  } as InternalAxiosRequestConfig
})
