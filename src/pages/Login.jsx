import React, { useState } from 'react'
import styled from 'styled-components'
import Input from '../components/Input'
import {
  InfoH1,
  Form,
  GuideTextP
} from './ModalStyle'

const Login = () => {
  const [guideText, setGuideText] = useState('')

  return (
    <>
      <FormDiv>
        <InfoH1>로그인</InfoH1>
        <Form>
          <Input
            size={'medium'}
            placeholder={'아이디를 입력하세요.'}
          />
          <Input
            type={'password'}
            size={'medium'}
            placeholder={'비밀번호를 입력하세요.'}
          />
        </Form>
        <GuideTextP>{guideText}</GuideTextP>
      </FormDiv>
    </>
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