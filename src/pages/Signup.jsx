import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Input from '../components/Input'
import {
  InfoH1,
  Form,
  GuideTextP
} from './ModalStyle'

const Signup = () => {
  const [guideText, setGuideText] = useState('');

  return (
    <FormDiv>
      <InfoH1>회원가입</InfoH1>
      <Form>
        <InputWrapper>
          <Input
            size={'small'}
            placeholder={'아이디를 입력하세요.'}
          />
          <Button color={'mint'}>중복확인</Button>
        </InputWrapper>
        <Input
          type={'password'}
          size={'medium'}
          placeholder={'비밀번호를 입력하세요.'}
        />
        <Input
          type={'password'}
          size={'medium'}
          placeholder={'비밀번호를 다시 입력해주세요.'}
        />
        <Input
          size={'medium'}
          placeholder={'이메일을 입력해주세요.'}
        />
        <Input
          size={'medium'}
          placeholder={'GitHub 아이디를 입력해주세요.'}
        />
        <Input
          size={'medium'}
          placeholder={'블로그 소개를 50자 이내로 입력해주세요.'}
        />
      </Form>
      <GuideTextP>{guideText}</GuideTextP>
    </FormDiv>
  )
}

export default Signup

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