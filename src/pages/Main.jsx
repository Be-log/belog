import React from 'react'
import {
  MainContainer,
  WrapContainer,
  Box,
  Boximg,
  BoxHeader,
  BoxNickname,
  BoxFooter,
} from '../components/styles'
import Header from './Navbar'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router'

const Main = () => {
  const navigate = useNavigate()

  // * 메인페이지 조회
  const { data } = useQuery('getMainList', async () => {
    const mainList = await axios.get(`http://3.34.52.229/api/posts/main`)
    return mainList.data
  })

  // * 상세 게시글 조회
  const openDetail = async (postId) => {
    try {
      const response = await axios.get(`http://3.34.52.229/api/posts/${postId}`)
      const post = response.data;
      navigate(`/detail/${postId}`, { state: { post } })
      console.log('클릭 시 데이터:', post)
    } catch (error) {
      console.error('API 호출 에러:', error)
    }
  }

  return (
    <>
      <Header />
      <MainContainer>
        <WrapContainer>
          {data && data.posts && data.posts.map((box) => (
            <Box key={box.postId} onClick={() => openDetail(box.postId)}>
              <Boximg src={`${process.env.PUBLIC_URL}/images/test_thumbnail.png`} />
              <BoxHeader>{box.title}</BoxHeader>
              <BoxNickname>@{box.nickname}</BoxNickname>
              <BoxFooter>
                {
                  `
                  ${box.createdAt.slice(0, 4)}년
                  ${box.createdAt.slice(5, 7)}월
                  ${box.createdAt.slice(8, 10)}일

                  ${box.createdAt.slice(11, 13)}:
                  ${box.createdAt.slice(14, 16)}:
                  ${box.createdAt.slice(17,19)}
                  `
                }
              </BoxFooter>
            </Box>
          ))}
        </WrapContainer>
      </MainContainer>
    </>
  )
}

export default Main
