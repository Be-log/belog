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

const Join = () => {
  const [form, setForm] = useState({
    nickname: '',
    password: '',
    passwordCheck: '',
    email: '',
    github: '',
    description: '',
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
            <InfoH1>회원가입</InfoH1>
            <Form>
              <InputWrapper>
                <Input
                  size={'small'}
                  value={form.nickname}
                  placeholder={'아이디를 입력하세요.'}
                />
                <Button color={'mint'}>중복확인</Button>
              </InputWrapper>
              <Input
                type={'password'}
                size={'medium'}
                value={form.password}
                placeholder={'비밀번호를 입력하세요.'}
              />
              <Input
                type={'password'}
                size={'medium'}
                value={form.passwordCheck}
                placeholder={'비밀번호를 다시 입력해주세요.'}
              />
              <Input
                size={'medium'}
                value={form.email}
                placeholder={'이메일을 입력해주세요.'}
              />
              <Input
                size={'medium'}
                value={form.github}
                placeholder={'GitHub 아이디를 입력해주세요.'}
              />
              <Input
                size={'medium'}
                value={form.description}
                placeholder={'블로그 소개를 50자 이내로 입력해주세요.'}
              />
            </Form>
            <GuideTextP>{guideText}</GuideTextP>
            <ButtonDiv>
              <Button
                type={'reset'}
                color={'white'}
              >
                초기화
              </Button>
              <Button
                color={'mint'}
              >
                회원가입
              </Button>
            </ButtonDiv>
          </FormDiv>
        </InfoDiv>
      </MainSection>
    </BackgroundDiv>
  )
}

export default Join

const FormDiv = styled.div`
  display: flex;
  margin-top: 90px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ButtonDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`