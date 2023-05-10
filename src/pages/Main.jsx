import React from 'react'
import {
  MainContainer,
  Box,
  Boximg,
  BoxContent,
  BoxFooter
} from '../components/styles'
import Header from './Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Main = () => {
  const [boxes, setBoxes] = useState([])

  const fetchBoxes = async () => {
    try {
      const { data } = await axios.get('http://3.34.52.229/api/posts/main')
      setBoxes(data.posts)
      console.log("메인페이지 데이터 : ", data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchBoxes()
  }, [])

  const navigate = useNavigate()

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
        {boxes.map((box) => (
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
