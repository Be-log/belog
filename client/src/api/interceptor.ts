import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError } from 'axios'
import { Cookies } from 'react-cookie'
import { requestType } from '../interfaces/apiTypes'

const cookies = new Cookies()

// * [axios instance] create instance
export const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// * [axios instance] request interceptor
api.interceptors.request.use(
  (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = cookies.get('token')

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    } as InternalAxiosRequestConfig
  },
  (error) => {
    return Promise.reject(error)
  },
)

// * [axios instance] response interceptor
api.interceptors.response.use(
  (response) => {
    try {
      return response
    } catch (error) {
      return Promise.reject(error)
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// * [HTTP Req Method] get
export const getRequest = async (url: string) => {
  const response = await api.get(url)
  return response.data
}

// * [HTTP Req Method] post
export const postRequest = async ({ url, params }: requestType) => {
  const response = await api.post(url, params)
  return response.data
}

// * [HTTP Req Method] put
export const putRequest = async ({ url, params }: requestType) => {
  const response = await api.put(url, params)
  return response.data
}

// * [HTTP Req Method] delete
export const deleteRequest = async (url: string) => {
  const response = await api.delete(url)
  return response.data
}
