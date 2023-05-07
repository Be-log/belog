import React, { useState } from 'react'
import Button from '../components/Button'
import styled from 'styled-components'
import {
  Form,
  GuideTextP,
  InfoH1,
  ButtonDiv
} from './ModalStyle'

const Login = () => {
  const [guideText, setGuideText] = useState('')
  const [page, setPage] = useState(false)

  return (
    <>
      <FormDiv>
        <InfoH1>로그인</InfoH1>
        <Form>
          <MiddleInput
            size={'medium'}
            placeholder={'아이디를 입력하세요.'}
          />
          <MiddleInput
            type={'password'}
            size={'medium'}
            placeholder={'비밀번호를 입력하세요.'}
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
            로그인
          </Button>
        </ButtonDiv>
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

const MiddleInput = styled.input`
  width: 300px;
  height: 45px;
  padding: 0px 10px;
  background-color: #1E1E1E;
  border: 1px solid #4D4D4D;
  border-radius: 3px;
  color: white;
  &:hover {
    border: 1px solid #96F2D7;
  }
  &:focus {
    outline: none;
    border: 1px solid #96F2D7;
  }
`