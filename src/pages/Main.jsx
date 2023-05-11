import React from 'react'
import {
  MainContainer,
  Box,
  Boximg,
  BoxContent,
  BoxFooter
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
        {data && data.posts && data.posts.map((box) => (
          <Box key={box.postId} onClick={() => openDetail(box.postId)}>
            <Boximg src="https://velog.velcdn.com/images/heelieben/post/c3dce497-2507-4097-8538-9e3d37cc4933/image.png" />
            <BoxContent>{box.title}</BoxContent>
            <BoxFooter>생성일자[{box.createdAt}]</BoxFooter>
          </Box>
        ))}
      </MainContainer>
    </>
  )
}

export default Main
