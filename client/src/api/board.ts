import { objType } from '../interfaces/apiTypes'
import { getRequest, postRequest } from './interceptor'

export const setBoard = async (boardData: objType) => {
  return postRequest({ url: `/api/boards`, params: boardData })
}

export const getBoard = async (postId: string | undefined) => {
  return getRequest(`/api/boards/${postId}`)
}

export const getBoardList = async () => {
  return getRequest(`/api/boards`)
}
