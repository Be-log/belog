import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { styled } from 'styled-components'
import { Image } from '../components/common'
import { profile } from '../assets'
import { getBoardList } from '../api/board'
import { axiosErrorType, objType } from '../interfaces/apiTypes'
import { Loading } from './status'

const Main = () => {
  const navigate = useNavigate()

  const [boardList, setBoardList] = useState<objType[] | null>(null)

  const { isLoading, error } = useQuery(['getBoardList'], () => getBoardList(), {
    onSuccess: (response) => setBoardList(response.receiveObj),
    onError: (error: AxiosError<axiosErrorType>) => alert(error.response?.data.msg),
  })

  return (
    <WrapMain>
      {isLoading ? (
        <Loading page={'main'} type={'loading'} />
      ) : error ? (
        <Loading page={'main'} type={'error'} />
      ) : (
        boardList &&
        boardList.map((post) => (
          <BoxDiv key={String(post.board_seq)} onClick={() => navigate(`/post/${post.board_seq}`)}>
            <Image $height={150} $border={3} src={String(post.thumbnail)} />
            <BoardDiv>
              <h1>{post.title}</h1>
              <h2>
                {String(post.content)
                  .slice(0, 200)
                  .replaceAll(/[\n_#*\\/]/g, '')}
              </h2>
              <span>
                {`${String(post.create_date).slice(0, 4)}년
                 ${String(post.create_date).slice(5, 7)}월
                 ${String(post.create_date).slice(8, 10)}일`}
              </span>
            </BoardDiv>
            <NicknameDiv>
              <Image $width={24} $height={24} $border={50} src={profile} />
              <span>{'by'}</span>
              <h3>{post.nickname}</h3>
            </NicknameDiv>
          </BoxDiv>
        ))
      )}
    </WrapMain>
  )
}

export default Main

const WrapMain = styled.main`
  padding: 40px 0;
  display: grid;
  grid-template-columns: repeat(5, 270px);
  gap: 60px;
  justify-content: center;
  align-items: center;
`

const BoxDiv = styled.div`
  width: 300px;
  height: 400px;
  align-items: center;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.darkGray};
  cursor: pointer;
  transition: transform 0.2s ease-out;
  h1,
  h2,
  p,
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.gray};
  }
  h1 {
    font-size: 17px;
    font-weight: 600;
  }
  h2 {
    height: 100px;
    margin-bottom: 10px;
    padding: 10px 0;
    font-size: 14px;
    white-space: pre-line;
    text-align: justify;
    line-height: 1.6;
  }
  span,
  h3 {
    font-size: 13px;
  }
  & > div {
    padding: 15px;
  }
  & > img {
    width: 100%;
    object-fit: cover;
  }
  &:hover {
    transform: translateY(-10px);
  }
`

const BoardDiv = styled.div`
  height: 190px;
`

const NicknameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border-top: 1px solid ${({ theme }) => theme.deepGray};
`
