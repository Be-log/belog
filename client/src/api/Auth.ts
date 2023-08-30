import { objType } from '../interfaces/apiTypes'
import { postRequest } from './interceptor'

export const setSignUp = async (authData: objType) => {
  return postRequest({ url: `/api/users/signup`, params: authData })
}

export const setSignIn = async (authData: objType) => {
  return postRequest({ url: `/api/users/signin`, params: authData })
}
