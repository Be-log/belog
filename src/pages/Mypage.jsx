import React from 'react'
import {
  MainContainer,
  MypageH2,
  MypageSpan,
  MypageHeader,
  MypageHeaderImg,
  MypageHeaderTextContainer,
  MypageHeaderLine,
  Box,
  Boximg,
  BoxHeader,
  BoxNickname,
  BoxFooter,
  MypageContainer
} from '../components/styles'
import Header from './Navbar'

import axios from 'axios'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'


function Mypage() {
  const navigate = useNavigate()
  const getLoginInfo = useSelector((state) => state.loginUser)


  // * 내 게시글 조회
  const { data } = useQuery('getMyList', async () => {
    const myList = await axios.get(`http://3.34.52.229/api/posts/${getLoginInfo.nickname}`)
    return myList.data
  })

  // * 게시글 클릭 시 상세 게시글 조회
  const openDetail = async (postId) => {

    try {
      const response = await axios.get(`http://3.34.52.229/api/posts/${postId}`)
      const post = response.data;
      navigate(`/detail/${postId}`, { state: { post } })



    } catch (error) {
      console.error('API 호출 에러:', error)
    }
  }

  return (
    <div>
      <Header />
      <MainContainer>
        <MypageHeader>
          <MypageHeaderImg src="https://velog.velcdn.com/images/heelieben/post/87bbb462-dbd5-49a5-a9e9-70ed2007cdaf/image.png" alt="" />
          <MypageHeaderTextContainer>
            <MypageH2>{getLoginInfo.nickname}</MypageH2>
            <MypageSpan>{getLoginInfo.description}</MypageSpan>
          </MypageHeaderTextContainer>
        </MypageHeader>
        <MypageHeaderLine />

        <MypageContainer>
          {data && data.posts && data.posts.map((box, index) => (
            <Box
              key={index}
              onClick={() => openDetail(box.postId)}
            >
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
                  ${box.createdAt.slice(17, 19)}
                  `
                }
              </BoxFooter>
            </Box>
          ))}
        </MypageContainer>
      </MainContainer>
    </div>
  )
}
export default Mypage