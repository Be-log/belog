import React, { useState } from 'react'
import Button from '../components/Button'
import Login from './Login'
import Signup from './Signup'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {
  BackgroundDiv,
  MainSection,
  ImageDiv,
  PopupImage,
  PopupText,
  InfoDiv,
  InfoCloseP,
} from './ModalStyle'

const Modal = ({ closeModalHandler }) => {
  const [page, setPage] = useState(false)
  const leftButtonClickHandler = () => setPage(true)

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
          {!page ? <Login /> : <Signup />}
          <ButtonDiv>
            <Button
              type={'reset'}
              color={'white'}
              onClick={leftButtonClickHandler}
              >
              {!page ? '회원가입' : '초기화'}
            </Button>
            <Button
              color={'mint'}
            >
              {!page ? '로그인' : '회원가입'}
            </Button>
          </ButtonDiv>
        </InfoDiv>
      </MainSection>
    </BackgroundDiv>
  )
}

export default Modal

const ButtonDiv = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
  gap: 10px;
`