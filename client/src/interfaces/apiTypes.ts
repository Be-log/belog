// * interceptor.ts
export interface paramsType {
  url: string
  params?: {
    [key: string]: string | number | boolean
  }
}

export interface urlType {
  url: string
}

// * Auth.ts
export interface objType {
  [key: string]: string | number | boolean
}
