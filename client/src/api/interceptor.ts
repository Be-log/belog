import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { paramsType, urlType } from '../interfaces/apiTypes'

// * [axios instance] create instance
export const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// * [axios instance] request interceptor
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

// * [HTTP Req Method] get
export const getRequest = async ({ url, params = {} }: paramsType) => {
  try {
    const response = await api.get(url, params)
    return response.data
  } catch (error) {
    console.log('error occurred', error)
    throw error
  }
}

// * [HTTP Req Method] post
export const postRequest = async ({ url, params }: paramsType) => {
  try {
    const response = await api.post(url, params)
    return response.data
  } catch (error) {
    console.log('error occurred', error)
    throw error
  }
}

// * [HTTP Req Method] put
export const putRequest = async ({ url, params }: paramsType) => {
  try {
    const response = await api.put(url, params)
    return response.data
  } catch (error) {
    console.log('error occurred', error)
    throw error
  }
}

// * [HTTP Req Method] delete
export const deleteRequest = async ({ url }: urlType) => {
  try {
    const response = await api.delete(url)
    return response.data
  } catch (error) {
    console.log('error occurred', error)
    throw error
  }
}
