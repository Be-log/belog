import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogoutUser } from '../redux/modules/login'
import styled from 'styled-components'
import Button from '../components/Button'
import Image from '../components/Image'
import Modal from './Modal'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const [menuToggle, setMenuToggle] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // * 로그인 여부 확인
  const getLoginInfo = useSelector((state) => state.loginUser)

  const loginModalClickHandler = () => setShowModal(!showModal)
  const closeModalHandler = () => setShowModal(false)
  const toggleClickHandler = () => setMenuToggle(!menuToggle)

  // * 로그아웃
  const logoutClickHandler = () => {
    setMenuToggle(false)
    dispatch(setLogoutUser(getLoginInfo.nickname))
    navigate('/')
  }



  // TODO
  // 2. 로그인 했을 경우 & 안했을 경우에 따라 보이는 요소 달라야 함
  // 3. 토글했을 때 어떤 메뉴 보여줄지 & 기능 구현
  // 4. 로그인 하고 나면 이 페이지에서 state 관리해서 뿌려줘야 할듯
  // 5. location이 상세페이지일 경우 로고 변경 처리


  // 프로필 설정 페이지로 데이터 가져가기
  const profilePageClick = () => {
    navigate('/profile', { state: { loginInfo: getLoginInfo } });
  }


  const myPageClick = () => {
    navigate('/mypage', { state: { loginInfo: getLoginInfo } });
  }

  return (
    <HeaderContainer>
      <HeaderContentLeft>
        <HeaderLogo onClick={() => {
          navigate('/')
        }}>
          belog
        </HeaderLogo>
      </HeaderContentLeft>
      <HeaderContentRight>
        {
          !!getLoginInfo.nickname &&
          <>
            <Button
              shape={'circle'}
              color={'transparent'}
              onClick={() => {
                navigate('/write')
              }}
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
          </>
        }
        {
          !getLoginInfo.nickname &&
          <Button
            shape={'circle'}
            onClick={loginModalClickHandler}
          >
            로그인
          </Button>
        }
        {
          showModal &&
          <Modal closeModalHandler={closeModalHandler} />
        }
        {
          menuToggle &&
          <HeaderUl>
            <HeaderLi onClick={myPageClick}>
              내 비로그
            </HeaderLi>
            <HeaderLi onClick={profilePageClick}>
              프로필 설정
            </HeaderLi>
            <HeaderLi
              onClick={logoutClickHandler}
            >
              로그아웃
            </HeaderLi>
          </HeaderUl>
        }
      </HeaderContentRight>
    </HeaderContainer>
  )
}

export default Navbar

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
  cursor: pointer;
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