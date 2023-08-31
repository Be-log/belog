import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosError } from 'axios'
import MDEditor from '@uiw/react-md-editor'
import { styled } from 'styled-components'
import { Image, Button } from '../components/common'
import { profile } from '../assets'
import { getBoard, deleteBoard } from '../api/board'
import { axiosErrorType, objType } from '../interfaces/apiTypes'

const Post = () => {
  const postId = useParams().id
  const loginId = localStorage.getItem('id')
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [boardData, setBoardData] = useState<objType | null>(null)

  useQuery(['getBoard'], () => getBoard(postId), {
    onSuccess: (response) => setBoardData(response.receiveObj),
    onError: (error: AxiosError<axiosErrorType>) => alert(error.response?.data.msg),
  })

  // * [삭제] useMutation
  const setDeleteBoardMutation = useMutation(deleteBoard, {
    onSuccess: (response) => {
      alert(response.msg)
      navigate('/')
      queryClient.invalidateQueries({ queryKey: ['getBoardList'] })
    },
    onError: (error: AxiosError<axiosErrorType>) => {
      alert(error.response?.data.msg)
    },
  })

  // * [삭제] btn click
  const onDeleteClickHandler = () => {
    const isDeleteChk = window.confirm('게시글을 삭제하시겠습니까?')
    if (isDeleteChk) {
      setDeleteBoardMutation.mutate(postId)
    }
  }

  return (
    <WrapPost>
      {boardData && (
        <>
          <h1>{boardData.title}</h1>
          <PostInfoDiv>
            <UserInfoDiv>
              <span>{boardData.nickname}</span>
              <span>{'·'}</span>
              <span>{boardData.date}</span>
            </UserInfoDiv>
            {loginId === boardData.userId && (
              <PostEditDiv>
                <Button>{'수정'}</Button>
                <Button onclick={onDeleteClickHandler}>{'삭제'}</Button>
              </PostEditDiv>
            )}
          </PostInfoDiv>
          <PostDataDiv>
            <Image $width={1000} $height={500} src={String(boardData.thumbnail)} />
            <MDEditor.Markdown source={String(boardData.content)} />
          </PostDataDiv>
          <PostUserDiv>
            <Image $width={80} $height={80} $border={100} src={profile} />
            <div>
              <h2>{boardData.nickname}</h2>
              <h3>{`@${boardData.userId}`}</h3>
            </div>
          </PostUserDiv>
        </>
      )}
    </WrapPost>
  )
}

export default Post

const WrapPost = styled.main`
  width: 1000px;
  margin: auto;
  padding-bottom: 50px;
  * {
    color: ${({ theme }) => theme.darkWhite};
  }
  h1 {
    padding-top: 70px;
    font-size: 50px;
    font-weight: 600;
  }
`

const PostInfoDiv = styled.section`
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
`

const UserInfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    font-size: 18px;
  }
  span:nth-child(1) {
    font-weight: 600;
  }
  span:nth-child(3) {
    font-size: 16px;
    color: ${({ theme }) => theme.gray};
  }
`

const PostEditDiv = styled.section`
  display: flex;
  gap: 15px;
  justify-content: end;
  button {
    font-weight: 400;
    padding: 0;
  }
`

const PostDataDiv = styled.section`
  margin-top: 30px;
  padding: 30px 0 100px 0;
  border-top: 1px solid ${({ theme }) => theme.deepGray};
  font-size: 18px;
  img {
    margin-bottom: 20px;
  }
`

const PostUserDiv = styled.section`
  padding: 30px 0;
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.deepGray};
  border-bottom: 1px solid ${({ theme }) => theme.deepGray};
  img {
    margin-right: 20px;
  }
  h2 {
    font-size: 30px;
    font-weight: 600;
  }
  h3 {
    margin-top: 3px;
  }
`
