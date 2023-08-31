import { objType } from '../interfaces/apiTypes'
import { postRequest } from './interceptor'

export const setBoard = async (boardData: objType) => {
  return postRequest({ url: `/api/boards`, params: boardData })
}
