import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Image from '../components/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const toggleClickHandler = () => {
    setToggle(!toggle)
  }

  // TODO
  // 1. 로고 클릭 시 메인화면으로 이동
  // 2. 로그인 했을 경우 & 안했을 경우에 따라 보이는 요소 달라야 함
  // 3. 토글했을 때 어떤 메뉴 보여줄지 & 기능 구현
  // 4. 로그인 하고 나면 이 페이지에서 state 관리해서 뿌려줘야 할듯
  // 5. location이 상세페이지일 경우 로고 변경 처리

  return (
    <HeaderContainer>
      <HeaderContentLeft>
        <HeaderLogo>belog</HeaderLogo>
        {/* 상세페이지일 경우 nickname.log로 변경 */}
        {/* <HeaderLogo>username123.log</HeaderLogo> */}
      </HeaderContentLeft>
      <HeaderContentRight>
        <Button
          shape={'circle'}
        >
          로그인
        </Button>
        <Button
          shape={'circle'}
          color={'transparent'}
        >
          새 글 작성
        </Button>
        <HeaderToggleDiv
          onClick={toggleClickHandler}
        >
          <Image
            src={`${process.env.PUBLIC_URL}/images/default_profile.png`}
            width={'40'}
            height={'40'}
          />
          <SetFontAwesome icon={faCaretDown} />
        </HeaderToggleDiv>
        {
          toggle &&
          <HeaderUl>
            <HeaderLi>내 비로그</HeaderLi>
            <HeaderLi>프로필 설정</HeaderLi>
            <HeaderLi>로그아웃</HeaderLi>
          </HeaderUl>
        }
      </HeaderContentRight>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.nav`
  background-color: #121212;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const HeaderContentLeft = styled.div`
  width: 10%;
`

const HeaderLogo = styled.p`
  height: 70px;
  display: flex;
  align-items: center;
  font-size: 26px;
  font-weight: bold;
  color: white;
  font-family: 'Source Code Pro', monospace;
`

const HeaderContentRight = styled.div`
  width: 55%;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`

const HeaderToggleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

const SetFontAwesome = styled(FontAwesomeIcon)`
  color: white;
`

const HeaderUl = styled.ul`
  position: fixed;
  background-color: #1E1E1E;
  color: white;
  top: 75px;
  right: 160px;
  border-radius: 3px;
  cursor: pointer;
  z-index: 1;
`

const HeaderLi = styled.li`
  width: 160px;
  height: 25px;
  padding: 10px 0 10px 30px;
`