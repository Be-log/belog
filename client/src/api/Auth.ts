import { objType } from '../interfaces/apiTypes'
import { postRequest } from './interceptor'

export const setSignUp = async (authData: objType) => {
  return postRequest({ url: `/api/users/signup`, params: authData })
}
