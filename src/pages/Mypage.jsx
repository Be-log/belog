import React from 'react'

import {
  MypageHeader,
  MypageHeaderImg,
  MypageHeaderTextContainer,
  MypageHeaderLine,
  Box,
  Boximg,
  BoxContent,
  BoxFooter,
  MypageContainer
} from '../components/styles'
import Header from './Navbar'


function Mypage() {

  const boxes = [1, 2, 3, 4, 5]

  return (
    <div>
      <Header />
      <MypageHeader>
        <MypageHeaderImg src="https://velog.velcdn.com/images/heelieben/post/87bbb462-dbd5-49a5-a9e9-70ed2007cdaf/image.png" alt="" />
        <MypageHeaderTextContainer>
          <h2>김효환</h2>
          <span>개발공부중</span>
        </MypageHeaderTextContainer>
      </MypageHeader>
      <MypageHeaderLine />

      <MypageContainer>
        {boxes.map((box) => (
          <Box key={box}>
            <Boximg src="https://velog.velcdn.com/images/heelieben/post/c3dce497-2507-4097-8538-9e3d37cc4933/image.png" />
            <BoxContent>컨텐트 내용이 들어갑니다.</BoxContent>
            <BoxFooter>회원이름 / 좋아요버튼</BoxFooter>
          </Box>
        ))}
      </MypageContainer>

    </div>
  )
}
export default Mypage