import { objType } from '../interfaces/apiTypes'
import { getRequest, postRequest, deleteRequest, putRequest } from './interceptor'

export const setBoard = async (newData: objType) => {
  const { type, ...boardData } = newData
  return type === 'post'
    ? postRequest({ url: `/api/boards`, params: boardData })
    : putRequest({ url: `/api/boards`, params: boardData })
}

export const getBoard = async (postId: string | undefined) => {
  return getRequest(`/api/boards/${postId}`)
}

export const getBoardList = async () => {
  return getRequest(`/api/boards`)
}

export const deleteBoard = async (postId: string | undefined) => {
  return deleteRequest(`api/boards/${postId}`)
}
