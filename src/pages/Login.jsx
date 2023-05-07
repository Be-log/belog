import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Input from '../components/Input'
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
  InfoH1,
  Form,
  GuideTextP
} from './ModalStyle'

const Login = () => {
  const [form, setForm] = useState({
    nickname: '',
    password: '',
  })
  const [guideText, setGuideText] = useState('');

  return (
    <BackgroundDiv>
      <MainSection>
        <ImageDiv>
          <PopupImage src="https://static.velog.io/static/media/undraw_joyride_hnno.fae6b95e.svg" alt="" />
          <PopupText>환영합니다!</PopupText>
        </ImageDiv>
        <InfoDiv>
          <InfoCloseP>
            <FontAwesomeIcon icon={faXmark} />
          </InfoCloseP>
          <FormDiv>
            <InfoH1>로그인</InfoH1>
            <Form>
              <Input
                size={'medium'}
                value={form.nickname}
                placeholder={'아이디를 입력하세요.'}
              />
              <Input
                type={'password'}
                size={'medium'}
                value={form.password}
                placeholder={'비밀번호를 입력하세요.'}
              />
            </Form>
            <GuideTextP>{guideText}</GuideTextP>
            <ButtonDiv>
              <Button
                type={'reset'}
                color={'white'}
              >
                회원가입
              </Button>
              <Button
                color={'mint'}
              >
                로그인
              </Button>
            </ButtonDiv>
          </FormDiv>
        </InfoDiv>
      </MainSection>
    </BackgroundDiv>
  )
}

export default Login

const FormDiv = styled.div`
  display: flex;
  margin-top: 160px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ButtonDiv = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
  gap: 10px;
`