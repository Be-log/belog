import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import styled from 'styled-components'
import {
  BackgroundDiv,
  ImageDiv,
  InfoCloseP,
  InfoDiv,
  MainSection,
  PopupImage,
  PopupText,
} from './ModalStyle'

const Modal = ({ closeModalHandler }) => {
  const [page, setPage] = useState(false)
  const signupBtnClickHandler = () => setPage(true)

  return (
    <BackgroundDiv>
      <MainSection>
        <ImageDiv>
          <PopupImage src="https://static.velog.io/static/media/undraw_joyride_hnno.fae6b95e.svg" alt="" />
          <PopupText>환영합니다!</PopupText>
        </ImageDiv>
        <InfoDiv>
          <InfoCloseP>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={closeModalHandler}
            />
          </InfoCloseP>
          { !page ? <Login /> : <Signup />}
          { !page ?
            <SignupDiv>
              <SignupP>
                아직 회원이 아니신가요?
                <SignupStrong
                  onClick={signupBtnClickHandler}
                >
                  회원가입
                </SignupStrong>
              </SignupP>
            </SignupDiv>
            : ''
          }
        </InfoDiv>
      </MainSection>
    </BackgroundDiv>
  )
}

export default Modal

const SignupDiv = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`

const SignupP = styled.p`
  color: white;
`

const SignupStrong = styled.strong`
  margin-left: 10px;
  color: #96F2D7;
  cursor: pointer;
`