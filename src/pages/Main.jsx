import React from 'react'

import {
  MainContainer,
  Box,
  Boximg,
  BoxContent,
  BoxFooter
} from '../components/styles'
import Header from './Navbar'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'


const Main = () => {

  const [boxes, setBoxes] = useState([])

  const fetchBoxes = async () => {
    const { data } = await axios.get('http://3.34.52.229/api/posts/main')
    console.log('data : ', data)
    setBoxes(data.posts)
  }
  console.log(typeof (boxes))

  useEffect(() => {
    fetchBoxes()
  }, [])

  return (
    <>
      <Header />
      <MainContainer>
        {boxes.map((box) => (
          <Box key={box.postId}>
            <Boximg src="https://velog.velcdn.com/images/heelieben/post/c3dce497-2507-4097-8538-9e3d37cc4933/image.png" />
            <BoxContent>{box.title}</BoxContent>
            <BoxFooter>회원이름 / 좋아요버튼</BoxFooter>
          </Box>
        ))}
      </MainContainer>
    </>
  )
}

export default Main