import { objType } from '../interfaces/apiTypes'
import { postRequest, deleteRequest } from './interceptor'

export const setSignUp = async (authData: objType) => {
  return postRequest({ url: `/api/users/signup`, params: authData })
}

export const setSignIn = async (authData: objType) => {
  return postRequest({ url: `/api/users/signin`, params: authData })
}

export const setSignOut = async () => {
  return deleteRequest(`/api/users/signout`)
}
