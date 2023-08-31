// * interceptor.ts
export interface requestType {
  url: string
  params?: {
    [key: string]: string | number | boolean
  }
}

// * axios error response type
export interface axiosErrorType {
  receiveData?: string
  receiveObj?: {
    [key: string]: string | number | boolean
  }
  msg: string
}

// * Auth.ts
export interface objType {
  [key: string]: string | number | boolean
}
